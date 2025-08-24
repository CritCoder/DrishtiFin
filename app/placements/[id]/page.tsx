"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { 
  ArrowLeft, 
  Building, 
  User, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  FileText,
  Download,
  Edit,
  Save,
  X
} from "lucide-react"
import Link from "next/link"

interface Props {
  params: { id: string }
}

export default function PlacementDetailPage({ params }: Props) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({} as any)

  // In a real app, this would fetch data based on params.id
  const placement = {
    id: params.id,
    student: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543210",
      batch: "Data Entry Operator - Batch 2024-01",
      studentId: "STU2024001"
    },
    company: {
      name: "DataCorp Analytics",
      type: "Private Limited",
      size: "Medium (51-200 employees)",
      industry: "Information Technology",
      location: "Bangalore, Karnataka",
      contactPerson: "Rajesh Kumar",
      contactEmail: "hr@datacorp.com"
    },
    job: {
      title: "Data Analyst",
      type: "Full-time",
      department: "Analytics Team",
      salary: 520000,
      joiningDate: "2024-01-20",
      workLocation: "Bangalore (On-site)"
    },
    status: "Pending",
    verificationStatus: "Documents Submitted",
    submissionDate: "2024-01-15",
    documents: [
      { name: "Offer Letter", type: "PDF", size: "1.2 MB", uploaded: "2024-01-15" },
      { name: "Employment Contract", type: "PDF", size: "856 KB", uploaded: "2024-01-15" },
      { name: "ID Card Photo", type: "JPG", size: "245 KB", uploaded: "2024-01-16" }
    ],
    remarks: "Student has accepted the offer and completed all formalities. Verification pending with HR department.",
    timeline: [
      { date: "2024-01-15", event: "Placement record created", status: "completed" },
      { date: "2024-01-15", event: "Documents uploaded", status: "completed" },
      { date: "2024-01-16", event: "Initial verification", status: "completed" },
      { date: "2024-01-18", event: "HR verification", status: "pending" },
      { date: "2024-01-20", event: "Final approval", status: "pending" }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleDownloadDocument = (doc: any) => {
    // Generate mock PDF content for demo
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 53
>>
stream
BT
/F1 12 Tf
72 720 Td
(${doc.name} - ${placement.student.name}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
310
%%EOF`

    const blob = new Blob([pdfContent], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${doc.name.replace(/\s+/g, '_')}_${placement.student.name.replace(/\s+/g, '_')}.pdf`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Document Downloaded",
      description: `${doc.name} has been downloaded successfully.`
    })
  }

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditData({
        status: placement.status,
        remarks: placement.remarks,
        salary: placement.job.salary.toString(),
        joiningDate: placement.job.joiningDate
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSaveEdit = () => {
    toast({
      title: "Placement Updated",
      description: "Placement details have been updated successfully."
    })
    setIsEditing(false)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/app">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/placements">Placements</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{placement.student.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/placements">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Placements
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{placement.student.name}</h1>
            <p className="text-gray-600">{placement.job.title} at {placement.company.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(isEditing ? editData.status || placement.status : placement.status)}>
            {isEditing ? editData.status || placement.status : placement.status}
          </Badge>
          {isEditing ? (
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveEdit}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button size="sm" variant="outline" onClick={handleEditToggle}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={handleEditToggle}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Placement
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900">{placement.student.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Student ID</label>
                <p className="text-gray-900">{placement.student.studentId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{placement.student.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900">{placement.student.phone}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">Training Batch</label>
                <p className="text-gray-900">{placement.student.batch}</p>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-600" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Company Name</label>
                <p className="text-gray-900">{placement.company.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Company Type</label>
                <p className="text-gray-900">{placement.company.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Company Size</label>
                <p className="text-gray-900">{placement.company.size}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Industry</label>
                <p className="text-gray-900">{placement.company.industry}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Location</label>
                <p className="text-gray-900 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {placement.company.location}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Contact Person</label>
                <p className="text-gray-900">{placement.company.contactPerson}</p>
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Job Title</label>
                <p className="text-gray-900">{placement.job.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Employment Type</label>
                <p className="text-gray-900">{placement.job.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className="text-gray-900">{placement.job.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Monthly Salary</label>
                {isEditing ? (
                  <div className="mt-1">
                    <Label htmlFor="salary">Monthly Salary (₹)</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={editData.salary}
                      onChange={(e) => setEditData({...editData, salary: e.target.value})}
                    />
                  </div>
                ) : (
                  <p className="text-gray-900 flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    ₹{placement.job.salary.toLocaleString()}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Joining Date</label>
                {isEditing ? (
                  <div className="mt-1">
                    <Label htmlFor="joiningDate">Joining Date</Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      value={editData.joiningDate}
                      onChange={(e) => setEditData({...editData, joiningDate: e.target.value})}
                    />
                  </div>
                ) : (
                  <p className="text-gray-900 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {placement.job.joiningDate}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Work Location</label>
                <p className="text-gray-900">{placement.job.workLocation}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {placement.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Verification Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {placement.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      item.status === 'completed' ? 'bg-green-500' : 
                      item.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.event}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Remarks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="remarks">Additional Notes</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Enter additional notes about the placement..."
                    value={editData.remarks}
                    onChange={(e) => setEditData({...editData, remarks: e.target.value})}
                    rows={4}
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {placement.remarks}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Status Selection for Edit Mode */}
          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="status">Placement Status</Label>
                  <Select value={editData.status} onValueChange={(value) => setEditData({...editData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Verified">Verified</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}