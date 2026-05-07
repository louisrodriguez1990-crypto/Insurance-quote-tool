import Link from "next/link";
import { ArrowRightIcon, UserIcon } from "@heroicons/react/24/outline";

export function QuoteCTA(_: { state?: string; intent?: string } = {}) {
  return (
    <div className="bg-brand-900 rounded-xl p-8 my-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Start the main workflow</h3>
          <p className="text-brand-200 text-sm">
            Answer the same questions an agent would ask, see an estimated range, then schedule only if the numbers make sense.
          </p>
        </div>
        <Link
          href="/"
          className="flex-shrink-0 bg-cta hover:bg-cta-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-center whitespace-nowrap"
        >
          Begin Workflow
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 pt-5 border-t border-white/10">
        <span className="text-xs text-brand-200 flex items-center gap-1.5">
          <UserIcon className="w-3 h-3" /> Estimate before agent handoff
        </span>
      </div>
    </div>
  );
}
