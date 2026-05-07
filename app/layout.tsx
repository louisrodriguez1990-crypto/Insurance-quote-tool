import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://bestquote.io"),
  title: {
    default: "BestQuote - Life Insurance Coverage Calculators",
    template: "%s | BestQuote",
  },
  description:
    "Localized life insurance coverage calculators for SBA loans, mortgage protection, and final expense planning.",
  openGraph: {
    type: "website",
    siteName: "BestQuote",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BestQuote",
  url: "https://bestquote.io",
  description: "Licensed educational life insurance resource with deterministic coverage calculators",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BestQuote",
  url: "https://bestquote.io",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <Header />
        <main>{children}</main>
        <footer className="bg-neutral-900 text-neutral-400 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold mb-4">BestQuote</h3>
              <p className="text-sm leading-relaxed">
                Deterministic life insurance education reviewed by a licensed resident producer.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Calculators</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Main Workflow</Link></li>
                <li><Link href="/sba-loan-life-insurance/florida" className="hover:text-white transition-colors">SBA Education</Link></li>
                <li><Link href="/guaranteed-issue-final-expense/florida" className="hover:text-white transition-colors">Final Expense Education</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/insurance/life-insurance" className="hover:text-white transition-colors">Life Insurance Guide</Link></li>
                <li><Link href="/learn" className="hover:text-white transition-colors">Learning Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Trust</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-neutral-400">Licensed agent reviewed</li>
                <li className="text-neutral-400">Verification available</li>
                <li className="text-neutral-400">Application support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">States</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sba-loan-life-insurance/florida" className="hover:text-white transition-colors">Florida</Link></li>
                <li><Link href="/sba-loan-life-insurance/texas" className="hover:text-white transition-colors">Texas</Link></li>
                <li><Link href="/sba-loan-life-insurance/california" className="hover:text-white transition-colors">California</Link></li>
                <li><Link href="/sba-loan-life-insurance/north-carolina" className="hover:text-white transition-colors">North Carolina</Link></li>
                <li><Link href="/sba-loan-life-insurance/south-carolina" className="hover:text-white transition-colors">South Carolina</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 text-center py-4 text-xs">
            © {new Date().getFullYear()} BestQuote. Educational estimates only. Formal applications are submitted by a licensed agent.
          </div>
        </footer>
      </body>
    </html>
  );
}
