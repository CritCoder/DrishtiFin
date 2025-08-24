import { PublicLayout } from "@/components/public-layout"
import Link from "next/link"

export default function SitemapPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-primary hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-primary hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="text-primary hover:underline">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/employers" className="text-primary hover:underline">
                    Employers
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-primary hover:underline">
                    News
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/how-it-works" className="text-primary hover:underline">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works/training-partners" className="text-primary hover:underline">
                    Training Partners
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works/students" className="text-primary hover:underline">
                    Students
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works/employers" className="text-primary hover:underline">
                    Employers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Transparency</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/transparency" className="text-primary hover:underline">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="/transparency/sla" className="text-primary hover:underline">
                    SLA Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/transparency/open-data" className="text-primary hover:underline">
                    Open Data
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-primary hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/help/faq" className="text-primary hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help/contact" className="text-primary hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-primary hover:underline">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Developers</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/developers" className="text-primary hover:underline">
                    Developer Portal
                  </Link>
                </li>
                <li>
                  <Link href="/developers/api" className="text-primary hover:underline">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Legal</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/legal/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="text-primary hover:underline">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link href="/rti" className="text-primary hover:underline">
                    RTI
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
