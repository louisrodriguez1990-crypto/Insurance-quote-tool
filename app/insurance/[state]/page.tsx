import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import statesData from "@/data/states.json";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

interface StateData {
  name: string;
  slug: string;
  abbr: string;
  capital: string;
  population: number;
  medianHouseholdIncome: number;
  avgTermLifePremium: number;
  insuranceDeptUrl: string;
  regulatoryNotes: string;
  costOfLivingIndex: number;
  majorCities: string[];
}

export async function generateStaticParams() {
  return statesData.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}): Promise<Metadata> {
  const state = statesData.find((s) => s.slug === params.state) as StateData | undefined;
  if (!state) return {};
  return {
    title: `Life Insurance in ${state.name} — Compare Rates & Regulations`,
    description: `Find the best life insurance rates in ${state.name}. Average term life premium: $${state.avgTermLifePremium}/month. Compare quotes from top-rated carriers licensed in ${state.abbr}.`,
    alternates: { canonical: `/insurance/${state.slug}` },
    openGraph: {
      title: `Life Insurance in ${state.name} — InsureQuote`,
      description: `Average term life premium in ${state.name}: $${state.avgTermLifePremium}/month. Get your free quote.`,
    },
  };
}

function getFaqSchema(state: StateData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does life insurance cost in ${state.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The average term life insurance premium in ${state.name} is approximately $${state.avgTermLifePremium}/month for a healthy 35-year-old with $500,000 in coverage. Actual rates vary based on age, health status, coverage amount, and the insurer you choose.`,
        },
      },
      {
        "@type": "Question",
        name: `Is life insurance regulated in ${state.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Life insurance in ${state.name} is regulated by the ${state.name} Department of Insurance. ${state.regulatoryNotes}`,
        },
      },
      {
        "@type": "Question",
        name: `What is the best life insurance company in ${state.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The best life insurance company depends on your individual needs. Top-rated carriers licensed in ${state.name} include Protective Life, Banner Life, Pacific Life, Nationwide, and Northwestern Mutual. Compare quotes from multiple carriers to find your best rate.`,
        },
      },
      {
        "@type": "Question",
        name: `Do I need a ${state.name} life insurance license to sell policies?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Any agent selling life insurance in ${state.name} must hold a valid ${state.name} life insurance producer license, issued by the ${state.name} Department of Insurance. You can verify an agent's license through the department's online lookup tool at ${state.insuranceDeptUrl}.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the average household income in ${state.name} and how much life insurance do I need?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The median household income in ${state.name} is $${state.medianHouseholdIncome.toLocaleString()}/year. Financial advisors recommend carrying 10–12× your annual income in life insurance. For the average ${state.name} household, that's $${(state.medianHouseholdIncome * 10).toLocaleString()}–$${(state.medianHouseholdIncome * 12).toLocaleString()} in coverage.`,
        },
      },
    ],
  };
}

function getBreadcrumbSchema(state: StateData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://insurequote.com" },
      { "@type": "ListItem", position: 2, name: "Life Insurance", item: "https://insurequote.com/insurance/life-insurance" },
      { "@type": "ListItem", position: 3, name: `Life Insurance in ${state.name}` },
    ],
  };
}

