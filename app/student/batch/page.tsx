"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Clock, Users, Calendar, MapPin } from "lucide-react"

export default function StudentBatchPage() {
  // Mock student batch data
  const studentStatus = "pending" // "pending", "enrolled", "completed"
  
  const batchInfo = studentStatus === "enrolled" ? {
    name: "Web Development Batch 2024-A",
    instructor: "Sarah Johnson",
    startDate: "2024-03-01",
    endDate: "2024-08-01",
    schedule: "Monday to Friday, 9:00 AM - 4:00 PM",
    location: "TechSkills Training Center, Mumbai",
    progress: 65,
    classmates: 24
  } : null

  return (
    <div className="p-6 space-y-6">
      {studentStatus === "pending" && (
        <>
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              You will be assigned to a training batch once your application is approved and batch availability is confirmed.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Batch Assignment
              </CardTitle>
              <CardDescription>Information about your upcoming training batch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-2">No Batch Assigned Yet</h3>
                <p>You'll receive notification once you're assigned to a training batch.</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {studentStatus === "enrolled" && batchInfo && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                {batchInfo.name}
              </CardTitle>
              <CardDescription>Your current training program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Instructor</label>
                  <p className="text-sm font-semibold">{batchInfo.instructor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Progress</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${batchInfo.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{batchInfo.progress}%</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p className="text-sm">{batchInfo.startDate} - {batchInfo.endDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Classmates</label>
                  <p className="text-sm flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {batchInfo.classmates} students
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Schedule</p>
                    <p className="text-sm text-muted-foreground">{batchInfo.schedule}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{batchInfo.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}