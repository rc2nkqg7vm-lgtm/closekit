"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2, Save, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { LineItems } from "@/components/editor/LineItems";
import { Preview } from "@/components/editor/Preview";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Document, LineItem, Profile, Client, DocStatus } from "@/types";
import Link from "next/link";

interface Props {
  doc: Document & { clients?: Client | null };
  profile: Profile | null;
  clients: Client[];
}

const statusOptions: { value: DocStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "accepted", label: "Accepted" },
];

export function EditorClient({ doc, profile, clients }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(doc.title);
  const [status, setStatus] = useState<DocStatus>(doc.status);
  const [clientId, setClientId] = useState(doc.client_id ?? "");
  const [toName, setToName] = useState(doc.clients?.name ?? "");
  const [toCompany, setToCompany] = useState(doc.clients?.company ?? "");
  const [toEmail, setToEmail] = useState(doc.clients?.email ?? "");
  const [items, setItems] = useState<LineItem[]>(doc.line_items.length ? doc.line_items : [{ id: "init", description: "", qty: 1, rate: 0 }]);
  const [taxRate, setTaxRate] = useState(doc.tax_rate);
  const [notes, setNotes] = useState(doc.notes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isPro = profile?.plan !== "free";
  const watermark = !isPro;

  const save = useCallback(async () => {
    setSaving(true);
    await (supabase.from("documents") as any).update({
      title, status, client_id: clientId || null,
      line_items: items as any, tax_rate: taxRate, notes,
    }).eq("id", doc.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [title, status, clientId, items, taxRate, notes, doc.id, supabase]);

  // Autosave after 2s idle
  useEffect(() => {
    const t = setTimeout(save, 2000);
    return () => clearTimeout(t);
  }, [title, status, items, taxRate, notes, save]);

  async function downloadPDF() {
    setDownloading(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          free: !isPro,
          document: { ...doc, title, status, line_items: items, tax_rate: taxRate, notes },
          profile,
          toName, toCompany, toEmail,
        }),
      });
      if (!res.ok) throw new Error("PDF failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  const inputClass = "w-full rounded-lg border border-border/40 bg-secondary/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-colors";

  return (
    <div className="flex h-screen flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border/50 bg-card/60 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-sm font-medium text-foreground focus:outline-none border-b border-transparent focus:border-indigo-500/50 transition-colors px-1 py-0.5 w-48"
            placeholder="Document title"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as DocStatus)}
            className="rounded-lg border border-border/40 bg-secondary/40 px-2 py-1 text-xs text-muted-foreground focus:outline-none focus:border-indigo-500/40"
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Save indicator */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {saving ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" />Saving…</>
            ) : saved ? (
              <><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />Saved</>
            ) : null}
          </div>

          {/* Download PDF */}
          {!isPro && (
            <Link href="/dashboard/billing" className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-300 hover:bg-indigo-500/20 transition-colors">
              <Lock className="h-3 w-3" />
              Remove watermark
            </Link>
          )}
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
          >
            {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: form */}
        <div className="w-1/2 overflow-y-auto border-r border-border/40 p-6 space-y-6">
          {/* Client info */}
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Client</h2>
            {clients.length > 0 && (
              <select
                value={clientId}
                onChange={(e) => {
                  setClientId(e.target.value);
                  const c = clients.find((c) => c.id === e.target.value);
                  if (c) { setToName(c.name); setToCompany(c.company ?? ""); setToEmail(c.email ?? ""); }
                }}
                className={cn(inputClass, "mb-2")}
              >
                <option value="">— Select saved client —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}{c.company ? ` (${c.company})` : ""}</option>
                ))}
              </select>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              <input className={inputClass} placeholder="Client name" value={toName} onChange={(e) => setToName(e.target.value)} />
              <input className={inputClass} placeholder="Company (optional)" value={toCompany} onChange={(e) => setToCompany(e.target.value)} />
              <input className={inputClass} placeholder="Client email" type="email" value={toEmail} onChange={(e) => setToEmail(e.target.value)} />
            </div>
          </div>

          {/* Line items */}
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Line Items</h2>
            <LineItems items={items} onChange={setItems} />
          </div>

          {/* Tax + Notes */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Tax Rate (%)</label>
              <input className={inputClass} type="number" min="0" max="100" step="0.5" placeholder="0" value={taxRate || ""} onChange={(e) => setTaxRate(Number(e.target.value))} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Notes</label>
              <textarea className={cn(inputClass, "resize-none h-20")} placeholder="Payment terms, thank you note…" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="flex-1 overflow-hidden bg-[#f0f0f0] p-4">
          <div className="h-full overflow-auto rounded-xl shadow-2xl">
            <Preview
              type={doc.type}
              title={title}
              fromName={profile?.email?.split("@")[0] ?? ""}
              toName={toName}
              toCompany={toCompany}
              toEmail={toEmail}
              items={items}
              taxRate={taxRate}
              notes={notes}
              profile={profile}
              watermark={watermark}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
