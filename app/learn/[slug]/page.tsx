import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getIntentPath, launchStates } from "@/lib/lifeInsurance";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

interface Frontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  readTime: string;
}

function getArticle(slug: string): { frontmatter: Frontmatter; content: string } | null {
  const filePath = path.join(process.cwd(), "content", "learn", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as Frontmatter, content };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "learn");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files.map((f) => ({ slug: f.replace(".mdx", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return {};
  const { frontmatter } = article;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/learn/${params.slug}` },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
    },
  };
}

// Very simple MDX-to-HTML renderer for static content
function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-extrabold text-gray-900 mb-6">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li class="text-gray-700 mb-1">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc ml-6 mb-4 space-y-1">$&</ul>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-gray-700 mb-1">$2</li>')
    .replace(/\n\n/g, '</p><p class="text-gray-700 mb-4 leading-relaxed">')
    .replace(/^(?!<[hul])(.+)$/gm, (m) =>
      m.trim() ? `<p class="text-gray-700 mb-4 leading-relaxed">${m}</p>` : ""
    );
}

export default function LearnArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const { frontmatter, content } = article;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: { "@type": "Organization", name: frontmatter.author },
    publisher: { "@type": "Organization", name: "BestQuote" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bestquote.io" },
      { "@type": "ListItem", position: 2, name: "Learning Center", item: "https://bestquote.io/learn" },
      { "@type": "ListItem", position: 3, name: frontmatter.title },
    ],
  };

  const html = renderMarkdown(content);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Learning Center", href: "/learn" },
            { label: frontmatter.category, href: "/learn" },
            { label: frontmatter.title },
          ]}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full font-medium text-xs">
              {frontmatter.category}
            </span>
            <span>{frontmatter.readTime}</span>
            <span>·</span>
            <span>Updated {new Date(frontmatter.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{frontmatter.title}</h1>
          <p className="text-lg text-gray-600">{frontmatter.description}</p>
          <p className="text-sm text-gray-400 mt-3">By {frontmatter.author}</p>
        </div>

        <article
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="my-12 border border-neutral-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-1">Helpful calculators</h2>
          <p className="text-sm text-neutral-600 mb-5">State-specific estimates for common life insurance scenarios.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-neutral-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-1">SBA Loan</p>
              <p className="font-semibold text-neutral-900 text-sm mb-2">SBA Loan Protection</p>
              <ul className="space-y-1">
                {launchStates.map((s) => (
                  <li key={s.slug}>
                    <Link href={getIntentPath("sba-loan", s)} className="text-brand-700 text-xs hover:underline">
                      {s.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-neutral-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-1">Mortgage</p>
              <p className="font-semibold text-neutral-900 text-sm mb-2">Mortgage Protection</p>
              <ul className="space-y-1">
                {launchStates.map((s) => (
                  <li key={s.slug}>
                    <Link href={getIntentPath("mortgage", s)} className="text-brand-700 text-xs hover:underline">
                      {s.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-neutral-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-1">Final Expense</p>
              <p className="font-semibold text-neutral-900 text-sm mb-2">Guaranteed Issue Final Expense</p>
              <ul className="space-y-1">
                {launchStates.map((s) => (
                  <li key={s.slug}>
                    <Link href={getIntentPath("final-expense", s)} className="text-brand-700 text-xs hover:underline">
                      {s.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="my-12">
          <QuoteCTA />
        </div>

        <div className="border-t border-gray-200 pt-8">
          <Link href="/learn" className="text-brand-700 hover:underline text-sm">
            ← Back to Learning Center
          </Link>
        </div>
      </div>
    </>
  );
}
