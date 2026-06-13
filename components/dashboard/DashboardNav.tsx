"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Plus, Settings, CreditCard, Zap, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Documents" },
  { href: "/dashboard/new", icon: Plus, label: "New document" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
];

interface Props { profile: Profile | null; }

export function DashboardNav({ profile }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const planLabel = profile?.plan === "lifetime" ? "Lifetime" : profile?.plan === "pro" ? "Pro" : "Free";
  const planColor = profile?.plan === "free" ? "text-muted-foreground" : "text-indigo-400";
  const docsUsed = profile?.docs_this_month ?? 0;
  const docsLimit = profile?.plan === "free" ? 3 : null;

  return (
    <aside className="flex w-56 flex-col border-r border-border/50 bg-card/50">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-border/40 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600">
            <Zap className="h-3.5 w-3.5 text-white" fill="white" />
          </div>
          CloseKit
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-2 py-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-indigo-500/15 text-indigo-300 font-medium"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Usage meter (free tier) */}
      {profile?.plan === "free" && docsLimit && (
        <div className="mx-2 mb-2 rounded-xl border border-border/40 bg-card p-3">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Documents this month</span>
            <span className={docsUsed >= docsLimit ? "text-destructive font-medium" : "text-foreground"}>
              {docsUsed}/{docsLimit}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all"
              style={{ width: `${Math.min(100, (docsUsed / docsLimit) * 100)}%` }}
            />
          </div>
          {docsUsed >= docsLimit && (
            <Link href="/dashboard/billing" className="mt-2 block text-center text-xs text-indigo-400 hover:text-indigo-300">
              Upgrade to Pro →
            </Link>
          )}
        </div>
      )}

      {/* User profile */}
      <div className="border-t border-border/40 p-3">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
            {profile?.email?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">{profile?.email}</p>
            <p className={cn("text-xs", planColor)}>{planLabel}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
