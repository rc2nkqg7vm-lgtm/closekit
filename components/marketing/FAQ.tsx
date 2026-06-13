"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What happens when I hit the 3 doc/month free limit?",
    a: "You'll see an upgrade prompt. Your existing documents are safe — you just can't create new ones until the next month or you upgrade.",
  },
  {
    q: "Can I white-label the PDF to remove CloseKit branding?",
    a: "Yes — Pro and Lifetime plans remove the 'Made with CloseKit' watermark entirely and let you upload your own logo and set brand colors.",
  },
  {
    q: "Is the Lifetime deal really a one-time payment?",
    a: "Yes. Pay $99 once, and you have Pro access forever including all future updates. We cap Lifetime slots at 50 to keep it sustainable.",
  },
  {
    q: "Do you store my clients' data?",
    a: "Client data is stored in your Supabase account with Row Level Security — only you can access it. We never sell or share your data.",
  },
  {
    q: "Can I accept payments directly through CloseKit?",
    a: "Pro users can attach a Stripe payment link to any invoice. Your client sees a 'Pay Now' button on the PDF. Stripe fees (2.9% + $0.30) apply.",
  },
  {
    q: "What formats can I export?",
    a: "PDF — rendered server-side with @react-pdf/renderer so it looks identical on every device, no headless Chrome required.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-2xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Frequently asked questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-secondary/30 transition-colors"
              >
                <span>{faq.q}</span>
                {open === i ? (
                  <Minus className="h-4 w-4 shrink-0 text-indigo-400" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {open === i && (
                <div className="border-t border-border/40 px-5 py-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
