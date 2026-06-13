"use client";
import type { LineItem, Profile } from "@/types";

interface Props {
  type: "invoice" | "proposal";
  title: string;
  fromName: string;
  toName: string;
  toCompany: string;
  toEmail: string;
  items: LineItem[];
  taxRate: number;
  notes: string;
  profile: Profile | null;
  watermark: boolean;
}

export function Preview({ type, title, fromName, toName, toCompany, toEmail, items, taxRate, notes, profile, watermark }: Props) {
  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  const brandColor = profile?.brand_color ?? "#6366f1";
  const docLabel = type === "invoice" ? "INVOICE" : "PROPOSAL";

  return (
    <div className="relative h-full overflow-auto bg-white rounded-lg shadow-2xl">
      {watermark && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rotate-[-30deg] z-10">
          <span className="text-4xl font-bold text-gray-200/70 select-none">Made with CloseKit</span>
        </div>
      )}

      <div className="p-10 font-[system-ui] text-gray-800 min-h-[800px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            {profile?.brand_logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.brand_logo_url} alt="Logo" className="h-10 object-contain" />
            ) : (
              <span className="text-xl font-bold text-gray-900">{fromName || "Your Name"}</span>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold" style={{ color: brandColor }}>{docLabel}</div>
            <div className="text-xs text-gray-500 mt-1">
              #{Math.random().toString(36).slice(2, 8).toUpperCase()}
            </div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-6" />

        {/* Bill to */}
        {(toName || toCompany) && (
          <div className="mb-6">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Bill To</div>
            <div className="font-semibold text-gray-900">{toName || "—"}</div>
            {toCompany && <div className="text-sm text-gray-500">{toCompany}</div>}
            {toEmail && <div className="text-sm text-gray-500">{toEmail}</div>}
          </div>
        )}

        {/* Line items table */}
        <div className="mb-6">
          <div className="grid grid-cols-[1fr_50px_70px_80px] gap-2 px-2 py-1.5 rounded text-xs font-bold text-gray-400 uppercase tracking-wide" style={{ backgroundColor: "#f9fafb" }}>
            <span>Description</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Rate</span>
            <span className="text-right">Amount</span>
          </div>
          {items.filter((i) => i.description || i.rate).map((item, idx) => (
            <div key={item.id} className="grid grid-cols-[1fr_50px_70px_80px] gap-2 px-2 py-2.5 border-b border-gray-100 text-sm">
              <span className="text-gray-700">{item.description || <span className="text-gray-300">—</span>}</span>
              <span className="text-right text-gray-500">{item.qty}</span>
              <span className="text-right text-gray-500">${item.rate.toFixed(2)}</span>
              <span className="text-right text-gray-700 font-medium">${(item.qty * item.rate).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-56 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            {taxRate > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>Tax ({taxRate}%)</span><span>${tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-1.5 border-t" style={{ borderColor: brandColor }}>
              <span>Total</span>
              <span style={{ color: brandColor }}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Notes</div>
            <p className="text-sm text-gray-600 leading-relaxed">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
