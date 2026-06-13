"use client";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LineItem } from "@/types";

function generateId() { return Math.random().toString(36).slice(2, 9); }

interface Props {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
}

export function LineItems({ items, onChange }: Props) {
  const add = () => onChange([...items, { id: generateId(), description: "", qty: 1, rate: 0 }]);
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));
  const update = (id: string, field: keyof LineItem, value: string | number) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const inputClass = "w-full rounded-lg border border-border/40 bg-secondary/40 px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-colors";

  return (
    <div>
      {/* Header row */}
      <div className="mb-1.5 grid grid-cols-[1fr_60px_90px_90px_28px] gap-2 px-0.5">
        {["Description", "Qty", "Rate", "Amount", ""].map((h) => (
          <span key={h} className="text-xs font-medium uppercase tracking-wide text-muted-foreground text-right first:text-left">
            {h}
          </span>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_60px_90px_90px_28px] gap-2 items-center">
            <input
              className={inputClass}
              placeholder="e.g. Website design"
              value={item.description}
              onChange={(e) => update(item.id, "description", e.target.value)}
            />
            <input
              className={cn(inputClass, "text-right")}
              type="number" min="1" step="1"
              value={item.qty}
              onChange={(e) => update(item.id, "qty", Number(e.target.value))}
            />
            <input
              className={cn(inputClass, "text-right")}
              type="number" min="0" step="0.01"
              placeholder="0.00"
              value={item.rate || ""}
              onChange={(e) => update(item.id, "rate", Number(e.target.value))}
            />
            <div className="flex h-9 items-center justify-end text-sm font-medium text-foreground">
              ${(item.qty * item.rate).toFixed(2)}
            </div>
            <button
              onClick={() => remove(item.id)}
              disabled={items.length === 1}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 hover:bg-secondary hover:text-destructive disabled:opacity-20 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="mt-3 flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add line item
      </button>
    </div>
  );
}
