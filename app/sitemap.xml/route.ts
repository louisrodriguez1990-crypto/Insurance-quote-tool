import statesData from "@/data/states.json";
import { getIntentPath, launchStates, type IntentKey } from "@/lib/lifeInsurance";
import fs from "fs";
import path from "path";

const BASE_URL = "https://bestquote.io";

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/learn", priority: "0.8", changefreq: "weekly" },
  { url: "/insurance/life-insurance", priority: "0.9", changefreq: "weekly" },
  { url: "/insurance/life-insurance/term-life-insurance", priority: "0.8", changefreq: "weekly" },
  { url: "/insurance/life-insurance/whole-life-insurance", priority: "0.8", changefreq: "weekly" },
  { url: "/insurance/health-insurance", priority: "0.9", changefreq: "weekly" },
];

function getLearnArticles(): string[] {
  const learnDir = path.join(process.cwd(), "content", "learn");
  if (!fs.existsSync(learnDir)) return [];
  return fs.readdirSync(learnDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

function generateUrlEntry(url: string, priority: string, changefreq: string, lastmod?: string): string {
  return `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${lastmod || new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const staticEntries = staticPages
    .map((p) => generateUrlEntry(p.url, p.priority, p.changefreq, today))
    .join("");

  const stateEntries = statesData
    .map((s) => generateUrlEntry(`/insurance/${s.slug}`, "0.7", "monthly", today))
    .join("");

  const ageEntries = Array.from({ length: 51 }, (_, i) => i + 20)
    .map((age) => generateUrlEntry(`/insurance/life-insurance/${age}-year-old`, "0.6", "monthly", today))
    .join("");

  const pseoEntries = (["sba-loan", "final-expense", "mortgage"] as IntentKey[])
    .flatMap((intent) =>
      launchStates.map((state) =>
        generateUrlEntry(
          getIntentPath(intent, state),
          intent === "mortgage" ? "0.8" : "0.9",
          "monthly",
          today,
        ),
      ),
    )
    .join("");

  const learnEntries = getLearnArticles()
    .map((slug) => generateUrlEntry(`/learn/${slug}`, "0.7", "weekly", today))
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticEntries}
  ${stateEntries}
  ${ageEntries}
  ${pseoEntries}
  ${learnEntries}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
