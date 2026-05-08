import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

export const metadata: Metadata = {
  title: "Insurance Learning Center — Guides, Tips & Explainers",
  description:
    "Free insurance guides written by experts. Learn how much life insurance you need, the difference between term and whole life, no-exam policies, and more.",
  alternates: { canonical: "/learn" },
};

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

function getArticles(): Article[] {
  const dir = path.join(process.cwd(), "content", "learn");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return { slug: f.replace(".mdx", ""), ...data } as Article;
    })
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
}

export default function LearnPage() {
  const articles = getArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Learning Center" }]} />

      <h1 className="text-4xl font-bold text-neutral-900 mb-4">Insurance Learning Center</h1>
      <p className="text-lg text-neutral-600 mb-10">
        Expert guides to help you understand insurance, compare options, and make confident coverage decisions.
      </p>

      {categories.map((category) => (
        <section key={category} className="mb-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">{category}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles
              .filter((a) => a.category === category)
              .map((article) => (
                <Link
                  key={article.slug}
                  href={`/learn/${article.slug}`}
                  className="group border border-neutral-200 rounded-xl p-6 hover:shadow-md hover:border-brand-700 transition-all"
                >
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                    <span className="bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                      {article.category}
                    </span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-700 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{article.description}</p>
                  <p className="text-brand-700 text-sm font-medium mt-4">Read more →</p>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <QuoteCTA />
    </div>
  );
}
