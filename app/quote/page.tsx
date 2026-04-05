'use client';

import { useState } from "react";
import type { Metadata } from "next";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
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

  const base = coverageAmount / 1000 * 0.05;
  const ageMultiplier = age < 30 ? 1.0 : age < 40 ? 1.4 : age < 50 ? 2.1 : age < 60 ? 3.5 : 5.2;
  const smokerMultiplier = smoker ? 2.5 : 1.0;
  const genderMultiplier = gender === "Male" ? 1.15 : 1.0;
  const healthMultiplier = health === "Excellent" ? 0.85 : health === "Good" ? 1.0 : health === "Average" ? 1.25 : 1.6;

  const monthlyBase = base * ageMultiplier * smokerMultiplier * genderMultiplier * healthMultiplier;

  return [
    {
      tier: "Basic",
      monthly: Math.round(monthlyBase * 0.85 * 100) / 100,
      features: ["Death benefit", "Renewable", "Convertible option"],
    },
    {
      tier: "Standard",
      monthly: Math.round(monthlyBase * 100) / 100,
      features: ["Death benefit", "Renewable", "Convertible option", "Waiver of premium", "Living benefits"],
    },
    {
      tier: "Premium",
      monthly: Math.round(monthlyBase * 1.3 * 100) / 100,
      features: ["Death benefit", "Renewable", "Convertible option", "Waiver of premium", "Living benefits", "Accelerated death benefit", "Child rider"],
    },
  ];
}

