"use client"

import type React from "react"

import { useState } from "react"
import { useNotificationModal } from "@/components/notification-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Building,
  GraduationCap,
  Eye,
  EyeOff,
  Shield,
  Users,
  UserCheck,
  ArrowRight,
  Check,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

const STEPS = {
  TYPE_SELECTION: 1,
  SUBTYPE_SELECTION: 2,
  BASIC_INFO: 3,
  ROLE_DETAILS: 4,
  ADDRESS: 5,
  SECURITY: 6,
  REVIEW: 7,
}

const registrationTypes = [
  {
    id: "osda_admin",
    title: "OSDA Admin",
    description: "Government officials managing the DRISHTI system",
    icon: Shield,
    subtypes: [
      { id: "super_admin", title: "Super Admin", description: "Full system access and control" },
      { id: "department_user", title: "Department User", description: "Department-level administration" },
    ],
    fields: ["organization", "government", "contact", "address"],
  },
  {
    id: "training_partner",
    title: "Training Partner",
    description: "Organizations providing training services",
    icon: Building,
    subtypes: [
      { id: "tp_admin", title: "TP Admin", description: "Training partner administrator" },
      { id: "tp_staff", title: "TP Staff", description: "Training partner staff member" },
    ],
    fields: ["organization", "gst", "contact", "address"],
  },
  {
    id: "student",
    title: "Student",
    description: "Students accessing training programs",
    icon: GraduationCap,
    subtypes: [],
    fields: ["personal", "education", "contact"],
  },
  {
    id: "employer",
    title: "Employer",
    description: "Companies offering job placements",
    icon: Users,
    subtypes: [],
    fields: ["organization", "contact", "address"],
  },
  {
    id: "system_integrator",
    title: "System Integrator",
    description: "Technical auditors and system integrators",
    icon: UserCheck,
    subtypes: [],
    fields: ["organization", "technical", "contact"],
  },
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(STEPS.TYPE_SELECTION)
  const [registrationType, setRegistrationType] = useState<string>("")
  const [registrationSubtype, setRegistrationSubtype] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { showNotification, NotificationComponent } = useNotificationModal()
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPersonName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gstNumber: "",
    panNumber: "",
    registrationNumber: "",
    departmentName: "",
    employeeId: "",
    designation: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    dateOfBirth: "",
    education: "",
    agreeToTerms: false,
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const nextStep = () => {
    setError("")
    const selectedType = registrationTypes.find((t) => t.id === registrationType)

    if (currentStep === STEPS.TYPE_SELECTION && selectedType?.subtypes.length > 0) {
      setCurrentStep(STEPS.SUBTYPE_SELECTION)
    } else if (currentStep === STEPS.TYPE_SELECTION) {
      setCurrentStep(STEPS.BASIC_INFO)
    } else if (currentStep === STEPS.SUBTYPE_SELECTION) {
      setCurrentStep(STEPS.BASIC_INFO)
    } else if (currentStep < STEPS.REVIEW) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setError("")
    const selectedType = registrationTypes.find((t) => t.id === registrationType)

    if (currentStep === STEPS.SUBTYPE_SELECTION) {
      setCurrentStep(STEPS.TYPE_SELECTION)
    } else if (currentStep === STEPS.BASIC_INFO && selectedType?.subtypes.length > 0) {
      setCurrentStep(STEPS.SUBTYPE_SELECTION)
    } else if (currentStep === STEPS.BASIC_INFO) {
      setCurrentStep(STEPS.TYPE_SELECTION)
    } else if (currentStep > STEPS.TYPE_SELECTION) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case STEPS.TYPE_SELECTION:
        if (!registrationType) {
          setError("Please select a registration type")
          return false
        }
        break
      case STEPS.SUBTYPE_SELECTION:
        if (!registrationSubtype) {
          setError("Please select a specific role type")
          return false
        }
        break
      case STEPS.BASIC_INFO:
        if (!formData.email || !formData.phone) {
          setError("Please fill in all required basic information")
          return false
        }
        if (registrationType === "student" && !formData.contactPersonName) {
          setError("Please enter your full name")
          return false
        }
        if (registrationType !== "student" && (!formData.organizationName || !formData.contactPersonName)) {
          setError("Please fill in organization and contact person details")
          return false
        }
        break
      case STEPS.ROLE_DETAILS:
        if (
          registrationType === "osda_admin" &&
          (!formData.departmentName || !formData.employeeId || !formData.designation)
        ) {
          setError("Please fill in all government details")
          return false
        }
        break
      case STEPS.SECURITY:
        if (!formData.password || !formData.confirmPassword) {
          setError("Please enter and confirm your password")
          return false
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          return false
        }
        break
      case STEPS.REVIEW:
        if (!formData.agreeToTerms) {
          setError("Please agree to the terms and conditions")
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCurrentStep()) return

    setIsLoading(true)
    setError("")

    try {
      // Simulate registration API call
      setTimeout(async () => {
        try {
          // Send welcome/registration email
          const emailResponse = await fetch('/api/notifications/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'welcome',
              recipient: {
                userId: 'temp-' + Date.now(),
                email: formData.email,
                name: formData.contactPersonName || formData.organizationName,
                role: registrationType
              },
              data: {
                registrationDate: new Date().toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }
            })
          });

          const emailSent = emailResponse.ok;
          
          // Determine if this registration type needs approval
          const needsApproval = ['training_partner', 'employer', 'system_integrator'].includes(registrationType);
          
          setIsLoading(false);
          
          if (needsApproval) {
            showNotification({
              status: 'info',
              title: 'Registration Submitted!',
              message: `Your ${registrationType === 'training_partner' ? 'training partner' : registrationType} registration has been submitted and is pending approval. You'll receive an email confirmation once approved.`,
              actionLabel: 'Go to Login',
              onAction: () => window.location.href = "/login",
              showEmailIndicator: emailSent
            });
          } else {
            showNotification({
              status: 'success',
              title: 'Account Created Successfully!',
              message: 'Your account has been created and is ready to use. You can now sign in to access the platform.',
              actionLabel: 'Sign In Now',
              onAction: () => window.location.href = "/login",
              showEmailIndicator: emailSent
            });
          }
        } catch (error) {
          setIsLoading(false);
          showNotification({
            status: 'error',
            title: 'Registration Error',
            message: 'There was an issue processing your registration. Please try again or contact support.',
            actionLabel: 'Try Again'
          });
        }
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      showNotification({
        status: 'error',
        title: 'Registration Failed',
        message: 'Unable to submit your registration. Please check your connection and try again.',
        actionLabel: 'Retry'
      });
    }
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegistrationTypeChange = (typeId: string) => {
    setRegistrationType(typeId)
    setRegistrationSubtype("")
    nextStep()
  }

  const handleRegistrationSubtypeChange = (subtypeId: string) => {
    setRegistrationSubtype(subtypeId)
    nextStep()
  }

  const selectedType = registrationTypes.find((t) => t.id === registrationType)

  const getProgress = () => {
    const totalSteps = selectedType?.subtypes.length > 0 ? 7 : 6
    const adjustedStep =
      selectedType?.subtypes.length > 0
        ? currentStep
        : currentStep > STEPS.SUBTYPE_SELECTION
          ? currentStep - 1
          : currentStep
    return (adjustedStep / totalSteps) * 100
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case STEPS.TYPE_SELECTION:
        return "Select Account Type"
      case STEPS.SUBTYPE_SELECTION:
        return "Choose Your Role"
      case STEPS.BASIC_INFO:
        return "Basic Information"
      case STEPS.ROLE_DETAILS:
        return "Role Details"
      case STEPS.ADDRESS:
        return "Address Information"
      case STEPS.SECURITY:
        return "Account Security"
      case STEPS.REVIEW:
        return "Review & Submit"
      default:
        return "Create Account"
    }
  }

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="grid lg:grid-cols-2 h-screen">
        {/* Left Column - Hero Section */}
        <div className="hidden lg:flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

          <div className="relative z-10 flex flex-col justify-center items-center text-center p-8 text-white w-full">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 border border-white/20">
              <span className="text-3xl font-serif font-bold text-white">D</span>
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4 leading-tight max-w-2xl">
              Join the <span className="text-purple-400">Future</span>
            </h1>
            <h2 className="text-3xl font-serif font-bold mb-6 text-gray-200">of Training Management</h2>

            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-8">
              Create your DRISHTI account to access comprehensive training partner management and student tracking
              capabilities.
            </p>

            <div className="flex space-x-4">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Column - Registration Form */}
        <div className="flex items-center justify-center p-6 bg-white">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="lg:hidden w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-lg font-serif font-bold text-white">D</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "/login")}
                className="mb-4 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>

              <h1 className="text-3xl font-serif font-bold text-foreground mb-2 leading-tight">{getStepTitle()}</h1>
              <p className="text-muted-foreground text-base mb-6">
                {currentStep === STEPS.TYPE_SELECTION
                  ? "Choose your account type to get started"
                  : currentStep === STEPS.REVIEW
                    ? "Review your information and create your account"
                    : `Step ${currentStep} of ${selectedType?.subtypes.length > 0 ? 7 : 6}`}
              </p>

              {currentStep > STEPS.TYPE_SELECTION && (
                <div className="mb-6">
                  <Progress value={getProgress()} className="h-2" />
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {currentStep === STEPS.TYPE_SELECTION && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {registrationTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <Card
                      key={type.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-accent/50 h-fit"
                      onClick={() => handleRegistrationTypeChange(type.id)}
                    >
                      <CardHeader className="text-center pb-3 pt-4 px-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <CardTitle className="text-sm font-serif leading-tight">{type.title}</CardTitle>
                        <CardDescription className="text-xs leading-snug line-clamp-2">
                          {type.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 pb-4 px-4">
                        <Button className="w-full h-9 bg-primary hover:bg-primary/90 font-medium text-sm" size="sm">
                          Select
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {currentStep === STEPS.SUBTYPE_SELECTION && selectedType?.subtypes.length > 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedType.subtypes.map((subtype) => (
                    <Card
                      key={subtype.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-accent/50"
                      onClick={() => handleRegistrationSubtypeChange(subtype.id)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{subtype.title}</CardTitle>
                        <CardDescription className="text-sm">{subtype.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button className="w-full h-10" size="sm">
                          Select {subtype.title}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>
              </div>
            )}

            {currentStep === STEPS.BASIC_INFO && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        {registrationType === "student" ? "Full Name" : "Organization/Department Name"}
                      </Label>
                      <Input
                        id="name"
                        className="h-10 border-input bg-background"
                        value={registrationType === "student" ? formData.contactPersonName : formData.organizationName}
                        onChange={(e) =>
                          updateFormData(
                            registrationType === "student" ? "contactPersonName" : "organizationName",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </div>
                    {registrationType !== "student" && (
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson" className="text-sm font-medium">
                          Contact Person Name
                        </Label>
                        <Input
                          id="contactPerson"
                          className="h-10 border-input bg-background"
                          value={formData.contactPersonName}
                          onChange={(e) => updateFormData("contactPersonName", e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="h-10 border-input bg-background"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="h-10 border-input bg-background"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === STEPS.ROLE_DETAILS && (
              <div className="space-y-6">
                {registrationType === "osda_admin" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Government Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department" className="text-sm font-medium">
                          Department Name
                        </Label>
                        <Input
                          id="department"
                          className="h-10 border-input bg-background"
                          value={formData.departmentName}
                          onChange={(e) => updateFormData("departmentName", e.target.value)}
                          placeholder="e.g., Skill Development Department"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employeeId" className="text-sm font-medium">
                          Employee ID
                        </Label>
                        <Input
                          id="employeeId"
                          className="h-10 border-input bg-background"
                          value={formData.employeeId}
                          onChange={(e) => updateFormData("employeeId", e.target.value)}
                          placeholder="e.g., EMP001234"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation" className="text-sm font-medium">
                        Designation
                      </Label>
                      <Input
                        id="designation"
                        className="h-10 border-input bg-background"
                        value={formData.designation}
                        onChange={(e) => updateFormData("designation", e.target.value)}
                        placeholder="e.g., Joint Director"
                        required
                      />
                    </div>
                  </div>
                )}

                {(registrationType === "training_partner" || registrationType === "employer") && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Organization Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gst" className="text-sm font-medium">
                          GST Number
                        </Label>
                        <Input
                          id="gst"
                          className="h-10 border-input bg-background"
                          value={formData.gstNumber}
                          onChange={(e) => updateFormData("gstNumber", e.target.value)}
                          placeholder="27AARFR5953J1ZF"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pan" className="text-sm font-medium">
                          PAN Number
                        </Label>
                        <Input
                          id="pan"
                          className="h-10 border-input bg-background"
                          value={formData.panNumber}
                          onChange={(e) => updateFormData("panNumber", e.target.value)}
                          placeholder="AARFR5953J"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {registrationType === "student" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dob" className="text-sm font-medium">
                          Date of Birth
                        </Label>
                        <Input
                          id="dob"
                          type="date"
                          className="h-10 border-input bg-background"
                          value={formData.dateOfBirth}
                          onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education" className="text-sm font-medium">
                          Highest Education
                        </Label>
                        <Select onValueChange={(value) => updateFormData("education", value)}>
                          <SelectTrigger className="h-10 border-input bg-background">
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10th">10th Grade</SelectItem>
                            <SelectItem value="12th">12th Grade</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="postgraduate">Post Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === STEPS.ADDRESS && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Address Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Complete Address
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      rows={3}
                      className="resize-none border-input bg-background"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City
                      </Label>
                      <Input
                        id="city"
                        className="h-10 border-input bg-background"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium">
                        State
                      </Label>
                      <Input
                        id="state"
                        className="h-10 border-input bg-background"
                        value={formData.state}
                        onChange={(e) => updateFormData("state", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-sm font-medium">
                        PIN Code
                      </Label>
                      <Input
                        id="pincode"
                        className="h-10 border-input bg-background"
                        value={formData.pincode}
                        onChange={(e) => updateFormData("pincode", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === STEPS.SECURITY && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Security</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="h-10 border-input bg-background"
                          value={formData.password}
                          onChange={(e) => updateFormData("password", e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className="h-10 border-input bg-background"
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === STEPS.REVIEW && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review Your Information</h3>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Account Type:</span>
                      <span className="text-sm">
                        {selectedType?.title}{" "}
                        {registrationSubtype &&
                          `- ${selectedType?.subtypes.find((s) => s.id === registrationSubtype)?.title}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm">{formData.contactPersonName || formData.organizationName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Email:</span>
                      <span className="text-sm">{formData.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Phone:</span>
                      <span className="text-sm">{formData.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms" className="text-sm font-normal">
                        I agree to the{" "}
                        <button type="button" className="text-accent hover:underline">
                          Terms and Conditions
                        </button>{" "}
                        and{" "}
                        <button type="button" className="text-accent hover:underline">
                          Privacy Policy
                        </button>
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={isLoading} className="min-w-[140px]">
                    {isLoading ? (
                      "Creating Account..."
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center mt-8 text-xs text-muted-foreground">
              <p>© 2024 DRISHTI</p>
              <div className="flex justify-center space-x-4 mt-2">
                <button className="hover:text-foreground transition-colors">Privacy Policy</button>
                <button className="hover:text-foreground transition-colors">Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <NotificationComponent />
    </>
  )
}
