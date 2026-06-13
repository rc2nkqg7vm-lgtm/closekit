"use client";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-grid relative overflow-hidden py-24 md:py-36">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-1/4 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="container relative mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
          <Star className="h-3.5 w-3.5 fill-indigo-400 text-indigo-400" />
          <span>First 50 users — $99 lifetime deal</span>
          <span className="text-indigo-500">→</span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Win clients.{" "}
          <span className="gradient-text">Get paid faster.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Professional proposals and invoices in minutes. Send client-ready PDFs,
          track payments, and look like a polished pro — not a freelancer with a spreadsheet.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/tools/free-invoice-generator"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-2xl shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:brightness-110"
          >
            Create a free invoice
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border border-border/60 px-7 py-3.5 font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            Start free account
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground/70">No credit card required · 3 docs free forever</p>

        {/* Editor mockup */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/40 overflow-hidden">
            {/* Fake titlebar */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-card/80 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-muted-foreground">Invoice #001 — Acme Corp</span>
            </div>
            {/* Split pane mockup */}
            <div className="grid grid-cols-2 divide-x divide-border/40">
              {/* Left: form */}
              <div className="p-6 text-left">
                <div className="mb-4">
                  <div className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">Client</div>
                  <div className="rounded-lg border border-border/50 bg-secondary/50 px-3 py-2 text-sm text-foreground/80">Acme Corporation</div>
                </div>
                <div className="mb-4">
                  <div className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">Line Items</div>
                  <div className="space-y-2">
                    {[
                      { desc: "Website redesign", qty: 1, rate: 2500 },
                      { desc: "SEO setup", qty: 3, rate: 150 },
                    ].map((item, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 rounded-lg border border-border/40 bg-secondary/30 p-2 text-xs text-muted-foreground">
                        <span className="col-span-1 truncate">{item.desc}</span>
                        <span className="text-right">{item.qty}×</span>
                        <span className="text-right text-indigo-400">${item.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <span className="text-muted-foreground">Total: </span>
                  <span className="font-bold text-indigo-400">$2,950.00</span>
                </div>
              </div>
              {/* Right: live preview */}
              <div className="bg-white/[0.03] p-6 text-left">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-indigo-400/80 uppercase">INVOICE</div>
                    <div className="text-xs text-muted-foreground">#001 · June 12, 2026</div>
                  </div>
                  <div className="h-8 w-8 rounded bg-gradient-to-br from-indigo-500 to-violet-600" />
                </div>
                <div className="h-px bg-border/40 mb-3" />
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Website redesign</span><span>$2,500</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>SEO setup × 3</span><span>$450</span>
                  </div>
                  <div className="h-px bg-border/40 my-2" />
                  <div className="flex justify-between font-semibold text-indigo-400">
                    <span>Total</span><span>$2,950.00</span>
                  </div>
                </div>
                <div className="mt-4 rounded border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs text-center text-indigo-300 font-medium">
                  ↓ Download PDF
                </div>
              </div>
            </div>
          </div>
          {/* Glow under card */}
          <div className="pointer-events-none absolute -bottom-8 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
