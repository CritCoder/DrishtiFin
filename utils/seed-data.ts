export const DEMO_TRAINING_PARTNERS = [
  {
    id: "tp-001",
    name: "TechSkills Academy",
    email: "admin@techskills.com",
    phone: "+91-9876543210",
    gstNumber: "21AAAAA0000A1Z5",
    panNumber: "AAAAA0000A",
    address: {
      street: "Tech Hub, IT Park",
      city: "Bhubaneswar",
      state: "Odisha",
      pincode: "751024",
    },
    trustScore: 8.7,
    status: "active",
    totalCentres: 3,
    totalStudents: 247,
    adminUserId: "user-tp-admin-001",
  },
  {
    id: "tp-002",
    name: "Digital Learning Solutions",
    email: "contact@digitallearning.com",
    phone: "+91-8765432109",
    gstNumber: "21BBBBB1111B2Z6",
    panNumber: "BBBBB1111B",
    address: {
      street: "Learning Center, Sector 5",
      city: "Cuttack",
      state: "Odisha",
      pincode: "753001",
    },
    trustScore: 7.9,
    status: "active",
    totalCentres: 2,
    totalStudents: 189,
  },
]

export const DEMO_STUDENTS = [
  {
    id: "student-001",
    firstName: "Ramesh",
    lastName: "Kumar",
    email: "ramesh.kumar@student.com",
    phone: "+91-7654321098",
    dateOfBirth: "1998-05-15",
    address: {
      street: "Village Patia",
      city: "Bhubaneswar",
      state: "Odisha",
      pincode: "751024",
    },
    educationLevel: "Graduate",
    course: "Web Development",
    batchId: "batch-001",
    trainingPartnerId: "tp-001",
    status: "active",
    enrollmentDate: "2024-01-15",
  },
  {
    id: "student-002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@student.com",
    phone: "+91-6543210987",
    dateOfBirth: "1999-08-22",
    address: {
      street: "Saheed Nagar",
      city: "Bhubaneswar",
      state: "Odisha",
      pincode: "751007",
    },
    educationLevel: "Graduate",
    course: "Data Analytics",
    batchId: "batch-002",
    trainingPartnerId: "tp-001",
    status: "active",
    enrollmentDate: "2024-02-01",
  },
]

export const DEMO_BATCHES = [
  {
    id: "batch-001",
    name: "BBSR-TECH-001",
    course: "Web Development",
    trainingPartnerId: "tp-001",
    centreId: "centre-001",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    capacity: 30,
    enrolled: 24,
    status: "ongoing",
    trainer: "Ramesh Kumar",
  },
  {
    id: "batch-002",
    name: "CTC-DATA-002",
    course: "Data Analytics",
    trainingPartnerId: "tp-001",
    centreId: "centre-002",
    startDate: "2024-02-01",
    endDate: "2024-07-01",
    capacity: 25,
    enrolled: 18,
    status: "ongoing",
    trainer: "Priya Sharma",
  },
]

export const DEMO_PLACEMENTS = [
  {
    id: "placement-001",
    studentId: "student-001",
    studentName: "Ramesh Kumar",
    employerId: "employer-001",
    employerName: "Infosys Limited",
    position: "Web Developer",
    salary: 450000,
    placementDate: "2024-07-20",
    status: "offered",
    verificationStatus: "pending",
  },
  {
    id: "placement-002",
    studentId: "student-002",
    studentName: "Priya Sharma",
    employerId: "employer-002",
    employerName: "TCS Limited",
    position: "Data Analyst",
    salary: 520000,
    placementDate: "2024-07-25",
    status: "joined",
    verificationStatus: "verified",
  },
]

export const DEMO_EMPLOYERS = [
  {
    id: "employer-001",
    name: "Infosys Limited",
    email: "hr@infosys.com",
    phone: "+91-9876543210",
    industry: "Information Technology",
    address: {
      street: "Infosys Campus, Electronics City",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560100",
    },
    contactPersonId: "user-employer-001",
  },
  {
    id: "employer-002",
    name: "TCS Limited",
    email: "careers@tcs.com",
    phone: "+91-8765432109",
    industry: "Information Technology",
    address: {
      street: "TCS Tower, Sector V",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700091",
    },
  },
]

