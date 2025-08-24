"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { isWithinInterval } from "date-fns"
import type { DateRange } from "@/components/dashboard-date-filter"

interface ChartData {
  month: string
  date: string
  placements: number
  batches: number
  revenue: number
  students: number
  completionRate: number
}

const fullChartData: ChartData[] = [
  { month: "Aug", date: "2024-08", placements: 320, batches: 45, revenue: 38, students: 1250, completionRate: 85 },
  { month: "Jul", date: "2024-07", placements: 298, batches: 42, revenue: 35, students: 1180, completionRate: 82 },
  { month: "Jun", date: "2024-06", placements: 380, batches: 48, revenue: 42, students: 1350, completionRate: 88 },
  { month: "May", date: "2024-05", placements: 280, batches: 35, revenue: 31, students: 980, completionRate: 79 },
  { month: "Apr", date: "2024-04", placements: 190, batches: 28, revenue: 20, students: 820, completionRate: 75 },
  { month: "Mar", date: "2024-03", placements: 298, batches: 38, revenue: 29, students: 1120, completionRate: 81 },
  { month: "Feb", date: "2024-02", placements: 139, batches: 22, revenue: 18, students: 650, completionRate: 68 },
  { month: "Jan", date: "2024-01", placements: 240, batches: 32, revenue: 24, students: 890, completionRate: 78 },
  { month: "Dec", date: "2023-12", placements: 285, batches: 40, revenue: 32, students: 1050, completionRate: 83 },
  { month: "Nov", date: "2023-11", placements: 220, batches: 30, revenue: 25, students: 780, completionRate: 74 },
  { month: "Oct", date: "2023-10", placements: 265, batches: 36, revenue: 28, students: 950, completionRate: 80 },
  { month: "Sep", date: "2023-09", placements: 195, batches: 25, revenue: 21, students: 720, completionRate: 72 }
]

const tpPerformanceData = [
  { name: "Excellent", value: 35, color: "#16a34a" },
  { name: "Good", value: 45, color: "#2563eb" },
  { name: "Average", value: 15, color: "#f59e0b" },
  { name: "Poor", value: 5, color: "#dc2626" },
]

interface DashboardChartsProps {
  dateRange: DateRange
}

