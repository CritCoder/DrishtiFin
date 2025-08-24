"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Upload,
  Eye,
  Check,
  X,
  AlertTriangle,
  Calendar,
  User,
  Building2
} from "lucide-react"
import Link from "next/link"

interface Props {
  params: { id: string }
}

interface Document {
  id: number
  name: string
  status: 'Approved' | 'Pending' | 'Rejected' | 'Expired'
  uploadDate: string
  expiryDate?: string
  uploadedBy: string
  fileSize: string
  fileType: string
  remarks?: string
}

export default function TrainingPartnerDocumentsPage({ params }: Props) {
  const { toast } = useToast()
  
  // Mock TP data
  const tp = {
    id: params.id,
    name: params.id === "1" ? "TechSkills Training Pvt Ltd" : params.id === "2" ? "Digital Learning Solutions" : "Skill Development Corp",
    registrationNumber: `REG-${params.id.padStart(3, '0')}-2024`
  }

  const [documents] = useState<Document[]>([
    { 
      id: 1, 
      name: "Registration Certificate", 
      status: "Approved", 
      uploadDate: "2024-01-15",
      expiryDate: "2027-01-15",
      uploadedBy: "Rajesh Kumar",
      fileSize: "2.4 MB",
      fileType: "PDF"
    },
    { 
      id: 2, 
      name: "GST Certificate", 
      status: "Approved", 
      uploadDate: "2024-01-16",
      expiryDate: "2025-03-31",
      uploadedBy: "Rajesh Kumar",
      fileSize: "1.8 MB",
      fileType: "PDF"
    },
    { 
      id: 3, 
      name: "PAN Card", 
      status: "Approved", 
      uploadDate: "2024-01-17",
      uploadedBy: "Rajesh Kumar",
      fileSize: "0.9 MB",
      fileType: "PDF"
    },
    { 
      id: 4, 
      name: "Bank Details", 
      status: "Pending", 
      uploadDate: "2024-01-20",
      uploadedBy: "Rajesh Kumar",
      fileSize: "1.2 MB",
      fileType: "PDF",
      remarks: "Bank statement required for verification"
    },
    { 
      id: 5, 
      name: "Audited Financial Statements", 
      status: "Expired", 
      uploadDate: "2023-04-12",
      expiryDate: "2024-04-12",
      uploadedBy: "Rajesh Kumar",
      fileSize: "5.6 MB",
      fileType: "PDF",
      remarks: "Document has expired, please upload latest version"
    },
    { 
      id: 6, 
      name: "Trade License", 
      status: "Rejected", 
      uploadDate: "2024-01-22",
      uploadedBy: "Rajesh Kumar",
      fileSize: "1.4 MB",
      fileType: "PDF",
      remarks: "Document is not clear, please upload a higher quality scan"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'expired': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return <Check className="w-4 h-4" />
      case 'pending': return <AlertTriangle className="w-4 h-4" />
      case 'rejected': return <X className="w-4 h-4" />
      case 'expired': return <AlertTriangle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const handleDownload = (docName: string) => {
    // Mock download functionality
    toast({
      title: "Download Started",
      description: `${docName} is being downloaded.`
    })
  }

  const handleApprove = (docId: number, docName: string) => {
    toast({
      title: "Document Approved",
      description: `${docName} has been approved successfully.`
    })
  }

  const handleReject = (docId: number, docName: string) => {
    toast({
      title: "Document Rejected",
      description: `${docName} has been rejected and notification sent to TP.`
    })
  }

  const requiredDocuments = [
    "Registration Certificate",
    "GST Certificate", 
    "PAN Card",
    "Bank Details",
    "Audited Financial Statements",
    "Trade License",
    "ISO Certification (if applicable)",
    "NSDC Affiliation Certificate"
  ]

  const uploadedDocNames = documents.map(doc => doc.name)
  const missingDocuments = requiredDocuments.filter(doc => !uploadedDocNames.includes(doc))

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
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
              <Link href="/tps">Training Partners</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/tps/${params.id}`}>{tp.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Documents</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/tps/${params.id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Details
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
            <p className="text-gray-600">{tp.name} • {tp.registrationNumber}</p>
          </div>
        </div>
        <Button size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Request Documents
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document Statistics */}
        <div className="lg:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Approved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-gray-600">Expired</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Uploaded Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Uploaded Documents ({documents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <Badge className={getStatusColor(doc.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(doc.status)}
                              {doc.status}
                            </div>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Uploaded: {doc.uploadDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            By: {doc.uploadedBy}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span> {doc.fileSize}
                          </div>
                          <div>
                            <span className="font-medium">Type:</span> {doc.fileType}
                          </div>
                        </div>
                        {doc.expiryDate && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Expires:</span> {doc.expiryDate}
                          </div>
                        )}
                        {doc.remarks && (
                          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                            <span className="font-medium">Remarks:</span> {doc.remarks}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleDownload(doc.name)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      {doc.status === 'Pending' && (
                        <>
                          <Button size="sm" variant="default" onClick={() => handleApprove(doc.id, doc.name)}>
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(doc.id, doc.name)}>
                            <X className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Required Documents Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Document Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requiredDocuments.map((docName, index) => {
                  const isUploaded = uploadedDocNames.includes(docName)
                  const uploadedDoc = documents.find(doc => doc.name === docName)
                  
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        isUploaded && uploadedDoc?.status === 'Approved' 
                          ? 'bg-green-600 border-green-600' 
                          : isUploaded 
                          ? 'bg-yellow-600 border-yellow-600'
                          : 'border-gray-300'
                      }`}>
                        {isUploaded && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        isUploaded && uploadedDoc?.status === 'Approved' 
                          ? 'text-green-700 font-medium' 
                          : isUploaded
                          ? 'text-yellow-700'
                          : 'text-gray-700'
                      }`}>
                        {docName}
                      </span>
                      {uploadedDoc && uploadedDoc.status !== 'Approved' && (
                        <Badge className={getStatusColor(uploadedDoc.status)} size="sm">
                          {uploadedDoc.status}
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>
              
              {missingDocuments.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                  <div className="text-sm font-medium text-red-800 mb-2">
                    Missing Documents ({missingDocuments.length})
                  </div>
                  <div className="text-xs text-red-700">
                    {missingDocuments.join(', ')}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Request Missing Docs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download All Approved
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Compliance Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}