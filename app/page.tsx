"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheckIcon,
  BuildingLibraryIcon,
  HeartIcon,
  TruckIcon,
  HomeIcon,
  UsersIcon,
  StarIcon,
  LockClosedIcon,
  CheckIcon,
  ArrowRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

const coverageTypes = [
  { label: "Term Life",  Icon: ShieldCheckIcon,    desc: "Fixed-term protection from $15/mo" },
  { label: "Whole Life", Icon: BuildingLibraryIcon, desc: "Lifetime coverage with cash value" },
  { label: "Health",     Icon: HeartIcon,           desc: "Medical coverage for your family" },
  { label: "Auto",       Icon: TruckIcon,           desc: "Car insurance from $45/mo" },
  { label: "Home",       Icon: HomeIcon,            desc: "Protect your home & belongings" },
];

function HeroCoverageSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-lg p-6 md:p-8">
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
        What type of coverage?
      </p>
      <div className="space-y-2 mb-6">
        {coverageTypes.map(({ label, Icon, desc }) => (
          <button
            key={label}
            onClick={() => setSelected(label)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
              selected === label
                ? "border-brand-700 bg-brand-50"
                : "border-neutral-200 hover:border-brand-200 hover:bg-neutral-50"
            }`}
          >
            <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
              selected === label ? "bg-brand-100" : "bg-neutral-100"
            }`}>
              <Icon className={`w-5 h-5 ${selected === label ? "text-brand-700" : "text-neutral-500"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${selected === label ? "text-brand-900" : "text-neutral-800"}`}>
                {label}
              </p>
              <p className="text-xs text-neutral-500 truncate">{desc}</p>
            </div>
            {selected === label && (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cta flex items-center justify-center">
                <CheckIcon className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      <Link
        href={selected ? `/quote?type=${encodeURIComponent(selected)}` : "#"}
        onClick={(e) => { if (!selected) e.preventDefault(); }}
        className={`block w-full text-center font-semibold py-3.5 rounded-xl transition-colors ${
          selected
            ? "bg-cta hover:bg-cta-hover text-white"
            : "bg-neutral-100 text-neutral-400 cursor-default"
        }`}
      >
        See My Rates →
      </Link>
      <p className="text-center text-xs text-neutral-400 mt-3">
        No credit card · No spam · 60 seconds
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white border-b border-neutral-200 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-neutral-100 rounded-full px-4 py-1.5 text-sm text-neutral-700 font-medium mb-6">
              <ShieldCheckIcon className="w-4 h-4 text-cta" />
              50,000+ families protected
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight tracking-tight mb-5">
              See Your Life Insurance<br className="hidden md:block" /> Rates in 60 Seconds
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              Compare personalized rates from A-rated carriers. No sales calls. No obligation. Just your number.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="text-neutral-600"><strong className="text-neutral-900">$22/mo</strong> avg term life rate</span>
              <span className="text-neutral-300 hidden sm:inline">|</span>
              <span className="text-neutral-600"><strong className="text-neutral-900">A+ rated</strong> carrier partners</span>
              <span className="text-neutral-300 hidden sm:inline">|</span>
              <span className="text-neutral-600"><strong className="text-neutral-900">2 min</strong> to complete</span>
            </div>
          </div>
          <HeroCoverageSelector />
        </div>
      </section>

      {/* ── Proof Bar ── */}
      <section className="bg-brand-900 py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-3">
          {[
            { Icon: UsersIcon,       label: <><strong className="text-white">50,000+</strong> <span className="text-brand-200">families protected</span></> },
            { Icon: StarIcon,        label: <><strong className="text-white">4.8 / 5</strong> <span className="text-brand-200">average advisor rating</span></> },
            { Icon: ShieldCheckIcon, label: <><strong className="text-white">A+ rated</strong> <span className="text-brand-200">carrier partners only</span></> },
            { Icon: LockClosedIcon,  label: <><strong className="text-white">SSL encrypted</strong> <span className="text-brand-200">· no spam · no obligation</span></> },
          ].map(({ Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-brand-200">
              <Icon className="w-4 h-4 text-brand-200 flex-shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 md:py-20 px-4 bg-brand-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">How It Works</h2>
            <p className="text-neutral-600 text-lg">Three steps to your personalized rates</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose Your Coverage", desc: "Select the type of insurance and coverage amount that fits your situation." },
              { step: "2", title: "Tell Us About You",    desc: "Answer a few quick questions about your age, health, and location. No medical exam required." },
              { step: "3", title: "See Your Rates",       desc: "Get personalized estimates from A-rated carriers instantly, side by side." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-900 text-white font-bold text-lg flex items-center justify-center mx-auto mb-5">
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              See My Rates <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Coverage Types ── */}
      <section className="py-16 md:py-20 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Coverage for Every Stage of Life</h2>
            <p className="text-neutral-600 text-lg">Compare options across all major insurance types</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: ShieldCheckIcon,    title: "Term Life Insurance",  desc: "Affordable coverage for 10–30 years. Protect your family's income and mortgage.", badge: "Most Popular", href: "/insurance/life-insurance/term-life-insurance", from: "from $15/mo" },
              { Icon: BuildingLibraryIcon, title: "Whole Life Insurance", desc: "Permanent coverage that builds cash value over time. Never expires.",               badge: null,          href: "/insurance/life-insurance/whole-life-insurance", from: "from $85/mo" },
              { Icon: HeartIcon,           title: "Health Insurance",     desc: "Individual and family plans for medical, dental, and vision coverage.",             badge: "Best Value",   href: "/insurance/health-insurance",                   from: "from $180/mo" },
              { Icon: TruckIcon,           title: "Auto Insurance",       desc: "State-required and comprehensive coverage for your vehicle.",                       badge: null,          href: "/quote?type=Auto",                               from: "from $45/mo" },
              { Icon: HomeIcon,            title: "Home Insurance",       desc: "Protect your home and belongings against damage, theft, and liability.",            badge: null,          href: "/quote?type=Home",                               from: "from $75/mo" },
              { Icon: UsersIcon,           title: "Life Insurance by Age",desc: "Rates and coverage recommendations tailored to your age and life stage.",           badge: null,          href: "/insurance/life-insurance/35-year-old",          from: null },
            ].map(({ Icon, title, desc, badge, href, from }) => (
              <div key={title} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:border-brand-700 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-700" />
                  </div>
                  {badge && (
                    <span className="bg-cta-light text-cta-text text-xs font-semibold px-2.5 py-1 rounded-full">
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2">{title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center justify-between">
                  {from && <span className="text-xs text-neutral-500">{from}</span>}
                  <Link href={href} className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors flex items-center gap-1 ml-auto">
                    See Rates <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why BestQuote ── */}
      <section className="py-16 md:py-20 px-4 bg-brand-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Why Families Choose BestQuote</h2>
            <div className="space-y-6">
              {[
                { Icon: LockClosedIcon,  title: "Your Privacy is Protected",  desc: "Your information is encrypted and never sold to third parties. We use it only to generate your rates." },
                { Icon: ShieldCheckIcon, title: "A-Rated Carriers Only",      desc: "Every carrier in our network holds an A or better AM Best rating — so you know they'll be there when you need them." },
                { Icon: UserIcon,        title: "Licensed Advisor Support",   desc: "Real licensed advisors available to answer questions at no charge. No pushy sales tactics." },
                { Icon: CheckIcon,       title: "No Obligation, Ever",        desc: "See your rates in 60 seconds. No commitment, no credit card, no spam. Just your number." },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{title}</h3>
                    <p className="text-brand-200 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brand-800 rounded-2xl border border-brand-700 p-8">
            <p className="text-xs font-semibold text-brand-200 uppercase tracking-wider mb-5">Our Carrier Partners</p>
            <div className="grid grid-cols-2 gap-3">
              {["Nationwide", "Prudential", "MetLife", "AIG", "Pacific Life", "Banner Life", "Protective", "Lincoln"].map((name) => (
                <div key={name} className="bg-brand-700 border border-brand-600 rounded-lg px-4 py-3 text-sm font-medium text-white text-center">
                  {name}
                </div>
              ))}
            </div>
            <p className="text-xs text-brand-300 mt-4">All carriers rated A or better by AM Best</p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 md:py-20 px-4 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <StarSolid key={i} className="w-5 h-5 text-yellow-400" />)}
              </div>
              <span className="text-sm font-semibold text-neutral-700">4.8 out of 5</span>
              <span className="text-sm text-neutral-500">· 1,200+ verified reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Michael T.", location: "Austin, TX",    coverage: "Term Life · $750K", quote: "I was dreading the process but it took less than 5 minutes. Got a $750K policy for $31/month — way less than I expected." },
              { name: "Sarah L.",   location: "Orlando, FL",   coverage: "Term Life · $500K", quote: "As a new mom I needed coverage fast. BestQuote showed me options from three carriers side by side. Clear, simple, no pressure." },
              { name: "David K.",   location: "Chicago, IL",   coverage: "Whole Life · $250K", quote: "My advisor walked me through the difference between term and whole life. Ended up with the right policy at a price I'm comfortable with." },
            ].map(({ name, location, coverage, quote }) => (
              <div key={name} className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <StarSolid key={i} className="w-4 h-4 text-yellow-400" />)}
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed mb-5">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm flex-shrink-0">
                    {name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">{name}</p>
                    <p className="text-xs text-neutral-500">{location}</p>
                  </div>
                  <span className="ml-auto flex-shrink-0 text-xs bg-cta-light text-cta-text px-2 py-0.5 rounded-full font-medium">
                    {coverage}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-3">Verified customer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by State ── */}
      <section className="py-12 px-4 bg-white border-t border-neutral-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 text-center">Life Insurance by State</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              ["Florida","florida"], ["California","california"], ["Texas","texas"],
              ["New York","new-york"], ["Illinois","illinois"], ["Pennsylvania","pennsylvania"],
              ["Ohio","ohio"], ["Georgia","georgia"], ["North Carolina","north-carolina"],
              ["Michigan","michigan"], ["New Jersey","new-jersey"], ["Virginia","virginia"],
            ].map(([name, slug]) => (
              <Link key={slug} href={`/insurance/${slug}`}
                className="text-sm text-neutral-600 hover:text-brand-700 hover:bg-brand-50 px-3 py-1.5 rounded-lg border border-neutral-200 transition-all">
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 md:py-20 px-4 bg-brand-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Protect Your Family Today</h2>
          <p className="text-brand-200 text-lg mb-8">
            See your personalized rates in 60 seconds. Completely free, no obligation.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            See My Rates <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <p className="text-brand-300 text-sm mt-5">No credit card. No spam. Rates shown in seconds.</p>
        </div>
      </section>
    </>
  );
}
