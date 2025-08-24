"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

interface BatchFormData {
  batchName: string
  trainingPartner: string
  program: string
  capacity: string
  startDate: string
  endDate: string
  instructor: string
  location: string
  description: string
  prerequisites: string
}

export default function NewBatchPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<BatchFormData>({
    batchName: "",
    trainingPartner: "",
    program: "",
    capacity: "",
    startDate: "",
    endDate: "",
    instructor: "",
    location: "",
    description: "",
    prerequisites: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof BatchFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.batchName || !formData.trainingPartner || !formData.program) {
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: 'Please fill in all required fields'
        })
        setIsSubmitting(false)
        return
      }

      // Mock API call - replace with actual API endpoint
      // Save to localStorage (simulating API)
      const newBatch = {
        id: `BATCH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        name: formData.batchName,
        tp: formData.trainingPartner,
        status: 'Upcoming',
        students: parseInt(formData.capacity) || 0,
        startDate: formData.startDate,
        endDate: formData.endDate,
        program: formData.program,
        instructor: formData.instructor,
        location: formData.location,
        description: formData.description,
        prerequisites: formData.prerequisites
      }

      // Get existing batches
      const existingBatches = JSON.parse(localStorage.getItem('drishti_batches') || '[]')
      
      // Add new batch
      existingBatches.unshift(newBatch)
      
      // Save back to localStorage
      localStorage.setItem('drishti_batches', JSON.stringify(existingBatches))

      // Simulate API response
      const response = { ok: true }

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Batch created successfully',
        })
        router.push("/batches")
      } else {
        throw new Error("Failed to create batch")
      }
    } catch (error) {
      console.error("Error creating batch:", error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create batch. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Batch Details</CardTitle>
          <CardDescription>Create a new training batch</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="batchName">Batch Name *</Label>
                <Input 
                  id="batchName" 
                  placeholder="e.g., Web Development Batch 2024-A"
                  value={formData.batchName}
                  onChange={(e) => handleInputChange('batchName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainingPartner">Training Partner *</Label>
                <Select value={formData.trainingPartner} onValueChange={(value) => handleInputChange('trainingPartner', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select training partner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="techskills">TechSkills Training</SelectItem>
                    <SelectItem value="digital">Digital Learning Solutions</SelectItem>
                    <SelectItem value="skilldev">Skill Development Corp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Training Program *</Label>
                <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="data">Data Analytics</SelectItem>
                    <SelectItem value="mobile">Mobile App Development</SelectItem>
                    <SelectItem value="digital">Digital Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Batch Capacity</Label>
                <Input 
                  id="capacity" 
                  type="number" 
                  placeholder="e.g., 30"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructor">Lead Instructor</Label>
                <Input 
                  id="instructor" 
                  placeholder="Enter instructor name"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Training Location</Label>
                <Input 
                  id="location" 
                  placeholder="Enter training location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Batch Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter batch description, objectives, and key details..." 
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Textarea 
                id="prerequisites" 
                placeholder="List any prerequisites or requirements for students..." 
                rows={3}
                value={formData.prerequisites}
                onChange={(e) => handleInputChange('prerequisites', e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/batches">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Batch"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}