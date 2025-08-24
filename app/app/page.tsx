"use client"

import { useState } from "react"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivities } from "@/components/recent-activities"
import { DashboardDateFilter, quickRanges, type DateRange } from "@/components/dashboard-date-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Upload, 
  FileText, 
  Building2, 
  GraduationCap, 
  Briefcase,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>(quickRanges[2]) // Default to last 6 months

  return (
    <div className="p-6 space-y-6">
      <DashboardStats />
      <DashboardDateFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
      <DashboardCharts dateRange={dateRange} />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <RecentActivities />
        </div>
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Link href="/batches/new">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">New Batch</div>
                        <div className="text-sm text-gray-500">Create training batch</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Button>
                </Link>

                <Link href="/placements/new">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4 hover:bg-green-50 hover:border-green-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Briefcase className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">Record Placement</div>
                        <div className="text-sm text-gray-500">Add student placement</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </Button>
                </Link>

                <Link href="/tps/new">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4 hover:bg-purple-50 hover:border-purple-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <Building2 className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">New Training Partner</div>
                        <div className="text-sm text-gray-500">Register TP organization</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </Button>
                </Link>

                <Link href="/reports">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4 hover:bg-orange-50 hover:border-orange-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <FileText className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">Generate Report</div>
                        <div className="text-sm text-gray-500">Export system reports</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* System Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">API Status</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Operational
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Database</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Healthy
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-900">Integrations</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    Partial
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Last Updated</span>
                  </div>
                  <span className="text-sm text-gray-600">2 mins ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
