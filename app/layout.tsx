import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://insurequote.com"),
  title: {
    default: "InsureQuote — See Your Insurance Rates in 60 Seconds",
    template: "%s | InsureQuote",
  },
  description:
    "Compare personalized insurance rates instantly. Life, health, auto, and home — A-rated carriers, no sales calls, no obligation.",
  openGraph: {
    type: "website",
    siteName: "InsureQuote",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InsureQuote",
  url: "https://insurequote.com",
  description: "Licensed insurance marketplace for free rate comparison",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "InsureQuote",
  url: "https://insurequote.com",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://insurequote.com/learn?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main>{children}</main>
        <footer className="bg-neutral-900 text-neutral-400 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold mb-4">InsureQuote</h3>
              <p className="text-sm leading-relaxed">
                Compare rates from A-rated carriers. Free, no obligation, no sales calls.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Insurance</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/insurance/life-insurance" className="hover:text-white transition-colors">Life Insurance</Link></li>
                <li><Link href="/insurance/life-insurance/term-life-insurance" className="hover:text-white transition-colors">Term Life</Link></li>
                <li><Link href="/insurance/life-insurance/whole-life-insurance" className="hover:text-white transition-colors">Whole Life</Link></li>
                <li><Link href="/insurance/health-insurance" className="hover:text-white transition-colors">Health Insurance</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/learn" className="hover:text-white transition-colors">Learning Center</Link></li>
                <li><Link href="/quote" className="hover:text-white transition-colors">See My Rates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Trust</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-neutral-400">A+ Rated Carriers</li>
                <li className="text-neutral-400">SSL Encrypted</li>
                <li className="text-neutral-400">Licensed Advisors</li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">States</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/insurance/florida" className="hover:text-white transition-colors">Florida</Link></li>
                <li><Link href="/insurance/california" className="hover:text-white transition-colors">California</Link></li>
                <li><Link href="/insurance/texas" className="hover:text-white transition-colors">Texas</Link></li>
                <li><Link href="/insurance/new-york" className="hover:text-white transition-colors">New York</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 text-center py-4 text-xs">
            © {new Date().getFullYear()} InsureQuote. Licensed insurance marketplace. Rates shown are estimates only.
          </div>
        </footer>
      </body>
    </html>
  );
}
