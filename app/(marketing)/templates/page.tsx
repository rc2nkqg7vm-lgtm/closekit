import Link from "next/link";
import { FileText, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates",
  description: "Professional invoice and proposal templates for freelancers. Free and Pro.",
};

const templates = [
  { id: "classic-invoice", name: "Classic Invoice", type: "Invoice", pro: false, desc: "Clean, minimal invoice. Works for any industry.", color: "#6366f1" },
  { id: "modern-proposal", name: "Modern Proposal", type: "Proposal", pro: false, desc: "Professional scope-of-work proposal with project overview.", color: "#8b5cf6" },
  { id: "agency-invoice", name: "Agency Invoice", type: "Invoice", pro: true, desc: "Bold agency-style invoice with project summary section.", color: "#ec4899" },
  { id: "consultant-proposal", name: "Consultant Proposal", type: "Proposal", pro: true, desc: "Detailed proposal for consulting engagements.", color: "#f97316" },
  { id: "retainer-invoice", name: "Monthly Retainer", type: "Invoice", pro: true, desc: "Recurring invoice template for retainer clients.", color: "#10b981" },
  { id: "web-dev-proposal", name: "Web Dev Proposal", type: "Proposal", pro: true, desc: "Technical proposal with timeline, milestones, and deliverables.", color: "#0ea5e9" },
];

export default function TemplatesPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">Templates</h1>
          <p className="text-muted-foreground">
            Start from a professional template. Free users get 1, Pro unlocks all.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <div
              key={t.id}
              className="group relative rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-border hover:shadow-lg"
            >
              {t.pro && (
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-300">
                  <Lock className="h-3 w-3" />
                  Pro
                </div>
              )}
              {/* Fake preview */}
              <div className="mb-4 h-32 rounded-xl overflow-hidden border border-border/40 bg-white/[0.03] flex flex-col p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-4 rounded" style={{ backgroundColor: t.color + "33" }} />
                  <div className="text-xs font-bold" style={{ color: t.color }}>{t.type.toUpperCase()}</div>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 rounded-full bg-border/60 w-3/4" />
                  <div className="h-1.5 rounded-full bg-border/40 w-1/2" />
                  <div className="h-1.5 rounded-full bg-border/30 w-2/3 mt-2" />
                  <div className="h-1.5 rounded-full bg-border/30 w-1/2" />
                </div>
                <div className="flex justify-end mt-1">
                  <div className="h-2.5 w-12 rounded-full" style={{ backgroundColor: t.color + "40" }} />
                </div>
              </div>

              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{t.name}</h3>
              </div>
              <p className="mb-4 text-xs text-muted-foreground leading-relaxed">{t.desc}</p>

              <Link
                href={t.pro ? "/dashboard/billing" : "/dashboard/new"}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-secondary/40 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-border hover:text-foreground"
              >
                {t.pro ? <><Lock className="h-3 w-3" />Unlock with Pro</> : "Use template →"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
