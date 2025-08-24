import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, Clock, CheckCircle } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: "Monthly Training Partner Performance",
      type: "Excel",
      status: "Ready",
      lastGenerated: "2024-01-20",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Placement Verification Summary",
      type: "PDF",
      status: "Generating",
      lastGenerated: "2024-01-19",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Financial Disbursement Report",
      type: "Excel",
      status: "Ready",
      lastGenerated: "2024-01-18",
      size: "3.2 MB",
    },
    { id: 4, name: "Audit Trail Export", type: "CSV", status: "Ready", lastGenerated: "2024-01-17", size: "5.1 MB" },
  ]

  const reportTemplates = [
    { name: "Training Partner Performance", description: "Comprehensive TP metrics and KPIs", frequency: "Monthly" },
    {
      name: "Student Placement Analysis",
      description: "Placement rates and employment verification",
      frequency: "Weekly",
    },
    { name: "Financial Summary", description: "Payment milestones and disbursements", frequency: "Monthly" },
    { name: "Compliance Report", description: "Regulatory compliance and audit findings", frequency: "Quarterly" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports Export</h1>
          <p className="text-slate-600">Generate and download standardized reports</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Download previously generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900">{report.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                      <span>{report.type}</span>
                      <span>{report.size}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.lastGenerated}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                      {report.status === "Ready" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {report.status}
                    </Badge>
                    {report.status === "Ready" && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Standard report formats available for generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((template, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-900">{template.name}</h3>
                    <Badge variant="outline">{template.frequency}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
