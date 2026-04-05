import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import agesData from "@/data/ages.json";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuoteCTA } from "@/components/QuoteCTA";

interface AgeData {
  age: number;
  avgMonthlyPremium: number;
  lifeEvents: string[];
  coverageRecommendation: string;
  topConcerns: string[];
}

export async function generateStaticParams() {
  return Array.from({ length: 51 }, (_, i) => ({ age: String(i + 20) }));
}

export async function generateMetadata({
  params,
}: {
  params: { age: string };
}): Promise<Metadata> {
  const ageNum = parseInt(params.age, 10);
  if (isNaN(ageNum) || ageNum < 20 || ageNum > 70) return {};
  const ageEntry = agesData.find((a) => a.age === ageNum) as AgeData | undefined;
  const premium = ageEntry?.avgMonthlyPremium ?? 0;
  return {
    title: `Life Insurance for a ${ageNum}-Year-Old: Rates & Best Options`,
    description: `Average life insurance rate for a ${ageNum}-year-old: $${premium}/month. Compare term and whole life quotes, coverage recommendations, and tips for getting the best rate at ${ageNum}.`,
    alternates: { canonical: `/insurance/life-insurance/${ageNum}-year-old` },
    openGraph: {
      title: `Life Insurance at ${ageNum} — BestQuote`,
      description: `Average rate: $${premium}/month. Get a free personalized quote for a ${ageNum}-year-old.`,
    },
  };
}

function getFaqSchema(age: number, ageData: AgeData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does life insurance cost at ${age}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A healthy ${age}-year-old non-smoker can expect to pay around $${ageData.avgMonthlyPremium}/month for a $500,000, 20-year term life policy. Rates vary based on gender, health status, coverage amount, and the insurer. Women typically pay 10–15% less than men.`,
        },
      },
      {
        "@type": "Question",
        name: `How much life insurance does a ${age}-year-old need?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `At ${age}, most financial advisors recommend ${ageData.coverageRecommendation}. Consider your outstanding debts, dependents, mortgage balance, and income replacement needs when determining your coverage amount.`,
        },
      },
      {
        "@type": "Question",
        name: `Is it too late to get life insurance at ${age}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `No — you can get life insurance at ${age}. While premiums are higher than they would have been at a younger age, ${age}-year-olds with good health can still qualify for excellent rates. Many carriers offer policies up to age 80 or 85.`,
        },
      },
      {
        "@type": "Question",
        name: `What type of life insurance is best for a ${age}-year-old?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `For most ${age}-year-olds, term life insurance offers the best value — the lowest premiums for substantial coverage. If you need permanent coverage or have estate planning goals, whole life or universal life may be worth considering. Compare quotes for both to make an informed decision.`,
        },
      },
      {
        "@type": "Question",
        name: `Can a ${age}-year-old get life insurance without a medical exam?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Many carriers offer no-exam life insurance up to $2 million for applicants ${age} and under. Approval is based on a health questionnaire and data checks. Premiums are typically 10–20% higher than fully underwritten policies, but the convenience is often worth it.`,
        },
      },
    ],
  };
}

