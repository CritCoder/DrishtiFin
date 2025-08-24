import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function APIDocumentationPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Complete reference for the DRISHTI API with examples and interactive documentation
          </p>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="sdks">SDKs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Overview</CardTitle>
                  <CardDescription>
                    The DRISHTI API is a RESTful API that allows you to integrate with the training partner management
                    system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Base URL</h3>
                    <code className="bg-muted px-2 py-1 rounded">https://api.drishti.gov.in/v1</code>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Response Format</h3>
                    <p>All responses are returned in JSON format with consistent structure.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Rate Limits</h3>
                    <p>API requests are limited to 1000 requests per hour per API key.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="auth" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>The DRISHTI API uses API keys for authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">API Key Authentication</h3>
                    <p className="mb-2">Include your API key in the Authorization header:</p>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
                    </pre>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Getting an API Key</h3>
                    <p>Register for a developer account and generate your API key from the dashboard.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Training Partners
                      <Badge variant="secondary">12 endpoints</Badge>
                    </CardTitle>
                    <CardDescription>Manage training partner registrations and data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          GET
                        </Badge>
                        <code className="text-sm">/training-partners</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          POST
                        </Badge>
                        <code className="text-sm">/training-partners</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          GET
                        </Badge>
                        <code className="text-sm">/training-partners/:id</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          PUT
                        </Badge>
                        <code className="text-sm">/training-partners/:id</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Students
                      <Badge variant="secondary">8 endpoints</Badge>
                    </CardTitle>
                    <CardDescription>Student enrollment and management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          GET
                        </Badge>
                        <code className="text-sm">/students</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          POST
                        </Badge>
                        <code className="text-sm">/students</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          GET
                        </Badge>
                        <code className="text-sm">/students/:id</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          PUT
                        </Badge>
                        <code className="text-sm">/students/:id</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Batches
                      <Badge variant="secondary">10 endpoints</Badge>
                    </CardTitle>
                    <CardDescription>Training batch management and tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          GET
                        </Badge>
                        <code className="text-sm">/batches</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          POST
                        </Badge>
                        <code className="text-sm">/batches</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          GET
                        </Badge>
                        <code className="text-sm">/batches/:id/students</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          POST
                        </Badge>
                        <code className="text-sm">/batches/:id/complete</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Placements
                      <Badge variant="secondary">6 endpoints</Badge>
                    </CardTitle>
                    <CardDescription>Job placement tracking and verification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          GET
                        </Badge>
                        <code className="text-sm">/placements</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          POST
                        </Badge>
                        <code className="text-sm">/placements</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          POST
                        </Badge>
                        <code className="text-sm">/placements/:id/verify</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>
                    Receive real-time notifications about events in your DRISHTI integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Available Events</h3>
                    <ul className="space-y-1">
                      <li>
                        • <code>training_partner.approved</code> - Training partner approved
                      </li>
                      <li>
                        • <code>batch.completed</code> - Training batch completed
                      </li>
                      <li>
                        • <code>placement.verified</code> - Placement verified
                      </li>
                      <li>
                        • <code>payment.processed</code> - Payment milestone processed
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Webhook Payload</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`{
  "event": "training_partner.approved",
  "data": {
    "id": "tp_123456",
    "name": "TechSkills Academy",
    "status": "approved"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sdks" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Node.js SDK</CardTitle>
                    <CardDescription>Official SDK for Node.js applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg text-sm">
                      <code>npm install @drishti/node-sdk</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Python SDK</CardTitle>
                    <CardDescription>Official SDK for Python applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg text-sm">
                      <code>pip install drishti-python</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>PHP SDK</CardTitle>
                    <CardDescription>Official SDK for PHP applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg text-sm">
                      <code>composer require drishti/php-sdk</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PublicLayout>
  )
}
