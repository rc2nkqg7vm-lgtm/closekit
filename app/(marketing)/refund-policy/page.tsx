import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="mb-2 text-3xl font-bold">Refund Policy</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: June 13, 2026</p>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">Pro Monthly / Annual</h2>
            <p>If you're not satisfied within the first <strong className="text-foreground">7 days</strong> of your first Pro subscription, email us and we'll issue a full refund — no questions asked. After 7 days, refunds are not available for the current billing period, but you can cancel anytime to prevent future charges.</p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">Lifetime Deal</h2>
            <p>The Lifetime deal is eligible for a full refund within <strong className="text-foreground">14 days</strong> of purchase. After 14 days, Lifetime purchases are non-refundable.</p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">Free tier</h2>
            <p>The free tier has no charges, so no refunds apply.</p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">How to request a refund</h2>
            <p>Email <a href="mailto:hello@closekit.app" className="text-indigo-400 hover:text-indigo-300">hello@closekit.app</a> with your account email and purchase date. We process refunds within 5 business days. Refunds are returned to the original payment method.</p>
          </section>

          <div className="rounded-xl border border-border/50 bg-card p-4 mt-8">
            <p>Questions? <Link href="mailto:hello@closekit.app" className="text-indigo-400 hover:text-indigo-300">hello@closekit.app</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
