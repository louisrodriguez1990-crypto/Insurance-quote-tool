"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { BookingCTA } from "@/components/BookingCTA";
import { emitConversionEvent } from "@/lib/conversionEvents";
import {
  calculateCoverageRange,
  estimatePremiumRange,
  formatMoney,
  getIntent,
  launchStates,
  type IntentKey,
  type MatrixState,
} from "@/lib/lifeInsurance";

type AgeBand = "18-35" | "36-50" | "51-65" | "66+";
type HealthClass = "excellent" | "good" | "average" | "poor";

const intentOptions: Array<{ intent: IntentKey; label: string; description: string }> = [
  { intent: "sba-loan", label: "SBA loan or business debt", description: "A lender or partner needs the loan protected if a key borrower dies." },
  { intent: "mortgage", label: "Mortgage protection", description: "You want enough coverage to keep the home decision flexible for family." },
  { intent: "final-expense", label: "Final expense", description: "You want funeral, cremation, and immediate estate cash handled." },
];

const ageBands: Array<{ value: AgeBand; label: string }> = [
  { value: "18-35", label: "18-35" },
  { value: "36-50", label: "36-50" },
  { value: "51-65", label: "51-65" },
  { value: "66+", label: "66+" },
];

const healthOptions: Array<{ value: HealthClass; label: string; description: string }> = [
  { value: "excellent", label: "Excellent", description: "No major conditions, strong labs, active lifestyle." },
  { value: "good", label: "Good", description: "Minor or well-controlled health history." },
  { value: "average", label: "Average", description: "Some health history or medication use." },
  { value: "poor", label: "Complicated", description: "Recent diagnosis, serious condition, or prior decline." },
];

const stepLabels = ["Situation", "Profile", "Need", "Range"];

function getDefaultNeed(intent: IntentKey, state: MatrixState, loanAmount: number) {
  if (intent === "sba-loan") return loanAmount || 500000;
  if (intent === "mortgage") return loanAmount || state.avgMortgageBalance;
  return state.funeralCostAvg + 5000;
}

