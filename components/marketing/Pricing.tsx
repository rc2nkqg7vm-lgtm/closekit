"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    desc: "Try it before you commit.",
    features: [
      "3 documents per month",
      "Invoice + proposal templates",
      "PDF download",
      '"Made with CloseKit" watermark',
      "1 saved client",
    ],
    cta: "Start free",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 59 },
    desc: "For freelancers who mean business.",
    features: [
      "Unlimited documents",
      "Custom logo + brand color",
      "All templates",
      "Watermark-free PDFs",
      "Unlimited saved clients",
      "Payment request links",
      "Dashboard analytics",
      "Priority support",
    ],
    cta: "Start Pro",
    href: "/signup?plan=pro_monthly",
    popular: true,
  },
  {
    name: "Lifetime",
    price: { monthly: 99, annual: 99 },
    desc: "Pay once, Pro forever. Limited slots.",
    features: [
      "Everything in Pro",
      "One-time payment, no renewal",
      "All future updates included",
      "Early access to new features",
      "Founding member badge",
    ],
    cta: "Get lifetime deal",
    href: "/signup?plan=lifetime",
    popular: false,
    badge: "🔥 Limited — 50 slots",
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Simple, <span className="gradient-text">honest pricing</span>
          </h2>
          <p className="mb-8 text-muted-foreground">No hidden fees. Cancel anytime on Pro.</p>

          {/* Billing toggle */}
          <div className="inline-flex rounded-xl border border-border/60 bg-card p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium transition-all",
                billing === "monthly" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium transition-all",
                billing === "annual" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <span className="ml-1.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400">
                Save 83%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative rounded-2xl border p-6 transition-all",
                tier.popular
                  ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-card shadow-2xl shadow-indigo-500/20 scale-[1.02]"
                  : "border-border/50 bg-card hover:border-border"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {tier.badge && (
                <div className="mb-3 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-300">
                  {tier.badge}
                </div>
              )}

              <h3 className="mb-1 text-lg font-semibold text-foreground">{tier.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{tier.desc}</p>

              <div className="mb-6">
                {tier.price.monthly === 0 ? (
                  <span className="text-4xl font-bold text-foreground">Free</span>
                ) : tier.name === "Lifetime" ? (
                  <div>
                    <span className="text-4xl font-bold text-foreground">$99</span>
                    <span className="ml-1.5 text-muted-foreground">one-time</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl font-bold text-foreground">
                      ${billing === "monthly" ? tier.price.monthly : tier.price.annual}
                    </span>
                    <span className="ml-1.5 text-muted-foreground">
                      /{billing === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                )}
              </div>

              <Link
                href={tier.href}
                className={cn(
                  "mb-6 block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-all",
                  tier.popular
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:brightness-110"
                    : "border border-border bg-secondary text-foreground hover:border-border/80 hover:bg-secondary/80"
                )}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Estimated agency build value for this product: $3,500–$6,000. You get it for free → $99.
        </p>
      </div>
    </section>
  );
}
