import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { InvoicePDF } from "@/lib/pdf/invoice";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { free, document: doc, profile, toName, toCompany, toEmail, toAddress, fromName } = body;

    // Server-side plan enforcement: if authenticated, check plan
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let shouldWatermark = free === true;

    if (user) {
      const { data: dbProfile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
      shouldWatermark = dbProfile?.plan === "free";
    }

    // Build client info from body
    const client = toName ? {
      id: "anon",
      user_id: "",
      name: toName ?? "",
      email: toEmail ?? null,
      company: toCompany ?? null,
      address: toAddress ?? null,
      created_at: "",
    } : null;

    const resolvedProfile = profile ?? {
      id: user?.id ?? "anon",
      email: fromName ?? "CloseKit User",
      plan: shouldWatermark ? "free" : "pro",
      stripe_customer_id: null,
      docs_this_month: 0,
      brand_logo_url: null,
      brand_color: "#6366f1",
    };

    const docData = {
      ...doc,
      line_items: doc.line_items ?? [],
      tax_rate: doc.tax_rate ?? 0,
      notes: doc.notes ?? "",
    };

    const element = React.createElement(InvoicePDF, {
      doc: docData,
      profile: resolvedProfile,
      client,
      watermark: shouldWatermark,
    }) as any;

    const buffer = await renderToBuffer(element);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="document.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
