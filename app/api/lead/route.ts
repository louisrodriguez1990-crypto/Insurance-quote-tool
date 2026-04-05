import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, quoteData } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // Store lead locally (replace with CRM/database in production)
  const leadsPath = join(process.cwd(), "data", "leads.json");
  let leads: Array<{ email: string; name: string; quoteData: unknown; createdAt: string }> = [];
  try {
    const existing = await readFile(leadsPath, "utf-8");
    leads = JSON.parse(existing);
  } catch {
    // File doesn't exist yet, start with empty array
  }

  leads.push({ email, name, quoteData, createdAt: new Date().toISOString() });
  await writeFile(leadsPath, JSON.stringify(leads, null, 2));

  return NextResponse.json({ success: true });
}
