import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BarChart3, FileText, Users, TrendingUp, ArrowRight, Shield, Clock, CheckCircle } from "lucide-react"

export default function TransparencyPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparency & Accountability</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Open data, clear processes, and public accountability in all DRISHTI operations and outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Real-Time Performance Metrics</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Live data showing the impact and effectiveness of DRISHTI programs across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-primary">50,247</CardTitle>
                <CardDescription>Students Trained</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-xs">
                  +12% this month
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-primary">78.3%</CardTitle>
                <CardDescription>Placement Rate</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-xs">
                  +3.2% this quarter
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-primary">189</CardTitle>
                <CardDescription>Active Training Partners</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-xs">
                  +8 this month
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-primary">₹4.2L</CardTitle>
                <CardDescription>Average Starting Salary</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-xs">
                  +8% this year
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="/transparency/open-data">
                View Detailed Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Transparency Initiatives */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Transparency Initiatives</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive measures to ensure accountability and public trust in government skill development programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Open Data Portal</CardTitle>
                <CardDescription>Public access to program data and outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time access to training statistics, placement rates, partner performance, and financial data.
                  Updated daily with comprehensive analytics.
                </p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/transparency/open-data">Access Data Portal</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Service Level Agreements</CardTitle>
                <CardDescription>Committed timelines and quality standards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Public SLAs for all services including partner verification, student enrollment, and placement
                  support. Live monitoring of performance against commitments.
                </p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/transparency/sla">View SLA Dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Public Reports</CardTitle>
                <CardDescription>Regular reporting on program effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monthly, quarterly, and annual reports on program outcomes, financial utilization, and impact
                  assessment. All reports are publicly available.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Download Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Audit & Compliance</CardTitle>
                <CardDescription>Independent verification and oversight</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Regular third-party audits, compliance monitoring, and public disclosure of findings. Corrective
                  actions are tracked and reported.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  View Audit Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Stakeholder Feedback</CardTitle>
                <CardDescription>Public input and grievance mechanisms</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Open channels for feedback from students, training partners, and employers. Public grievance redressal
                  with transparent resolution tracking.
                </p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/help/grievances">Submit Feedback</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Impact Assessment</CardTitle>
                <CardDescription>Measuring long-term program effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive impact studies tracking career progression, salary growth, and economic outcomes of
                  program participants over time.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  View Impact Studies
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Financial Transparency</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete visibility into program funding, expenditure, and financial outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Budget Allocation 2024-25</CardTitle>
                <CardDescription>Total allocated budget: ₹2,847 Crores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training Partner Payments</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-16 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Infrastructure Development</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-6 h-2 bg-secondary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technology & Operations</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-3 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monitoring & Evaluation</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-1 h-2 bg-chart-4 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Expenditure Status</CardTitle>
                <CardDescription>As of December 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Overall Utilization</span>
                      <span className="text-sm font-medium">73.2%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full">
                      <div className="w-3/4 h-3 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">₹2,084 Cr</div>
                      <div className="text-sm text-muted-foreground">Utilized</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-muted-foreground">₹763 Cr</div>
                      <div className="text-sm text-muted-foreground">Remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Recent Transparency Updates</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Latest releases and updates to our transparency initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Release Notes</Badge>
                  <span className="text-sm text-muted-foreground">Dec 15, 2024</span>
                </div>
                <CardTitle>Enhanced Data Portal with Real-time Analytics</CardTitle>
                <CardDescription>New features for better data accessibility and visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The open data portal now includes real-time analytics, interactive dashboards, and downloadable
                  datasets. Users can now create custom reports and track trends over time.
                </p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/transparency/release-notes">View Release Notes</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Audit Report</Badge>
                  <span className="text-sm text-muted-foreground">Dec 10, 2024</span>
                </div>
                <CardTitle>Q3 2024 Independent Audit Results</CardTitle>
                <CardDescription>Third-party assessment of program effectiveness and compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The quarterly audit shows 96% compliance with established standards and identifies areas for
                  improvement in partner monitoring and student tracking systems.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Committed to Transparency</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We believe in open governance and public accountability. Explore our data, provide feedback, and help us
            improve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/transparency/open-data">Explore Open Data</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/help/grievances">Submit Feedback</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
