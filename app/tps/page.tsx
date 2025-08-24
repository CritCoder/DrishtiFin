"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Download, Eye, Edit, FileText } from "lucide-react"
import Link from "next/link"

export default function TrainingPartnersPage() {
  const tps = [
    { id: 1, name: "TechSkills Training Pvt Ltd", status: "Active", trustScore: 85, centres: 12, students: 450 },
    { id: 2, name: "Digital Learning Solutions", status: "Pending", trustScore: 72, centres: 8, students: 320 },
    { id: 3, name: "Skill Development Corp", status: "Active", trustScore: 91, centres: 15, students: 680 },
  ]

  const handleExportCSV = () => {
    const csvData = [
      ['ID', 'Name', 'Status', 'Trust Score', 'Centres', 'Students'],
      ...tps.map((tp) => [
        tp.id.toString(),
        tp.name,
        tp.status,
        tp.trustScore.toString(),
        tp.centres.toString(),
        tp.students.toString()
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `training_partners_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Training Partners</h1>
          <p className="text-slate-600">Manage and monitor training partner organizations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="font-open-sans bg-transparent" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Link href="/tps/new">
            <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white font-open-sans">
              <Plus className="h-4 w-4 mr-2" />
              New Training Partner
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input placeholder="Search training partners..." className="pl-10" />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tps.map((tp) => (
              <div key={tp.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{tp.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span>{tp.centres} centres</span>
                    <span>{tp.students} students</span>
                    <span>Trust Score: {tp.trustScore}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={tp.status === "Active" ? "default" : "secondary"}>{tp.status}</Badge>
                  <div className="flex gap-2">
                    <Link href={`/tps/${tp.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/tps/${tp.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/tps/${tp.id}/documents`}>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
