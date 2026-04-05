import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InsureQuote — Free Insurance Quotes in Minutes",
  description:
    "Compare personalized insurance quotes instantly. Life, health, auto, and home insurance — free quotes with no obligation. Join 50,000+ Americans who saved with InsureQuote.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="text-yellow-300">★</span>
            <span>Trusted by 50,000+ Americans</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Find the Best Insurance<br />Rates in Minutes
          </h1>
          <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
            Compare personalized quotes from top-rated carriers. Life, health, auto, and home insurance — all in one place, completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-brand-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-brand-50 transition-colors shadow-lg"
            >
              Get My Free Quote →
            </Link>
            <Link
              href="/learn"
              className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors"
            >
              Learn About Insurance
            </Link>
          </div>
          {/* Trust badges */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { stat: "50,000+", label: "Happy customers" },
              { stat: "A+ Rated", label: "Carrier partners" },
              { stat: "2 Minutes", label: "To get a quote" },
              { stat: "100% Free", label: "No obligation" },
            ].map((badge) => (
              <div key={badge.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl font-bold">{badge.stat}</div>
                <div className="text-brand-200 text-sm">{badge.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How InsureQuote Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Getting the right insurance coverage has never been easier. Just 3 simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: "📋",
                title: "Tell Us About Yourself",
                description: "Answer a few quick questions about your age, health, and coverage needs. It takes less than 2 minutes.",
              },
              {
                step: "2",
                icon: "🔍",
                title: "Compare Quotes",
                description: "We instantly calculate personalized rates from top-rated carriers. See Basic, Standard, and Premium options side by side.",
              },
              {
                step: "3",
                icon: "✅",
                title: "Get Covered",
                description: "Choose the plan that fits your budget and needs. Our licensed advisors are available to help you finalize your coverage.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/quote"
              className="bg-brand-600 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-brand-700 transition-colors inline-block"
            >
              Start My Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Insurance Type Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Insurance Products</h2>
            <p className="text-gray-600 text-lg">Comprehensive coverage options for every stage of life.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Life Insurance",
                description: "Protect your family's financial future. Term and whole life options starting at $15/month.",
                href: "/insurance/life-insurance",
                avgPremium: "From $15/mo",
                highlight: "Most Popular",
              },
              {
                icon: "❤️",
                title: "Health Insurance",
                description: "Comprehensive medical coverage for individuals and families. Compare ACA-compliant plans.",
                href: "/insurance/health-insurance",
                avgPremium: "From $180/mo",
                highlight: null,
              },
              {
                icon: "🏠",
                title: "Home Insurance",
                description: "Protect your biggest investment. Coverage for your home, belongings, and liability.",
                href: "/quote",
                avgPremium: "From $75/mo",
                highlight: null,
              },
              {
                icon: "🚗",
                title: "Auto Insurance",
                description: "Full coverage or liability only. Get competitive rates from top auto insurance carriers.",
                href: "/quote",
                avgPremium: "From $45/mo",
                highlight: null,
              },
              {
                icon: "📋",
                title: "Term Life Insurance",
                description: "The most affordable life insurance. Fixed premiums for 10, 15, 20, or 30 years.",
                href: "/insurance/life-insurance/term-life-insurance",
                avgPremium: "From $15/mo",
                highlight: "Best Value",
              },
              {
                icon: "💰",
                title: "Whole Life Insurance",
                description: "Lifetime coverage with a cash value component that grows tax-deferred over time.",
                href: "/insurance/life-insurance/whole-life-insurance",
                avgPremium: "From $85/mo",
                highlight: null,
              },
            ].map((product) => (
              <Link key={product.title} href={product.href} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-500 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{product.icon}</span>
                  {product.highlight && (
                    <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {product.highlight}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-600 font-semibold text-sm">{product.avgPremium}</span>
                  <span className="text-brand-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Real stories from real people who found better coverage.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "Austin, TX",
                quote: "I saved $47/month on my term life policy compared to what my employer offered. The process took less than 5 minutes and a licensed agent helped me every step of the way.",
                rating: 5,
                coverage: "Term Life, $500K",
              },
              {
                name: "James R.",
                location: "Orlando, FL",
                quote: "As a self-employed contractor, finding affordable health insurance was a nightmare. InsureQuote helped me compare plans side by side and I found great coverage within my budget.",
                rating: 5,
                coverage: "Health Insurance",
              },
              {
                name: "Maria L.",
                location: "San Diego, CA",
                quote: "My husband and I were looking for whole life insurance for estate planning. The team explained everything clearly and we got exactly what we needed without feeling pressured.",
                rating: 5,
                coverage: "Whole Life, $250K",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.location}</div>
                  </div>
                  <span className="text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded-full">
                    {testimonial.coverage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Thousands Choose InsureQuote
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: "🔒",
                    title: "Your Privacy is Protected",
                    description: "We never sell your personal information. Your data is encrypted and used only to generate accurate quotes.",
                  },
                  {
                    icon: "⚡",
                    title: "Instant Quote Comparison",
                    description: "See personalized rates from multiple top carriers in seconds — no waiting, no sales calls required.",
                  },
                  {
                    icon: "🎓",
                    title: "Educational Resources",
                    description: "Our Learning Center helps you understand your options with unbiased, expert-written guides.",
                  },
                  {
                    icon: "🤝",
                    title: "Licensed Advisor Support",
                    description: "Real licensed insurance agents are available to answer your questions and help you choose the right policy.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-3xl p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🏆</div>
                <h3 className="text-2xl font-bold text-brand-900">Carrier Partners</h3>
                <p className="text-brand-700 mt-2">We work with the industry's most trusted insurers</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Nationwide", "Prudential", "MetLife", "AIG",
                  "New York Life", "Lincoln National", "Pacific Life", "Principal",
                ].map((carrier) => (
                  <div key={carrier} className="bg-white rounded-lg p-3 text-center text-sm font-medium text-gray-700 shadow-sm">
                    {carrier}
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-700 text-center mt-4">All carriers rated A or better by AM Best</p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Insurance Rates by State</h2>
            <p className="text-gray-600">Insurance rates vary by state. Find rates specific to where you live.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: "California", slug: "california" },
              { name: "Texas", slug: "texas" },
              { name: "Florida", slug: "florida" },
              { name: "New York", slug: "new-york" },
              { name: "Illinois", slug: "illinois" },
              { name: "Pennsylvania", slug: "pennsylvania" },
              { name: "Ohio", slug: "ohio" },
              { name: "Georgia", slug: "georgia" },
              { name: "North Carolina", slug: "north-carolina" },
              { name: "Michigan", slug: "michigan" },
              { name: "New Jersey", slug: "new-jersey" },
              { name: "Virginia", slug: "virginia" },
            ].map((state) => (
              <Link
                key={state.slug}
                href={`/insurance/${state.slug}`}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-center hover:border-brand-500 hover:text-brand-700 transition-colors"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Protect What Matters Most?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join 50,000+ Americans who found better coverage at lower rates. Get your personalized quote in just 2 minutes — completely free.
          </p>
          <Link
            href="/quote"
            className="bg-brand-600 text-white font-bold px-12 py-5 rounded-xl text-xl hover:bg-brand-700 transition-colors inline-block shadow-lg"
          >
            Get My Free Quote Today →
          </Link>
          <p className="text-gray-400 text-sm mt-4">No credit card required. No spam. Cancel anytime.</p>
        </div>
      </section>
    </>
  );
}
