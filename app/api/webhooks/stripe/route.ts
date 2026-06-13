import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  async function updatePlan(customerId: string, plan: "free" | "pro" | "lifetime") {
    await supabase.from("profiles").update({ plan }).eq("stripe_customer_id", customerId);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      const priceKey = session.metadata?.price_key;

      if (userId && priceKey === "lifetime") {
        await supabase.from("profiles").update({ plan: "lifetime" }).eq("id", userId);
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      if (sub.status === "active" || sub.status === "trialing") {
        await updatePlan(sub.customer as string, "pro");
      } else if (sub.status === "canceled" || sub.status === "unpaid") {
        await updatePlan(sub.customer as string, "free");
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await updatePlan(sub.customer as string, "free");
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

// Disable body parsing — Stripe needs raw body
export const config = { api: { bodyParser: false } };
