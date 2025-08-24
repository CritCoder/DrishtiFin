"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Briefcase, Clock, Building, DollarSign, MapPin, Calendar } from "lucide-react"

export default function StudentPlacementPage() {
  // Mock student placement data
  const placementStatus = "pending" // "pending", "placed", "seeking"
  
  const placementInfo = placementStatus === "placed" ? {
    company: "Tech Solutions Pvt Ltd",
    position: "Junior Web Developer", 
    salary: 450000,
    location: "Mumbai, Maharashtra",
    startDate: "2024-09-01",
    type: "Full-time"
  } : null

  return (
    <div className="p-6 space-y-6">
      {placementStatus === "pending" && (
        <>
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Placement assistance will be available once you complete your training program. Focus on your studies for now!
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Placement Support
              </CardTitle>
              <CardDescription>Career assistance and job placement services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-2">Placement Coming Soon</h3>
                <p className="mb-4">Complete your training to unlock placement opportunities.</p>
                
                <div className="text-left max-w-md mx-auto space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Resume building assistance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Interview preparation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Job matching with partner companies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Post-placement support</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {placementStatus === "placed" && placementInfo && (
        <>
          <Alert>
            <Briefcase className="h-4 w-4" />
            <AlertDescription>
              Congratulations! You have been successfully placed. Your employer will contact you soon.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Your Placement
              </CardTitle>
              <CardDescription>Details of your job placement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    {placementInfo.company}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Position</label>
                  <p className="text-sm font-semibold">{placementInfo.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Salary</label>
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    ₹{placementInfo.salary.toLocaleString()} / year
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <Badge variant="secondary">{placementInfo.type}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {placementInfo.location}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {placementInfo.startDate}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Button size="sm">
                    Contact HR
                  </Button>
                  <Button variant="outline" size="sm">
                    View Offer Letter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {placementStatus === "seeking" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Job Search
              </CardTitle>
              <CardDescription>Available opportunities and application status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-muted-foreground">Your placement coordinator will help you find suitable opportunities.</p>
                <Button className="mt-4">
                  Schedule Career Counseling
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}