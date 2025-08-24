"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Download, Eye, Building, DollarSign } from "lucide-react"
import Link from "next/link"

export default function PlacementsClient() {
  const placements = [
    {
      id: 1,
      student: "Rahul Kumar",
      company: "Tech Solutions Ltd",
      position: "Web Developer",
      salary: 450000,
      status: "Verified",
      date: "2024-01-15",
    },
    {
      id: 2,
      student: "Priya Sharma",
      company: "DataCorp Analytics",
      position: "Data Analyst",
      salary: 520000,
      status: "Pending",
      date: "2024-01-20",
    },
    {
      id: 3,
      student: "Amit Singh",
      company: "Mobile Innovations",
      position: "App Developer",
      salary: 480000,
      status: "Verified",
      date: "2024-01-18",
    },
  ]

  const handleExportCSV = () => {
    const csvData = [
      ['Student Name', 'Company', 'Position', 'Salary (INR)', 'Status', 'Date'],
      ...placements.map(p => [
        p.student,
        p.company, 
        p.position,
        p.salary.toString(),
        p.status,
        p.date
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `placements_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Placements</h1>
          <p className="text-gray-600">Track student placements and employment verification</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Link href="/placements/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Placement
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input placeholder="Search placements..." className="pl-10" />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {placements.map((placement) => (
              <div key={placement.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{placement.student}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {placement.company}
                    </div>
                    <span>{placement.position}</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />₹{placement.salary.toLocaleString()}
                    </div>
                    <span>{placement.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={placement.status === "Verified" ? "default" : "secondary"}>{placement.status}</Badge>
                  <Link href={`/placements/${placement.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}