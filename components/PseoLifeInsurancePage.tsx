import { notFound } from "next/navigation";
import { AgentReviewBox } from "@/components/AgentReviewBox";
import { IntentEducationPayload } from "@/components/IntentEducationPayload";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  agentData,
  buildLifeInsuranceGraph,
  formatMoney,
  getIntent,
  getStateBySlug,
  type IntentKey,
} from "@/lib/lifeInsurance";

export function PseoLifeInsurancePage({
  stateSlug,
  intent,
  loanAmount,
}: {
  stateSlug: string;
  intent: IntentKey;
  loanAmount?: number;
}) {
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const model = getIntent(intent);
  const graph = buildLifeInsuranceGraph({ state, intent, loanAmount });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Life Insurance", href: "/insurance/life-insurance" },
            { label: `${model.label} in ${state.name}` },
          ]}
        />

        <section className="bg-white border border-neutral-200 rounded-xl p-6 md:p-8 shadow-sm mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-3">
            {model.label} life insurance in {state.name}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
            Local context for {model.label.toLowerCase()} planning
          </h1>
          <p className="text-neutral-600 mt-3 max-w-3xl">
            This page explains the {state.name} numbers and local friction behind {model.label.toLowerCase()} planning. The sales-process workflow lives on the main page and gives an estimate before agent handoff.
          </p>
        </section>

        <AgentReviewBox agent={agentData} />

        <section className="grid md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "State", value: state.abbr },
            { label: "Median Income", value: formatMoney(state.medianIncome) },
            { label: "Avg. Mortgage", value: formatMoney(state.avgMortgageBalance) },
            { label: "Funeral Avg.", value: formatMoney(state.funeralCostAvg) },
          ].map((item) => (
            <div key={item.label} className="border border-neutral-200 rounded-xl p-4 bg-neutral-50">
              <p className="text-xs uppercase tracking-wider font-bold text-neutral-500">{item.label}</p>
              <p className="text-xl font-extrabold text-neutral-900 mt-1">{item.value}</p>
            </div>
          ))}
        </section>

        <IntentEducationPayload state={state} intent={intent} loanAmount={loanAmount} />
      </div>
    </>
  );
}
