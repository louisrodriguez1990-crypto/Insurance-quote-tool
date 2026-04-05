import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

export const metadata: Metadata = {
  title: "Insurance Learning Center — Guides, Tips & Explainers",
  description:
    "Free insurance guides written by experts. Learn how much life insurance you need, the difference between term and whole life, no-exam policies, and more.",
  alternates: { canonical: "/learn" },
};

const articles = [
  {
    slug: "how-much-life-insurance-do-i-need",
    title: "How Much Life Insurance Do I Need?",
    description: "Use the DIME method and income-replacement formulas to calculate the right coverage amount for your family's situation.",
    category: "Life Insurance",
    readTime: "8 min read",
    publishedAt: "2024-01-15",
  },
  {
    slug: "term-vs-whole-life-insurance",
    title: "Term vs. Whole Life Insurance: Full Comparison",
    description: "An in-depth breakdown of term and whole life insurance — costs, cash value, pros and cons, and who should buy each type.",
    category: "Life Insurance",
    readTime: "10 min read",
    publishedAt: "2024-01-22",
  },
  {
    slug: "no-exam-life-insurance",
    title: "No-Exam Life Insurance: How It Works and Is It Worth It?",
    description: "Get covered without a medical exam. We explain simplified issue, guaranteed issue, and accelerated underwriting options.",
    category: "Life Insurance",
    readTime: "7 min read",
    publishedAt: "2024-02-01",
  },
  {
    slug: "life-insurance-for-seniors",
    title: "Life Insurance for Seniors Over 60, 70, and 80",
    description: "Coverage options for older adults: guaranteed issue whole life, final expense insurance, and how to get the best rates in your 60s and 70s.",
    category: "Life Insurance",
    readTime: "9 min read",
    publishedAt: "2024-02-10",
  },
  {
    slug: "life-insurance-for-parents",
    title: "Life Insurance for Parents: Protecting Your Family",
    description: "A complete guide for new and expecting parents. How much coverage do you need? What term should you choose? How to name a guardian as beneficiary.",
    category: "Family Planning",
    readTime: "8 min read",
    publishedAt: "2024-02-18",
  },
  {
    slug: "what-is-cash-value-life-insurance",
    title: "What Is Cash Value Life Insurance?",
    description: "How cash value works inside whole, universal, and variable life policies — and whether it's a better savings vehicle than your 401(k).",
    category: "Life Insurance",
    readTime: "11 min read",
    publishedAt: "2024-03-01",
  },
  {
    slug: "life-insurance-riders-explained",
    title: "Life Insurance Riders Explained: Which Ones Are Worth It?",
    description: "Waiver of premium, accelerated death benefit, child rider, long-term care rider — which add-ons actually make sense for your policy?",
    category: "Life Insurance",
    readTime: "9 min read",
    publishedAt: "2024-03-08",
  },
  {
    slug: "health-insurance-deductible-explained",
    title: "Health Insurance Deductibles Explained",
    description: "What is a deductible? How does it interact with copays, coinsurance, and your out-of-pocket maximum? Answered with real examples.",
    category: "Health Insurance",
    readTime: "7 min read",
    publishedAt: "2024-03-15",
  },
  {
    slug: "open-enrollment-guide",
    title: "Open Enrollment Guide: How to Choose the Right Health Plan",
    description: "Step-by-step walkthrough for comparing health insurance plans during open enrollment. HMO vs PPO, metal tiers, HSA eligibility, and more.",
    category: "Health Insurance",
    readTime: "12 min read",
    publishedAt: "2024-03-22",
  },
  {
    slug: "life-insurance-after-diagnosis",
    title: "Can You Get Life Insurance After a Serious Diagnosis?",
    description: "Yes — in many cases. We cover how cancer, diabetes, heart disease, and other conditions affect life insurance eligibility and rates.",
    category: "Life Insurance",
    readTime: "10 min read",
    publishedAt: "2024-04-01",
  },
];

const categories = Array.from(new Set(articles.map((a) => a.category)));

export default function LearnPage() {
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
