import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { email, source = "free-tool" } = await req.json();
    if (!email || typeof email !== "string") return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = await createServiceClient();
    await supabase.from("leads").upsert({ email: email.toLowerCase().trim(), source }, { onConflict: "email", ignoreDuplicates: true });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
