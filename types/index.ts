export interface User {
  id: string
  email: string
  passwordHash: string
  role: "osda_admin" | "training_partner" | "student" | "employer" | "system_integrator"
  subtype?: "super_admin" | "department_user" | "tp_admin" | "tp_staff"
  firstName: string
  lastName: string
  phone?: string
  organizationId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TrainingPartner {
  id: string
  name: string
  email: string
  phone: string
  gstNumber?: string
  panNumber?: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  contactPerson: {
    name: string
    email: string
    phone: string
    designation: string
  }
  status: "active" | "pending" | "suspended" | "rejected"
  trustScore: number
  documentsSubmitted: string[]
  approvedBy?: string
  approvedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  education: {
    level: string
    institution: string
    year: number
  }
  batchId?: string
  trainingPartnerId?: string
  status: "enrolled" | "active" | "completed" | "dropped"
  documents: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Batch {
  id: string
  name: string
  course: string
  trainingPartnerId: string
  centerId: string
  startDate: Date
  endDate: Date
  capacity: number
  enrolled: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  trainer: {
    name: string
    email: string
    phone: string
  }
  students: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Placement {
  id: string
  studentId: string
  batchId: string
  employerId: string
  position: string
  salary: number
  startDate: Date
  status: "offered" | "accepted" | "rejected" | "completed"
  documents: string[]
  verificationStatus: "pending" | "verified" | "rejected"
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  trainingPartnerId: string
  batchId: string
  milestoneType: "batch_start" | "mid_training" | "placement"
  amount: number
  status: "pending" | "approved" | "paid" | "rejected"
  dueDate: Date
  paidDate?: Date
  invoiceNumber?: string
  documents: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Centre {
  id: string
  name: string
  trainingPartnerId: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  capacity: number
  facilities: string[]
  status: "active" | "inactive" | "maintenance"
  images: string[]
  createdAt: Date
  updatedAt: Date
}
