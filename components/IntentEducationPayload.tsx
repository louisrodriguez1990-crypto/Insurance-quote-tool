import Link from "next/link";
import { formatMoney, getFaqItems, getIntent, type IntentKey, type MatrixState } from "@/lib/lifeInsurance";

export function IntentEducationPayload({
  state,
  intent,
  loanAmount,
}: {
  state: MatrixState;
  intent: IntentKey;
  loanAmount?: number;
}) {
  const model = getIntent(intent);
  const faqItems = getFaqItems(state, intent);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          Why {model.productType} fits this {model.label.toLowerCase()} math
        </h2>
        {intent === "sba-loan" && (
          <div className="space-y-4 text-neutral-700">
            <p>
              SBA coverage is not about buying the biggest policy possible. It is about matching the lender's temporary exposure.
              In {state.name}, the calculator starts at {formatMoney(model.defaultCoverage)} because that is a practical planning floor for many business loans.
            </p>
            <p>
              Term life is usually the cleanest structure because the need declines as the loan is repaid. A licensed agent verifies the lender's assignment language before a formal application is submitted.
            </p>
          </div>
        )}
        {intent === "mortgage" && (
          <div className="space-y-4 text-neutral-700">
            <p>
              Mortgage protection should preserve housing choices, not trap the family in a narrow lender-paid product.
              This page uses {formatMoney(loanAmount || state.avgMortgageBalance)} as the payoff anchor and adds a state-specific buffer.
            </p>
            <p>{state.localFriction}</p>
          </div>
        )}
        {intent === "final-expense" && (
          <div className="space-y-4 text-neutral-700">
            <p>
              Final expense insurance is built for smaller, fast-access coverage when health history makes traditional underwriting difficult.
              In {state.name}, the model starts with {formatMoney(state.funeralCostAvg)} funeral costs and a cash buffer for immediate family needs.
            </p>
            <p>{state.localFriction}</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Local underwriting objections</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {faqItems.map((item) => (
            <div key={item.question} className="border border-neutral-200 rounded-xl p-5">
              <h3 className="font-bold text-neutral-900">{item.question}</h3>
              <p className="text-sm text-neutral-700 mt-2">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-neutral-200 rounded-xl p-6 md:p-8 bg-neutral-50">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">How the coverage assignment works</h2>
        {intent === "sba-loan" && (
          <div className="space-y-4 text-neutral-700">
            <p>
              SBA lenders require a <strong>collateral assignment</strong> — not a beneficiary designation. This is an important distinction: the lender is named as assignee up to the outstanding loan balance, and your estate or family receives any remaining death benefit above that amount.
            </p>
            <p>
              The assignment form (typically an ABA or carrier-specific form) is filed directly with the carrier after the policy is issued. The SBA requires the policy to be in force and the assignment confirmed <em>before</em> the loan closes, so timing matters. Most carriers can issue a term policy within 24–72 hours for amounts under $500,000 using accelerated underwriting.
            </p>
            <p>
              Term life is almost always the right structure for SBA coverage because the need decreases as the loan amortizes. A 10-year term aligned to a 10-year SBA loan means you are not overpaying for coverage after the obligation is satisfied. Whole life is rarely required and significantly more expensive.
            </p>
          </div>
        )}
        {intent === "mortgage" && (
          <div className="space-y-4 text-neutral-700">
            <p>
              Independent mortgage protection — a term policy you own — is structurally different from lender-sold mortgage insurance (PMI or lender-paid MPI). With an independent policy, <strong>your family is the beneficiary</strong>, not the bank. They receive the full death benefit and can decide whether to pay off the mortgage, invest the proceeds, or cover other expenses.
            </p>
            <p>
              Lender-sold products pay the lender directly and the coverage amount decreases as the loan amortizes, while your premiums stay the same. An independent term policy maintains a level benefit and is typically 20–40% cheaper for equivalent coverage.
            </p>
            <p>
              Match your term length to your mortgage: a 30-year mortgage usually warrants a 30-year term policy. If you plan to refinance or sell within 15 years, a 20-year term may suffice and will cost less. A licensed agent reviews the lender's requirements before the formal application is submitted.
            </p>
          </div>
        )}
        {intent === "final-expense" && (
          <div className="space-y-4 text-neutral-700">
            <p>
              Guaranteed issue whole life policies have <strong>no medical underwriting</strong> — there are no health questions and approval is automatic for applicants within the eligible age range (typically 45–85). This makes them the only viable option for individuals with serious health conditions who cannot qualify for simplified or fully underwritten policies.
            </p>
            <p>
              The critical detail is the <strong>2-year graded benefit period</strong>. If the insured passes away within the first two years of the policy from any non-accidental cause, the carrier returns only the premiums paid plus interest (typically 10%). Full death benefit coverage begins in year three. Accidental death is covered in full from day one.
            </p>
            <p>
              Face amounts are capped at $25,000–$30,000 because these policies are designed to cover immediate final costs: funeral, cremation, outstanding medical bills, and a small cash buffer for the surviving family. Naming a family member — not the funeral home — as beneficiary keeps options open and avoids pre-assignment complications.
            </p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Related guides</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {intent === "sba-loan" && (
            <>
              <Link href="/learn/how-much-life-insurance-do-i-need" className="border border-neutral-200 rounded-xl p-5 hover:border-brand-700 hover:shadow-sm transition-all group">
                <p className="font-bold text-neutral-900 group-hover:text-brand-700">How Much Life Insurance Do I Need?</p>
                <p className="text-sm text-neutral-600 mt-1">Use the DIME method and income-replacement formulas to size your coverage.</p>
                <p className="text-brand-700 text-sm font-medium mt-3">Read guide →</p>
              </Link>
              <Link href="/learn/term-vs-whole-life-insurance" className="border border-neutral-200 rounded-xl p-5 hover:border-brand-700 hover:shadow-sm transition-all group">
                <p className="font-bold text-neutral-900 group-hover:text-brand-700">Term vs. Whole Life Insurance</p>
                <p className="text-sm text-neutral-600 mt-1">Full comparison of costs, structure, and when each type makes sense.</p>
                <p className="text-brand-700 text-sm font-medium mt-3">Read guide →</p>
              </Link>
            </>
          )}
          {intent === "mortgage" && (
            <>
              <Link href="/learn/how-much-life-insurance-do-i-need" className="border border-neutral-200 rounded-xl p-5 hover:border-brand-700 hover:shadow-sm transition-all group">
                <p className="font-bold text-neutral-900 group-hover:text-brand-700">How Much Life Insurance Do I Need?</p>
                <p className="text-sm text-neutral-600 mt-1">Use the DIME method and income-replacement formulas to size your coverage.</p>
                <p className="text-brand-700 text-sm font-medium mt-3">Read guide →</p>
              </Link>
              <Link href="/learn/term-vs-whole-life-insurance" className="border border-neutral-200 rounded-xl p-5 hover:border-brand-700 hover:shadow-sm transition-all group">
                <p className="font-bold text-neutral-900 group-hover:text-brand-700">Term vs. Whole Life Insurance</p>
                <p className="text-sm text-neutral-600 mt-1">Full comparison of costs, structure, and when each type makes sense.</p>
                <p className="text-brand-700 text-sm font-medium mt-3">Read guide →</p>
              </Link>
            </>
          )}
          {intent === "final-expense" && (
            <>
              <Link href="/learn/no-exam-life-insurance" className="border border-neutral-200 rounded-xl p-5 hover:border-brand-700 hover:shadow-sm transition-all group">
                <p className="font-bold text-neutral-900 group-hover:text-brand-700">No-Exam Life Insurance</p>
                <p className="text-sm text-neutral-600 mt-1">Simplified issue, guaranteed issue, and accelerated underwriting explained.</p>
                <p className="text-brand-700 text-sm font-medium mt-3">Read guide →</p>
              </Link>
              <Link href="/learn/how-much-life-insurance-do-i-need" className="border border-neutral-200 rounded-xl p-5 hover:border-brand-700 hover:shadow-sm transition-all group">
                <p className="font-bold text-neutral-900 group-hover:text-brand-700">How Much Life Insurance Do I Need?</p>
                <p className="text-sm text-neutral-600 mt-1">Use the DIME method and income-replacement formulas to size your coverage.</p>
                <p className="text-brand-700 text-sm font-medium mt-3">Read guide →</p>
              </Link>
            </>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-800 transition-colors"
          >
            Get a coverage estimate →
          </Link>
        </div>
      </section>
    </div>
  );
}
