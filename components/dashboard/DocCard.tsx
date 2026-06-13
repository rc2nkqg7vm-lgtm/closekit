import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Document } from "@/types";

const statusStyles: Record<string, string> = {
  draft: "bg-secondary text-muted-foreground",
  sent: "bg-sky-500/15 text-sky-400",
  paid: "bg-emerald-500/15 text-emerald-400",
  accepted: "bg-indigo-500/15 text-indigo-400",
};

interface Props {
  doc: Document & { clients?: { name: string; company: string | null } | null };
}

export function DocCard({ doc }: Props) {
  const subtotal = doc.line_items.reduce((s, i) => s + i.qty * i.rate, 0);
  const total = subtotal * (1 + doc.tax_rate / 100);

  return (
    <Link
      href={`/dashboard/docs/${doc.id}`}
      className="group flex flex-col rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
          <FileText className="h-4.5 w-4.5 text-indigo-400" />
        </div>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", statusStyles[doc.status])}>
          {doc.status}
        </span>
      </div>

      <h3 className="mb-1 font-medium text-foreground line-clamp-1 group-hover:text-indigo-300 transition-colors">
        {doc.title}
      </h3>
      <p className="mb-3 text-xs text-muted-foreground capitalize">
        {doc.type}
        {doc.clients ? ` · ${doc.clients.company || doc.clients.name}` : ""}
      </p>

      <div className="mt-auto flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="font-semibold text-foreground">${total.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{new Date(doc.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-indigo-400" />
        </div>
      </div>
    </Link>
  );
}
