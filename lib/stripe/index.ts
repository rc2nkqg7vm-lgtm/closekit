import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export const PRICES = {
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
  pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL!,
  lifetime: process.env.STRIPE_PRICE_LIFETIME!,
} as const;

export type PriceKey = keyof typeof PRICES;

export async function createOrRetrieveCustomer(userId: string, email: string) {
  const existing = await stripe.customers.list({ email, limit: 1 });
  if (existing.data.length > 0) return existing.data[0].id;
  const customer = await stripe.customers.create({ email, metadata: { supabase_user_id: userId } });
  return customer.id;
}

export async function createCheckoutSession({
  customerId,
  priceKey,
  userId,
  successUrl,
  cancelUrl,
}: {
  customerId: string;
  priceKey: PriceKey;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const isLifetime = priceKey === "lifetime";
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: isLifetime ? "payment" : "subscription",
    line_items: [{ price: PRICES[priceKey], quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { supabase_user_id: userId, price_key: priceKey },
    allow_promotion_codes: true,
  });
}

export async function createPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl });
}
