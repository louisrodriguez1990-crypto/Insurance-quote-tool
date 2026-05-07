import matrix from "@/data/life-insurance-matrix.json";
import agent from "@/data/licensed-agent.json";

export type IntentKey = "sba-loan" | "mortgage" | "final-expense";

export interface MatrixState {
  abbr: string;
  slug: string;
  name: string;
  defaultCity: string;
  funeralCostAvg: number;
  cremationCostAvg: number;
  medianIncome: number;
  avgMortgageBalance: number;
  incomeMultiplier: number;
  mortgageProtectionBuffer: number;
  localFriction: string;
  registryUrl: string;
  source: { name: string; url: string };
}

export interface IntentModel {
  label: string;
  productType: string;
  baseNeed: string;
  defaultCoverage: number;
}

export const launchStates = matrix.states as MatrixState[];
export const intentModels = matrix.intents as Record<IntentKey, IntentModel>;
export const agentData = agent;

export function getStateBySlug(slug: string) {
  return launchStates.find((state) => state.slug === slug);
}

export function getStateByAbbr(abbr: string) {
  return launchStates.find((state) => state.abbr === abbr);
}

export function getIntent(intent: IntentKey) {
  return intentModels[intent];
}

export function formatMoney(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

export function calculateCoverageNeed({
  state,
  intent,
  loanAmount = 0,
  savings = 0,
}: {
  state: MatrixState;
  intent: IntentKey;
  loanAmount?: number;
  savings?: number;
}) {
  const model = getIntent(intent);
  const grossNeed =
    intent === "sba-loan"
      ? Math.max(loanAmount, model.defaultCoverage)
      : intent === "mortgage"
        ? Math.max(loanAmount || state.avgMortgageBalance, state.avgMortgageBalance) * state.mortgageProtectionBuffer
        : Math.max(model.defaultCoverage, state.funeralCostAvg + 5000);

  return Math.max(0, Math.round((grossNeed - savings) / 1000) * 1000);
}

export function calculateCoverageRange({
  state,
  intent,
  loanAmount = 0,
  savings = 0,
}: {
  state: MatrixState;
  intent: IntentKey;
  loanAmount?: number;
  savings?: number;
}) {
  const base = calculateCoverageNeed({ state, intent, loanAmount, savings });
  if (base <= 0) return { low: 0, base: 0, high: 0 };

  const lowFactor = intent === "final-expense" ? 0.85 : 0.9;
  const highFactor = intent === "final-expense" ? 1.25 : 1.15;

  return {
    low: Math.max(1000, Math.round((base * lowFactor) / 1000) * 1000),
    base,
    high: Math.round((base * highFactor) / 1000) * 1000,
  };
}

export function estimateMonthlyPremium({
  coverage,
  state,
  productType,
}: {
  coverage: number;
  state: MatrixState;
  productType: string;
}) {
  if (coverage <= 0) return 0;
  const stateFactor = state.abbr === "CA" ? 1.14 : state.abbr === "FL" ? 1.04 : state.abbr === "TX" ? 1 : 0.96;
  const ratePerThousand = productType === "Final Expense" ? 3.8 : 0.058;
  const monthly = (coverage / 1000) * ratePerThousand * stateFactor;
  return Math.max(12, Math.round(monthly));
}

export function estimatePremiumRange({
  coverage,
  state,
  productType,
  ageBand,
  healthClass,
  tobacco,
}: {
  coverage: number;
  state: MatrixState;
  productType: string;
  ageBand: "18-35" | "36-50" | "51-65" | "66+";
  healthClass: "excellent" | "good" | "average" | "poor";
  tobacco: boolean;
}) {
  const ageFactor = ageBand === "18-35" ? 0.85 : ageBand === "36-50" ? 1.15 : ageBand === "51-65" ? 1.85 : 2.9;
  const healthFactor = healthClass === "excellent" ? 0.85 : healthClass === "good" ? 1 : healthClass === "average" ? 1.35 : 1.9;
  const tobaccoFactor = tobacco ? 2.2 : 1;
  const baseline = estimateMonthlyPremium({ coverage, state, productType }) * ageFactor * healthFactor * tobaccoFactor;

  return {
    preferred: Math.max(12, Math.round(baseline * 0.85)),
    standard: Math.max(12, Math.round(baseline)),
    substandard: Math.max(12, Math.round(baseline * 1.45)),
  };
}

export function getIntentPath(intent: IntentKey, state: MatrixState, loanAmount?: number) {
  if (intent === "sba-loan") return `/sba-loan-life-insurance/${state.slug}`;
  if (intent === "final-expense") return `/guaranteed-issue-final-expense/${state.slug}`;
  return `/mortgage-protection/${state.slug}/${loanAmount || state.avgMortgageBalance}`;
}

export function buildLifeInsuranceGraph({
  state,
  intent,
  loanAmount,
}: {
  state: MatrixState;
  intent: IntentKey;
  loanAmount?: number;
}) {
  const model = getIntent(intent);
  const coverage = calculateCoverageNeed({ state, intent, loanAmount });
  const productName = intent === "final-expense" ? "Final Expense Life Insurance" : "Term Life Insurance";
  const pageUrl = `https://bestquote.io${getIntentPath(intent, state, loanAmount)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://bestquote.io/#licensed-agent",
        name: agent.name,
        identifier: `NPN ${agent.npn}`,
        jobTitle: "Licensed Resident Producer",
        hasCredential: agent.licensedStates.map((abbr) => ({
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Insurance producer license",
          identifier: agent.licenses[abbr as keyof typeof agent.licenses]?.licenseNumber
            ? `${abbr} ${agent.licenses[abbr as keyof typeof agent.licenses]?.licenseNumber}; NPN ${agent.npn}`
            : `NPN ${agent.npn}`,
          recognizedBy: {
            "@type": "Organization",
            name: `${abbr} insurance license registry`,
            url:
              agent.licenses[abbr as keyof typeof agent.licenses]?.registryDetailUrl ||
              agent.registries[abbr as keyof typeof agent.registries],
          },
        })),
      },
      {
        "@type": "FinancialProduct",
        "@id": `${pageUrl}#product`,
        name: `${productName} in ${state.name}`,
        category: model.productType,
        provider: { "@type": "Organization", name: "BestQuote", url: "https://bestquote.io" },
        amount: { "@type": "MonetaryAmount", currency: "USD", value: coverage },
      },
      {
        "@type": "Dataset",
        "@id": "https://bestquote.io/data/life-insurance-matrix.json#dataset",
        name: "BestQuote local life insurance needs dataset",
        description: "State-level funeral, cremation, income, and mortgage assumptions used for deterministic educational life insurance calculations.",
        url: "https://bestquote.io/data/life-insurance-matrix.json",
        variableMeasured: ["funeralCostAvg", "cremationCostAvg", "medianIncome", "avgMortgageBalance"],
        spatialCoverage: { "@type": "AdministrativeArea", name: state.name },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: getFaqItems(state, intent).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export function getFaqItems(state: MatrixState, intent: IntentKey) {
  const model = getIntent(intent);
  if (intent === "final-expense") {
    return [
      {
        question: `Can I get guaranteed issue final expense insurance in ${state.name}?`,
        answer: `Yes. Guaranteed issue final expense coverage is designed for people who may not qualify for fully underwritten term coverage. It is usually smaller, more expensive per dollar of benefit, and may include a graded death benefit period.`,
      },
      {
        question: `How much final expense coverage do ${state.name} families usually need?`,
        answer: `This calculator starts with ${formatMoney(state.funeralCostAvg)} for funeral costs, ${formatMoney(state.cremationCostAvg)} for cremation context, and a cash buffer for immediate estate expenses.`,
      },
    ];
  }

  if (intent === "sba-loan") {
    return [
      {
        question: `Why do SBA borrowers in ${state.name} use term life insurance?`,
        answer: `SBA lenders often want the loan protected if a key borrower dies. Term life generally matches the temporary loan obligation without forcing the borrower into permanent insurance.`,
      },
      {
        question: "Does the policy need to equal the whole SBA loan?",
        answer: "The lender requirement controls the final number. This calculator uses the greater of the known loan amount or a default planning amount, then the agent verifies the lender assignment requirement before application.",
      },
    ];
  }

  return [
    {
      question: `How much mortgage protection life insurance do I need in ${state.name}?`,
      answer: `Start with the mortgage balance, then add a modest buffer for payoff timing and estate costs. This calculator uses ${state.name}'s average mortgage balance when a loan amount is not supplied.`,
    },
    {
      question: "Is mortgage protection different from term life insurance?",
      answer: "The recommended product is usually level term life. The purpose is mortgage protection, but the beneficiary can receive flexible cash instead of a narrow lender-only benefit.",
    },
  ];
}
