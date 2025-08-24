"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useNotificationModal } from "@/components/notification-modal"
import { 
  User, 
  Building2, 
  MapPin, 
  Calendar,
  IndianRupee,
  FileText,
  Briefcase,
  Clock,
  CheckCircle,
  Plus,
  Search
} from "lucide-react"

export default function NewPlacementPage() {
  const [currentTab, setCurrentTab] = useState("basic")
  const [students, setStudents] = useState<any[]>([])
  const [batches, setBatches] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [formData, setFormData] = useState({
    // Student Information
    studentId: "",
    studentName: "",
    batchId: "",
    
    // Company Information  
    companyName: "",
    companyType: "",
    companySize: "",
    industry: "",
    
    // Job Details
    jobTitle: "",
    jobType: "full-time",
    workLocation: "",
    salary: "",
    joiningDate: "",
    
    // Additional Details
    jobDescription: "",
    skills: "",
    remarks: "",
    
    // Verification
    verificationStatus: "pending",
    offerLetter: null,
    employmentProof: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showNotification, NotificationComponent } = useNotificationModal()

  // Load students and batches data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch batches from localStorage (created from batches page)
        const storedBatches = localStorage.getItem('drishti_batches')
        let batchesData = storedBatches ? JSON.parse(storedBatches) : []
        
        // Add default batches if none exist
        if (batchesData.length === 0) {
          batchesData = [
            { id: "BATCH-2024-001", name: "Data Entry Operator - Batch 2024-01", tp: "TechSkills Training Center", students: 25 },
            { id: "BATCH-2024-002", name: "Computer Hardware - Batch 2024-02", tp: "SkillDev Institute", students: 20 },
            { id: "BATCH-2024-003", name: "Digital Marketing - Batch 2024-03", tp: "TechSkills Training Center", students: 30 },
            { id: "BATCH-2025-054", name: "Digital Marketing - Batch 2025-054", tp: "TechSkills Training Center", students: 28 }
          ]
        }
        setBatches(batchesData)

        // Generate students data based on batches
        const studentsData = []
        for (const batch of batchesData) {
          const batchStudents = Array.from({ length: Math.min(batch.students || 5, 10) }, (_, i) => {
            const names = [
              "Amit Sharma", "Priya Singh", "Rahul Kumar", "Sunita Devi", "Vikram Yadav",
              "Pooja Gupta", "Ravi Verma", "Neha Agarwal", "Sanjay Mishra", "Kavita Jain",
              "Deepak Pandey", "Shruti Shukla", "Manish Tiwari", "Anita Saxena", "Vishal Rai",
              "Meera Dubey", "Ajay Tripathi", "Reena Srivastava", "Suresh Pal", "Divya Sharma"
            ]
            const studentName = names[i % names.length]
            return {
              id: `${batch.id}-STU-${String(i + 1).padStart(3, '0')}`,
              name: studentName,
              email: `${studentName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
              phone: `+91 98765432${10 + i}`,
              batchId: batch.id,
              batchName: batch.name,
              status: Math.random() > 0.1 ? 'Active' : 'Completed',
              isPlaced: Math.random() > 0.7 // 30% already placed
            }
          })
          studentsData.push(...batchStudents)
        }
        setStudents(studentsData)

      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleStudentSelect = (studentId: string) => {
    const student = students.find(s => s.id === studentId)
    if (student) {
      setSelectedStudent(student)
      setFormData(prev => ({
        ...prev,
        studentId: student.id,
        studentName: student.name,
        batchId: student.batchId
      }))
    }
  }

  // Filter available students (not already placed)
  const availableStudents = students.filter(s => !s.isPlaced)
  const filteredStudents = availableStudents.filter(s => 
    s.name.toLowerCase().includes(formData.studentName.toLowerCase()) ||
    s.id.toLowerCase().includes(formData.studentName.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.studentName || !formData.companyName || !formData.jobTitle) {
      showNotification({
        status: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields: Student Name, Company Name, and Job Title.',
        actionLabel: 'OK'
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showNotification({
        status: 'success',
        title: 'Placement Record Created',
        message: `Successfully created placement record for ${formData.studentName} at ${formData.companyName}. The record is now pending verification.`,
        actionLabel: 'View Placements',
        onAction: () => window.location.href = "/placements"
      })

      // Reset form
      setFormData({
        studentId: "",
        studentName: "",
        batchId: "",
        companyName: "",
        companyType: "",
        companySize: "",
        industry: "",
        jobTitle: "",
        jobType: "full-time",
        workLocation: "",
        salary: "",
        joiningDate: "",
        jobDescription: "",
        skills: "",
        remarks: "",
        verificationStatus: "pending",
        offerLetter: null,
        employmentProof: null
      })

    } catch (error) {
      showNotification({
        status: 'error',
        title: 'Submission Failed',
        message: 'Failed to create placement record. Please try again or contact support.',
        actionLabel: 'Retry'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const jobTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" }
  ]

  const companyTypes = [
    { value: "private", label: "Private Limited" },
    { value: "public", label: "Public Limited" },
    { value: "partnership", label: "Partnership" },
    { value: "sole-proprietorship", label: "Sole Proprietorship" },
    { value: "government", label: "Government" },
    { value: "ngo", label: "NGO/Non-profit" }
  ]

  const companySizes = [
    { value: "startup", label: "Startup (1-10 employees)" },
    { value: "small", label: "Small (11-50 employees)" },
    { value: "medium", label: "Medium (51-200 employees)" },
    { value: "large", label: "Large (201-1000 employees)" },
    { value: "enterprise", label: "Enterprise (1000+ employees)" }
  ]

  const industries = [
    { value: "technology", label: "Information Technology" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance & Banking" },
    { value: "retail", label: "Retail & E-commerce" },
    { value: "education", label: "Education" },
    { value: "hospitality", label: "Hospitality & Tourism" },
    { value: "automotive", label: "Automotive" },
    { value: "construction", label: "Construction" },
    { value: "other", label: "Other" }
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Plus className="w-6 h-6 text-blue-600" />
          Record New Placement
        </h1>
        <p className="text-muted-foreground">Create a new job placement record for a student</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="job">Job Details</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Student Information
                </CardTitle>
                <CardDescription>Enter the student details for this placement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading && (
                  <div className="text-center py-4 text-gray-500">
                    <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-2"></div>
                    <p>Loading students...</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="studentSelect">Select Student *</Label>
                  <div className="relative">
                    <Input
                      id="studentSelect"
                      placeholder="Search student by name or ID..."
                      value={formData.studentName}
                      onChange={(e) => handleInputChange("studentName", e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  
                  {formData.studentName && formData.studentName.length > 0 && (
                    <div className="border rounded-lg shadow-lg bg-white max-h-48 overflow-y-auto">
                      {filteredStudents.length > 0 ? (
                        <div className="py-2">
                          {filteredStudents.slice(0, 10).map((student) => (
                            <button
                              key={student.id}
                              type="button"
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                              onClick={() => handleStudentSelect(student.id)}
                            >
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">
                                {student.id} • {student.batchName}
                                {student.isPlaced && <span className="ml-2 text-red-500">(Already Placed)</span>}
                              </div>
                            </button>
                          ))}
                          {filteredStudents.length > 10 && (
                            <div className="px-4 py-2 text-sm text-gray-500 border-t">
                              {filteredStudents.length - 10} more students available...
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          No students found matching "{formData.studentName}"
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {selectedStudent && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Selected Student:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span> {selectedStudent.name}
                      </div>
                      <div>
                        <span className="text-gray-600">ID:</span> {selectedStudent.id}
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span> {selectedStudent.email}
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span> {selectedStudent.phone}
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Batch:</span> {selectedStudent.batchName}
                      </div>
                    </div>
                  </div>
                )}

                {!loading && availableStudents.length === 0 && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>No available students found.</strong> All students in the system appear to already have placements recorded.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  Company Information
                </CardTitle>
                <CardDescription>Enter details about the employing company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyType">Company Type</Label>
                    <Select value={formData.companyType} onValueChange={(value) => handleInputChange("companyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        {companyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select value={formData.companySize} onValueChange={(value) => handleInputChange("companySize", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="job" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Job Details
                </CardTitle>
                <CardDescription>Specify the job position and employment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      placeholder="Enter job title"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Employment Type</Label>
                    <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workLocation">Work Location</Label>
                    <Input
                      id="workLocation"
                      placeholder="City, State"
                      value={formData.workLocation}
                      onChange={(e) => handleInputChange("workLocation", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Monthly Salary (₹)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="salary"
                        placeholder="Enter monthly salary"
                        className="pl-10"
                        value={formData.salary}
                        onChange={(e) => handleInputChange("salary", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Describe the job role and responsibilities"
                    rows={4}
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills</Label>
                  <Input
                    id="skills"
                    placeholder="Enter relevant skills (comma-separated)"
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Verification & Documentation
                </CardTitle>
                <CardDescription>Upload supporting documents and set verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationStatus">Verification Status</Label>
                  <Select value={formData.verificationStatus} onValueChange={(value) => handleInputChange("verificationStatus", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          Pending Verification
                        </div>
                      </SelectItem>
                      <SelectItem value="verified">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Verified
                        </div>
                      </SelectItem>
                      <SelectItem value="rejected">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-red-500" />
                          Needs Documentation
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="offerLetter">Offer Letter</Label>
                    <Input
                      id="offerLetter"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={(e) => setFormData(prev => ({ ...prev, offerLetter: e.target.files?.[0] || null }))}
                    />
                    <p className="text-xs text-muted-foreground">Upload job offer letter (PDF, DOC, or Image)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employmentProof">Employment Proof</Label>
                    <Input
                      id="employmentProof"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={(e) => setFormData(prev => ({ ...prev, employmentProof: e.target.files?.[0] || null }))}
                    />
                    <p className="text-xs text-muted-foreground">Upload employment proof (ID card, contract, etc.)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Additional Remarks</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Add any additional notes or comments about this placement"
                    rows={3}
                    value={formData.remarks}
                    onChange={(e) => handleInputChange("remarks", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            {currentTab !== "basic" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const tabs = ["basic", "company", "job", "verification"]
                  const currentIndex = tabs.indexOf(currentTab)
                  if (currentIndex > 0) setCurrentTab(tabs[currentIndex - 1])
                }}
              >
                Previous
              </Button>
            )}
            {currentTab !== "verification" ? (
              <Button
                type="button"
                onClick={() => {
                  const tabs = ["basic", "company", "job", "verification"]
                  const currentIndex = tabs.indexOf(currentTab)
                  if (currentIndex < tabs.length - 1) setCurrentTab(tabs[currentIndex + 1])
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? "Creating..." : "Create Placement"}
              </Button>
            )}
          </div>
        </div>
      </form>

      <NotificationComponent />
    </div>
  )
}