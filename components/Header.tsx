"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-900 border-b border-brand-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          bestquote<span className="text-cta">.io</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-200">
          <Link href="/insurance/life-insurance" className="hover:text-white transition-colors">
            Life Insurance
          </Link>
          <Link href="/insurance/health-insurance" className="hover:text-white transition-colors">
            Health Insurance
          </Link>
          <Link href="/learn" className="hover:text-white transition-colors">
            Learn
          </Link>
          <Link
            href="/quote"
            className="bg-cta text-white px-4 py-2 rounded-lg hover:bg-cta-hover transition-colors font-semibold"
          >
            See My Rates
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-brand-200 hover:text-white"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-900 border-b border-brand-800 px-4 pb-5 space-y-3">
          <Link
            href="/insurance/life-insurance"
            className="block py-2 text-sm font-medium text-brand-200 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Life Insurance
          </Link>
          <Link
            href="/insurance/health-insurance"
            className="block py-2 text-sm font-medium text-brand-200 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Health Insurance
          </Link>
          <Link
            href="/learn"
            className="block py-2 text-sm font-medium text-brand-200 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Learn
          </Link>
          <Link
            href="/quote"
            className="block w-full text-center bg-cta text-white font-semibold px-4 py-3 rounded-lg hover:bg-cta-hover transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            See My Rates
          </Link>
        </div>
      )}
    </header>
  );
}