export function DashboardCharts({ dateRange }: DashboardChartsProps) {
  const [filteredData, setFilteredData] = useState<ChartData[]>([])
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{data: ChartData, x: number, y: number} | null>(null)

  // Filter data based on selected date range
  useEffect(() => {
    const filtered = fullChartData.filter(item => {
      const itemDate = new Date(item.date + '-01')
      return isWithinInterval(itemDate, { start: dateRange.from, end: dateRange.to })
    })
    setFilteredData(filtered.reverse()) // Most recent first for display
  }, [dateRange])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Monthly Placements Trend */}
      <Card className="col-span-2 relative">
        <CardHeader>
          <CardTitle className="font-montserrat text-xl">Monthly Placements Trend</CardTitle>
          <CardDescription className="font-open-sans">
            Placement statistics for selected period ({filteredData.length} months)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Enhanced Bar Chart with Hover */}
          <div className="h-[300px] p-4 relative">
            {hoveredDataPoint && (
              <div 
                className="absolute bg-gray-900 text-white p-3 rounded-lg shadow-lg z-10 pointer-events-none"
                style={{ 
                  left: hoveredDataPoint.x, 
                  top: hoveredDataPoint.y - 10,
                  transform: 'translateX(-50%) translateY(-100%)'
                }}
              >
                <div className="text-sm font-semibold">{hoveredDataPoint.data.month} {hoveredDataPoint.data.date.split('-')[0]}</div>
                <div className="text-xs space-y-1 mt-1">
                  <div>Placements: <span className="font-medium">{hoveredDataPoint.data.placements}</span></div>
                  <div>Students: <span className="font-medium">{hoveredDataPoint.data.students}</span></div>
                  <div>Completion Rate: <span className="font-medium">{hoveredDataPoint.data.completionRate}%</span></div>
                </div>
              </div>
            )}
            <div className="h-full flex items-end space-x-2">
              {filteredData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No data available for selected date range</p>
                  </div>
                </div>
              ) : (
                filteredData.map((data, index) => (
                  <div 
                    key={data.month + data.date} 
                    className="flex-1 flex flex-col items-center space-y-2 relative"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setHoveredDataPoint({
                        data,
                        x: rect.left + rect.width / 2,
                        y: rect.top
                      })
                    }}
                    onMouseLeave={() => setHoveredDataPoint(null)}
                  >
                    <div 
                      className="w-full bg-blue-500 hover:bg-blue-600 rounded-t transition-all duration-500 cursor-pointer" 
                      style={{ 
                        height: `${Math.max((data.placements / Math.max(...filteredData.map(d => d.placements))) * 80, 5)}%`, 
                        minHeight: '20px' 
                      }}
                    />
                    <div className="text-xs font-medium text-center">{data.month}</div>
                    <div className="text-xs text-muted-foreground text-center">{data.placements}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TP Performance Distribution */}
      <Card className="relative">
        <CardHeader>
          <CardTitle className="font-montserrat text-xl">TP Performance</CardTitle>
          <CardDescription className="font-open-sans">Distribution of training partner ratings</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Enhanced Performance Chart */}
          <div className="h-[300px] p-4 relative">
            <div className="h-full flex items-end justify-center space-x-4">
              {tpPerformanceData.map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex flex-col items-center space-y-2 relative group cursor-pointer"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setHoveredDataPoint({
                      data: { ...item, month: item.name, completionRate: 0, placements: item.value, students: item.value * 25, batches: 0, date: '', revenue: 0 },
                      x: rect.left + rect.width / 2,
                      y: rect.top
                    })
                  }}
                  onMouseLeave={() => setHoveredDataPoint(null)}
                >
                  <div 
                    className="w-16 rounded-t transition-all duration-500 hover:opacity-80" 
                    style={{ 
                      height: `${Math.max((item.value / Math.max(...tpPerformanceData.map(d => d.value))) * 80, 10)}%`,
                      backgroundColor: item.color,
                      minHeight: '30px'
                    }}
                  />
                  <div className="text-xs font-medium text-center">{item.name}</div>
                  <div className="text-xs text-muted-foreground text-center">{item.value}%</div>
                </div>
              ))}
            </div>
            
            {hoveredDataPoint && hoveredDataPoint.data.month !== hoveredDataPoint.data.date && (
              <div 
                className="absolute bg-gray-900 text-white p-3 rounded-lg shadow-lg z-10 pointer-events-none"
                style={{ 
                  left: hoveredDataPoint.x, 
                  top: hoveredDataPoint.y - 10,
                  transform: 'translateX(-50%) translateY(-100%)'
                }}
              >
                <div className="text-sm font-semibold">{hoveredDataPoint.data.month} TPs</div>
                <div className="text-xs space-y-1 mt-1">
                  <div>Percentage: <span className="font-medium">{hoveredDataPoint.data.placements}%</span></div>
                  <div>Estimated TPs: <span className="font-medium">~{Math.floor(hoveredDataPoint.data.placements / 5)}</span></div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Batch Creation & Revenue Trends */}
      <Card className="col-span-3 relative">
        <CardHeader>
          <CardTitle className="font-montserrat text-xl">Batch Creation & Revenue Trends</CardTitle>
          <CardDescription className="font-open-sans">
            Monthly batch creation and revenue generation for selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Enhanced Revenue Chart */}
          <div className="h-[300px] p-4 relative">
            {hoveredDataPoint && hoveredDataPoint.data.month === hoveredDataPoint.data.date.split('-')[1] && (
              <div 
                className="absolute bg-gray-900 text-white p-3 rounded-lg shadow-lg z-10 pointer-events-none"
                style={{ 
                  left: hoveredDataPoint.x, 
                  top: hoveredDataPoint.y - 10,
                  transform: 'translateX(-50%) translateY(-100%)'
                }}
              >
                <div className="text-sm font-semibold">{hoveredDataPoint.data.month} {hoveredDataPoint.data.date.split('-')[0]}</div>
                <div className="text-xs space-y-1 mt-1">
                  <div>Batches Created: <span className="font-medium">{hoveredDataPoint.data.batches}</span></div>
                  <div>Revenue: <span className="font-medium">₹{hoveredDataPoint.data.revenue}L</span></div>
                  <div>Students Enrolled: <span className="font-medium">{hoveredDataPoint.data.students}</span></div>
                </div>
              </div>
            )}
            <div className="h-full flex items-end space-x-2">
              {filteredData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No data available for selected date range</p>
                  </div>
                </div>
              ) : (
                filteredData.map((data, index) => (
                  <div 
                    key={data.month + data.date + 'revenue'} 
                    className="flex-1 flex flex-col items-center space-y-2 relative"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setHoveredDataPoint({
                        data: { ...data, month: data.date.split('-')[1] },
                        x: rect.left + rect.width / 2,
                        y: rect.top
                      })
                    }}
                    onMouseLeave={() => setHoveredDataPoint(null)}
                  >
                    <div className="w-full flex gap-1">
                      <div 
                        className="flex-1 bg-green-500 hover:bg-green-600 rounded-t transition-all duration-500 cursor-pointer" 
                        style={{ 
                          height: `${Math.max((data.batches / Math.max(...filteredData.map(d => d.batches))) * 80, 5)}%`, 
                          minHeight: '20px' 
                        }}
                      />
                      <div 
                        className="flex-1 bg-purple-500 hover:bg-purple-600 rounded-t transition-all duration-500 cursor-pointer" 
                        style={{ 
                          height: `${Math.max((data.revenue / Math.max(...filteredData.map(d => d.revenue))) * 80, 5)}%`, 
                          minHeight: '20px' 
                        }}
                      />
                    </div>
                    <div className="text-xs font-medium text-center">{data.month}</div>
                    <div className="text-xs text-muted-foreground text-center flex gap-2">
                      <span className="text-green-600">B:{data.batches}</span>
                      <span className="text-purple-600">₹{data.revenue}L</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-2 right-2 flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Batches</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Revenue (₹L)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
