import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, FileSignature } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Document" };

export default async function NewDocumentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();

  const atLimit = profile?.plan === "free" && (profile?.docs_this_month ?? 0) >= 3;
  if (atLimit) redirect("/dashboard/billing?reason=limit");

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-foreground">Create new document</h1>
        <p className="mb-8 text-center text-muted-foreground">What are you creating today?</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <NewDocButton type="invoice" icon={FileText} title="Invoice" desc="Bill a client for completed work. Add line items, tax, notes, and download a PDF." />
          <NewDocButton type="proposal" icon={FileSignature} title="Proposal" desc="Win new work with a polished scope-of-work document and a total price." />
        </div>
      </div>
    </div>
  );
}

async function NewDocButton({ type, icon: Icon, title, desc }: { type: "invoice" | "proposal"; icon: React.ElementType; title: string; desc: string }) {
  // Server action to create doc + redirect
  async function create() {
    "use server";
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: doc } = await supabase.from("documents").insert({
      user_id: user.id,
      type,
      title: `New ${title}`,
    }).select().single();

    // Increment docs_this_month
    await supabase.rpc("increment_docs_count" as any, { user_id: user.id });

    if (doc) redirect(`/dashboard/docs/${doc.id}`);
  }

  return (
    <form action={create}>
      <button
        type="submit"
        className="group flex w-full flex-col items-start rounded-2xl border border-border/50 bg-card p-6 text-left transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:shadow-lg"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
          <Icon className="h-5.5 w-5.5 text-indigo-400" />
        </div>
        <h2 className="mb-2 font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </button>
    </form>
  );
}