export function GuidedNeedsWorkflow({
  state,
  intent,
  loanAmount = 0,
  neutralStart = false,
}: {
  state: MatrixState;
  intent: IntentKey;
  loanAmount?: number;
  neutralStart?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [selectedStateSlug, setSelectedStateSlug] = useState(neutralStart ? "" : state.slug);
  const [selectedIntent, setSelectedIntent] = useState<IntentKey>(intent);
  const [ageBand, setAgeBand] = useState<AgeBand>("36-50");
  const [healthClass, setHealthClass] = useState<HealthClass>("good");
  const [tobacco, setTobacco] = useState(false);
  const [city, setCity] = useState(neutralStart ? "" : state.defaultCity);
  const [needAmount, setNeedAmount] = useState(() => getDefaultNeed(intent, state, loanAmount));
  const [savings, setSavings] = useState(0);

  const selectedState = useMemo(
    () => launchStates.find((item) => item.slug === selectedStateSlug),
    [selectedStateSlug],
  );
  const activeState = selectedState || state;
  const model = getIntent(selectedIntent);
  const selectedStateLabel = selectedState ? ` in ${selectedState.name}` : "";

  useEffect(() => {
    emitConversionEvent("workflow_started", { state: selectedState?.abbr, intent: selectedIntent });
  }, [selectedIntent, selectedState?.abbr]);

  useEffect(() => {
    emitConversionEvent("workflow_step_viewed", {
      state: selectedState?.abbr,
      intent: selectedIntent,
      step: step + 1,
      step_name: stepLabels[step],
    });
  }, [selectedIntent, selectedState?.abbr, step]);

  useEffect(() => {
    if (step === 3) {
      emitConversionEvent("coverage_result_viewed", {
        state: selectedState?.abbr,
        intent: selectedIntent,
        age_band: ageBand,
        health_class: healthClass,
        tobacco,
      });
    }
  }, [ageBand, healthClass, selectedIntent, selectedState?.abbr, step, tobacco]);

  const range = useMemo(
    () =>
      calculateCoverageRange({
        state: activeState,
        intent: selectedIntent,
        loanAmount: selectedIntent === "final-expense" ? 0 : needAmount,
        savings,
      }),
    [activeState, needAmount, savings, selectedIntent],
  );

  const lowPremium = estimatePremiumRange({ coverage: range.low, state: activeState, productType: model.productType, ageBand, healthClass, tobacco });
  const basePremium = estimatePremiumRange({ coverage: range.base, state: activeState, productType: model.productType, ageBand, healthClass, tobacco });
  const highPremium = estimatePremiumRange({ coverage: range.high, state: activeState, productType: model.productType, ageBand, healthClass, tobacco });

  function completeStep(nextStep: number) {
    if (step === 1 && !selectedState) return;
    emitConversionEvent("workflow_step_completed", {
      state: selectedState?.abbr,
      intent: selectedIntent,
      step: step + 1,
      step_name: stepLabels[step],
    });
    setStep(nextStep);
  }

  function updateIntent(nextIntent: IntentKey) {
    setSelectedIntent(nextIntent);
    setNeedAmount(getDefaultNeed(nextIntent, activeState, loanAmount));
  }

  function updateState(nextSlug: string) {
    const nextState = launchStates.find((item) => item.slug === nextSlug);
    setSelectedStateSlug(nextState?.slug || "");
    setCity(nextState?.defaultCity || "");
    setNeedAmount(getDefaultNeed(selectedIntent, nextState || state, loanAmount));
  }

  const progress = ((step + 1) / stepLabels.length) * 100;

  return (
    <section className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 md:p-7 border-b border-neutral-200">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-3">Free coverage estimate</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
          See your coverage range{selectedStateLabel}
        </h1>
        <p className="text-neutral-600 mt-3 max-w-3xl">
          4 questions to personalize your estimate. No contact info required.
        </p>
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
            <span>Step {step + 1} of {stepLabels.length}: {stepLabels[step]}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full bg-cta transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="p-5 md:p-7">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold text-neutral-900">What are you trying to protect?</h2>
            <p className="text-sm text-neutral-600 mt-1">We'll focus only on what's relevant to your goal.</p>
            <div className="grid gap-3 mt-5">
              {intentOptions.map((option) => (
                <button
                  key={option.intent}
                  type="button"
                  onClick={() => updateIntent(option.intent)}
                  className={`text-left rounded-xl border-2 p-4 transition-all ${
                    selectedIntent === option.intent ? "border-brand-700 bg-brand-50" : "border-neutral-200 hover:border-brand-200"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedIntent === option.intent ? "bg-cta border-cta" : "border-neutral-300"
                    }`}>
                      {selectedIntent === option.intent && <CheckIcon className="w-3 h-3 text-white" />}
                    </span>
                    <span>
                      <span className="block font-bold text-neutral-900">{option.label}</span>
                      <span className="block text-sm text-neutral-600 mt-1">{option.description}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Personalize your estimate</h2>
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <label>
                <span className="text-sm font-semibold text-neutral-700">State</span>
                <select
                  value={selectedStateSlug}
                  onChange={(event) => updateState(event.target.value)}
                  className="mt-1 w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700"
                >
                  <option value="">Select your state</option>
                  {launchStates.map((item) => (
                    <option key={item.abbr} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="text-sm font-semibold text-neutral-700">City</span>
                <input
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Optional"
                  className="mt-1 w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <div>
                <span className="text-sm font-semibold text-neutral-700">Age band</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {ageBands.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setAgeBand(item.value)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                        ageBand === item.value ? "border-brand-700 bg-brand-50 text-brand-900" : "border-neutral-200 text-neutral-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-neutral-700">Health class</span>
                <div className="grid gap-2 mt-1">
                  {healthOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setHealthClass(item.value)}
                      className={`text-left rounded-lg border px-3 py-2 ${
                        healthClass === item.value ? "border-brand-700 bg-brand-50" : "border-neutral-200"
                      }`}
                    >
                      <span className="block text-sm font-bold text-neutral-900">{item.label}</span>
                      <span className="block text-xs text-neutral-500">{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-neutral-700">Tobacco or nicotine use</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {[{ label: "No", value: false }, { label: "Yes", value: true }].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setTobacco(item.value)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                        tobacco === item.value ? "border-brand-700 bg-brand-50 text-brand-900" : "border-neutral-200 text-neutral-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {!selectedState && <p className="text-sm text-red-600 mt-4">Select a state to continue.</p>}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-neutral-900">How much coverage are we sizing?</h2>
            <p className="text-sm text-neutral-600 mt-1">
              We start with local {activeState.name} averages. Adjust to match your actual situation.
            </p>
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              {selectedIntent !== "final-expense" ? (
                <label>
                  <span className="text-sm font-semibold text-neutral-700">
                    {selectedIntent === "sba-loan" ? "SBA loan amount" : "Mortgage balance"}
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={needAmount}
                    onChange={(event) => setNeedAmount(Math.max(0, Number(event.target.value) || 0))}
                    className="mt-1 w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </label>
              ) : (
                <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50">
                  <p className="text-sm font-semibold text-neutral-700">Local final expense anchor</p>
                  <p className="text-2xl font-extrabold text-neutral-900 mt-2">{formatMoney(activeState.funeralCostAvg)}</p>
                  <p className="text-xs text-neutral-500 mt-1">Average funeral assumption before immediate estate cash buffer.</p>
                </div>
              )}
              <label>
                <span className="text-sm font-semibold text-neutral-700">Existing savings to apply</span>
                <input
                  type="number"
                  min={0}
                  value={savings}
                  onChange={(event) => setSavings(Math.max(0, Number(event.target.value) || 0))}
                  className="mt-1 w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </label>
            </div>
            <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
              <p className="text-sm text-brand-900">{activeState.localFriction}</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cta-light flex items-center justify-center">
                <ClipboardDocumentCheckIcon className="w-5 h-5 text-cta-text" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Your coverage range</h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Based on your inputs. A licensed agent confirms your exact rate.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs uppercase tracking-wider font-bold text-neutral-500">Lean</p>
                <p className="text-2xl font-extrabold text-neutral-900 mt-2">{formatMoney(range.low)}</p>
                <p className="text-sm text-neutral-600 mt-1">~${lowPremium.preferred}/mo est.</p>
              </div>
              <div className="rounded-xl border-2 border-brand-700 bg-brand-50 p-5">
                <p className="text-xs uppercase tracking-wider font-bold text-brand-700">Recommended</p>
                <p className="text-2xl font-extrabold text-brand-900 mt-2">{formatMoney(range.base)}</p>
                <p className="text-sm text-brand-800 mt-1">~${basePremium.standard}/mo est.</p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs uppercase tracking-wider font-bold text-neutral-500">Higher protection</p>
                <p className="text-2xl font-extrabold text-neutral-900 mt-2">{formatMoney(range.high)}</p>
                <p className="text-sm text-neutral-600 mt-1">~${highPremium.substandard}/mo est.</p>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 mt-5">
              <p className="font-bold text-neutral-900">Assumptions used</p>
              <p className="text-sm text-neutral-600 mt-2">
                {city || activeState.defaultCity}, {activeState.abbr}; {model.label.toLowerCase()} goal; {ageBand} age band; {healthClass} health class;{" "}
                {tobacco ? "tobacco/nicotine user" : "no tobacco/nicotine"}; {formatMoney(savings)} savings applied.
              </p>
            </div>

            <BookingCTA />
          </div>
        )}

        <div className="flex gap-3 mt-7">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={step === 0}
            className="inline-flex items-center justify-center gap-2 border border-neutral-200 text-neutral-700 font-semibold px-4 py-2.5 rounded-lg disabled:opacity-40"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </button>
          {step < 3 && (
            <button
              type="button"
              onClick={() => completeStep(step + 1)}
              disabled={step === 1 && !selectedState}
              className="ml-auto inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-5 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
