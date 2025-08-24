import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RTIPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Right to Information (RTI)</h1>

          <section className="mb-12">
            <p className="text-lg text-muted-foreground mb-8">
              The Right to Information Act, 2005 empowers citizens to seek information from public authorities. DRISHTI
              is committed to transparency and provides easy access to information.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>File RTI Application</CardTitle>
                <CardDescription>Submit your RTI request online</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">File RTI Request</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Track Application</CardTitle>
                <CardDescription>Check status of your RTI request</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Track Status
                </Button>
              </CardContent>
            </Card>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Public Information Officer (PIO)</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p>
                <strong>Name:</strong> Shri Rajesh Kumar
              </p>
              <p>
                <strong>Designation:</strong> Joint Secretary, OSDA
              </p>
              <p>
                <strong>Email:</strong> pio@drishti.gov.in
              </p>
              <p>
                <strong>Phone:</strong> +91-11-2345-6789
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Proactive Disclosure</h2>
            <ul className="space-y-2">
              <li>• Organization structure and functions</li>
              <li>• Training partner directory</li>
              <li>• Financial allocations and expenditure</li>
              <li>• Performance reports and statistics</li>
              <li>• Policies and guidelines</li>
            </ul>
          </section>
        </div>
      </div>
    </PublicLayout>
  )
}