export const DEMO_PAYMENTS = [
  {
    id: "payment-001",
    trainingPartnerId: "tp-001",
    batchId: "batch-001",
    milestoneType: "batch_start",
    amount: 125000,
    status: "paid",
    dueDate: "2024-01-30",
    paidDate: "2024-01-28",
    invoiceNumber: "INV-2024-001",
  },
  {
    id: "payment-002",
    trainingPartnerId: "tp-001",
    batchId: "batch-002",
    milestoneType: "mid_training",
    amount: 135000,
    status: "pending",
    dueDate: "2024-03-20",
    invoiceNumber: "INV-2024-002",
  },
]

export const DEMO_AUDIT_LOGS = [
  {
    id: "audit-001",
    timestamp: "2024-03-15T14:32:18Z",
    userId: "user-super-admin-001",
    userEmail: "super.admin@drishti.gov.in",
    action: "USER_LOGIN",
    entity: "User",
    entityId: "user-super-admin-001",
    details: "Super admin logged into system",
    ipAddress: "203.192.12.45",
  },
  {
    id: "audit-002",
    timestamp: "2024-03-15T13:45:22Z",
    userId: "user-tp-admin-001",
    userEmail: "admin@techskills.com",
    action: "BATCH_CREATED",
    entity: "Batch",
    entityId: "batch-001",
    details: "Created new batch BBSR-TECH-001 for Web Development",
    ipAddress: "45.123.67.89",
  },
]

export const DEMO_COURSES = [
  {
    id: "course-001",
    name: "Web Development",
    duration: "6 months",
    description: "Full-stack web development with modern technologies",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    id: "course-002",
    name: "Data Analytics",
    duration: "5 months",
    description: "Data analysis and visualization with Python and R",
    skills: ["Python", "R", "SQL", "Tableau", "Power BI", "Statistics"],
  },
  {
    id: "course-003",
    name: "Mobile Development",
    duration: "4 months",
    description: "Cross-platform mobile app development",
    skills: ["React Native", "Flutter", "Dart", "Firebase", "API Integration"],
  },
]

export const AUDIT_LOG_TYPES = {
  USER_LOGIN: "user_login",
  USER_LOGOUT: "user_logout",
  TP_CREATED: "training_partner_created",
  TP_APPROVED: "training_partner_approved",
  TP_REJECTED: "training_partner_rejected",
  STUDENT_ENROLLED: "student_enrolled",
  BATCH_CREATED: "batch_created",
  PLACEMENT_RECORDED: "placement_recorded",
  PAYMENT_PROCESSED: "payment_processed",
  DOCUMENT_UPLOADED: "document_uploaded",
  SETTINGS_UPDATED: "settings_updated",
}

export async function initializeDemoData() {
  const { Database } = await import("./database.ts")

  // Seed training partners
  for (const tp of DEMO_TRAINING_PARTNERS) {
    await Database.set(["training_partners", tp.id], tp)
  }

  // Seed students
  for (const student of DEMO_STUDENTS) {
    await Database.set(["students", student.id], student)
  }

  // Seed batches
  for (const batch of DEMO_BATCHES) {
    await Database.set(["batches", batch.id], batch)
  }

  // Seed placements
  for (const placement of DEMO_PLACEMENTS) {
    await Database.set(["placements", placement.id], placement)
  }

  // Seed employers
  for (const employer of DEMO_EMPLOYERS) {
    await Database.set(["employers", employer.id], employer)
  }

  // Seed payments
  for (const payment of DEMO_PAYMENTS) {
    await Database.set(["payments", payment.id], payment)
  }

  // Seed audit logs
  for (const log of DEMO_AUDIT_LOGS) {
    await Database.set(["audit_logs", log.id], log)
  }

  // Seed courses
  for (const course of DEMO_COURSES) {
    await Database.set(["courses", course.id], course)
  }
}
