import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Users, GraduationCap, Building2, CheckCircle, ArrowDown } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How DRISHTI Works</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A comprehensive ecosystem connecting training partners, students, and employers through a unified
              platform.
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Complete Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From registration to employment, DRISHTI facilitates every step of the skill development process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Registration & Verification</h3>
              <p className="text-muted-foreground mb-6">
                Training partners register and undergo comprehensive verification including document validation and
                facility inspection.
              </p>
              <Button variant="outline" asChild>
                <Link href="/how-it-works/training-partners">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowDown className="h-8 w-8 text-muted-foreground rotate-90" />
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Training Delivery</h3>
              <p className="text-muted-foreground mb-6">
                Students enroll in programs, attend training sessions, and progress through structured learning pathways
                with continuous monitoring.
              </p>
              <Button variant="outline" asChild>
                <Link href="/how-it-works/students">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center md:col-span-3 mt-8">
              <ArrowDown className="h-8 w-8 text-muted-foreground" />
            </div>

            {/* Step 3 */}
            <div className="text-center md:col-start-2">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Employment Placement</h3>
              <p className="text-muted-foreground mb-6">
                Verified employers access the talent pool, conduct interviews, and hire skilled candidates with
                placement tracking and support.
              </p>
              <Button variant="outline" asChild>
                <Link href="/how-it-works/employers">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Cards */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">For Every Stakeholder</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              DRISHTI serves the unique needs of each participant in the skill development ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Training Partners</CardTitle>
                <CardDescription>Organizations delivering skill development programs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Streamlined registration process
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Student management tools
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Performance analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Payment milestone tracking
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/how-it-works/training-partners">Explore Features</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Students</CardTitle>
                <CardDescription>Individuals seeking skill development opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Easy program discovery
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Progress tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Certification management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Job placement support
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/how-it-works/students">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Employers</CardTitle>
                <CardDescription>Companies seeking skilled talent</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Access to verified talent
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Skill-based matching
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Hiring analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Placement tracking
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/how-it-works/employers">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology & Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Scale & Transparency</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology ensuring reliable, secure, and transparent operations across the entire ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-sm text-muted-foreground">Live tracking of training progress and outcomes</p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Automated Compliance</h3>
              <p className="text-sm text-muted-foreground">Built-in compliance checks and audit trails</p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Data Analytics</h3>
              <p className="text-sm text-muted-foreground">Comprehensive insights and performance metrics</p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">API Integration</h3>
              <p className="text-sm text-muted-foreground">Seamless integration with external systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the DRISHTI ecosystem and be part of India's skill development transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/tp/register">Register as Training Partner</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/programs">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
