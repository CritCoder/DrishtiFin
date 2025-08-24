"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AddressAutocomplete } from "@/components/ui/address-autocomplete"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface TPFormData {
  name: string
  registration: string
  email: string
  phone: string
  address: string
}

export default function NewTrainingPartnerPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<TPFormData>({
    name: "",
    registration: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof TPFormData, value: string) => {
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
      if (!formData.name || !formData.registration || !formData.email) {
        alert("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/tps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Training Partner created successfully!")
        router.push("/tps")
      } else {
        throw new Error("Failed to create training partner")
      }
    } catch (error) {
      console.error("Error creating training partner:", error)
      alert("Failed to create training partner. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the training partner details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name *</Label>
                <Input 
                  id="name" 
                  placeholder="Enter organization name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration">Registration Number *</Label>
                <Input 
                  id="registration" 
                  placeholder="Enter registration number"
                  value={formData.registration}
                  onChange={(e) => handleInputChange('registration', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter contact email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <Input 
                  id="phone" 
                  placeholder="Enter contact phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <AddressAutocomplete
                label="Address"
                placeholder="Start typing address..."
                fullAddress={formData.address}
                onAddressSelect={(addressComponents) => {
                  handleInputChange('address', addressComponents.fullAddress)
                }}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/tps">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Training Partner"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
