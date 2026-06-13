import { createClient } from "@/lib/supabase/server";
import { BillingClient } from "./BillingClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Billing" };

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();

  return <BillingClient profile={profile as any} />;
}
