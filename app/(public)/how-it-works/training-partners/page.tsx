import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileCheck, Users, BarChart3, CreditCard, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react"

export default function TrainingPartnersPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">For Training Partners</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive tools and support to deliver high-quality training programs and manage your operations
              efficiently.
            </p>
            <Button size="lg" asChild>
              <Link href="/tp/register">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Registration Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A streamlined process to get you onboarded and ready to deliver training programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Application</h3>
              <p className="text-sm text-muted-foreground">Submit your organization details and required documents</p>
              <Badge variant="secondary" className="mt-2">
                2-3 days
              </Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. Verification</h3>
              <p className="text-sm text-muted-foreground">Document verification and facility inspection</p>
              <Badge variant="secondary" className="mt-2">
                5-7 days
              </Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. Approval</h3>
              <p className="text-sm text-muted-foreground">Final approval and platform access setup</p>
              <Badge variant="secondary" className="mt-2">
                1-2 days
              </Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">4. Onboarding</h3>
              <p className="text-sm text-muted-foreground">Training and support to get started</p>
              <Badge variant="secondary" className="mt-2">
                Ongoing
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your training programs effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Complete student lifecycle management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Enrollment and registration</li>
                  <li>• Attendance tracking</li>
                  <li>• Progress monitoring</li>
                  <li>• Certificate generation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Analytics & Reporting</CardTitle>
                <CardDescription>Data-driven insights for better outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Performance dashboards</li>
                  <li>• Placement rate tracking</li>
                  <li>• Financial reports</li>
                  <li>• Compliance monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Streamlined payment processing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Milestone-based payments</li>
                  <li>• Invoice generation</li>
                  <li>• Payment tracking</li>
                  <li>• Financial reconciliation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Document Management</CardTitle>
                <CardDescription>Secure document handling</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Digital document storage</li>
                  <li>• OCR processing</li>
                  <li>• Version control</li>
                  <li>• Audit trails</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Compliance Tools</CardTitle>
                <CardDescription>Built-in compliance management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Automated compliance checks</li>
                  <li>• Regulatory reporting</li>
                  <li>• Audit preparation</li>
                  <li>• Risk assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>Dedicated support when you need it</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Technical support</li>
                  <li>• Training resources</li>
                  <li>• Help documentation</li>
                  <li>• Community forums</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Eligibility Requirements</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ensure your organization meets these requirements before applying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Requirements</CardTitle>
                <CardDescription>Minimum criteria for all training partners</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span className="text-sm">Registered organization with valid GST</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span className="text-sm">Minimum 2 years of operational experience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span className="text-sm">Adequate training infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span className="text-sm">Qualified training staff</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation Required</CardTitle>
                <CardDescription>Documents needed for verification</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span className="text-sm">Certificate of Incorporation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span className="text-sm">GST Registration Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span className="text-sm">PAN Card and Bank Details</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span className="text-sm">Facility ownership/lease documents</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Partner with DRISHTI?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of training partners already delivering quality programs through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/tp/register">Start Registration</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/help/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
