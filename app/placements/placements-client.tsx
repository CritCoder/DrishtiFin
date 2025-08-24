"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Download, Eye, Building, DollarSign, Filter, X } from "lucide-react"
import Link from "next/link"

export default function PlacementsClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
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

  // Filter placements based on search and status
  const filteredPlacements = placements.filter(placement => {
    const matchesSearch = placement.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         placement.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         placement.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || placement.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  const handleExportCSV = () => {
    const csvData = [
      ['Student Name', 'Company', 'Position', 'Salary (INR)', 'Status', 'Date'],
      ...filteredPlacements.map(p => [
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

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setShowFilters(false)
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
              <Input 
                placeholder="Search placements..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(searchTerm || statusFilter !== "all") && (
                <Badge variant="secondary" className="ml-2">
                  {[searchTerm && "search", statusFilter !== "all" && "status"].filter(Boolean).length}
                </Badge>
              )}
            </Button>
            {(searchTerm || statusFilter !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input placeholder="Filter by company" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-300000">₹0 - ₹3L</SelectItem>
                      <SelectItem value="300000-500000">₹3L - ₹5L</SelectItem>
                      <SelectItem value="500000-800000">₹5L - ₹8L</SelectItem>
                      <SelectItem value="800000+">₹8L+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Showing {filteredPlacements.length} of {placements.length} placements
                </p>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(false)}>
                  Close Filters
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {filteredPlacements.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No placements found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "No placement records available"
                }
              </p>
              {(searchTerm || statusFilter !== "all") && (
                <Button onClick={clearFilters} variant="outline">
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPlacements.map((placement) => (
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}