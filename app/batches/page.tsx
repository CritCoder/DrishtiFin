"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Users, Calendar, Plus, Download } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Batch {
  id: string
  name: string
  tp: string
  status: string
  students: number
  startDate: string
  endDate: string
  program?: string
  instructor?: string
  location?: string
}

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Load from localStorage if available (for newly created batches)
      const storedBatches = localStorage.getItem('drishti_batches')
      let initialBatches = storedBatches ? JSON.parse(storedBatches) : []
      
      // Add some default batches if none exist
      if (initialBatches.length === 0) {
        initialBatches = [
          {
            id: "BATCH-2024-001",
            name: "Data Entry Operator - Batch 2024-01",
            tp: "TechSkills Training Center",
            status: "Active",
            students: 25,
            startDate: "2024-01-15",
            endDate: "2024-06-15",
            program: "Data Entry Operations",
            instructor: "Rajesh Kumar",
            location: "Delhi Center"
          },
          {
            id: "BATCH-2024-002", 
            name: "Computer Hardware - Batch 2024-02",
            tp: "SkillDev Institute",
            status: "Active",
            students: 20,
            startDate: "2024-02-01",
            endDate: "2024-07-01",
            program: "Computer Hardware & Networking",
            instructor: "Priya Sharma",
            location: "Mumbai Center"
          },
          {
            id: "BATCH-2023-003",
            name: "Digital Marketing - Batch 2023-12",
            tp: "TechSkills Training Center",
            status: "Completed",
            students: 30,
            startDate: "2023-12-01",
            endDate: "2024-05-01",
            program: "Digital Marketing",
            instructor: "Amit Singh",
            location: "Bangalore Center"
          },
        ]
        
        // Save to localStorage
        localStorage.setItem('drishti_batches', JSON.stringify(initialBatches))
      }
      
      setBatches(initialBatches)
      setLoading(false)
    }

    fetchBatches()
  }, [])

  // Listen for storage changes (when new batch is created)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedBatches = localStorage.getItem('drishti_batches')
      if (storedBatches) {
        setBatches(JSON.parse(storedBatches))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredBatches = batches.filter(batch => 
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.tp.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.program?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExportCSV = () => {
    const csvData = [
      ['Batch ID', 'Batch Name', 'Training Partner', 'Program', 'Status', 'Students', 'Start Date', 'End Date', 'Instructor', 'Location'],
      ...filteredBatches.map(batch => [
        batch.id,
        batch.name,
        batch.tp,
        batch.program || '',
        batch.status,
        batch.students.toString(),
        batch.startDate,
        batch.endDate,
        batch.instructor || '',
        batch.location || ''
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `batches_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Batches</h1>
          <p className="text-gray-600">Manage training batches and track student progress</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Link href="/batches/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Batch
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search batches..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Badge variant="outline">
              {filteredBatches.length} batch{filteredBatches.length !== 1 ? 'es' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBatches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{batch.name}</h3>
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Training Partner:</span><br />
                      {batch.tp}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span><br />
                      {batch.startDate} to {batch.endDate}
                    </div>
                    <div>
                      <span className="font-medium">Students:</span><br />
                      {batch.students} enrolled
                    </div>
                  </div>
                  {(batch.program || batch.instructor || batch.location) && (
                    <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                      {batch.program && <span>Program: {batch.program}</span>}
                      {batch.instructor && <span>Instructor: {batch.instructor}</span>}
                      {batch.location && <span>Location: {batch.location}</span>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Users className="w-4 h-4 mr-1" />
                      {batch.students}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {batch.startDate}
                    </div>
                  </div>
                  <Link href={`/batches/${batch.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {filteredBatches.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No batches found</p>
                <p>Try adjusting your search terms or create a new batch</p>
                <Link href="/batches/new" className="mt-4 inline-block">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Batch
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}