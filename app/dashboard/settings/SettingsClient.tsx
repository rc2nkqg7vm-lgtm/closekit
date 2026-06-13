"use client";
import { useState } from "react";
import { Loader2, Upload, CheckCircle2, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types";

interface Props { profile: Profile | null }

const BRAND_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#10b981", "#0ea5e9", "#64748b",
];

export function SettingsClient({ profile }: Props) {
  const supabase = createClient();
  const isPro = profile?.plan !== "free";

  const [brandColor, setBrandColor] = useState(profile?.brand_color ?? "#6366f1");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [logoUrl, setLogoUrl] = useState(profile?.brand_logo_url ?? "");
  const [uploading, setUploading] = useState(false);

  async function save() {
    setSaving(true);
    const client = createClient();
    await client.from("profiles").update({ brand_color: brandColor, brand_logo_url: logoUrl || null }).eq("id", profile!.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0] || !isPro) return;
    setUploading(true);
    const file = e.target.files[0];
    const ext = file.name.split(".").pop();
    const path = `logos/${profile!.id}.${ext}`;
    const { error } = await supabase.storage.from("brand-assets").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("brand-assets").getPublicUrl(path);
      setLogoUrl(data.publicUrl);
    }
    setUploading(false);
  }

  const inputClass = "w-full rounded-lg border border-border/40 bg-secondary/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-colors";

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="mb-1 text-xl font-bold text-foreground">Settings</h1>
      <p className="mb-8 text-sm text-muted-foreground">Customize how your documents look to clients.</p>

      <div className="space-y-6">
        {/* Logo */}
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Logo</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Appears in the top-left of every PDF.</p>
            </div>
            {!isPro && (
              <Link href="/dashboard/billing" className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300">
                <Lock className="h-3 w-3" /> Pro only
              </Link>
            )}
          </div>

          {logoUrl && (
            <div className="mb-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="Logo" className="h-12 rounded-lg border border-border/40 object-contain p-1.5 bg-white/5" />
              <button onClick={() => setLogoUrl("")} className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
            </div>
          )}

          <label className={cn(
            "flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border/50 px-4 py-3 text-sm transition-colors hover:border-indigo-500/40",
            !isPro && "opacity-40 cursor-not-allowed"
          )}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <Upload className="h-4 w-4 text-muted-foreground" />}
            <span className="text-muted-foreground">{uploading ? "Uploading…" : "Click to upload (PNG, SVG, max 1MB)"}</span>
            <input type="file" accept="image/png,image/svg+xml,image/jpeg" className="hidden" disabled={!isPro} onChange={uploadLogo} />
          </label>
        </div>

        {/* Brand color */}
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Brand color</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Used for headings and totals in your PDFs.</p>
            </div>
            {!isPro && (
              <Link href="/dashboard/billing" className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300">
                <Lock className="h-3 w-3" /> Pro only
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5 mb-3">
            {BRAND_COLORS.map((c) => (
              <button
                key={c}
                disabled={!isPro}
                onClick={() => isPro && setBrandColor(c)}
                className={cn(
                  "h-8 w-8 rounded-full border-2 transition-all",
                  brandColor === c ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100",
                  !isPro && "cursor-not-allowed"
                )}
                style={{ backgroundColor: c }}
                aria-label={c}
              />
            ))}
            {/* Custom color input */}
            <div className="relative">
              <input
                type="color"
                value={brandColor}
                disabled={!isPro}
                onChange={(e) => isPro && setBrandColor(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded-full border-2 border-transparent bg-transparent p-0 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: brandColor }} />
            <span className="text-xs font-mono text-muted-foreground">{brandColor}</span>
          </div>
        </div>

        {/* Account */}
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <h2 className="mb-3 font-semibold text-foreground">Account</h2>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Email</label>
            <input className={cn(inputClass, "opacity-60")} value={profile?.email ?? ""} disabled />
            <p className="mt-1.5 text-xs text-muted-foreground">Email is managed through your auth provider.</p>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={save}
          disabled={saving || !isPro}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : null}
          {saved ? "Saved!" : "Save settings"}
        </button>
      </div>
    </div>
  );
}
