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
import { GSTVerificationInput } from "@/components/ui/gst-verification-input"
import { AddressAutocomplete } from "@/components/ui/address-autocomplete"
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Save,
  X,
  Calendar,
  Plus,
  Trash2
} from "lucide-react"
import Link from "next/link"

interface Props {
  params: { id: string }
}

export default function EditTrainingPartnerPage({ params }: Props) {
  const { toast } = useToast()

  // Mock TP data based on ID for editing
  const [formData, setFormData] = useState({
    id: params.id,
    name: params.id === "1" ? "TechSkills Training Pvt Ltd" : params.id === "2" ? "Digital Learning Solutions" : "Skill Development Corp",
    status: params.id === "2" ? "Pending" : "Active",
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
      { id: 1, name: "Data Entry Operator", duration: "3 months", fee: 15000 },
      { id: 2, name: "Computer Hardware & Networking", duration: "6 months", fee: 25000 },
      { id: 3, name: "Digital Marketing", duration: "4 months", fee: 20000 }
    ]
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCenterChange = (index: number, field: string, value: string | boolean | number) => {
    const updatedCenters = [...formData.centers]
    updatedCenters[index] = { ...updatedCenters[index], [field]: value }
    setFormData(prev => ({
      ...prev,
      centers: updatedCenters
    }))
  }

  const handleProgramChange = (index: number, field: string, value: string | number) => {
    const updatedPrograms = [...formData.programs]
    updatedPrograms[index] = { ...updatedPrograms[index], [field]: value }
    setFormData(prev => ({
      ...prev,
      programs: updatedPrograms
    }))
  }

  const addCenter = () => {
    try {
      const newCenter = {
        id: Date.now(),
        name: "",
        location: "",
        capacity: 0,
        active: true
      }
      setFormData(prev => ({
        ...prev,
        centers: [...prev.centers, newCenter]
      }))
      toast({
        title: "Center Added",
        description: "New center has been added. Fill in the details.",
      })
    } catch (error) {
      console.error('Error adding center:', error)
      toast({
        title: "Error",
        description: "Failed to add center. Please try again.",
        variant: "destructive"
      })
    }
  }

  const removeCenter = (index: number) => {
    const updatedCenters = formData.centers.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      centers: updatedCenters
    }))
  }

  const addProgram = () => {
    try {
      const newProgram = {
        id: Date.now(),
        name: "",
        duration: "",
        fee: 0
      }
      setFormData(prev => ({
        ...prev,
        programs: [...prev.programs, newProgram]
      }))
      toast({
        title: "Program Added",
        description: "New program has been added. Fill in the details.",
      })
    } catch (error) {
      console.error('Error adding program:', error)
      toast({
        title: "Error",
        description: "Failed to add program. Please try again.",
        variant: "destructive"
      })
    }
  }

  const removeProgram = (index: number) => {
    const updatedPrograms = formData.programs.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      programs: updatedPrograms
    }))
  }

  const handleSave = () => {
    // In a real app, this would make an API call
    toast({
      title: "Training Partner Updated",
      description: "Training partner details have been updated successfully."
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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
            <BreadcrumbLink asChild>
              <Link href={`/tps/${params.id}`}>{formData.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Training Partner</h1>
          <p className="text-gray-600">{formData.registrationNumber}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(formData.status)}>
            {formData.status}
          </Badge>
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
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
                <Label htmlFor="name">Organization Name</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input 
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                />
              </div>
              <div>
                <GSTVerificationInput
                  label="GST Number"
                  value={formData.gstNumber}
                  onChange={(value, verificationData) => {
                    handleInputChange('gstNumber', value)
                    // Store verification data if needed
                    if (verificationData) {
                      handleInputChange('gstVerified', true)
                      // Optionally update organization name with verified data
                      if (verificationData.lgnm && !formData.organizationName) {
                        handleInputChange('organizationName', verificationData.lgnm)
                      }
                    }
                  }}
                  id="gstNumber"
                />
              </div>
              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input 
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange('panNumber', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input 
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="establishedDate">Established Date</Label>
                <Input 
                  id="establishedDate"
                  type="date"
                  value={formData.establishedDate}
                  onChange={(e) => handleInputChange('establishedDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <AddressAutocomplete
                  label="Address"
                  placeholder="Start typing address..."
                  fullAddress={formData.address}
                  onAddressSelect={(addressComponents) => {
                    handleInputChange('address', addressComponents.fullAddress)
                  }}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Training Centers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  Training Centers ({formData.centers.length})
                </CardTitle>
                <Button size="sm" onClick={addCenter}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Center
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.centers.map((center, index) => (
                  <div key={center.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Center {index + 1}</h4>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => removeCenter(index)}
                        disabled={formData.centers.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Center Name</Label>
                        <Input 
                          value={center.name}
                          onChange={(e) => handleCenterChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input 
                          value={center.location}
                          onChange={(e) => handleCenterChange(index, 'location', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Capacity</Label>
                        <Input 
                          type="number"
                          value={center.capacity}
                          onChange={(e) => handleCenterChange(index, 'capacity', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={center.active}
                          onChange={(e) => handleCenterChange(index, 'active', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm font-medium">Active Center</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Programs Offered */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  Training Programs ({formData.programs.length})
                </CardTitle>
                <Button size="sm" onClick={addProgram}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Program
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.programs.map((program, index) => (
                  <div key={program.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Program {index + 1}</h4>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => removeProgram(index)}
                        disabled={formData.programs.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Program Name</Label>
                        <Input 
                          value={program.name}
                          onChange={(e) => handleProgramChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input 
                          value={program.duration}
                          onChange={(e) => handleProgramChange(index, 'duration', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Fee (₹)</Label>
                        <Input 
                          type="number"
                          value={program.fee}
                          onChange={(e) => handleProgramChange(index, 'fee', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status and Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Current Status</Label>
                <select 
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              
              <div className="pt-4 border-t space-y-3">
                <Button variant="outline" className="w-full">
                  View Documents
                </Button>
                <Button variant="outline" className="w-full">
                  View Audit Trail
                </Button>
                <Button variant="destructive" className="w-full">
                  Suspend Partner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}