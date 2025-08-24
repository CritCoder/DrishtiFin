"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const monthlyData = [
  { month: "Jan", placements: 240, batches: 40, revenue: 24 },
  { month: "Feb", placements: 139, batches: 30, revenue: 22 },
  { month: "Mar", placements: 298, batches: 35, revenue: 29 },
  { month: "Apr", placements: 190, batches: 28, revenue: 20 },
  { month: "May", placements: 280, batches: 32, revenue: 31 },
  { month: "Jun", placements: 380, batches: 45, revenue: 35 },
]

const tpPerformanceData = [
  { name: "Excellent", value: 35, color: "#16a34a" }, // Green
  { name: "Good", value: 45, color: "#2563eb" }, // Blue
  { name: "Average", value: 15, color: "#f59e0b" }, // Amber
  { name: "Poor", value: 5, color: "#dc2626" }, // Red
]

const chartConfig = {
  placements: {
    label: "Placements",
    color: "#2563eb",
  },
  batches: {
    label: "Batches",
    color: "#16a34a",
  },
  revenue: {
    label: "Revenue (₹L)",
    color: "#7c3aed",
  },
}

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Monthly Placements Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="font-montserrat text-xl">Monthly Placements Trend</CardTitle>
          <CardDescription className="font-open-sans">Placement statistics over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simple Bar Chart */}
          <div className="h-[300px] p-4">
            <div className="h-full flex items-end space-x-3">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-primary rounded-t transition-all duration-500" 
                       style={{ height: `${(data.placements / 400) * 80}%`, minHeight: '20px' }}>
                  </div>
                  <div className="text-xs font-medium">{data.month}</div>
                  <div className="text-xs text-muted-foreground">{data.placements}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TP Performance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat text-xl">TP Performance</CardTitle>
          <CardDescription className="font-open-sans">Distribution of training partner ratings</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simple Bar Chart */}
          <div className="h-[300px] p-4">
            <div className="h-full flex items-end space-x-3">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-primary rounded-t transition-all duration-500" 
                       style={{ height: `${(data.placements / 400) * 80}%`, minHeight: '20px' }}>
                  </div>
                  <div className="text-xs font-medium">{data.month}</div>
                  <div className="text-xs text-muted-foreground">{data.placements}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Creation & Revenue Trends */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="font-montserrat text-xl">Batch Creation & Revenue Trends</CardTitle>
          <CardDescription className="font-open-sans">
            Monthly batch creation and revenue generation (in lakhs)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simple Bar Chart */}
          <div className="h-[300px] p-4">
            <div className="h-full flex items-end space-x-3">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-primary rounded-t transition-all duration-500" 
                       style={{ height: `${(data.placements / 400) * 80}%`, minHeight: '20px' }}>
                  </div>
                  <div className="text-xs font-medium">{data.month}</div>
                  <div className="text-xs text-muted-foreground">{data.placements}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
