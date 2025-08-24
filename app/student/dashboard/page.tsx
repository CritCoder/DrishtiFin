"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, CheckCircle, AlertTriangle, GraduationCap, User, Mail } from "lucide-react"

export default function StudentDashboardPage() {
  // Mock student data - in production this would come from API/auth context
  const student = {
    name: "John Doe",
    email: "john.doe@example.com",
    status: "pending", // "pending", "approved", "rejected"
    applicationDate: "2024-01-20",
    batch: null, // Will be assigned after approval
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "default"
      case "pending": return "secondary"
      case "rejected": return "destructive"
      default: return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4" />
      case "pending": return <Clock className="h-4 w-4" />
      case "rejected": return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "approved": 
        return {
          title: "Welcome! Your application has been approved",
          description: "You can now access your training materials and batch information.",
          variant: "default" as const
        }
      case "pending":
        return {
          title: "Your application is under review",
          description: "Please wait while we process your application. You will be notified once it's approved.",
          variant: "default" as const
        }
      case "rejected":
        return {
          title: "Application not approved",
          description: "Unfortunately, your application was not approved at this time. Please contact support for more information.",
          variant: "destructive" as const
        }
      default:
        return {
          title: "Application status unknown",
          description: "Please contact support for assistance.",
          variant: "destructive" as const
        }
    }
  }

  const statusMessage = getStatusMessage(student.status)

  return (
    <div className="p-6 space-y-6">
      {/* Status Alert */}
      <Alert variant={statusMessage.variant}>
        <div className="flex items-center">
          {getStatusIcon(student.status)}
          <div className="ml-2">
            <h3 className="font-semibold">{statusMessage.title}</h3>
            <AlertDescription className="mt-1">
              {statusMessage.description}
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Student Profile
          </CardTitle>
          <CardDescription>Your basic information and application status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-sm font-semibold">{student.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-sm">{student.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Application Status</label>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(student.status)} className="capitalize">
                  {getStatusIcon(student.status)}
                  <span className="ml-1">{student.status}</span>
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Application Date</label>
              <p className="text-sm">{student.applicationDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Content based on status */}
      {student.status === "pending" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Your application is being reviewed by our team</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span>You will receive an email notification once approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span>Access to training materials will be granted after approval</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {student.status === "approved" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Your Training Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You will be assigned to a training batch soon. Check back regularly for updates.</p>
            <div className="mt-4">
              <Button>
                <GraduationCap className="h-4 w-4 mr-2" />
                View Available Programs
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {student.status === "rejected" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you believe this was an error or would like to understand the reasons for rejection, please contact our support team.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="secondary" className="w-full">
                Submit New Application
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}