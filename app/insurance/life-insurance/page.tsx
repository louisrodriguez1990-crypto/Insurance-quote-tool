import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

export const metadata: Metadata = {
  title: "Life Insurance: The Complete Guide to Protecting Your Family",
  description:
    "Everything you need to know about life insurance. Compare term vs whole life, calculate how much coverage you need, and get free quotes from top-rated carriers.",
  alternates: { canonical: "/insurance/life-insurance" },
  openGraph: {
    title: "Life Insurance Guide — InsureQuote",
    description: "Compare term vs whole life insurance, calculate coverage needs, and get free quotes.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Life Insurance: The Complete Guide to Protecting Your Family",
  description: "Everything you need to know about life insurance in 2024.",
  publisher: { "@type": "Organization", name: "InsureQuote" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much life insurance do I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A common rule of thumb is 10–12x your annual income. If you earn $60,000/year, aim for $600,000–$720,000 in coverage. Factor in mortgage balance, children's education costs, and any outstanding debts.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between term and whole life insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Term life covers you for a fixed period (10–30 years) at lower premiums with no cash value. Whole life covers you permanently, builds cash value over time, but costs 5–15x more per month.",
      },
    },
    {
      "@type": "Question",
      name: "When should I buy life insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best time to buy is when you're young and healthy — premiums are lowest. Major life events like marriage, having children, or buying a home are also ideal trigger points.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get life insurance if I have a pre-existing condition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, though premiums may be higher. Many carriers offer guaranteed issue or simplified issue policies with no medical exam. Conditions like controlled diabetes or managed hypertension often qualify for standard rates.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to get life insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No-exam policies can be approved in minutes. Traditional underwritten policies typically take 2–6 weeks, including a medical exam, lab work, and review.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://insurequote.com" },
    { "@type": "ListItem", position: 2, name: "Insurance", item: "https://insurequote.com/insurance" },
    { "@type": "ListItem", position: 3, name: "Life Insurance" },
  ],
};