export default function StatePage({ params }: { params: { state: string } }) {
  const state = statesData.find((s) => s.slug === params.state) as StateData | undefined;
  if (!state) notFound();

  const faqSchema = getFaqSchema(state);
  const breadcrumbSchema = getBreadcrumbSchema(state);

  const recommendedCoverageMin = (state.medianHouseholdIncome * 10).toLocaleString();
  const recommendedCoverageMax = (state.medianHouseholdIncome * 12).toLocaleString();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Life Insurance", href: "/insurance/life-insurance" },
            { label: `Life Insurance in ${state.name}` },
          ]}
        />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Life Insurance in {state.name}: Rates, Regulations & Quotes
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Compare life insurance quotes from top-rated carriers licensed in {state.name}. Average rate: <strong>${state.avgTermLifePremium}/month</strong> for a healthy 35-year-old.
        </p>

        {/* State Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Population", value: (state.population / 1_000_000).toFixed(1) + "M" },
            { label: "Median Income", value: "$" + (state.medianHouseholdIncome / 1000).toFixed(0) + "K/yr" },
            { label: "Avg. Life Premium", value: "$" + state.avgTermLifePremium + "/mo" },
            { label: "Cost of Living", value: state.costOfLivingIndex + " / 100" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-extrabold text-brand-700">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Life Insurance in {state.name}: What You Need to Know
          </h2>
          <p className="text-gray-700 mb-4">
            With a population of {(state.population / 1_000_000).toFixed(1)} million and a median household income of ${state.medianHouseholdIncome.toLocaleString()}/year, {state.name} residents have unique financial protection needs. The cost of living index of {state.costOfLivingIndex} (national average: 100) means that coverage needs and affordability differ from the national average.
          </p>
          <p className="text-gray-700 mb-4">
            For a typical {state.name} household, financial advisors recommend between <strong>${recommendedCoverageMin}</strong> and <strong>${recommendedCoverageMax}</strong> in life insurance coverage — enough to replace 10–12 years of income for dependents.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {state.name} Life Insurance Regulations
          </h2>
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-5 mb-4">
            <p className="text-brand-900 font-semibold mb-2">Regulated by the {state.name} Department of Insurance</p>
            <p className="text-brand-700 text-sm mb-3">{state.regulatoryNotes}</p>
            <a
              href={state.insuranceDeptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 text-sm font-medium hover:underline"
            >
              Visit {state.name} Department of Insurance →
            </a>
          </div>
          <p className="text-gray-700 text-sm">
            All life insurance carriers operating in {state.name} must be licensed with the {state.name} Department of Insurance. You can verify any insurer or agent license through the department's online portal.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sample Life Insurance Rates in {state.name}
          </h2>
          <p className="text-gray-700 mb-4">
            Estimated monthly premiums for a $500,000, 20-year term policy for healthy {state.name} residents:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-700 text-white">
                  <th className="text-left p-3">Age</th>
                  <th className="text-left p-3">Male (Non-smoker)</th>
                  <th className="text-left p-3">Female (Non-smoker)</th>
                  <th className="text-left p-3">Male (Smoker)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[25, 30, 35, 40, 45, 50].map((age) => {
                  const base = state.avgTermLifePremium;
                  const ageFactor = age < 30 ? 0.8 : age < 40 ? 1.0 : age < 50 ? 1.5 : 2.4;
                  const male = Math.round(base * ageFactor);
                  const female = Math.round(base * ageFactor * 0.87);
                  const smoker = Math.round(base * ageFactor * 2.5);
                  return (
                    <tr key={age} className="hover:bg-gray-50">
                      <td className="p-3 font-medium">{age}</td>
                      <td className="p-3 text-gray-700">${male}/mo</td>
                      <td className="p-3 text-gray-700">${female}/mo</td>
                      <td className="p-3 text-gray-700">${smoker}/mo</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">*Sample rates for illustration. Get a personalized quote for exact pricing.</p>
        </section>

        <QuoteCTA state={state.slug} />

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions: Life Insurance in {state.name}
          </h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cities + Related */}
        <section className="grid md:grid-cols-2 gap-6">
          {state.majorCities.length > 0 && (
            <div className="bg-neutral-50 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Life Insurance by City in {state.name}
              </h2>
              <ul className="space-y-2 text-sm">
                {state.majorCities.slice(0, 4).map((city) => (
                  <li key={city}>
                    <span className="text-gray-600">Life insurance in {city}, {state.abbr}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="bg-neutral-50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Explore by Age</h2>
            <ul className="space-y-2 text-sm">
              {[30, 35, 40, 45, 50].map((age) => (
                <li key={age}>
                  <Link
                    href={`/insurance/life-insurance/${age}-year-old`}
                    className="text-brand-700 hover:underline"
                  >
                    Life insurance for a {age}-year-old
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
