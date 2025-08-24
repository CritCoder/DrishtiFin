import { PublicLayout } from "@/components/public-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-6">General Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="what-is-drishti">
                  <AccordionTrigger>What is DRISHTI?</AccordionTrigger>
                  <AccordionContent>
                    DRISHTI is a comprehensive training partner management system developed by the Government of India
                    to streamline skill development programs, manage training partners, and track student placements.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="who-can-use">
                  <AccordionTrigger>Who can use the DRISHTI platform?</AccordionTrigger>
                  <AccordionContent>
                    The platform is designed for training partners, students, employers, government officials, and
                    auditors involved in skill development programs under various government schemes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="system-requirements">
                  <AccordionTrigger>What are the system requirements?</AccordionTrigger>
                  <AccordionContent>
                    DRISHTI is a web-based platform that works on modern browsers including Chrome, Firefox, Safari, and
                    Edge. No additional software installation is required.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Training Partners</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="tp-registration">
                  <AccordionTrigger>How do I register as a training partner?</AccordionTrigger>
                  <AccordionContent>
                    Visit the training partner registration page, fill out the required information including
                    organization details, upload necessary documents, and submit for approval. The process typically
                    takes 7-10 business days.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tp-documents">
                  <AccordionTrigger>What documents are required for registration?</AccordionTrigger>
                  <AccordionContent>
                    Required documents include: Certificate of Incorporation, PAN Card, GST Registration, Bank Account
                    Details, Infrastructure Photos, and Trainer Qualification Certificates.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tp-payments">
                  <AccordionTrigger>How does the payment system work?</AccordionTrigger>
                  <AccordionContent>
                    Payments are milestone-based: 33% on batch start, 33% on mid-training assessment completion, and 34%
                    on successful placement verification. All payments are processed electronically.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Students</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="student-enrollment">
                  <AccordionTrigger>How do I enroll in a training program?</AccordionTrigger>
                  <AccordionContent>
                    Browse available programs, select a training center near you, complete the online application,
                    upload required documents, and attend the counseling session at the designated center.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="student-eligibility">
                  <AccordionTrigger>What are the eligibility criteria?</AccordionTrigger>
                  <AccordionContent>
                    Eligibility varies by program but generally includes age requirements (18-35 years), educational
                    qualifications (minimum 8th standard), and income criteria as per government guidelines.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="student-certificates">
                  <AccordionTrigger>How do I get my training certificate?</AccordionTrigger>
                  <AccordionContent>
                    Certificates are issued upon successful completion of training and assessment. Digital certificates
                    are available for download from your student dashboard, and physical certificates are provided by
                    the training center.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
