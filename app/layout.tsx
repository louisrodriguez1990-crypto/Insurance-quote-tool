import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://insurequote.com"),
  title: {
    default: "InsureQuote — Free Insurance Quotes in Minutes",
    template: "%s | InsureQuote",
  },
  description:
    "Compare personalized insurance quotes instantly. Life, health, auto, and home insurance — free quotes with no obligation.",
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
  description: "Free insurance quote comparison tool",
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
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-brand-700">
              InsureQuote
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/insurance/life-insurance" className="hover:text-brand-700 transition-colors">Life Insurance</Link>
              <Link href="/insurance/health-insurance" className="hover:text-brand-700 transition-colors">Health Insurance</Link>
              <Link href="/learn" className="hover:text-brand-700 transition-colors">Learn</Link>
              <Link href="/quote" className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
                Get a Quote
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-400 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">InsureQuote</h3>
              <p className="text-sm">Free insurance quotes with no obligation. Compare rates from top providers.</p>
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
                <li><Link href="/quote" className="hover:text-white transition-colors">Get a Quote</Link></li>
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
          <div className="border-t border-gray-800 text-center py-4 text-xs">
            © {new Date().getFullYear()} InsureQuote. For informational purposes only. Not financial advice.
          </div>
        </footer>
      </body>
    </html>
  );
}
