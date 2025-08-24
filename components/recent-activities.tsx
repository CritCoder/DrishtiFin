"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface Activity {
  id: string
  type: "approval" | "placement" | "payment" | "batch"
  title: string
  description: string
  user: string
  timestamp: Date
  status: "pending" | "approved" | "rejected" | "completed"
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
  },
  {
    id: "2",
    type: "placement",
    title: "Placement Verified",
    description: "John Doe placement at Infosys verified successfully",
    user: "Auditor",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "completed",
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Processed",
    description: "₹2.5L milestone payment to SkillTech Solutions",
    user: "Finance",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    status: "completed",
  },
  {
    id: "4",
    type: "batch",
    title: "New Batch Created",
    description: "Web Development batch started with 25 students",
    user: "TP Manager",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    status: "completed",
  },
  {
    id: "5",
    type: "approval",
    title: "Document Rejected",
    description: "GST certificate rejected - invalid format",
    user: "Approver",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    status: "rejected",
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Recent Activities</CardTitle>
        <CardDescription className="font-open-sans">Latest system activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs font-montserrat font-semibold">
                  {getTypeIcon(activity.type)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-open-sans font-medium text-foreground truncate">{activity.title}</p>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)}`}>
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
