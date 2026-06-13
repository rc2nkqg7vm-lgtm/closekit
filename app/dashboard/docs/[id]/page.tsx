import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { EditorClient } from "./EditorClient";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit document · ${id.slice(0, 6).toUpperCase()}` };
}

export default async function DocEditorPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: doc }, { data: profile }, { data: clients }] = await Promise.all([
    supabase.from("documents").select("*, clients(*)").eq("id", id).eq("user_id", user!.id).single(),
    supabase.from("profiles").select("*").eq("id", user!.id).single(),
    supabase.from("clients").select("*").eq("user_id", user!.id).order("name"),
  ]);

  if (!doc) notFound();

  return <EditorClient doc={doc as any} profile={profile as any} clients={clients ?? []} />;
}
