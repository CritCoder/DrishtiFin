import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, Search, TrendingUp, Shield, ArrowRight, Building2, Award, Clock, Target } from "lucide-react"

export default function EmployersPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">For Employers</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access India's largest pool of skilled, government-trained professionals ready to contribute to your
              organization.
            </p>
            <Button size="lg" asChild>
              <Link href="/login">
                Access Talent Pool <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Hire from DRISHTI?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get access to pre-screened, skilled candidates who have completed rigorous government-backed training
              programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Verified Skills</h3>
              <p className="text-sm text-muted-foreground">
                All candidates have completed certified training programs with verified competencies
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Large Talent Pool</h3>
              <p className="text-sm text-muted-foreground">
                Access to thousands of skilled professionals across multiple domains
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Government-backed training ensures consistent quality and industry relevance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Faster Hiring</h3>
              <p className="text-sm text-muted-foreground">
                Streamlined process reduces time-to-hire with pre-screened candidates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple Hiring Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From registration to onboarding, we've streamlined the entire hiring process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Register</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your employer account and complete verification
              </p>
              <Badge variant="secondary">1 day</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Search</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse candidates by skills, location, and experience
              </p>
              <Badge variant="secondary">Real-time</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Interview</h3>
              <p className="text-sm text-muted-foreground mb-4">Conduct interviews with shortlisted candidates</p>
              <Badge variant="secondary">Your timeline</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold mb-2">Hire</h3>
              <p className="text-sm text-muted-foreground mb-4">Make offers and track placement success</p>
              <Badge variant="secondary">Ongoing</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to find, evaluate, and hire the right talent for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Search className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Advanced Search</CardTitle>
                <CardDescription>Find candidates with precision</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Skill-based filtering</li>
                  <li>• Location preferences</li>
                  <li>• Experience levels</li>
                  <li>• Certification status</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Verified Profiles</CardTitle>
                <CardDescription>Pre-screened candidate information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Training completion status</li>
                  <li>• Skill assessments</li>
                  <li>• Project portfolios</li>
                  <li>• Reference checks</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Hiring Analytics</CardTitle>
                <CardDescription>Data-driven hiring insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Placement success rates</li>
                  <li>• Time-to-hire metrics</li>
                  <li>• Candidate performance</li>
                  <li>• Market benchmarks</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Company Branding</CardTitle>
                <CardDescription>Showcase your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Company profile pages</li>
                  <li>• Job posting templates</li>
                  <li>• Brand visibility</li>
                  <li>• Employer ratings</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Placement Tracking</CardTitle>
                <CardDescription>Monitor hiring outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Onboarding progress</li>
                  <li>• Employee retention</li>
                  <li>• Performance tracking</li>
                  <li>• Feedback collection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Bulk Hiring</CardTitle>
                <CardDescription>Scale your recruitment efforts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Mass recruitment campaigns</li>
                  <li>• Batch processing</li>
                  <li>• Automated workflows</li>
                  <li>• Team collaboration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how leading companies have successfully hired through DRISHTI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">TechCorp Solutions</CardTitle>
                    <CardDescription>IT Services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "Hired 50+ web developers through DRISHTI. The quality of candidates and their readiness to contribute
                  immediately was impressive."
                </p>
                <div className="flex justify-between text-sm">
                  <span>Hired:</span>
                  <span className="font-medium">52 candidates</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Digital Marketing Pro</CardTitle>
                    <CardDescription>Marketing Agency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "Found skilled digital marketers who understood both strategy and execution. The hiring process was
                  smooth and efficient."
                </p>
                <div className="flex justify-between text-sm">
                  <span>Hired:</span>
                  <span className="font-medium">28 candidates</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">DataInsights Inc</CardTitle>
                    <CardDescription>Analytics Company</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "The data analysts we hired had strong foundational skills and adapted quickly to our specific tools
                  and processes."
                </p>
                <div className="flex justify-between text-sm">
                  <span>Hired:</span>
                  <span className="font-medium">15 candidates</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Great Hire?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of companies already hiring skilled professionals through DRISHTI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/login">Access Talent Pool</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/help/contact">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
