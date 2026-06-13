import { FileText, Zap, Shield, Palette, BarChart3, Link2 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Free invoice in 2 minutes",
    desc: "No signup needed. Fill in your details, hit download — your first PDF is free instantly.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: FileText,
    title: "Proposals & invoices",
    desc: "Two document types, one workflow. Win the project, then bill for it without switching tools.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Palette,
    title: "Your brand, not ours",
    desc: "Upload your logo, set your brand color. Pro PDFs look like they came from an agency.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Shield,
    title: "Server-enforced limits",
    desc: "Free tier limits are enforced server-side — no client tricks, no surprises on upgrade.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Link2,
    title: "Payment request links",
    desc: "Pro users can add a Stripe payment link directly on the PDF. Get paid without follow-ups.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: BarChart3,
    title: "Track your pipeline",
    desc: "Draft → Sent → Paid. See at a glance what's outstanding and what's been collected.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
];

export function Features() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Everything a freelancer needs to{" "}
            <span className="gradient-text">close more deals</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Built specifically for freelancers who want to look professional without spending hours on paperwork.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card rounded-xl p-6 transition-colors hover:border-border">
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${f.bg}`}>
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
