import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts"
import { TrendingUp, Users, GraduationCap, Briefcase, Download } from "lucide-react"

const monthlyData = [
  { month: "Jan", enrollments: 120, completions: 95, placements: 78 },
  { month: "Feb", enrollments: 135, completions: 108, placements: 89 },
  { month: "Mar", enrollments: 148, completions: 125, placements: 102 },
  { month: "Apr", enrollments: 162, completions: 142, placements: 118 },
  { month: "May", enrollments: 178, completions: 156, placements: 134 },
  { month: "Jun", enrollments: 195, completions: 171, placements: 149 },
]

const tpPerformance = [
  { name: "TechSkills Training", placements: 156, completionRate: 89 },
  { name: "Digital Learning", placements: 134, completionRate: 85 },
  { name: "Skill Development", placements: 178, completionRate: 92 },
  { name: "Future Tech Academy", placements: 98, completionRate: 78 },
]

const courseDistribution = [
  { name: "Web Development", value: 35, color: "#3b82f6" },
  { name: "Data Analytics", value: 28, color: "#10b981" },
  { name: "Mobile Development", value: 22, color: "#f59e0b" },
  { name: "Digital Marketing", value: 15, color: "#ef4444" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
          <p className="text-slate-600">Key performance indicators and trends across the ecosystem</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            Change Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,897</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placements</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,456</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.8%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Enrollments, completions, and placements over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Charts temporarily disabled for deployment
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>Student enrollment by course type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Charts temporarily disabled for deployment
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Partner Performance</CardTitle>
          <CardDescription>Placement numbers and completion rates by training partner</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Charts temporarily disabled for deployment
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
