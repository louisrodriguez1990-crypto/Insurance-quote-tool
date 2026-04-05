import Link from "next/link";
import { LockClosedIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";

export function QuoteCTA({ state }: { state?: string }) {
  const href = state ? `/quote?state=${state}` : "/quote";
  return (
    <div className="bg-brand-900 rounded-2xl p-8 my-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            See Your Personalized Rates
          </h3>
          <p className="text-brand-200 text-sm">
            Compare quotes from A-rated carriers. Takes 2 minutes. No obligation.
          </p>
        </div>
        <Link
          href={href}
          className="flex-shrink-0 bg-cta hover:bg-cta-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block text-center whitespace-nowrap"
        >
          See My Rates →
        </Link>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 pt-5 border-t border-white/10">
        <span className="text-xs text-brand-200 flex items-center gap-1.5">
          <LockClosedIcon className="w-3 h-3" /> SSL Encrypted
        </span>
        <span className="text-xs text-brand-200 flex items-center gap-1.5">
          <ShieldCheckIcon className="w-3 h-3" /> A+ Rated Carriers
        </span>
        <span className="text-xs text-brand-200 flex items-center gap-1.5">
          <UserIcon className="w-3 h-3" /> Licensed Advisors
        </span>
      </div>
    </div>
  );
}
