"use client";
import { useState, useCallback } from "react";
import { Plus, Trash2, Download, Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LineItem } from "@/types";
import type { Metadata } from "next";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function FreeInvoiceGeneratorPage() {
  const [from, setFrom] = useState({ name: "", email: "", address: "" });
  const [to, setTo] = useState({ name: "", email: "", company: "", address: "" });
  const [items, setItems] = useState<LineItem[]>([{ id: generateId(), description: "", qty: 1, rate: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [emailGate, setEmailGate] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "email" | "done">("form");

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const addItem = () => setItems((prev) => [...prev, { id: generateId(), description: "", qty: 1, rate: 0 }]);
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id: string, field: keyof LineItem, value: string | number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  async function handleDownload() {
    if (step === "form") { setStep("email"); return; }
    if (step === "email") {
      // Capture lead email
      if (emailInput) {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailInput, source: "free-tool" }),
        });
      }
      setLoading(true);
      try {
        const res = await fetch("/api/pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            free: true,
            document: { type: "invoice", title: `Invoice for ${to.name}`, line_items: items, tax_rate: taxRate, notes, created_at: new Date().toISOString() },
            fromName: from.name,
            toName: to.name,
            toCompany: to.company,
            toEmail: to.email,
            toAddress: to.address,
          }),
        });
        if (!res.ok) throw new Error("PDF generation failed");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${to.name || "client"}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        setStep("done");
      } finally {
        setLoading(false);
      }
    }
  }

  const inputClass = "w-full rounded-lg border border-border/50 bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-colors";

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            Free Invoice Generator
          </h1>
          <p className="text-muted-foreground">
            No account required. Create a professional invoice PDF in under 2 minutes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Form */}
          <div className="space-y-6">
            {/* From */}
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h2 className="mb-4 font-semibold text-foreground">From (you)</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={inputClass} placeholder="Your name / business" value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} />
                <input className={inputClass} placeholder="Your email" type="email" value={from.email} onChange={(e) => setFrom({ ...from, email: e.target.value })} />
                <input className={inputClass} placeholder="Your address (optional)" value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} />
              </div>
            </div>

            {/* To */}
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h2 className="mb-4 font-semibold text-foreground">Bill to (client)</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={inputClass} placeholder="Client name" value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} />
                <input className={inputClass} placeholder="Client email" type="email" value={to.email} onChange={(e) => setTo({ ...to, email: e.target.value })} />
                <input className={inputClass} placeholder="Company (optional)" value={to.company} onChange={(e) => setTo({ ...to, company: e.target.value })} />
                <input className={inputClass} placeholder="Address (optional)" value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} />
              </div>
            </div>

            {/* Line items */}
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h2 className="mb-4 font-semibold text-foreground">Line items</h2>
              <div className="mb-2 grid grid-cols-[1fr_60px_90px_90px_32px] gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <span>Description</span><span className="text-right">Qty</span><span className="text-right">Rate</span><span className="text-right">Amount</span><span />
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[1fr_60px_90px_90px_32px] gap-2">
                    <input
                      className={inputClass}
                      placeholder="Service or product"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    />
                    <input
                      className={cn(inputClass, "text-right")}
                      type="number" min="1"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))}
                    />
                    <input
                      className={cn(inputClass, "text-right")}
                      type="number" min="0" step="0.01"
                      placeholder="0.00"
                      value={item.rate || ""}
                      onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                    />
                    <div className={cn(inputClass, "flex items-center justify-end text-right bg-transparent border-transparent text-foreground font-medium")}>
                      ${(item.qty * item.rate).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="flex h-9 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive disabled:opacity-30"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addItem}
                className="mt-3 flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add line item
              </button>
            </div>

            {/* Notes + Tax */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/50 bg-card p-5">
                <label className="mb-2 block text-sm font-medium text-foreground">Notes</label>
                <textarea
                  className={cn(inputClass, "resize-none h-20")}
                  placeholder="Payment terms, thank you note, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-5">
                <label className="mb-2 block text-sm font-medium text-foreground">Tax rate (%)</label>
                <input
                  className={inputClass}
                  type="number" min="0" max="100" step="0.5"
                  placeholder="0"
                  value={taxRate || ""}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Summary + Download */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 bg-card p-5 sticky top-20">
              <h2 className="mb-4 font-semibold text-foreground">Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                {taxRate > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax ({taxRate}%)</span><span>${tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-border/50 pt-2 flex justify-between font-semibold text-foreground">
                  <span>Total</span>
                  <span className="text-indigo-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {step === "email" && (
                <div className="mt-4">
                  <label className="mb-1.5 block text-xs text-muted-foreground">
                    Enter your email to download (optional — we'll send a copy)
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>
              )}

              <button
                onClick={handleDownload}
                disabled={loading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:brightness-110 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Generating PDF…</>
                ) : step === "email" ? (
                  <><Download className="h-4 w-4" /> Download PDF</>
                ) : (
                  <><Download className="h-4 w-4" /> Download free PDF</>
                )}
              </button>

              {step === "done" && (
                <p className="mt-3 text-center text-xs text-emerald-400">
                  ✓ PDF downloaded! Want unlimited docs?{" "}
                  <a href="/signup" className="underline">Create a free account</a>
                </p>
              )}

              <p className="mt-3 text-center text-xs text-muted-foreground/60">
                Free PDFs include a "Made with CloseKit" watermark.{" "}
                <a href="/pricing" className="text-indigo-400/80 hover:text-indigo-400 underline">Upgrade to remove it.</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
