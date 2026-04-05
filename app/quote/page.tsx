"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheckIcon,
  BuildingLibraryIcon,
  HeartIcon,
  TruckIcon,
  HomeIcon,
  CheckIcon,
  CheckCircleIcon,
  LockClosedIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { TrustBadge } from "@/components/TrustBadge";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

type CoverageType = "Term Life" | "Whole Life" | "Health" | "Auto" | "Home";
type Gender = "Male" | "Female" | "Other";
type HealthStatus = "Excellent" | "Good" | "Average" | "Poor";

interface QuoteData {
  coverageType: CoverageType | null;
  age: number;
  gender: Gender | null;
  state: string;
  smoker: boolean | null;
  coverageAmount: number | null;
  termLength: number | null;
  health: HealthStatus | null;
}

interface QuoteTier {
  tier: string;
  monthly: number;
  features: string[];
}

function calculateQuotes(data: QuoteData): QuoteTier[] {
  const { age, gender, smoker, health, coverageAmount } = data;
  if (!coverageAmount || !age || !gender || smoker === null || !health) return [];

  const base = (coverageAmount / 1000) * 0.05;
  const ageMultiplier = age < 30 ? 1.0 : age < 40 ? 1.4 : age < 50 ? 2.1 : age < 60 ? 3.5 : 5.2;
  const smokerMultiplier = smoker ? 2.5 : 1.0;
  const genderMultiplier = gender === "Male" ? 1.15 : 1.0;
  const healthMultiplier = health === "Excellent" ? 0.85 : health === "Good" ? 1.0 : health === "Average" ? 1.25 : 1.6;
  const monthlyBase = base * ageMultiplier * smokerMultiplier * genderMultiplier * healthMultiplier;

  return [
    {
      tier: "Essential",
      monthly: Math.round(monthlyBase * 0.85 * 100) / 100,
      features: ["Death benefit", "Renewable", "Convertible option"],
    },
    {
      tier: "Preferred",
      monthly: Math.round(monthlyBase * 100) / 100,
      features: ["Death benefit", "Renewable", "Convertible option", "Waiver of premium", "Living benefits"],
    },
    {
      tier: "Premier",
      monthly: Math.round(monthlyBase * 1.3 * 100) / 100,
      features: ["Death benefit", "Renewable", "Convertible option", "Waiver of premium", "Living benefits", "Accelerated death benefit", "Child rider"],
    },
  ];
}

const coverageTypeOptions: { label: CoverageType; Icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { label: "Term Life",  Icon: ShieldCheckIcon,    desc: "Affordable coverage for a fixed period — from $15/mo" },
  { label: "Whole Life", Icon: BuildingLibraryIcon, desc: "Lifetime coverage with cash value — from $85/mo" },
  { label: "Health",     Icon: HeartIcon,           desc: "Medical coverage for you & your family — from $180/mo" },
  { label: "Auto",       Icon: TruckIcon,           desc: "Car insurance for your vehicle — from $45/mo" },
  { label: "Home",       Icon: HomeIcon,            desc: "Protect your home & belongings — from $75/mo" },
];

const healthDotColor: Record<HealthStatus, string> = {
  Excellent: "bg-green-500",
  Good:      "bg-blue-500",
  Average:   "bg-yellow-500",
  Poor:      "bg-red-500",
};

function QuoteWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    coverageType: null,
    age: 35,
    gender: null,
    state: "",
    smoker: null,
    coverageAmount: null,
    termLength: null,
    health: null,
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Pre-populate from URL params
  useEffect(() => {
    const type = searchParams.get("type") as CoverageType | null;
    const state = searchParams.get("state");
    if (type && coverageTypeOptions.some((o) => o.label === type)) {
      setQuoteData((d) => ({ ...d, coverageType: type }));
      setStep(2);
    }
    if (state) {
      const match = US_STATES.find((s) => s.toLowerCase().replace(/\s+/g, "-") === state);
      if (match) setQuoteData((d) => ({ ...d, state: match }));
    }
  }, [searchParams]);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const coverageAmounts = [100000, 250000, 500000, 750000, 1000000];
  const termLengths = [10, 15, 20, 25, 30];
  const quotes = calculateQuotes(quoteData);

  const canProceedStep1 = quoteData.coverageType !== null;
  const canProceedStep2 = quoteData.age >= 18 && quoteData.age <= 85 && quoteData.gender !== null && quoteData.state !== "" && quoteData.smoker !== null;
  const canProceedStep3 = quoteData.coverageAmount !== null && quoteData.health !== null;

  const stepCanProceed = [canProceedStep1, canProceedStep2, canProceedStep3, true];

  const stepLabels = ["Coverage Type", "About You", "Your Coverage", "Your Rates"];

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, phone, quoteData }),
      });
      setSubmitted(true);
    } catch { /* fail silently — lead logged server-side */ }
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4 pb-24 md:pb-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">See Your Personalized Rates</h1>
          <p className="text-neutral-600">Takes about 2 minutes. No commitment required.</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-medium text-neutral-600 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-cta rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            {stepLabels.map((label, i) => (
              <span key={label} className={`text-xs ${i + 1 <= step ? "text-neutral-900 font-semibold" : "text-neutral-400"}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">

          {/* Step 1: Coverage Type */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-1">What type of insurance do you need?</h2>
              <p className="text-neutral-500 text-sm mb-6">Select one to get started</p>
              <div className="space-y-2">
                {coverageTypeOptions.map(({ label, Icon, desc }) => (
                  <button
                    key={label}
                    onClick={() => setQuoteData({ ...quoteData, coverageType: label })}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      quoteData.coverageType === label
                        ? "border-brand-700 bg-brand-50"
                        : "border-neutral-200 hover:border-brand-200 hover:bg-neutral-50"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      quoteData.coverageType === label ? "bg-brand-100" : "bg-neutral-100"
                    }`}>
                      <Icon className={`w-5 h-5 ${quoteData.coverageType === label ? "text-brand-700" : "text-neutral-500"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-neutral-900">{label}</div>
                      <div className="text-neutral-500 text-sm">{desc}</div>
                    </div>
                    {quoteData.coverageType === label && (
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cta flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full mt-6 bg-cta text-white font-bold py-3.5 rounded-xl hover:bg-cta-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to Step 2 →
              </button>
            </div>
          )}

          {/* Step 2: About You */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-1">About You</h2>
              <p className="text-neutral-500 text-sm mb-6">We use this to calculate accurate rates — nothing else.</p>
              <div className="space-y-5">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Age</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={18}
                      max={85}
                      value={quoteData.age}
                      onChange={(e) => setQuoteData({ ...quoteData, age: parseInt(e.target.value) || 18 })}
                      className="w-full border border-neutral-200 rounded-lg px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-brand-700 text-neutral-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400">years old</span>
                  </div>
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Gender</label>
                  <div className="flex gap-3">
                    {(["Male", "Female", "Other"] as Gender[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => setQuoteData({ ...quoteData, gender: g })}
                        className={`flex-1 py-3 rounded-lg border-2 font-medium text-sm transition-all ${
                          quoteData.gender === g
                            ? "border-brand-700 bg-brand-50 text-brand-900"
                            : "border-neutral-200 text-neutral-700 hover:border-brand-200"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">State</label>
                  <select
                    value={quoteData.state}
                    onChange={(e) => setQuoteData({ ...quoteData, state: e.target.value })}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-700 text-neutral-900 bg-white"
                  >
                    <option value="">Select your state</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {/* Smoker */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Do you smoke or use tobacco?</label>
                  <div className="flex gap-3">
                    {[{ label: "Yes", value: true }, { label: "No", value: false }].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setQuoteData({ ...quoteData, smoker: opt.value })}
                        className={`flex-1 py-3 rounded-lg border-2 font-medium text-sm transition-all ${
                          quoteData.smoker === opt.value
                            ? "border-brand-700 bg-brand-50 text-brand-900"
                            : "border-neutral-200 text-neutral-700 hover:border-brand-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust badge — appears in step 2 per CRO research */}
              <div className="mt-5">
                <TrustBadge variant="privacy" />
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(1)} className="flex-1 border-2 border-neutral-200 text-neutral-700 font-semibold py-3 rounded-xl hover:bg-neutral-50 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-cta text-white font-bold py-3 rounded-xl hover:bg-cta-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Calculate My Rates →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Your Coverage */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-1">Your Coverage</h2>
              <p className="text-neutral-500 text-sm mb-6">Choose the protection level that fits your needs.</p>
              <div className="space-y-6">
                {/* Coverage Amount */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Coverage Amount</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {coverageAmounts.map((amount) => (
                      <div key={amount} className="relative">
                        <button
                          onClick={() => setQuoteData({ ...quoteData, coverageAmount: amount })}
                          className={`w-full py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                            quoteData.coverageAmount === amount
                              ? "border-brand-700 bg-brand-50 text-brand-900"
                              : "border-neutral-200 text-neutral-700 hover:border-brand-200"
                          }`}
                        >
                          ${amount >= 1_000_000 ? `${amount / 1_000_000}M` : `${amount / 1000}K`}
                        </button>
                        {amount === 500000 && (
                          <span className="block text-center text-xs text-neutral-400 mt-1">most common</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Term Length (Term Life only) */}
                {quoteData.coverageType === "Term Life" && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Term Length</label>
                    <div className="flex flex-wrap gap-3">
                      {termLengths.map((years) => (
                        <button
                          key={years}
                          onClick={() => setQuoteData({ ...quoteData, termLength: years })}
                          className={`py-2.5 px-5 rounded-xl border-2 font-semibold text-sm transition-all ${
                            quoteData.termLength === years
                              ? "border-brand-700 bg-brand-50 text-brand-900"
                              : "border-neutral-200 text-neutral-700 hover:border-brand-200"
                          }`}
                        >
                          {years} yrs
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Health Status */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Overall Health Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Excellent", "Good", "Average", "Poor"] as HealthStatus[]).map((h) => (
                      <button
                        key={h}
                        onClick={() => setQuoteData({ ...quoteData, health: h })}
                        className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                          quoteData.health === h
                            ? "border-brand-700 bg-brand-50 text-brand-900"
                            : "border-neutral-200 text-neutral-700 hover:border-brand-200"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${healthDotColor[h]}`} />
                        {h}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">Be honest — insurers verify health during underwriting</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 border-2 border-neutral-200 text-neutral-700 font-semibold py-3 rounded-xl hover:bg-neutral-50 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!canProceedStep3}
                  className="flex-1 bg-cta text-white font-bold py-3 rounded-xl hover:bg-cta-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  See My Rates →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Your Personalized Rates</h2>
              {/* Summary pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  quoteData.coverageType,
                  `Age ${quoteData.age}`,
                  quoteData.state,
                  quoteData.coverageAmount
                    ? `$${quoteData.coverageAmount >= 1_000_000 ? `${quoteData.coverageAmount / 1_000_000}M` : `${quoteData.coverageAmount / 1000}K`} coverage`
                    : null,
                ].filter(Boolean).map((tag) => (
                  <span key={tag} className="bg-neutral-100 text-neutral-700 text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* AM Best badge */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
                <ShieldCheckIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                All rates from carriers rated A or better by AM Best
              </div>

              {/* Quote Tiers */}
              <div className="space-y-4 mb-6">
                {quotes.map((quote, index) => (
                  <div
                    key={quote.tier}
                    className={`rounded-xl border-2 p-5 relative ${
                      index === 1 ? "border-brand-700 bg-brand-50" : "border-neutral-200 bg-white"
                    }`}
                  >
                    {index === 1 && (
                      <span className="absolute -top-3 left-4 bg-cta text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-neutral-900 text-lg">{quote.tier}</h3>
                        <div className="text-3xl font-bold text-brand-900 mt-1">
                          ${quote.monthly.toFixed(2)}
                          <span className="text-base font-normal text-neutral-500">/mo</span>
                        </div>
                      </div>
                      <button className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                        index === 1
                          ? "bg-cta hover:bg-cta-hover text-white"
                          : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                      }`}>
                        Select Plan
                      </button>
                    </div>
                    <ul className="space-y-1.5">
                      {quote.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                          <CheckIcon className="w-4 h-4 text-cta flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5 text-xs text-amber-800">
                <strong>Estimated rates only.</strong> Final premiums are determined after full underwriting review.
              </div>

              {/* Lead Capture */}
              {!submitted ? (
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                  <h3 className="font-bold text-neutral-900 mb-1">Lock In These Rates</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    A licensed advisor will send your full carrier breakdown and answer any questions — at no cost.
                  </p>
                  <div className="mb-4">
                    <TrustBadge variant="ambest" />
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 text-neutral-900"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 text-neutral-900"
                    />
                    <input
                      type="email"
                      placeholder="Your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 text-neutral-900"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-cta text-white font-bold py-3.5 rounded-xl hover:bg-cta-hover transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "Send My Rates →"}
                    </button>
                    <p className="text-xs text-neutral-400 text-center">
                      No spam. No obligation. We respect your privacy.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-cta-light border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircleIcon className="w-10 h-10 text-cta mx-auto mb-3" />
                  <h3 className="font-bold text-cta-text text-lg mb-1">You&apos;re all set</h3>
                  <p className="text-green-800 text-sm">
                    A licensed advisor will reach out within 24 hours with your complete carrier quotes.
                  </p>
                </div>
              )}

              <button
                onClick={() => setStep(3)}
                className="mt-4 text-sm text-neutral-400 hover:text-brand-700 transition-colors underline w-full text-center"
              >
                ← Adjust my information
              </button>
            </div>
          )}
        </div>

        {/* Trust badges row */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5"><LockClosedIcon className="w-4 h-4" /> SSL Encrypted</span>
          <span className="flex items-center gap-1.5"><XCircleIcon className="w-4 h-4" /> No Obligation</span>
          <span className="flex items-center gap-1.5"><UserIcon className="w-4 h-4" /> Licensed Advisors</span>
          <span className="flex items-center gap-1.5"><ShieldCheckIcon className="w-4 h-4" /> A+ Carriers</span>
        </div>
      </div>

      {/* Mobile sticky CTA — visible on steps 1–3 only */}
      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 md:hidden z-40">
          <button
            onClick={() => { if (stepCanProceed[step - 1]) setStep(step + 1); }}
            disabled={!stepCanProceed[step - 1]}
            className="w-full bg-cta text-white font-bold py-3.5 rounded-xl hover:bg-cta-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 3 ? "See My Rates →" : "Continue →"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-neutral-500">Loading...</div>
      </div>
    }>
      <QuoteWizard />
    </Suspense>
  );
}
