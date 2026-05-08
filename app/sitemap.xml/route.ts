import { getIntentPath, launchStates, type IntentKey } from "@/lib/lifeInsurance";
import fs from "fs";
import matter from "gray-matter";
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

function getLearnArticles(): { slug: string; lastmod: string }[] {
  const learnDir = path.join(process.cwd(), "content", "learn");
  if (!fs.existsSync(learnDir)) return [];
  return fs
    .readdirSync(learnDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(learnDir, f), "utf8");
      const { data } = matter(raw);
      return {
        slug: f.replace(".mdx", ""),
        lastmod: (data.updatedAt as string) || new Date().toISOString().split("T")[0],
      };
    });
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

  // Only launchStates (FL/TX/CA/NC/SC) have rich local matrix data worth indexing
  const stateEntries = launchStates
    .map((s) => generateUrlEntry(`/insurance/${s.slug}`, "0.7", "monthly", today))
    .join("");

  // Age pages are noindexed — omit from sitemap

  // getIntentPath("mortgage", state) uses state.avgMortgageBalance — canonical URL only
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

  // Use updatedAt from frontmatter for honest lastmod
  const learnEntries = getLearnArticles()
    .map(({ slug, lastmod }) => generateUrlEntry(`/learn/${slug}`, "0.7", "weekly", lastmod))
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticEntries}
  ${stateEntries}
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
