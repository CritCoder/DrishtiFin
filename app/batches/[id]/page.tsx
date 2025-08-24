"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { 
  ArrowLeft, 
  GraduationCap, 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  FileText,
  Download,
  Edit,
  Save,
  X,
  Users,
  Building2,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react"
import Link from "next/link"

interface Props {
  params: { id: string }
}

export default function BatchDetailPage({ params }: Props) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({} as any)

  // Mock batch data based on ID
  const batch = {
    id: params.id,
    name: params.id === "BATCH-2025-054" ? "Digital Marketing - Batch 2025-054" : "Data Entry Operator - Batch 2024-01",
    tp: "TechSkills Training Center",
    status: "Active",
    program: "Digital Marketing",
    instructor: "Rajesh Kumar",
    capacity: 30,
    enrolled: 28,
    completed: 0,
    startDate: "2024-08-15",
    endDate: "2025-02-15",
    location: "Delhi Training Center",
    description: "Comprehensive digital marketing training program covering SEO, social media marketing, PPC advertising, and analytics.",
    prerequisites: "Basic computer knowledge, High school diploma",
    schedule: {
      duration: "6 months",
      timing: "Mon-Fri, 10:00 AM - 4:00 PM",
      mode: "Offline"
    },
    students: [
      { id: 1, name: "Amit Sharma", email: "amit@email.com", phone: "+91 9876543210", status: "Active", attendance: 95 },
      { id: 2, name: "Priya Singh", email: "priya@email.com", phone: "+91 9876543211", status: "Active", attendance: 88 },
      { id: 3, name: "Rahul Kumar", email: "rahul@email.com", phone: "+91 9876543212", status: "Active", attendance: 92 },
      { id: 4, name: "Sunita Devi", email: "sunita@email.com", phone: "+91 9876543213", status: "Dropped", attendance: 65 },
      { id: 5, name: "Vikram Yadav", email: "vikram@email.com", phone: "+91 9876543214", status: "Active", attendance: 98 }
    ],
    milestones: [
      { date: "2024-08-15", event: "Batch started", status: "completed" },
      { date: "2024-09-15", event: "Module 1: Digital Marketing Basics completed", status: "completed" },
      { date: "2024-10-15", event: "Module 2: SEO & Content Marketing", status: "completed" },
      { date: "2024-11-15", event: "Module 3: Social Media Marketing", status: "current" },
      { date: "2024-12-15", event: "Module 4: PPC & Analytics", status: "pending" },
      { date: "2025-01-15", event: "Module 5: Project Work", status: "pending" },
      { date: "2025-02-15", event: "Batch completion & certification", status: "pending" }
    ],
    payments: {
      total: 45000,
      received: 27000,
      pending: 18000,
      milestonesPaid: 3,
      totalMilestones: 5
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      case 'dropped': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditData({
        status: batch.status,
        description: batch.description,
        capacity: batch.capacity.toString(),
        endDate: batch.endDate,
        instructor: batch.instructor
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSaveEdit = () => {
    toast({
      title: "Batch Updated",
      description: "Batch details have been updated successfully."
    })
    setIsEditing(false)
  }

  const exportStudentList = () => {
    const csvData = [
      ['Student ID', 'Name', 'Email', 'Phone', 'Status', 'Attendance %'],
      ...batch.students.map(student => [
        student.id.toString(),
        student.name,
        student.email,
        student.phone,
        student.status,
        student.attendance.toString() + '%'
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${batch.name.replace(/\s+/g, '_')}_students.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Student List Exported",
      description: "Student list has been downloaded as CSV file."
    })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/app">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/batches">Batches</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{batch.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/batches">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Batches
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{batch.name}</h1>
            <p className="text-gray-600">{batch.tp} • {batch.enrolled}/{batch.capacity} students</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(batch.status)}>
            {batch.status}
          </Badge>
          {isEditing ? (
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveEdit}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button size="sm" variant="outline" onClick={handleEditToggle}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={handleEditToggle}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Batch
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Batch Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Batch Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Program</label>
                <p className="text-gray-900">{batch.program}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Training Partner</label>
                <p className="text-gray-900">{batch.tp}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Instructor</label>
                {isEditing ? (
                  <div className="mt-1">
                    <Label htmlFor="instructor">Lead Instructor</Label>
                    <Input
                      id="instructor"
                      value={editData.instructor}
                      onChange={(e) => setEditData({...editData, instructor: e.target.value})}
                    />
                  </div>
                ) : (
                  <p className="text-gray-900">{batch.instructor}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Location</label>
                <p className="text-gray-900 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {batch.location}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Duration</label>
                <p className="text-gray-900 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {batch.startDate} to {batch.endDate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Capacity</label>
                {isEditing ? (
                  <div className="mt-1">
                    <Label htmlFor="capacity">Batch Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={editData.capacity}
                      onChange={(e) => setEditData({...editData, capacity: e.target.value})}
                    />
                  </div>
                ) : (
                  <p className="text-gray-900 flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    {batch.enrolled}/{batch.capacity} students
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">Description</label>
                {isEditing ? (
                  <div className="mt-1">
                    <Label htmlFor="description">Batch Description</Label>
                    <Textarea
                      id="description"
                      value={editData.description}
                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                ) : (
                  <p className="text-gray-900">{batch.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Student List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Students ({batch.students.length})
              </CardTitle>
              <Button size="sm" onClick={exportStudentList}>
                <Download className="w-4 h-4 mr-2" />
                Export List
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {batch.students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span>{student.email}</span>
                        <span>{student.phone}</span>
                        <span>Attendance: {student.attendance}%</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Progress Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {batch.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.status === 'completed' ? 'bg-green-500' : 
                      milestone.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="w-3 h-3 text-white" />
                      ) : milestone.status === 'current' ? (
                        <Clock className="w-3 h-3 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{milestone.event}</p>
                      <p className="text-xs text-gray-500">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Amount</span>
                  <span className="font-medium">₹{batch.payments.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Received</span>
                  <span className="font-medium">₹{batch.payments.received.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-orange-600">
                  <span>Pending</span>
                  <span className="font-medium">₹{batch.payments.pending.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Milestones</span>
                    <span className="font-medium">{batch.payments.milestonesPaid}/{batch.payments.totalMilestones}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(batch.payments.milestonesPaid / batch.payments.totalMilestones) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Duration</label>
                <p className="text-gray-900">{batch.schedule.duration}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Timing</label>
                <p className="text-gray-900">{batch.schedule.timing}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Mode</label>
                <p className="text-gray-900">{batch.schedule.mode}</p>
              </div>
            </CardContent>
          </Card>

          {/* Status Update (Edit Mode) */}
          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="status">Batch Status</Label>
                  <Select value={editData.status} onValueChange={(value) => setEditData({...editData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}