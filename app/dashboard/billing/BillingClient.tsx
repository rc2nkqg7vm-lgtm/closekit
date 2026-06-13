"use client";
import { useState } from "react";
import { Check, Loader2, ExternalLink, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Profile, Plan } from "@/types";

interface Props { profile: Profile | null }

const plans = [
  {
    key: "free" as Plan,
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 documents / month", "Invoice + proposal", "PDF download", '"Made with CloseKit" watermark'],
    cta: null,
  },
  {
    key: "pro" as Plan,
    name: "Pro Monthly",
    priceKey: "pro_monthly",
    price: "$29",
    period: "/ month",
    features: ["Unlimited documents", "Custom logo + colors", "Watermark-free PDFs", "All templates", "Payment request links"],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    key: "pro" as Plan,
    name: "Pro Annual",
    priceKey: "pro_annual",
    price: "$59",
    period: "/ year",
    features: ["Everything in Pro Monthly", "Save $289 vs monthly", "Priority support"],
    cta: "Upgrade — save 83%",
  },
  {
    key: "lifetime" as Plan,
    name: "Lifetime",
    priceKey: "lifetime",
    price: "$99",
    period: "one-time",
    features: ["Pro forever", "All future features", "Founding member badge", "Limited — 50 slots"],
    cta: "Get Lifetime deal 🔥",
    badge: "Best value",
  },
];

export function BillingClient({ profile }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const currentPlan = profile?.plan ?? "free";

  async function checkout(priceKey: string) {
    setLoading(priceKey);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceKey }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
    else setLoading(null);
  }

  async function openPortal() {
    setLoading("portal");
    const res = await fetch("/api/checkout/portal", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
    else setLoading(null);
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-foreground mb-1">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your plan and payment method.</p>
      </div>

      {/* Current plan banner */}
      <div className="mb-8 flex items-center justify-between rounded-xl border border-border/50 bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
            <Crown className={cn("h-5 w-5", currentPlan !== "free" ? "text-indigo-400" : "text-muted-foreground")} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground capitalize">
              {currentPlan === "lifetime" ? "Lifetime (Pro forever)" : currentPlan === "pro" ? "Pro" : "Free plan"}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentPlan === "free"
                ? `${profile?.docs_this_month ?? 0} of 3 documents used this month`
                : "Unlimited documents, custom branding enabled"}
            </p>
          </div>
        </div>
        {currentPlan !== "free" && currentPlan !== "lifetime" && profile?.stripe_customer_id && (
          <button
            onClick={openPortal}
            disabled={loading === "portal"}
            className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-xs text-muted-foreground hover:border-border hover:text-foreground transition-colors"
          >
            {loading === "portal" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ExternalLink className="h-3.5 w-3.5" />}
            Manage subscription
          </button>
        )}
      </div>

      {/* Plan cards */}
      {currentPlan === "free" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.filter((p) => p.cta).map((plan) => (
            <div
              key={plan.priceKey}
              className={cn(
                "relative rounded-2xl border p-5 transition-all",
                plan.popular
                  ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-card shadow-xl shadow-indigo-500/10"
                  : "border-border/50 bg-card hover:border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}
              {plan.badge && (
                <span className="mb-2 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs text-orange-300">
                  {plan.badge}
                </span>
              )}
              <h3 className="mb-0.5 font-semibold text-foreground">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mb-5 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => checkout(plan.priceKey!)}
                disabled={!!loading}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all disabled:opacity-60",
                  plan.popular
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:brightness-110"
                    : "border border-border bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {loading === plan.priceKey ? <Loader2 className="h-4 w-4 animate-spin" /> : plan.cta}
              </button>
            </div>
          ))}
        </div>
      )}

      {currentPlan !== "free" && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
          <Crown className="mx-auto mb-3 h-8 w-8 text-indigo-400" />
          <h2 className="mb-2 font-semibold text-foreground">You&apos;re on {currentPlan === "lifetime" ? "Lifetime" : "Pro"}</h2>
          <p className="text-sm text-muted-foreground">
            {currentPlan === "lifetime"
              ? "You have Pro access forever. Sit back and enjoy."
              : "Enjoying unlimited documents and custom branding."}
          </p>
        </div>
      )}
    </div>
  );
}