export default function QuotePage() {
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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const coverageTypes: { label: CoverageType; icon: string; desc: string }[] = [
    { label: "Term Life", icon: "📋", desc: "Affordable coverage for a fixed period" },
    { label: "Whole Life", icon: "🏛️", desc: "Lifetime coverage with cash value" },
    { label: "Health", icon: "❤️", desc: "Medical coverage for you & family" },
    { label: "Auto", icon: "🚗", desc: "Car insurance for your vehicle" },
    { label: "Home", icon: "🏠", desc: "Protect your home & belongings" },
  ];

  const coverageAmounts = [100000, 250000, 500000, 750000, 1000000];
  const termLengths = [10, 15, 20, 25, 30];

  const quotes = calculateQuotes(quoteData);

  const canProceedStep1 = quoteData.coverageType !== null;
  const canProceedStep2 = quoteData.age >= 18 && quoteData.age <= 85 && quoteData.gender !== null && quoteData.state !== "" && quoteData.smoker !== null;
  const canProceedStep3 = quoteData.coverageAmount !== null && quoteData.health !== null;

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, quoteData }),
      });
      setSubmitted(true);
    } catch {}
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Your Free Insurance Quote</h1>
          <p className="text-gray-600">Answer a few questions to see personalized rates</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {["Coverage Type", "Personal Info", "Coverage Details", "Your Quotes"].map((label, i) => (
              <span
                key={label}
                className={`text-xs ${i + 1 <= step ? "text-brand-700 font-semibold" : "text-gray-400"}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">

          {/* Step 1: Coverage Type */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">What type of insurance do you need?</h2>
              <p className="text-gray-600 mb-6">Select one to get started</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coverageTypes.map((ct) => (
                  <button
                    key={ct.label}
                    onClick={() => setQuoteData({ ...quoteData, coverageType: ct.label })}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      quoteData.coverageType === ct.label
                        ? "border-brand-600 bg-brand-50"
                        : "border-gray-200 hover:border-brand-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-3xl">{ct.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{ct.label}</div>
                      <div className="text-gray-500 text-sm mt-0.5">{ct.desc}</div>
                    </div>
                    {quoteData.coverageType === ct.label && (
                      <span className="ml-auto text-brand-600 text-lg">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full mt-6 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
              <p className="text-gray-600 mb-6">This helps us calculate accurate rates</p>

              <div className="space-y-5">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    min={18}
                    max={85}
                    value={quoteData.age}
                    onChange={(e) => setQuoteData({ ...quoteData, age: parseInt(e.target.value) || 18 })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div className="flex gap-3">
                    {(["Male", "Female", "Other"] as Gender[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => setQuoteData({ ...quoteData, gender: g })}
                        className={`flex-1 py-2.5 rounded-lg border-2 font-medium text-sm transition-all ${
                          quoteData.gender === g
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-700 hover:border-brand-300"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    value={quoteData.state}
                    onChange={(e) => setQuoteData({ ...quoteData, state: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">Select your state</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Smoker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Do you smoke or use tobacco?</label>
                  <div className="flex gap-3">
                    {[{ label: "Yes", value: true }, { label: "No", value: false }].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setQuoteData({ ...quoteData, smoker: opt.value })}
                        className={`flex-1 py-2.5 rounded-lg border-2 font-medium text-sm transition-all ${
                          quoteData.smoker === opt.value
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-700 hover:border-brand-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Coverage Details */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Coverage details</h2>
              <p className="text-gray-600 mb-6">Choose your desired coverage amount and health status</p>

              <div className="space-y-6">
                {/* Coverage Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {coverageAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setQuoteData({ ...quoteData, coverageAmount: amount })}
                        className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                          quoteData.coverageAmount === amount
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-700 hover:border-brand-300"
                        }`}
                      >
                        ${amount >= 1000000 ? `${amount / 1000000}M` : `${amount / 1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Term Length (if Term Life) */}
                {quoteData.coverageType === "Term Life" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Term Length</label>
                    <div className="flex flex-wrap gap-3">
                      {termLengths.map((years) => (
                        <button
                          key={years}
                          onClick={() => setQuoteData({ ...quoteData, termLength: years })}
                          className={`py-2.5 px-5 rounded-xl border-2 font-semibold text-sm transition-all ${
                            quoteData.termLength === years
                              ? "border-brand-600 bg-brand-50 text-brand-700"
                              : "border-gray-200 text-gray-700 hover:border-brand-300"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overall Health Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Excellent", "Good", "Average", "Poor"] as HealthStatus[]).map((h) => (
                      <button
                        key={h}
                        onClick={() => setQuoteData({ ...quoteData, health: h })}
                        className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                          quoteData.health === h
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-gray-200 text-gray-700 hover:border-brand-300"
                        }`}
                      >
                        {h === "Excellent" ? "🌟 " : h === "Good" ? "✅ " : h === "Average" ? "⚡ " : "⚠️ "}{h}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Be honest — insurers verify health during underwriting</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!canProceedStep3}
                  className="flex-1 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  See My Quotes →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Your Estimated Quotes</h2>
              <p className="text-gray-600 mb-6">
                Based on: {quoteData.coverageType}, Age {quoteData.age}, {quoteData.state},{" "}
                ${quoteData.coverageAmount ? (quoteData.coverageAmount >= 1000000 ? `${quoteData.coverageAmount / 1000000}M` : `${quoteData.coverageAmount / 1000}K`) : ""} coverage
              </p>

              {/* Quote Tiers */}
              <div className="grid gap-4 mb-8">
                {quotes.map((quote, index) => (
                  <div
                    key={quote.tier}
                    className={`rounded-xl border-2 p-5 relative ${
                      index === 1
                        ? "border-brand-600 bg-brand-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {index === 1 && (
                      <span className="absolute -top-3 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{quote.tier}</h3>
                        <div className="text-3xl font-extrabold text-brand-700 mt-1">
                          ${quote.monthly.toFixed(2)}
                          <span className="text-base font-normal text-gray-500">/mo</span>
                        </div>
                      </div>
                      <button className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        index === 1 ? "bg-brand-600 text-white hover:bg-brand-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition-colors`}>
                        Select Plan
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {quote.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-green-500 font-bold">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-xs text-amber-800">
                <strong>Estimated rates only.</strong> Final premiums are determined after full underwriting review. Rates shown are illustrative based on the information provided.
              </div>

              {/* Lead Capture */}
              {!submitted ? (
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-1">Get Full Quote Details</h3>
                  <p className="text-sm text-gray-600 mb-4">Enter your contact info to receive detailed carrier quotes and speak with a licensed advisor.</p>
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <input
                      type="email"
                      placeholder="Your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "See Full Quote Details →"}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      No spam. No obligation. We respect your privacy.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-2">🎉</div>
                  <h3 className="font-bold text-green-900 text-lg mb-1">You're all set!</h3>
                  <p className="text-green-800 text-sm">
                    Thank you! A licensed advisor will reach out within 24 hours with your full quote details.
                  </p>
                </div>
              )}

              <button
                onClick={() => setStep(3)}
                className="mt-4 text-sm text-gray-500 hover:text-brand-700 transition-colors underline"
              >
                ← Adjust my information
              </button>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span>🔒 SSL Encrypted</span>
          <span>✅ No obligation</span>
          <span>📞 Licensed advisors</span>
          <span>🛡️ A+ rated carriers</span>
        </div>
      </div>
    </div>
  );
}