export default function LifeInsurancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Insurance", href: "/insurance/life-insurance" }, { label: "Life Insurance" }]} />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Life Insurance: The Complete Guide to Protecting Your Family
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Updated April 2024 · 12 min read · By InsureQuote Editorial Team
        </p>

        {/* Table of Contents */}
        <nav className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <ol className="space-y-2 text-brand-700 text-sm">
            <li><a href="#what-is-life-insurance" className="hover:underline">1. What Is Life Insurance?</a></li>
            <li><a href="#types" className="hover:underline">2. Types of Life Insurance</a></li>
            <li><a href="#how-much" className="hover:underline">3. How Much Coverage Do You Need?</a></li>
            <li><a href="#how-to-choose" className="hover:underline">4. How to Choose a Policy</a></li>
            <li><a href="#cost" className="hover:underline">5. How Much Does Life Insurance Cost?</a></li>
            <li><a href="#faq" className="hover:underline">6. Frequently Asked Questions</a></li>
          </ol>
        </nav>

        {/* Section 1 */}
        <section id="what-is-life-insurance" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is Life Insurance?</h2>
          <p className="text-gray-700 mb-4">
            Life insurance is a contract between you and an insurance company. You pay regular premiums, and in exchange, the insurer pays a tax-free lump sum — called a <strong>death benefit</strong> — to your beneficiaries when you pass away.
          </p>
          <p className="text-gray-700 mb-4">
            This payout can replace lost income, cover a mortgage, fund your children's education, or pay off debts. It's the financial safety net that lets your family maintain their standard of living even when you're no longer there to provide.
          </p>
          <p className="text-gray-700 mb-4">
            According to LIMRA's 2023 Insurance Barometer Study, 40% of Americans say they don't have enough life insurance. Yet nearly half say they wouldn't be able to cover living expenses beyond two months if the primary wage earner died. Life insurance bridges this gap.
          </p>
          <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 mt-6">
            <p className="text-brand-900 font-medium">Key Takeaway</p>
            <p className="text-brand-700 text-sm mt-1">Life insurance is not about you — it's about the people who depend on your income. If someone would suffer financially from your death, you likely need coverage.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="types" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Life Insurance</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <Link href="/insurance/life-insurance/term-life-insurance" className="text-brand-700 hover:underline">Term Life Insurance →</Link>
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Coverage for a fixed period: 10, 15, 20, or 30 years. The most affordable option — a healthy 35-year-old can get $500,000 in coverage for as little as $22/month.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Lowest premiums</li>
                <li>✓ Simple structure</li>
                <li>✗ No cash value</li>
                <li>✗ Coverage expires</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 font-medium">Best for: Young families, mortgage protection, income replacement</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <Link href="/insurance/life-insurance/whole-life-insurance" className="text-brand-700 hover:underline">Whole Life Insurance →</Link>
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Permanent coverage that never expires, plus a cash value component that grows tax-deferred. Premiums are 5–15x higher than term, but coverage is guaranteed for life.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Lifelong coverage</li>
                <li>✓ Builds cash value</li>
                <li>✗ High premiums</li>
                <li>✗ Lower investment returns vs. market</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 font-medium">Best for: Estate planning, final expenses, high-net-worth individuals</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Universal Life Insurance</h3>
              <p className="text-gray-700 text-sm mb-4">
                Flexible permanent coverage where you can adjust premium payments and death benefit amounts as your financial situation changes. Includes a cash value component tied to interest rates.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Premium flexibility</li>
                <li>✓ Adjustable death benefit</li>
                <li>✗ Complex structure</li>
                <li>✗ Interest rate risk</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 font-medium">Best for: Business owners, those needing coverage flexibility</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Variable Life Insurance</h3>
              <p className="text-gray-700 text-sm mb-4">
                Permanent coverage with cash value invested in sub-accounts similar to mutual funds. Higher growth potential but also higher risk — your cash value can decline.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Investment growth potential</li>
                <li>✓ Tax-deferred gains</li>
                <li>✗ Market risk</li>
                <li>✗ Requires investment knowledge</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 font-medium">Best for: Sophisticated investors with long time horizons</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="how-much" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Much Coverage Do You Need?</h2>
          <p className="text-gray-700 mb-4">
            There's no universal answer, but several methods help you get to a reasonable number:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">The DIME Method</h3>
          <p className="text-gray-700 mb-4">Add up four categories:</p>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong className="text-brand-700">D — Debt:</strong> All outstanding debts except your mortgage (credit cards, car loans, student loans)</li>
              <li><strong className="text-brand-700">I — Income:</strong> Your annual income × number of years your family needs support (typically 10–15 years)</li>
              <li><strong className="text-brand-700">M — Mortgage:</strong> Remaining balance on your home loan</li>
              <li><strong className="text-brand-700">E — Education:</strong> Estimated cost of college for each child ($100,000–$300,000 per child)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Quick Rule of Thumb</h3>
          <p className="text-gray-700 mb-4">
            Most financial advisors recommend <strong>10–12× your annual income</strong> as a starting point. If you earn $75,000/year, aim for $750,000–$900,000 in coverage. Add more if you have significant debts or young children.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Coverage by Life Stage</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-900 text-white">
                  <th className="text-left p-3 rounded-tl-lg">Life Stage</th>
                  <th className="text-left p-3">Recommended Coverage</th>
                  <th className="text-left p-3 rounded-tr-lg">Policy Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ["Single, no dependents", "$100K–$250K (debts + final expenses)", "20-year term"],
                  ["Married, no kids", "$250K–$500K (income + mortgage)", "20-year term"],
                  ["Young family (kids under 10)", "$500K–$1M+", "30-year term"],
                  ["Established family", "$500K–$750K", "20-year term"],
                  ["Pre-retirement", "$250K–$500K (final expenses, spouse income)", "Whole life or guaranteed issue"],
                ].map(([stage, coverage, type]) => (
                  <tr key={stage} className="hover:bg-gray-50">
                    <td className="p-3 text-gray-800 font-medium">{stage}</td>
                    <td className="p-3 text-gray-700">{coverage}</td>
                    <td className="p-3 text-gray-600">{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section id="how-to-choose" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Choose a Life Insurance Policy</h2>
          <p className="text-gray-700 mb-6">Follow these five steps to find the right policy:</p>
          <ol className="space-y-6">
            {[
              {
                step: "1. Determine your coverage need",
                desc: "Use the DIME method or 10–12× income rule. Err on the side of more coverage — it's cheaper to buy more now than to get a new policy later when you're older.",
              },
              {
                step: "2. Choose your policy type",
                desc: "For most people under 50 with families, term life is the right answer. It's dramatically cheaper and provides straightforward income replacement. Whole life makes sense for specific estate planning or permanent coverage needs.",
              },
              {
                step: "3. Select your term length",
                desc: "Match your term to your longest financial obligation. If you have a 30-year mortgage and young kids, a 30-year term makes sense. If your kids will be independent in 15 years, a 20-year term may suffice.",
              },
              {
                step: "4. Compare multiple carriers",
                desc: "Rates vary significantly between insurers. The same 35-year-old healthy male can see monthly premiums ranging from $22 to $38 for identical $500K, 20-year term coverage. Always compare at least 3–5 quotes.",
              },
              {
                step: "5. Check the insurer's financial strength",
                desc: "Your insurer must be around to pay claims 20–30 years from now. Look for AM Best ratings of A or higher. Major carriers like Protective, Banner, Pacific Life, and Nationwide consistently earn A+ ratings.",
              },
            ].map(({ step, desc }) => (
              <li key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step}</h3>
                  <p className="text-gray-700 text-sm">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Section 5 */}
        <section id="cost" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Much Does Life Insurance Cost?</h2>
          <p className="text-gray-700 mb-6">
            Life insurance premiums depend on your age, health, coverage amount, term length, gender, and smoking status. Here are sample monthly rates for a $500,000 20-year term policy for a healthy non-smoker:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="text-left p-3 border border-gray-200">Age</th>
                  <th className="text-left p-3 border border-gray-200">Male</th>
                  <th className="text-left p-3 border border-gray-200">Female</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ["25", "$21/mo", "$18/mo"],
                  ["30", "$23/mo", "$20/mo"],
                  ["35", "$27/mo", "$23/mo"],
                  ["40", "$38/mo", "$33/mo"],
                  ["45", "$60/mo", "$51/mo"],
                  ["50", "$95/mo", "$79/mo"],
                  ["55", "$155/mo", "$124/mo"],
                ].map(([age, male, female]) => (
                  <tr key={age} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-medium">{age}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{male}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{female}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">*Sample rates for illustrative purposes. Actual rates vary by carrier and individual underwriting.</p>
        </section>

        <QuoteCTA />

        {/* FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Explore by State or Age</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {["Florida", "California", "Texas", "New York"].map((state) => (
              <Link key={state} href={`/insurance/${state.toLowerCase().replace(" ", "-")}`} className="text-brand-700 hover:underline">
                Life insurance in {state}
              </Link>
            ))}
            {[30, 35, 40, 45].map((age) => (
              <Link key={age} href={`/insurance/life-insurance/${age}-year-old`} className="text-brand-700 hover:underline">
                Life insurance at {age}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
