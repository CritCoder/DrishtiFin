"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { formatDistanceToNow, format } from "date-fns"
import { 
  ExternalLink, 
  FileCheck, 
  Briefcase, 
  CreditCard, 
  GraduationCap,
  User,
  Building2,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  X
} from "lucide-react"
import Link from "next/link"

interface Activity {
  id: string
  type: "approval" | "placement" | "payment" | "batch"
  title: string
  description: string
  user: string
  timestamp: Date
  status: "pending" | "approved" | "rejected" | "completed"
  details?: {
    entity?: string
    entityId?: string
    amount?: number
    location?: string
    contact?: string
    company?: string
    student?: string
    batch?: string
    tp?: string
    salary?: number
    documents?: string[]
    remarks?: string
    actionUrl?: string
  }
}

const activities: Activity[] = [
  {
    id: "1",
    type: "approval",
    title: "TP Registration Approval",
    description: "TechSkills Academy registration pending approval",
    user: "Admin",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: "pending",
    details: {
      entity: "TechSkills Academy",
      entityId: "TP-2024-089",
      tp: "TechSkills Academy",
      location: "Mumbai, Maharashtra",
      contact: "contact@techskills.academy",
      documents: ["GST Certificate", "PAN Card", "Registration Certificate", "Bank Details"],
      remarks: "All documents submitted. Pending final review and approval.",
      actionUrl: "/approvals/TP-2024-089"
    }
  },
  {
    id: "2",
    type: "placement",
    title: "Placement Verified",
    description: "John Doe placement at Infosys verified successfully",
    user: "Auditor",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "completed",
    details: {
      entity: "John Doe",
      entityId: "PL-2024-156",
      student: "John Doe",
      company: "Infosys Technologies Ltd",
      batch: "Web Development - Batch 2024-01",
      salary: 650000,
      location: "Bangalore, Karnataka",
      documents: ["Offer Letter", "Employment Contract", "ID Card"],
      remarks: "Employment verified successfully. All documents in order.",
      actionUrl: "/placements/PL-2024-156"
    }
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Processed",
    description: "₹2.5L milestone payment to SkillTech Solutions",
    user: "Finance",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    status: "completed",
    details: {
      entity: "SkillTech Solutions",
      entityId: "PAY-2024-789",
      tp: "SkillTech Solutions",
      amount: 250000,
      batch: "Data Analytics - Batch 2024-03",
      remarks: "Milestone 3 payment processed. 20 students successfully placed.",
      actionUrl: "/payments/invoices/PAY-2024-789"
    }
  },
  {
    id: "4",
    type: "batch",
    title: "New Batch Created",
    description: "Web Development batch started with 25 students",
    user: "TP Manager",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    status: "completed",
    details: {
      entity: "Web Development - Batch 2025-054",
      entityId: "BATCH-2025-054",
      batch: "Web Development - Batch 2025-054",
      tp: "TechSkills Training Center",
      location: "Delhi Training Center",
      contact: "trainer@techskills.com",
      remarks: "New batch started with 25 enrolled students. Duration: 6 months.",
      actionUrl: "/batches/BATCH-2025-054"
    }
  },
  {
    id: "5",
    type: "approval",
    title: "Document Rejected",
    description: "GST certificate rejected - invalid format",
    user: "Approver",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    status: "rejected",
    details: {
      entity: "NextGen Skills Pvt Ltd",
      entityId: "TP-2024-078",
      tp: "NextGen Skills Pvt Ltd",
      location: "Chennai, Tamil Nadu",
      documents: ["GST Certificate (Invalid)", "PAN Card", "Registration Certificate"],
      remarks: "GST certificate format is invalid. Please resubmit with correct format as per guidelines.",
      actionUrl: "/approvals/TP-2024-078"
    }
  },
]

const getStatusColor = (status: Activity["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "approved":
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getTypeIcon = (type: Activity["type"]) => {
  switch (type) {
    case "approval":
      return "A"
    case "placement":
      return "P"
    case "payment":
      return "₹"
    case "batch":
      return "B"
    default:
      return "?"
  }
}

export function RecentActivities() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsDrawerOpen(true)
  }

  const getTypeIconComponent = (type: Activity["type"]) => {
    switch (type) {
      case "approval":
        return <FileCheck className="w-4 h-4" />
      case "placement":
        return <Briefcase className="w-4 h-4" />
      case "payment":
        return <CreditCard className="w-4 h-4" />
      case "batch":
        return <GraduationCap className="w-4 h-4" />
      default:
        return <div className="w-4 h-4" />
    }
  }

  const renderActivityDetails = (activity: Activity) => {
    if (!activity.details) return null

    return (
      <div className="space-y-4">
        {/* Main Entity Info */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            {getTypeIconComponent(activity.type)}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{activity.details.entity}</h4>
            <p className="text-sm text-gray-500">{activity.details.entityId}</p>
          </div>
          <Badge className={getStatusColor(activity.status)}>
            {activity.status}
          </Badge>
        </div>

        <Separator />

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-4">
          {activity.details.student && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm"><strong>Student:</strong> {activity.details.student}</span>
            </div>
          )}
          
          {activity.details.company && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm"><strong>Company:</strong> {activity.details.company}</span>
            </div>
          )}

          {activity.details.tp && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm"><strong>Training Partner:</strong> {activity.details.tp}</span>
            </div>
          )}

          {activity.details.batch && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-sm"><strong>Batch:</strong> {activity.details.batch}</span>
            </div>
          )}

          {activity.details.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm"><strong>Location:</strong> {activity.details.location}</span>
            </div>
          )}

          {activity.details.contact && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm"><strong>Contact:</strong> {activity.details.contact}</span>
            </div>
          )}

          {activity.details.salary && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-sm"><strong>Salary:</strong> ₹{activity.details.salary.toLocaleString()} per annum</span>
            </div>
          )}

          {activity.details.amount && (
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm"><strong>Amount:</strong> ₹{activity.details.amount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm"><strong>Date:</strong> {format(activity.timestamp, 'PPP p')}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm"><strong>Action by:</strong> {activity.user}</span>
          </div>
        </div>

        {/* Documents */}
        {activity.details.documents && activity.details.documents.length > 0 && (
          <>
            <Separator />
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Documents</h5>
              <div className="space-y-1">
                {activity.details.documents.map((doc, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <FileCheck className="w-3 h-3" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Remarks */}
        {activity.details.remarks && (
          <>
            <Separator />
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Remarks</h5>
              <p className="text-sm text-gray-600 leading-relaxed">{activity.details.remarks}</p>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Recent Activities</CardTitle>
          <CardDescription className="font-open-sans">Latest system activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="w-full flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="text-xs font-montserrat font-semibold">
                    {getTypeIcon(activity.type)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-open-sans font-medium text-foreground truncate">{activity.title}</p>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)} flex-shrink-0 ml-2`}>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-open-sans text-muted-foreground mt-1">{activity.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-open-sans text-muted-foreground">by {activity.user}</span>
                    <span className="text-xs font-open-sans text-muted-foreground">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-w-2xl mx-auto">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <DrawerTitle>{selectedActivity?.title}</DrawerTitle>
                <DrawerDescription>{selectedActivity?.description}</DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="px-4 pb-4">
            {selectedActivity && renderActivityDetails(selectedActivity)}
          </div>

          <DrawerFooter>
            <div className="flex gap-3">
              {selectedActivity?.details?.actionUrl && (
                <Link href={selectedActivity.details.actionUrl}>
                  <Button className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              )}
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
