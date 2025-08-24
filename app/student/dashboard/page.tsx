"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertTriangle, Mail, User } from "lucide-react"

export default function StudentDashboardPage() {
  const student = {
    name: "Ramesh Kumar",
    email: "ramesh.kumar@student.com",
    status: "pending",
    applicationDate: "2024-08-20",
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4" />
      case "pending": return <Clock className="h-4 w-4" />
      case "rejected": return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-4">
      {/* Compact Status */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-orange-600" />
            <div>
              <h3 className="font-medium text-orange-900">Application Under Review</h3>
              <p className="text-sm text-orange-700">You'll be notified once approved.</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Pending
          </Badge>
        </div>
      </div>

      {/* Compact Profile */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <p className="font-medium">{student.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>
              <p className="font-medium">{student.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Applied:</span>
              <p className="font-medium">{student.applicationDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <div className="flex items-center gap-1 mt-1">
                {getStatusIcon(student.status)}
                <span className="capitalize font-medium">{student.status}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t">
            <Button variant="outline" size="sm" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}