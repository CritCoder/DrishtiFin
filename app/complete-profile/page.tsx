"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Shield, Building2, GraduationCap, Briefcase } from "lucide-react"

const userRoles = [
  {
    id: "student",
    title: "Student",
    description: "Access your training batches and placement opportunities",
    icon: GraduationCap,
  },
  {
    id: "training_partner",
    title: "Training Partner",
    description: "Manage batches, students, and submit reports",
    icon: Building2,
  },
  {
    id: "employer",
    title: "Employer",
    description: "Post jobs and manage recruitment",
    icon: Briefcase,
  },
  {
    id: "osda_admin",
    title: "OSDA Admin",
    description: "Government official with system access",
    icon: Shield,
  },
]

export default function CompleteProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    organizationName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    // Pre-fill name from OAuth profile
    if (session.user?.name) {
      const nameParts = session.user.name.split(' ')
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(' ') || "",
      }))
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (!formData.role) {
      setError("Please select your role")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          organizationName: formData.organizationName,
          password: formData.password,
          phone: formData.phone,
        }),
      })

      if (response.ok) {
        // Redirect based on role
        switch (formData.role) {
          case "student":
            router.push("/student/dashboard")
            break
          case "training_partner":
            router.push("/app")
            break
          case "employer":
            router.push("/app")
            break
          case "osda_admin":
            router.push("/app")
            break
          default:
            router.push("/app")
        }
      } else {
        const data = await response.json()
        setError(data.error || "Failed to complete profile")
      }
    } catch (error) {
      console.error("Profile completion error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Complete Your Profile
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Welcome {session?.user?.name}! Please complete your profile to get started.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 9876543210"
              />
            </div>

            <div className="space-y-3">
              <Label>Select Your Role *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userRoles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.role === role.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                  >
                    <div className="flex items-start space-x-3">
                      <role.icon className={`w-6 h-6 mt-1 ${
                        formData.role === role.id ? "text-blue-600" : "text-gray-400"
                      }`} />
                      <div>
                        <h3 className={`font-medium ${
                          formData.role === role.id ? "text-blue-900" : "text-gray-900"
                        }`}>
                          {role.title}
                        </h3>
                        <p className={`text-sm mt-1 ${
                          formData.role === role.id ? "text-blue-700" : "text-gray-600"
                        }`}>
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(formData.role === "training_partner" || formData.role === "employer") && (
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                  required
                  placeholder="Enter your organization name"
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Set Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12"
              disabled={loading}
            >
              {loading ? "Completing Profile..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}