"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { 
  ArrowLeft,
  Clock,
  User,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Calendar,
  Hash
} from "lucide-react"
import Link from "next/link"

interface Props {
  params: { id: string }
}

export default function ApprovalDetailPage({ params }: Props) {
  const { toast } = useToast()
  const [remarks, setRemarks] = useState("")
  
  // Mock approval data based on ID
  const getApprovalData = (id: string) => {
    const approvals = {
      "1": {
        id: "1",
        type: "Training Partner Registration",
        entity: "TechSkills Training Pvt Ltd",
        status: "Pending",
        priority: "High",
        submittedDate: "2024-01-20",
        submittedBy: "System Admin",
        description: "New training partner registration application for TechSkills Training Pvt Ltd. The organization provides technical training programs.",
        details: {
          registrationNumber: "REG-001-2024",
          gstNumber: "GST1ABCDE1234F1Z5",
          panNumber: "ABCDE1234F",
          contactPerson: "Rajesh Kumar",
          email: "contact@techskills.com",
          phone: "+91 9876543210",
          address: "123 Tech Park, Sector 15, Gurgaon, Haryana - 122001",
          establishedDate: "2015-03-15"
        },
        documents: [
          { name: "Registration Certificate", status: "Uploaded", size: "2.4 MB" },
          { name: "GST Certificate", status: "Uploaded", size: "1.8 MB" },
          { name: "PAN Card", status: "Uploaded", size: "0.9 MB" },
          { name: "Bank Details", status: "Pending", size: "0 MB" }
        ],
        workflow: [
          { step: "Application Submitted", status: "completed", date: "2024-01-20 10:30 AM", by: "System Admin" },
          { step: "Document Verification", status: "in_progress", date: "2024-01-20 11:15 AM", by: "Verification Team" },
          { step: "Background Check", status: "pending", date: null, by: "Security Team" },
          { step: "Final Approval", status: "pending", date: null, by: "Regional Director" }
        ],
        actionRequired: "Document verification is pending. Please review all submitted documents and verify the organization's credentials."
      },
      "2": {
        id: "2",
        type: "Batch Creation",
        entity: "Web Development Batch 2024-C",
        status: "Approved",
        priority: "Medium",
        submittedDate: "2024-01-18",
        submittedBy: "TP Manager",
        description: "Request to create a new web development training batch for 30 students.",
        details: {
          batchCode: "BATCH-2024-WD-C",
          trainingPartner: "TechSkills Training Pvt Ltd",
          program: "Full Stack Web Development",
          capacity: "30 students",
          duration: "6 months",
          startDate: "2024-02-15",
          endDate: "2024-08-15",
          instructor: "Amit Sharma"
        },
        documents: [
          { name: "Curriculum Document", status: "Approved", size: "4.2 MB" },
          { name: "Instructor Credentials", status: "Approved", size: "1.5 MB" },
          { name: "Lab Setup Photos", status: "Approved", size: "3.1 MB" }
        ],
        workflow: [
          { step: "Batch Request Submitted", status: "completed", date: "2024-01-18 09:45 AM", by: "TP Manager" },
          { step: "Curriculum Review", status: "completed", date: "2024-01-18 02:30 PM", by: "Academic Team" },
          { step: "Resource Allocation", status: "completed", date: "2024-01-19 10:00 AM", by: "Operations Team" },
          { step: "Final Approval", status: "completed", date: "2024-01-19 04:15 PM", by: "Regional Director" }
        ],
        actionRequired: "Batch has been approved and is ready for student enrollment."
      },
      "3": {
        id: "3",
        type: "Payment Milestone",
        entity: "Placement Verification - Batch 2024-A",
        status: "Rejected",
        priority: "High",
        submittedDate: "2024-01-15",
        submittedBy: "Finance Team",
        description: "Payment milestone request for placement verification of students from Batch 2024-A.",
        details: {
          batchCode: "BATCH-2024-A",
          milestoneType: "Placement Verification",
          totalStudents: "25",
          placedStudents: "18",
          verifiedPlacements: "12",
          paymentAmount: "₹2,50,000",
          milestonePercentage: "75%"
        },
        documents: [
          { name: "Placement Letters", status: "Insufficient", size: "2.8 MB" },
          { name: "Salary Certificates", status: "Missing", size: "0 MB" },
          { name: "Employment Verification", status: "Partial", size: "1.2 MB" }
        ],
        workflow: [
          { step: "Milestone Request", status: "completed", date: "2024-01-15 11:20 AM", by: "Finance Team" },
          { step: "Placement Verification", status: "completed", date: "2024-01-16 03:45 PM", by: "Placement Team" },
          { step: "Document Review", status: "completed", date: "2024-01-17 10:30 AM", by: "Audit Team" },
          { step: "Approval Decision", status: "completed", date: "2024-01-17 05:20 PM", by: "Finance Head" }
        ],
        actionRequired: "Insufficient documentation provided. Training partner must submit complete placement verification documents including salary certificates for all claimed placements.",
        rejectionReason: "Incomplete placement verification documentation. Only 12 out of 18 claimed placements have proper documentation."
      }
    }
    return approvals[id as keyof typeof approvals] || approvals["1"]
  }

  const approval = getApprovalData(params.id)

  const handleApprove = () => {
    toast({
      title: "Approval Successful",
      description: `${approval.type} has been approved successfully.`
    })
  }

  const handleReject = () => {
    if (!remarks.trim()) {
      toast({
        title: "Remarks Required",
        description: "Please provide remarks for rejection."
      })
      return
    }
    toast({
      title: "Request Rejected",
      description: `${approval.type} has been rejected with remarks.`
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

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
              <Link href="/approvals">Approvals</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{approval.type}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/approvals">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Approvals
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{approval.type}</h1>
            <p className="text-gray-600">{approval.entity}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getPriorityColor(approval.priority)}>
            {approval.priority} Priority
          </Badge>
          <Badge className={getStatusColor(approval.status)}>
            {approval.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Request Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{approval.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(approval.details).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <p className="text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Supporting Documents ({approval.documents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {approval.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">Size: {doc.size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      {doc.status === 'Uploaded' || doc.status === 'Approved' ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          {doc.status}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workflow Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-purple-600" />
                Workflow Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approval.workflow.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : step.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : step.status === 'in_progress' ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{step.step}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {step.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {step.date}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {step.by}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(step.status)}>
                      {step.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Required */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                Action Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">{approval.actionRequired}</p>
              
              {approval.status === 'Rejected' && approval.rejectionReason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <h4 className="font-medium text-red-800 mb-2">Rejection Reason</h4>
                  <p className="text-sm text-red-700">{approval.rejectionReason}</p>
                </div>
              )}
              
              {approval.status === 'Pending' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks (Optional)
                    </label>
                    <Textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Add remarks for your decision..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleApprove}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={handleReject}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submission Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submission Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Submitted By</span>
                <span className="text-sm font-medium">{approval.submittedBy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Submitted On</span>
                <span className="text-sm font-medium">{approval.submittedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Priority</span>
                <Badge className={getPriorityColor(approval.priority)}>
                  {approval.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge className={getStatusColor(approval.status)}>
                  {approval.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Contact Submitter
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download All Documents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}