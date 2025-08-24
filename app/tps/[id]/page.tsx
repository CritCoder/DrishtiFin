"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users,
  FileCheck,
  Download,
  Edit,
  Save,
  X,
  Calendar,
  Star,
  TrendingUp,
  GraduationCap
} from "lucide-react"
import Link from "next/link"

interface Props {
  params: { id: string }
}

export default function TrainingPartnerDetailPage({ params }: Props) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock TP data based on ID
  const tp = {
    id: params.id,
    name: params.id === "1" ? "TechSkills Training Pvt Ltd" : params.id === "2" ? "Digital Learning Solutions" : "Skill Development Corp",
    status: params.id === "2" ? "Pending" : "Active",
    trustScore: params.id === "1" ? 85 : params.id === "2" ? 72 : 91,
    registrationNumber: `REG-${params.id.padStart(3, '0')}-2024`,
    gstNumber: `GST${params.id}ABCDE1234F1Z5`,
    panNumber: `ABCDE1234${params.id}`,
    contactPerson: "Rajesh Kumar",
    email: "contact@techskills.com",
    phone: "+91 9876543210",
    address: "123 Tech Park, Sector 15, Gurgaon, Haryana - 122001",
    establishedDate: "2015-03-15",
    centers: [
      { id: 1, name: "Delhi Center", location: "Connaught Place, New Delhi", capacity: 50, active: true },
      { id: 2, name: "Gurgaon Center", location: "Cyber City, Gurgaon", capacity: 75, active: true },
      { id: 3, name: "Noida Center", location: "Sector 62, Noida", capacity: 60, active: false }
    ],
    programs: [
      { name: "Data Entry Operator", duration: "3 months", fee: 15000, students: 120 },
      { name: "Computer Hardware & Networking", duration: "6 months", fee: 25000, students: 85 },
      { name: "Digital Marketing", duration: "4 months", fee: 20000, students: 95 }
    ],
    performance: {
      totalStudents: 450,
      completionRate: 82,
      placementRate: 75,
      avgSalary: 280000,
      activeBatches: 12,
      completedBatches: 28
    },
    documents: [
      { name: "Registration Certificate", status: "Approved", uploadDate: "2024-01-15" },
      { name: "GST Certificate", status: "Approved", uploadDate: "2024-01-16" },
      { name: "PAN Card", status: "Approved", uploadDate: "2024-01-17" },
      { name: "Bank Details", status: "Pending", uploadDate: "2024-01-20" }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
    if (isEditing) {
      toast({
        title: "Training Partner Updated",
        description: "Training partner details have been updated successfully."
      })
    }
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
              <Link href="/tps">Training Partners</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{tp.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/tps">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Training Partners
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{tp.name}</h1>
            <p className="text-gray-600">{tp.registrationNumber} • Trust Score: {tp.trustScore}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(tp.status)}>
            {tp.status}
          </Badge>
          <Button size="sm" onClick={handleEdit}>
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? "Save Changes" : "Edit Details"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Organization Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Organization Name</label>
                <p className="text-gray-900">{tp.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Registration Number</label>
                <p className="text-gray-900">{tp.registrationNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">GST Number</label>
                <p className="text-gray-900">{tp.gstNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">PAN Number</label>
                <p className="text-gray-900">{tp.panNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Contact Person</label>
                <p className="text-gray-900">{tp.contactPerson}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Established Date</label>
                <p className="text-gray-900 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {tp.establishedDate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 flex items-center gap-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {tp.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900 flex items-center gap-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {tp.phone}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900 flex items-start gap-1">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  {tp.address}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Training Centers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-600" />
                Training Centers ({tp.centers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tp.centers.map((center) => (
                  <div key={center.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{center.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{center.location}</p>
                      <p className="text-sm text-gray-500">Capacity: {center.capacity} students</p>
                    </div>
                    <Badge className={center.active ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}>
                      {center.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Programs Offered */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                Training Programs ({tp.programs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tp.programs.map((program, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{program.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span>Duration: {program.duration}</span>
                        <span>Fee: ₹{program.fee.toLocaleString()}</span>
                        <span>Students: {program.students}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{tp.performance.totalStudents}</div>
                  <div className="text-xs text-blue-800">Total Students</div>
                </div>
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{tp.performance.completionRate}%</div>
                  <div className="text-xs text-green-800">Completion Rate</div>
                </div>
                <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{tp.performance.placementRate}%</div>
                  <div className="text-xs text-purple-800">Placement Rate</div>
                </div>
                <div className="text-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">₹{(tp.performance.avgSalary/100000).toFixed(1)}L</div>
                  <div className="text-xs text-orange-800">Avg Salary</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Active Batches</span>
                  <p className="font-semibold text-gray-900">{tp.performance.activeBatches}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Completed Batches</span>
                  <p className="font-semibold text-gray-900">{tp.performance.completedBatches}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Trust Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">{tp.trustScore}%</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-yellow-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${tp.trustScore}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {tp.trustScore >= 85 ? 'Excellent' : tp.trustScore >= 70 ? 'Good' : 'Needs Improvement'} rating
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Documents Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-600" />
                Document Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tp.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.uploadDate}</p>
                    </div>
                    <Badge className={doc.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}>
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link href={`/tps/${tp.id}/documents`} className="mt-4 block">
                <Button variant="outline" size="sm" className="w-full">
                  <FileCheck className="w-4 h-4 mr-2" />
                  View All Documents
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}