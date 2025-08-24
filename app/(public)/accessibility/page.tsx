import { PublicLayout } from "@/components/public-layout"

export default function AccessibilityPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Accessibility Statement</h1>
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p>
                DRISHTI is committed to ensuring digital accessibility for people with disabilities. We continually
                improve the user experience for everyone and apply relevant accessibility standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to
                improve accessibility for people with disabilities. This website is partially conformant with WCAG 2.1
                level AA.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
              <ul>
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>High contrast color schemes</li>
                <li>Scalable text and images</li>
                <li>Alternative text for images</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of DRISHTI. Please contact us at
                accessibility@drishti.gov.in
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
