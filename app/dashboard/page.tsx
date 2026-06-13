import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, FileText, ArrowUpRight } from "lucide-react";
import { DocCard } from "@/components/dashboard/DocCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: documents }, { data: profile }] = await Promise.all([
    supabase
      .from("documents")
      .select("*, clients(name, company)")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(50),
    supabase.from("profiles").select("*").eq("id", user!.id).single(),
  ]);

  const isPro = profile?.plan !== "free";
  const atLimit = !isPro && (profile?.docs_this_month ?? 0) >= 3;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground">All your proposals and invoices in one place.</p>
        </div>
        {atLimit ? (
          <Link
            href="/dashboard/billing"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:brightness-110"
          >
            Upgrade to create more <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <Link
            href="/dashboard/new"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> New document
          </Link>
        )}
      </div>

      {/* Upgrade banner for free users near limit */}
      {!isPro && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-indigo-500/25 bg-indigo-500/8 px-4 py-3">
          <p className="text-sm text-indigo-200/80">
            {atLimit
              ? "You've hit your free limit for this month."
              : `${3 - (profile?.docs_this_month ?? 0)} free documents left this month.`}
          </p>
          <Link href="/dashboard/billing" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
            Go Pro →
          </Link>
        </div>
      )}

      {/* Empty state */}
      {!documents?.length ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
            <FileText className="h-7 w-7 text-indigo-400" />
          </div>
          <h2 className="mb-2 font-semibold text-foreground">No documents yet</h2>
          <p className="mb-6 max-w-xs text-sm text-muted-foreground">
            Create your first proposal or invoice. It takes less than 2 minutes.
          </p>
          <Link href="/dashboard/new" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" /> Create first document
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocCard key={doc.id} doc={doc as any} />
          ))}
        </div>
      )}
    </div>
  );
}
