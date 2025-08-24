import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, TrendingUp, Shield, ArrowRight, Building2, Award, Clock } from "lucide-react"

export default function EmployersPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hire from OSDA Talent Pool</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access India's largest pool of skilled, government-trained professionals ready to contribute to your
              organization's success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                50,000+ Skilled Candidates
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Government Verified
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                78% Average Placement Rate
              </Badge>
            </div>
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
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Verified Skills</CardTitle>
                <CardDescription>Government-certified competencies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  All candidates have completed certified training programs with verified competencies and practical
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Large Talent Pool</CardTitle>
                <CardDescription>Thousands of skilled professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Access to a diverse pool of candidates across multiple domains and skill levels from across India.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Quality Assured</CardTitle>
                <CardDescription>Consistent training standards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Government-backed training ensures consistent quality and industry relevance across all programs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Faster Hiring</CardTitle>
                <CardDescription>Streamlined recruitment process</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Reduce time-to-hire with pre-screened candidates and streamlined interview processes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Talent */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Available Talent Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Skilled professionals across various industries ready for immediate deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Technology</Badge>
                  <Badge className="bg-green-100 text-green-800">2,847 Available</Badge>
                </div>
                <CardTitle>Web Developers</CardTitle>
                <CardDescription>Full-stack developers with modern frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Avg. Experience:</span>
                    <span className="font-medium">6-12 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Placement Rate:</span>
                    <span className="font-medium text-primary">85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Salary:</span>
                    <span className="font-medium">₹4.2L</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-sm">Key Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      MongoDB
                    </Badge>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  View Candidates
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Analytics</Badge>
                  <Badge className="bg-green-100 text-green-800">1,523 Available</Badge>
                </div>
                <CardTitle>Data Analysts</CardTitle>
                <CardDescription>Data analysis and visualization specialists</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Avg. Experience:</span>
                    <span className="font-medium">5-10 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Placement Rate:</span>
                    <span className="font-medium text-primary">82%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Salary:</span>
                    <span className="font-medium">₹5.1L</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-sm">Key Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      SQL
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Tableau
                    </Badge>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  View Candidates
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Marketing</Badge>
                  <Badge className="bg-green-100 text-green-800">1,892 Available</Badge>
                </div>
                <CardTitle>Digital Marketers</CardTitle>
                <CardDescription>Digital marketing and social media experts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Avg. Experience:</span>
                    <span className="font-medium">4-8 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Placement Rate:</span>
                    <span className="font-medium text-primary">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Salary:</span>
                    <span className="font-medium">₹3.5L</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-sm">Key Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      SEO
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Google Ads
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Social Media
                    </Badge>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  View Candidates
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/login">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple Hiring Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From registration to onboarding, we've streamlined the entire hiring process for maximum efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Register & Verify</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your employer account and complete verification process
              </p>
              <Badge variant="secondary">1-2 days</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Search & Filter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse candidates by skills, location, experience, and other criteria
              </p>
              <Badge variant="secondary">Real-time</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Interview & Select</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Conduct interviews with shortlisted candidates and make selections
              </p>
              <Badge variant="secondary">Your timeline</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-foreground font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold mb-2">Hire & Track</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Make offers, onboard candidates, and track placement success
              </p>
              <Badge variant="secondary">Ongoing</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how leading companies have successfully hired through DRISHTI and transformed their teams.
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
                    <CardDescription>IT Services Company</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "We hired 50+ web developers through DRISHTI. The quality of candidates and their readiness to
                  contribute immediately was impressive. Our development velocity increased by 40%."
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Candidates Hired:</span>
                    <span className="font-medium">52</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Retention Rate:</span>
                    <span className="font-medium text-primary">94%</span>
                  </div>
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
                  smooth and we were able to scale our team quickly during peak season."
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Candidates Hired:</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time to Hire:</span>
                    <span className="font-medium text-primary">12 days</span>
                  </div>
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
                  and processes. They're now leading key client projects."
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Candidates Hired:</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Performance Rating:</span>
                    <span className="font-medium text-primary">4.8/5</span>
                  </div>
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
            Join hundreds of companies already hiring skilled professionals through DRISHTI and build your dream team.
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
