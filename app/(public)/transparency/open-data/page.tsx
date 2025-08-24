import { PublicLayout } from "@/components/public-layout"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function OpenDataPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Open Data Portal</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access comprehensive data about DRISHTI programs, outcomes, and performance metrics. All data is updated
              in real-time and available for public use.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search datasets..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="training">Training Data</SelectItem>
                  <SelectItem value="placement">Placement Data</SelectItem>
                  <SelectItem value="financial">Financial Data</SelectItem>
                  <SelectItem value="performance">Performance Metrics</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Datasets Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Training Partner Data */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-2">Training Partner Directory</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete list of registered training partners with locations, specializations, and performance
                  metrics.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updated: Daily</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">CSV, JSON</span>
                </div>
              </div>

              {/* Placement Statistics */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-2">Placement Statistics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Monthly placement rates, salary ranges, and employment outcomes across all programs.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updated: Monthly</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">CSV, Excel</span>
                </div>
              </div>

              {/* Financial Disbursements */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-2">Financial Disbursements</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Payment milestones, disbursement schedules, and financial performance by training partner.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updated: Weekly</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">CSV, PDF</span>
                </div>
              </div>

              {/* Program Performance */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-2">Program Performance</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Course completion rates, assessment scores, and skill development outcomes.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updated: Daily</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">JSON, Excel</span>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-2">Geographic Distribution</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Training center locations, student demographics, and regional performance metrics.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updated: Monthly</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">CSV, JSON</span>
                </div>
              </div>

              {/* API Documentation */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-2">API Access</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time API endpoints for developers to access DRISHTI data programmatically.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updated: Real-time</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">JSON, XML</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Data Usage Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Terms of Use</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Data is provided under Open Government License</li>
                  <li>• Attribution required for commercial use</li>
                  <li>• No warranty on data accuracy or completeness</li>
                  <li>• Regular updates may change data structure</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Check update frequency before analysis</li>
                  <li>• Validate data integrity after download</li>
                  <li>• Use API for real-time applications</li>
                  <li>• Report data quality issues promptly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