export default function AgeYearOldPage({ params }: { params: { age: string } }) {
  const ageNum = parseInt(params.age, 10);
  if (isNaN(ageNum) || ageNum < 20 || ageNum > 70) notFound();

  const ageData = agesData.find((a) => a.age === ageNum) as AgeData | undefined;
  if (!ageData) notFound();

  const faqSchema = getFaqSchema(ageNum, ageData);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bestquote.io" },
      { "@type": "ListItem", position: 2, name: "Life Insurance", item: "https://bestquote.io/insurance/life-insurance" },
      { "@type": "ListItem", position: 3, name: `Life Insurance for ${ageNum}-Year-Olds` },
    ],
  };

  // Rate table: 10yr, 20yr, 30yr term for $250K and $500K
  const rateTable = [
    { coverage: "$250,000", term: "10 years", male: Math.round(ageData.avgMonthlyPremium * 0.45), female: Math.round(ageData.avgMonthlyPremium * 0.39) },
    { coverage: "$250,000", term: "20 years", male: Math.round(ageData.avgMonthlyPremium * 0.55), female: Math.round(ageData.avgMonthlyPremium * 0.48) },
    { coverage: "$500,000", term: "10 years", male: Math.round(ageData.avgMonthlyPremium * 0.85), female: Math.round(ageData.avgMonthlyPremium * 0.74) },
    { coverage: "$500,000", term: "20 years", male: ageData.avgMonthlyPremium, female: Math.round(ageData.avgMonthlyPremium * 0.87) },
    { coverage: "$1,000,000", term: "20 years", male: Math.round(ageData.avgMonthlyPremium * 1.85), female: Math.round(ageData.avgMonthlyPremium * 1.6) },
    { coverage: "$1,000,000", term: "30 years", male: Math.round(ageData.avgMonthlyPremium * 2.4), female: Math.round(ageData.avgMonthlyPremium * 2.1) },
  ];

  const prevAge = ageNum > 20 ? ageNum - 1 : null;
  const nextAge = ageNum < 70 ? ageNum + 1 : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Life Insurance", href: "/insurance/life-insurance" },
            { label: `${ageNum}-Year-Old` },
          ]}
        />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Life Insurance for a {ageNum}-Year-Old: Rates & Best Options
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Average rate: <strong>${ageData.avgMonthlyPremium}/month</strong> for a healthy non-smoker. Get a personalized quote below.
        </p>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-extrabold text-brand-700">${ageData.avgMonthlyPremium}</div>
            <div className="text-xs text-gray-500 mt-1">Avg. monthly premium</div>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
            <div className="text-xl font-extrabold text-brand-700">$500K</div>
            <div className="text-xs text-gray-500 mt-1">Common coverage at {ageNum}</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center col-span-2 md:col-span-1">
            <div className="text-xl font-extrabold text-brand-700">20-year term</div>
            <div className="text-xs text-gray-500 mt-1">Most popular at {ageNum}</div>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Life at {ageNum}: Coverage Context</h2>
          <p className="text-gray-700 mb-4">
            At {ageNum}, many people are navigating significant financial milestones. Common life events at this stage include:
          </p>
          <ul className="space-y-2 mb-4">
            {ageData.lifeEvents.map((event) => (
              <li key={event} className="flex items-center gap-2 text-gray-700">
                <span className="text-brand-500">•</span> {event}
              </li>
            ))}
          </ul>
          <p className="text-gray-700">
            <strong>Recommended coverage:</strong> {ageData.coverageRecommendation}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Life Insurance Rates for {ageNum}-Year-Olds
          </h2>
          <p className="text-gray-700 mb-4">
            Estimated monthly premiums for healthy non-smokers:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-700 text-white">
                  <th className="text-left p-3">Coverage Amount</th>
                  <th className="text-left p-3">Term</th>
                  <th className="text-left p-3">Male</th>
                  <th className="text-left p-3">Female</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rateTable.map(({ coverage, term, male, female }) => (
                  <tr key={`${coverage}-${term}`} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{coverage}</td>
                    <td className="p-3 text-gray-700">{term}</td>
                    <td className="p-3 text-gray-700">${male}/mo</td>
                    <td className="p-3 text-gray-700">${female}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">*Sample rates for illustration. Get a free quote for your exact rate.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Top Concerns for {ageNum}-Year-Olds Shopping for Life Insurance
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {ageData.topConcerns.map((concern) => (
              <div key={concern} className="bg-brand-50 border border-brand-100 rounded-xl p-4 text-center">
                <p className="text-brand-800 font-medium text-sm">{concern}</p>
              </div>
            ))}
          </div>
        </section>

        <QuoteCTA />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions: Life Insurance at {ageNum}
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

        {/* Age navigation */}
        <div className="flex items-center justify-between bg-neutral-50 rounded-xl p-6">
          <div>
            {prevAge && (
              <Link href={`/insurance/life-insurance/${prevAge}-year-old`} className="text-brand-700 hover:underline text-sm">
                ← Life insurance at {prevAge}
              </Link>
            )}
          </div>
          <Link href="/insurance/life-insurance" className="text-gray-500 hover:text-brand-700 text-sm">
            Life Insurance Guide
          </Link>
          <div>
            {nextAge && (
              <Link href={`/insurance/life-insurance/${nextAge}-year-old`} className="text-brand-700 hover:underline text-sm">
                Life insurance at {nextAge} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
