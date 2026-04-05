import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

export const metadata: Metadata = {
  title: "Term Life Insurance: Rates, Pros & Cons, and How to Buy",
  description:
    "Term life insurance explained: how it works, average costs by age, pros and cons vs whole life, and how to get the best rates. Free quote comparison.",
  alternates: { canonical: "/insurance/life-insurance/term-life-insurance" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What happens when term life insurance expires?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When your term ends, coverage simply stops. Most carriers offer a renewal option (at much higher rates) or conversion to permanent coverage. If you're still healthy, it's usually cheaper to apply for a new term policy.",
      },
    },
    {
      "@type": "Question",
      name: "Is term life insurance worth it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most families, yes. Term life provides substantial coverage at the lowest possible cost during your peak earning and family-raising years. If you invest the premium savings vs. whole life, you'll likely come out ahead financially.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best term length for life insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Match the term to your longest financial obligation. If you have a new 30-year mortgage and young children, choose 30 years. If your goal is income replacement until retirement, subtract your current age from 65 to find the right term.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get term life insurance without a medical exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many carriers offer simplified issue or no-exam term policies up to $2 million. These are approved based on a health questionnaire and database checks (prescription history, MVR, MIB). Premiums are typically 10–20% higher than fully underwritten policies.",
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
    { "@type": "ListItem", position: 3, name: "Term Life Insurance" },
  ],
};

export default function TermLifePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Life Insurance", href: "/insurance/life-insurance" },
            { label: "Term Life Insurance" },
          ]}
        />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Term Life Insurance</h1>
        <p className="text-lg text-gray-600 mb-8">
          The most affordable way to protect your family. Rates from $15/month.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Term Life Insurance Works</h2>
          <p className="text-gray-700 mb-4">
            Term life insurance provides a death benefit for a specific period — typically 10, 15, 20, 25, or 30 years. You pay a fixed premium each month. If you die during the term, your beneficiaries receive the full death benefit tax-free. If you outlive the term, coverage ends.
          </p>
          <p className="text-gray-700 mb-4">
            It's the simplest, purest form of life insurance: you're buying protection, not an investment product. This is why term premiums are dramatically lower than whole or universal life.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Average Term Life Insurance Rates</h2>
          <p className="text-gray-700 mb-4">
            Monthly rates for a <strong>$500,000, 20-year term policy</strong> for healthy non-smokers:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-900 text-white">
                  <th className="text-left p-3">Age</th>
                  <th className="text-left p-3">Male</th>
                  <th className="text-left p-3">Female</th>
                  <th className="text-left p-3">Male (Smoker)</th>
                  <th className="text-left p-3">Female (Smoker)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ["25", "$21", "$18", "$61", "$51"],
                  ["30", "$23", "$20", "$72", "$60"],
                  ["35", "$27", "$23", "$88", "$71"],
                  ["40", "$38", "$33", "$130", "$102"],
                  ["45", "$60", "$51", "$205", "$158"],
                  ["50", "$95", "$79", "$338", "$255"],
                ].map(([age, ...rates]) => (
                  <tr key={age} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{age}</td>
                    {rates.map((r, i) => <td key={i} className="p-3 text-gray-700">{r}/mo</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Sample rates for illustration. Actual rates vary by carrier and health classification.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Term vs. Whole Life Insurance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="text-left p-3 border border-gray-200">Feature</th>
                  <th className="text-left p-3 border border-gray-200">Term Life</th>
                  <th className="text-left p-3 border border-gray-200">Whole Life</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ["Coverage period", "10–30 years", "Lifetime"],
                  ["Monthly cost ($500K)", "$22–$95", "$300–$500+"],
                  ["Cash value", "None", "Yes, grows tax-deferred"],
                  ["Premium flexibility", "Fixed", "Fixed"],
                  ["Best for", "Income replacement, mortgage protection", "Estate planning, final expenses"],
                ].map(([feature, term, whole]) => (
                  <tr key={feature} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-medium">{feature}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{term}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{whole}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pros and Cons of Term Life Insurance</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-3">Pros</h3>
              <ul className="space-y-2 text-green-700 text-sm">
                <li>✓ Lowest monthly premiums of any life insurance type</li>
                <li>✓ Simple, easy to understand</li>
                <li>✓ Flexible coverage amounts and term lengths</li>
                <li>✓ Can be converted to permanent coverage at most carriers</li>
                <li>✓ Level premiums — rate never changes during the term</li>
                <li>✓ Death benefit is tax-free to beneficiaries</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-red-800 mb-3">Cons</h3>
              <ul className="space-y-2 text-red-700 text-sm">
                <li>✗ No cash value accumulation</li>
                <li>✗ Coverage expires at end of term</li>
                <li>✗ Renewal premiums are much higher (based on new age)</li>
                <li>✗ Can be difficult to qualify if health declines</li>
                <li>✗ No living benefits (unless riders are added)</li>
              </ul>
            </div>
          </div>
        </section>

        <QuoteCTA />

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

        <section className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <Link href="/insurance/life-insurance" className="text-brand-700 hover:underline">Life Insurance Guide</Link>
            <Link href="/insurance/life-insurance/whole-life-insurance" className="text-brand-700 hover:underline">Whole Life Insurance</Link>
            <Link href="/learn/term-vs-whole-life-insurance" className="text-brand-700 hover:underline">Term vs Whole Life: Full Comparison</Link>
            <Link href="/learn/how-much-life-insurance-do-i-need" className="text-brand-700 hover:underline">How Much Life Insurance Do I Need?</Link>
          </div>
        </section>
      </div>
    </>
  );
}
