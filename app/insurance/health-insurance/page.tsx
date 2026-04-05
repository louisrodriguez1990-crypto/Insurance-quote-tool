import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

export const metadata: Metadata = {
  title: "Health Insurance: Plans, Costs & How to Get Covered",
  description:
    "Compare health insurance plans, understand deductibles and premiums, and find coverage that fits your budget. Free quote comparison from top carriers.",
  alternates: { canonical: "/insurance/health-insurance" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between HMO and PPO health insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An HMO (Health Maintenance Organization) requires you to choose a primary care physician and get referrals to see specialists. It has lower premiums but less flexibility. A PPO (Preferred Provider Organization) lets you see any doctor without a referral, with higher premiums but more flexibility.",
      },
    },
    {
      "@type": "Question",
      name: "What is a deductible in health insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A deductible is the amount you pay out-of-pocket before your insurance starts covering costs. For example, with a $2,000 deductible, you pay the first $2,000 of covered medical expenses each year. After meeting your deductible, you typically pay a coinsurance percentage until reaching your out-of-pocket maximum.",
      },
    },
    {
      "@type": "Question",
      name: "How much does health insurance cost per month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Average individual health insurance premiums in 2024 are around $456/month. For family coverage, the average is $1,152/month. Costs vary significantly by state, age, plan type, and whether you qualify for ACA subsidies, which can reduce premiums by $500+ per month.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get health insurance outside of open enrollment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if you experience a qualifying life event such as losing employer coverage, getting married, having a baby, or moving to a new state. This triggers a Special Enrollment Period (SEP) lasting 60 days. Medicaid and CHIP enrollment is available year-round.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://bestquote.io" },
    { "@type": "ListItem", position: 2, name: "Insurance", item: "https://bestquote.io/insurance" },
    { "@type": "ListItem", position: 3, name: "Health Insurance" },
  ],
};

export default function HealthInsurancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Health Insurance" },
          ]}
        />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Health Insurance: Plans, Costs & How to Get Covered</h1>
        <p className="text-lg text-gray-600 mb-8">
          Updated April 2024 · BestQuote Editorial Team
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Health Insurance</h2>
          <p className="text-gray-700 mb-4">
            Health insurance helps cover the cost of medical care — from routine checkups and prescriptions to emergency surgery and hospital stays. Without it, a single hospitalization can cost $30,000–$100,000+.
          </p>
          <p className="text-gray-700 mb-4">
            In the U.S., you can get health insurance through your employer, the ACA Marketplace (Healthcare.gov), Medicaid, Medicare, or directly from private insurers. The right option depends on your income, age, employment status, and health needs.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Health Insurance Plans</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                type: "HMO",
                full: "Health Maintenance Organization",
                desc: "Lower premiums, requires primary care physician and referrals for specialists. Best for those who want lower costs and don't mind a more managed approach.",
                cost: "Lowest premiums",
              },
              {
                type: "PPO",
                full: "Preferred Provider Organization",
                desc: "Higher premiums, no referrals needed. See any in-network or out-of-network doctor. Best for those who prioritize flexibility and access.",
                cost: "Moderate-high premiums",
              },
              {
                type: "EPO",
                full: "Exclusive Provider Organization",
                desc: "Middle ground — no referrals needed but must stay in-network except for emergencies. Often cheaper than PPO with more flexibility than HMO.",
                cost: "Moderate premiums",
              },
              {
                type: "HDHP",
                full: "High Deductible Health Plan",
                desc: "Very low premiums but high deductibles ($1,600+ individual). Pairs with a Health Savings Account (HSA) for tax-free medical savings.",
                cost: "Lowest premiums, high deductible",
              },
            ].map(({ type, full, desc, cost }) => (
              <div key={type} className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-brand-100 text-brand-700 font-bold px-3 py-1 rounded-full text-sm">{type}</span>
                  <span className="text-gray-600 text-sm">{full}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3">{desc}</p>
                <p className="text-xs text-gray-500 font-medium">{cost}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Health Insurance Terms</h2>
          <div className="space-y-4">
            {[
              { term: "Premium", def: "The monthly amount you pay for insurance, regardless of whether you use medical services." },
              { term: "Deductible", def: "The amount you pay out-of-pocket before insurance kicks in. Higher deductible = lower premium." },
              { term: "Copay", def: "A fixed amount you pay for a covered service (e.g., $30 for a doctor visit) after the deductible is met." },
              { term: "Coinsurance", def: "Your share of costs after the deductible. With 20% coinsurance, you pay 20% of covered services; insurance pays 80%." },
              { term: "Out-of-Pocket Maximum", def: "The most you'll pay in a year. After reaching this limit, insurance covers 100% of covered services." },
              { term: "Network", def: "The group of doctors, hospitals, and facilities that have agreements with your insurer for discounted rates." },
            ].map(({ term, def }) => (
              <div key={term} className="flex gap-4 border-b border-gray-100 pb-4">
                <span className="font-bold text-brand-700 min-w-[140px]">{term}</span>
                <p className="text-gray-700 text-sm">{def}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Average Health Insurance Costs in 2024</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Individual Coverage", monthly: "$456", annual: "$5,472", note: "Average marketplace plan" },
              { label: "Family Coverage", monthly: "$1,152", annual: "$13,824", note: "2 adults + 2 children" },
              { label: "With ACA Subsidy", monthly: "$179", annual: "$2,148", note: "Average subsidized amount" },
            ].map(({ label, monthly, annual, note }) => (
              <div key={label} className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                <h3 className="font-semibold text-gray-700 text-sm mb-2">{label}</h3>
                <div className="text-3xl font-extrabold text-brand-700">{monthly}</div>
                <div className="text-sm text-gray-500">per month</div>
                <div className="text-xs text-gray-400 mt-1">{annual}/year · {note}</div>
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
            <Link href="/insurance/life-insurance" className="text-brand-700 hover:underline">Life Insurance Guide</Link>
            <Link href="/quote" className="text-brand-700 hover:underline">Get a Free Health Insurance Quote</Link>
            <Link href="/learn" className="text-brand-700 hover:underline">Insurance Learning Center</Link>
          </div>
        </section>
      </div>
    </>
  );
}
