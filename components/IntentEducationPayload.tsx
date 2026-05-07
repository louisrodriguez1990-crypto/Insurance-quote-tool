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
    </div>
  );
}
