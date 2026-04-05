import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

export const metadata: Metadata = {
  title: "Whole Life Insurance: Is It Worth It? Costs, Pros & Cons",
  description:
    "Whole life insurance explained: how cash value works, average costs, pros and cons, and who should buy it. Compare quotes from top-rated carriers.",
  alternates: { canonical: "/insurance/life-insurance/whole-life-insurance" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is whole life insurance worth it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Whole life makes sense for specific situations: high-net-worth estate planning, business succession, or permanent final expense coverage. For most families seeking income replacement, term life provides better value at a fraction of the cost.",
      },
    },
    {
      "@type": "Question",
      name: "How does the cash value in whole life insurance work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A portion of each premium goes into a cash value account that grows tax-deferred at a guaranteed interest rate (typically 2–4%). You can borrow against it, withdraw from it, or surrender the policy for the cash value. However, loans reduce your death benefit if not repaid.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to the cash value when you die?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In a standard whole life policy, the insurer keeps the cash value and pays only the death benefit to your beneficiaries. Some policies offer a 'return of cash value' rider that pays both, but at significantly higher premiums.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel whole life insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can surrender the policy at any time and receive the accumulated cash value minus surrender charges. In the early years, surrender values are minimal because most premiums go toward agent commissions and insurance costs.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://bestquote.io" },
    { "@type": "ListItem", position: 2, name: "Life Insurance", item: "https://bestquote.io/insurance/life-insurance" },
    { "@type": "ListItem", position: 3, name: "Whole Life Insurance" },
  ],
};

export default function WholeLifePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Life Insurance", href: "/insurance/life-insurance" },
            { label: "Whole Life Insurance" },
          ]}
        />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Whole Life Insurance</h1>
        <p className="text-lg text-gray-600 mb-8">
          Permanent coverage that builds cash value — but is it right for you?
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is Whole Life Insurance?</h2>
          <p className="text-gray-700 mb-4">
            Whole life insurance provides permanent coverage that never expires, as long as you keep paying premiums. Unlike term life, it includes a <strong>cash value component</strong> — a savings element that grows tax-deferred over time.
          </p>
          <p className="text-gray-700 mb-4">
            The trade-off: whole life premiums are <strong>5–15× more expensive</strong> than an equivalent term policy. A $500,000 whole life policy for a healthy 35-year-old might cost $350–$500/month versus $22–$27/month for a 20-year term.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Cash Value Works</h2>
          <p className="text-gray-700 mb-4">Each month, your premium is split three ways:</p>
          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <ol className="space-y-3 text-gray-700">
              <li><strong>1. Cost of insurance</strong> — pays for the actual death benefit</li>
              <li><strong>2. Administrative expenses</strong> — insurer overhead and agent commissions</li>
              <li><strong>3. Cash value contribution</strong> — grows at a guaranteed rate (2–4%) plus potential dividends from mutual companies</li>
            </ol>
          </div>
          <p className="text-gray-700 mb-4">
            Cash value grows slowly in early years (most premiums cover insurance costs and commissions). By year 20–30, the cash value can be substantial. You can access it via:
          </p>
          <ul className="space-y-2 text-gray-700 ml-4 mb-4">
            <li>• <strong>Policy loans</strong> — borrow at low interest; no repayment required, but unpaid loans reduce the death benefit</li>
            <li>• <strong>Partial withdrawals</strong> — take out cash directly, reducing death benefit</li>
            <li>• <strong>Policy surrender</strong> — cancel the policy and receive net cash value minus surrender charges</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Average Whole Life Insurance Rates</h2>
          <p className="text-gray-700 mb-4">Monthly rates for a <strong>$500,000 whole life policy</strong> for healthy non-smokers:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-900 text-white">
                  <th className="text-left p-3">Age</th>
                  <th className="text-left p-3">Male</th>
                  <th className="text-left p-3">Female</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ["25", "$270–$310/mo", "$235–$275/mo"],
                  ["30", "$320–$370/mo", "$280–$325/mo"],
                  ["35", "$390–$450/mo", "$340–$395/mo"],
                  ["40", "$490–$560/mo", "$425–$490/mo"],
                  ["45", "$620–$710/mo", "$535–$615/mo"],
                  ["50", "$790–$905/mo", "$680–$780/mo"],
                ].map(([age, male, female]) => (
                  <tr key={age} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{age}</td>
                    <td className="p-3 text-gray-700">{male}</td>
                    <td className="p-3 text-gray-700">{female}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Should Consider Whole Life Insurance?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "High-net-worth estate planning", desc: "Whole life can fund estate taxes, ensuring heirs receive the full estate value without liquidating assets." },
              { title: "Business succession", desc: "Business partners use whole life in buy-sell agreements to fund the purchase of a partner's share upon death." },
              { title: "Final expense coverage", desc: "Smaller whole life policies ($10K–$25K) cover funeral costs and final expenses for seniors who don't want to burden family." },
              { title: "Permanent dependent support", desc: "If you have a dependent with special needs who will need support indefinitely, permanent coverage ensures they're always protected." },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <QuoteCTA />

        <section className="mb-12">
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

        <section className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <Link href="/insurance/life-insurance" className="text-brand-700 hover:underline">Life Insurance Overview</Link>
            <Link href="/insurance/life-insurance/term-life-insurance" className="text-brand-700 hover:underline">Term Life Insurance</Link>
            <Link href="/learn/term-vs-whole-life-insurance" className="text-brand-700 hover:underline">Term vs Whole Life: Full Comparison</Link>
            <Link href="/quote" className="text-brand-700 hover:underline">Get a Free Whole Life Quote</Link>
          </div>
        </section>
      </div>
    </>
  );
}
