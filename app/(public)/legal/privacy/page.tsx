import { PublicLayout } from "@/components/public-layout"

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p>DRISHTI collects information necessary to provide training partner management services:</p>
              <ul>
                <li>Personal identification information (name, email, phone number)</li>
                <li>Professional information (organization details, qualifications)</li>
                <li>Training and placement data</li>
                <li>Financial information for payment processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
              <p>Information is used to:</p>
              <ul>
                <li>Manage training partner registrations and approvals</li>
                <li>Process payments and track milestones</li>
                <li>Generate reports and analytics</li>
                <li>Ensure compliance with government regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your information against unauthorized access,
                alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>For privacy-related questions, contact us at privacy@drishti.gov.in</p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
