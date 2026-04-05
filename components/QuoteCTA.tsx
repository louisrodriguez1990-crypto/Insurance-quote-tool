import Link from "next/link";

export function QuoteCTA({ state }: { state?: string }) {
  const href = state ? `/quote?state=${state}` : "/quote";
  return (
    <div className="bg-brand-700 rounded-2xl p-8 text-white text-center my-10">
      <h3 className="text-2xl font-bold mb-2">Get Your Free Quote in 2 Minutes</h3>
      <p className="text-brand-100 mb-6">No spam. No obligation. Compare rates from top carriers.</p>
      <Link href={href} className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-lg hover:bg-brand-50 transition-colors inline-block">
        Get My Free Quote →
      </Link>
    </div>
  );
}
