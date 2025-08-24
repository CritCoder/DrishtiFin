"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, FileText, Calendar, Clock, CheckCircle, Settings } from "lucide-react"

interface Report {
  id: number
  name: string
  type: string
  status: string
  lastGenerated: string
  size: string
}

interface ReportTemplate {
  name: string
  description: string
  frequency: string
}

export default function ReportsPage() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState<number | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [reportParams, setReportParams] = useState({
    dateFrom: '',
    dateTo: '',
    format: 'PDF',
    includeCharts: true
  })
  const [reports, setReports] = useState<Report[]>([
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
  ])

  const handleDownload = (report: Report) => {
    toast({
      title: "Download Started",
      description: `${report.name} is being downloaded.`
    })
    
    // Mock file download
    const mockData = generateMockReportData(report)
    const blob = new Blob([mockData], { type: getContentType(report.type) })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${report.name.toLowerCase().replace(/\s+/g, '_')}.${report.type.toLowerCase()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const generateMockReportData = (report: Report) => {
    switch (report.type.toLowerCase()) {
      case 'csv':
        return 'Name,Value,Date\nSample Data,123,2024-01-20\nAnother Row,456,2024-01-21'
      case 'pdf':
        return '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\nMock PDF Content'
      case 'excel':
        return 'Training Partner,Performance Score,Students Trained\nTechSkills,85%,245\nSkillDev,92%,189'
      default:
        return `${report.name}\n\nGenerated on: ${new Date().toLocaleString()}\n\nThis is a mock report containing sample data.`
    }
  }

  const getContentType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'csv': return 'text/csv'
      case 'pdf': return 'application/pdf'
      case 'excel': return 'application/vnd.ms-excel'
      default: return 'text/plain'
    }
  }

  const handleGenerateReport = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setReportParams({
      dateFrom: '',
      dateTo: '',
      format: 'PDF',
      includeCharts: true
    })
    setIsDialogOpen(true)
  }

  const handleGenerate = () => {
    if (!reportParams.dateFrom || !reportParams.dateTo) {
      toast({
        title: "Validation Error",
        description: "Please select date range for the report."
      })
      return
    }

    setIsDialogOpen(false)
    const templateIndex = reportTemplates.findIndex(t => t.name === selectedTemplate?.name)
    if (templateIndex === -1) return

    setIsGenerating(templateIndex)
    
    // Simulate report generation
    setTimeout(() => {
      const newReport: Report = {
        id: Date.now(),
        name: selectedTemplate!.name,
        type: reportParams.format,
        status: "Ready",
        lastGenerated: new Date().toISOString().split('T')[0],
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`
      }
      
      setReports(prev => [newReport, ...prev])
      setIsGenerating(null)
      
      toast({
        title: "Report Generated",
        description: `${selectedTemplate!.name} has been generated successfully.`
      })
    }, 3000)

    toast({
      title: "Generating Report",
      description: `${selectedTemplate!.name} is being generated. This may take a few minutes.`
    })
  }

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
        <Button onClick={() => setIsDialogOpen(true)}>
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
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(report)}>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-transparent" 
                    onClick={() => handleGenerateReport(template)}
                    disabled={isGenerating === index}
                  >
                    {isGenerating === index ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate ? `Generate ${selectedTemplate.name}` : 'Generate New Report'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!selectedTemplate && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Template</Label>
                <select 
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  onChange={(e) => {
                    const template = reportTemplates.find(t => t.name === e.target.value)
                    setSelectedTemplate(template || null)
                  }}
                >
                  <option value="">Select a template</option>
                  {reportTemplates.map((template, index) => (
                    <option key={index} value={template.name}>{template.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateFrom" className="text-right">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={reportParams.dateFrom}
                onChange={(e) => setReportParams(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateTo" className="text-right">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={reportParams.dateTo}
                onChange={(e) => setReportParams(prev => ({ ...prev, dateTo: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format" className="text-right">Format</Label>
              <select
                id="format"
                value={reportParams.format}
                onChange={(e) => setReportParams(prev => ({ ...prev, format: e.target.value }))}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Options</Label>
              <label className="col-span-3 flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={reportParams.includeCharts}
                  onChange={(e) => setReportParams(prev => ({ ...prev, includeCharts: e.target.checked }))}
                />
                <span className="text-sm">Include charts and visualizations</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} disabled={!selectedTemplate}>
              Generate Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
