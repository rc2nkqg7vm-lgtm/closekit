import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CloseKit — Professional Proposals & Invoices for Freelancers",
  description:
    "Create professional proposals and invoices in minutes. Download PDFs instantly, track payments, and win more clients with CloseKit.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />

      {/* Social proof strip */}
      <section className="border-y border-border/40 bg-card/20 py-8">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Freelancers search for exactly this
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "proposal generator",
              "invoice template PDF",
              "freelance contract template",
              "free invoice maker",
              "client proposal tool",
            ].map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
              >
                "{kw}"
              </span>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <FAQ />

      {/* Final CTA */}
      <section className="hero-grid relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent" />
        <div className="container relative mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Your first invoice is{" "}
            <span className="gradient-text">free right now</span>
          </h2>
          <p className="mb-8 text-muted-foreground">
            No account required. Create a professional PDF invoice in under 2 minutes.
          </p>
          <Link
            href="/tools/free-invoice-generator"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-indigo-500/30 transition-all hover:brightness-110"
          >
            Generate free invoice
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
