import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createOrRetrieveCustomer, createCheckoutSession, type PriceKey } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { priceKey } = await req.json() as { priceKey: PriceKey };
  const validKeys: PriceKey[] = ["pro_monthly", "pro_annual", "lifetime"];
  if (!validKeys.includes(priceKey)) return NextResponse.json({ error: "Invalid price" }, { status: 400 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  try {
    const customerId = await createOrRetrieveCustomer(user.id, user.email!);

    // Persist Stripe customer ID
    await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);

    const session = await createCheckoutSession({
      customerId,
      priceKey,
      userId: user.id,
      successUrl: `${appUrl}/dashboard?payment=success`,
      cancelUrl: `${appUrl}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
