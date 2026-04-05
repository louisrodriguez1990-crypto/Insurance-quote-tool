import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, quoteData } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // Log lead server-side (visible in Vercel function logs)
  // TODO: replace with your CRM / Supabase / database integration
  console.log("[lead]", JSON.stringify({ email, name, quoteData, createdAt: new Date().toISOString() }));

  return NextResponse.json({ success: true });
}
