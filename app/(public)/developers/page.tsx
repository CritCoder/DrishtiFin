import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Database, Shield, Zap, Book, Users } from "lucide-react"

export default function DevelopersPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Developer Portal</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Build powerful integrations with the DRISHTI platform using our comprehensive APIs and developer tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Get API Key</Button>
              <Button variant="outline" size="lg" className="bg-transparent">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Developer Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>RESTful APIs</CardTitle>
                  <CardDescription>Clean, well-documented REST APIs for all DRISHTI functionality</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Training partner management</li>
                    <li>• Student enrollment</li>
                    <li>• Placement tracking</li>
                    <li>• Payment processing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-time Data</CardTitle>
                  <CardDescription>Access live data with webhooks and real-time updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Webhook notifications</li>
                    <li>• Live status updates</li>
                    <li>• Event streaming</li>
                    <li>• Data synchronization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure Authentication</CardTitle>
                  <CardDescription>Enterprise-grade security with OAuth 2.0 and API keys</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• OAuth 2.0 flow</li>
                    <li>• API key management</li>
                    <li>• Role-based access</li>
                    <li>• Rate limiting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>High Performance</CardTitle>
                  <CardDescription>Fast, reliable APIs with 99.9% uptime guarantee</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Sub-100ms response times</li>
                    <li>• Global CDN</li>
                    <li>• Auto-scaling</li>
                    <li>• Load balancing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Comprehensive Docs</CardTitle>
                  <CardDescription>Detailed documentation with examples and tutorials</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Interactive API explorer</li>
                    <li>• Code samples</li>
                    <li>• SDKs and libraries</li>
                    <li>• Video tutorials</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Developer Support</CardTitle>
                  <CardDescription>Dedicated support team for developers and integrators</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Technical support</li>
                    <li>• Community forum</li>
                    <li>• Integration assistance</li>
                    <li>• Best practices</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Register</h3>
                <p className="text-muted-foreground">Create a developer account and get your API credentials</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore</h3>
                <p className="text-muted-foreground">Browse the API documentation and try out endpoints</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Build</h3>
                <p className="text-muted-foreground">Start building your integration with our SDKs and tools</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
