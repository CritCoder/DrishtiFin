import { PublicLayout } from "@/components/public-layout"

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using the DRISHTI platform, you accept and agree to be bound by the terms and provision
                of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain confidentiality of account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Use the platform only for authorized purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Platform Usage</h2>
              <p>
                The DRISHTI platform is provided for government training program management. Unauthorized use is
                prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p>
                The Government of India shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
