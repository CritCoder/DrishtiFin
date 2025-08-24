import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"

export default function SLAPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Service Level Agreements</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our commitment to timely, quality service delivery with transparent performance monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* SLA Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Current SLA Performance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time monitoring of our service commitments and performance against established standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-green-600">94.2%</CardTitle>
                <CardDescription>Overall SLA Compliance</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  Above Target (90%)
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-blue-600">2.3</CardTitle>
                <CardDescription>Avg. Response Time (Days)</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                  Within Target (3 days)
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-primary">97.8%</CardTitle>
                <CardDescription>Customer Satisfaction</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-xs">
                  Excellent Rating
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <AlertTriangle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-amber-600">12</CardTitle>
                <CardDescription>Active Escalations</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                  Under Review
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed SLA Metrics */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Service-wise SLA Performance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Detailed breakdown of performance across different service categories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Training Partner Services</CardTitle>
                <CardDescription>Registration, verification, and support services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Application Processing</span>
                    <span className="text-sm text-muted-foreground">Target: 7 days</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={92} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      92%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 6.2 days</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Document Verification</span>
                    <span className="text-sm text-muted-foreground">Target: 3 days</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={88} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      88%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 3.1 days</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Support Response</span>
                    <span className="text-sm text-muted-foreground">Target: 24 hours</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={96} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      96%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 18 hours</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Services</CardTitle>
                <CardDescription>Enrollment, tracking, and placement support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Enrollment Processing</span>
                    <span className="text-sm text-muted-foreground">Target: 2 days</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={94} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      94%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 1.8 days</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Certificate Generation</span>
                    <span className="text-sm text-muted-foreground">Target: 5 days</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={91} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      91%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 4.7 days</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Placement Support</span>
                    <span className="text-sm text-muted-foreground">Target: 30 days</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={78} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                      78%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 32 days</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employer Services</CardTitle>
                <CardDescription>Registration, candidate matching, and hiring support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Account Verification</span>
                    <span className="text-sm text-muted-foreground">Target: 2 days</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={97} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      97%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 1.6 days</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Candidate Matching</span>
                    <span className="text-sm text-muted-foreground">Target: 1 day</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={89} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      89%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 1.2 days</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Hiring Support</span>
                    <span className="text-sm text-muted-foreground">Target: 24 hours</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={93} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      93%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 20 hours</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Services</CardTitle>
                <CardDescription>Platform availability, performance, and support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">System Uptime</span>
                    <span className="text-sm text-muted-foreground">Target: 99.5%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={99.7} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      99.7%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Above target</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Page Load Time</span>
                    <span className="text-sm text-muted-foreground">Target: &lt;3 seconds</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={92} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      92%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 2.4 seconds</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Technical Support</span>
                    <span className="text-sm text-muted-foreground">Target: 4 hours</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={87} className="flex-1" />
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      87%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg: 4.2 hours</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SLA Commitments */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Service Commitments</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Detailed service level agreements and quality standards we commit to maintaining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Commitments</CardTitle>
                <CardDescription>Maximum time to respond to requests and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Training Partner Application</span>
                    <Badge variant="outline">7 business days</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Document Verification</span>
                    <Badge variant="outline">3 business days</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Student Enrollment</span>
                    <Badge variant="outline">2 business days</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Employer Verification</span>
                    <Badge variant="outline">2 business days</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Support Queries</span>
                    <Badge variant="outline">24 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Technical Issues</span>
                    <Badge variant="outline">4 hours</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Standards</CardTitle>
                <CardDescription>Minimum quality benchmarks for all services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">System Availability</span>
                    <Badge variant="outline">99.5% uptime</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Data Accuracy</span>
                    <Badge variant="outline">99.9% accuracy</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Customer Satisfaction</span>
                    <Badge variant="outline">95% satisfaction</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">First Call Resolution</span>
                    <Badge variant="outline">85% resolution</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Security Compliance</span>
                    <Badge variant="outline">100% compliance</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Data Backup</span>
                    <Badge variant="outline">Daily backups</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Escalation Process */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">SLA Escalation Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Clear escalation path when service levels are not met.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Automatic Alert</h3>
              <p className="text-sm text-muted-foreground">
                System automatically flags SLA breaches and notifies relevant teams
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Team Lead Review</h3>
              <p className="text-sm text-muted-foreground">
                Team lead reviews the case and initiates corrective action within 2 hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Management Escalation</h3>
              <p className="text-sm text-muted-foreground">
                If unresolved in 24 hours, case escalates to department management
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold mb-2">Executive Review</h3>
              <p className="text-sm text-muted-foreground">
                Critical issues escalate to executive level with mandatory resolution timeline
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
