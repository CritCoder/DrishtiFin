import { Database } from "./database.ts"
import type { TrainingPartner, Student, Batch, Placement, Payment, Centre } from "../types/index.ts"

export class DatabaseSchema {
  static async initialize() {
    console.log("🔄 Initializing DRISHTI database schema...")

    // Initialize sample training partners
    await this.initializeTrainingPartners()

    // Initialize sample centres
    await this.initializeCentres()

    // Initialize sample students
    await this.initializeStudents()

    // Initialize sample batches
    await this.initializeBatches()

    // Initialize sample placements
    await this.initializePlacements()

    // Initialize sample payments
    await this.initializePayments()

    console.log("✅ Database schema initialized successfully")
  }

  private static async initializeTrainingPartners() {
    const sampleTPs: TrainingPartner[] = [
      {
        id: "tp-001",
        name: "TechSkills Training Pvt Ltd",
        email: "contact@techskills.com",
        phone: "+91-9876543210",
        gstNumber: "27AARFT1234H1ZF",
        panNumber: "AARFT1234H",
        address: {
          street: "123 Tech Park, Sector 15",
          city: "Bhubaneswar",
          state: "Odisha",
          pincode: "751024",
        },
        contactPerson: {
          name: "Rajesh Kumar",
          email: "rajesh@techskills.com",
          phone: "+91-9876543210",
          designation: "Training Manager",
        },
        status: "active",
        trustScore: 8.7,
        documentsSubmitted: ["gst_certificate", "pan_card", "incorporation_certificate"],
        approvedBy: "admin@drishti.gov.in",
        approvedAt: new Date("2024-01-15"),
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "tp-002",
        name: "Digital Learning Solutions",
        email: "info@digitallearning.com",
        phone: "+91-8765432109",
        gstNumber: "21BBCDE5678F1ZG",
        panNumber: "BBCDE5678F",
        address: {
          street: "456 Innovation Hub",
          city: "Cuttack",
          state: "Odisha",
          pincode: "753001",
        },
        contactPerson: {
          name: "Priya Sharma",
          email: "priya@digitallearning.com",
          phone: "+91-8765432109",
          designation: "Director",
        },
        status: "pending",
        trustScore: 6.2,
        documentsSubmitted: ["gst_certificate", "pan_card"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01"),
      },
      {
        id: "tp-003",
        name: "Skill Development Corp",
        email: "admin@skilldev.org",
        phone: "+91-7654321098",
        address: {
          street: "789 Training Complex",
          city: "Puri",
          state: "Odisha",
          pincode: "752001",
        },
        contactPerson: {
          name: "Amit Singh",
          email: "amit@skilldev.org",
          phone: "+91-7654321098",
          designation: "CEO",
        },
        status: "active",
        trustScore: 9.1,
        documentsSubmitted: ["gst_certificate", "pan_card", "incorporation_certificate", "audit_report"],
        approvedBy: "admin@drishti.gov.in",
        approvedAt: new Date("2024-01-20"),
        createdAt: new Date("2024-01-12"),
        updatedAt: new Date("2024-01-20"),
      },
    ]

    for (const tp of sampleTPs) {
      const existing = await Database.get(["training_partners", tp.id])
      if (!existing) {
        await Database.set(["training_partners", tp.id], tp)
        await Database.set(["training_partners", "email", tp.email], tp)
      }
    }
  }

  private static async initializeCentres() {
    const sampleCentres: Centre[] = [
      {
        id: "centre-001",
        name: "Bhubaneswar Tech Centre",
        trainingPartnerId: "tp-001",
        address: {
          street: "123 Tech Park, Sector 15",
          city: "Bhubaneswar",
          state: "Odisha",
          pincode: "751024",
        },
        capacity: 120,
        facilities: ["Computer Lab", "Projector", "Wi-Fi", "Library", "Cafeteria"],
        status: "active",
        images: ["/computer-training-center.png"],
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "centre-002",
        name: "Cuttack Rural Hub",
        trainingPartnerId: "tp-002",
        address: {
          street: "456 Innovation Hub",
          city: "Cuttack",
          state: "Odisha",
          pincode: "753001",
        },
        capacity: 80,
        facilities: ["Computer Lab", "Projector", "Wi-Fi"],
        status: "active",
        images: ["/placeholder-7rr9v.png"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01"),
      },
      {
        id: "centre-003",
        name: "Puri Coastal Centre",
        trainingPartnerId: "tp-003",
        address: {
          street: "789 Training Complex",
          city: "Puri",
          state: "Odisha",
          pincode: "752001",
        },
        capacity: 60,
        facilities: ["Computer Lab", "Projector", "Wi-Fi", "Library"],
        status: "maintenance",
        images: ["/placeholder-ftl0w.png"],
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-03-01"),
      },
    ]

    for (const centre of sampleCentres) {
      const existing = await Database.get(["centres", centre.id])
      if (!existing) {
        await Database.set(["centres", centre.id], centre)
        await Database.set(["centres", "training_partner", centre.trainingPartnerId, centre.id], centre)
      }
    }
  }

  private static async initializeStudents() {
    const sampleStudents: Student[] = [
      {
        id: "student-001",
        firstName: "Rahul",
        lastName: "Kumar",
        email: "rahul.kumar@email.com",
        phone: "+91-9876543210",
        dateOfBirth: new Date("2000-05-15"),
        address: {
          street: "123 Student Colony",
          city: "Bhubaneswar",
          state: "Odisha",
          pincode: "751024",
        },
        education: {
          level: "Graduate",
          institution: "Utkal University",
          year: 2022,
        },
        batchId: "batch-001",
        trainingPartnerId: "tp-001",
        status: "active",
        documents: ["aadhar_card", "education_certificate"],
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "student-002",
        firstName: "Priya",
        lastName: "Sharma",
        email: "priya.sharma@email.com",
        phone: "+91-8765432109",
        dateOfBirth: new Date("1999-08-22"),
        address: {
          street: "456 Village Road",
          city: "Cuttack",
          state: "Odisha",
          pincode: "753001",
        },
        education: {
          level: "Diploma",
          institution: "Government Polytechnic",
          year: 2021,
        },
        batchId: "batch-002",
        trainingPartnerId: "tp-002",
        status: "completed",
        documents: ["aadhar_card", "education_certificate", "caste_certificate"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-05-01"),
      },
    ]

    for (const student of sampleStudents) {
      const existing = await Database.get(["students", student.id])
      if (!existing) {
        await Database.set(["students", student.id], student)
        await Database.set(["students", "email", student.email], student)
        if (student.batchId) {
          await Database.set(["students", "batch", student.batchId, student.id], student)
        }
      }
    }
  }

  private static async initializeBatches() {
    const sampleBatches: Batch[] = [
      {
        id: "batch-001",
        name: "Web Development Batch 2024-A",
        course: "Web Development",
        trainingPartnerId: "tp-001",
        centerId: "centre-001",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-06-15"),
        capacity: 25,
        enrolled: 24,
        status: "ongoing",
        trainer: {
          name: "Ramesh Kumar",
          email: "ramesh@techskills.com",
          phone: "+91-9876543211",
        },
        students: ["student-001"],
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "batch-002",
        name: "Data Analytics Batch 2024-B",
        course: "Data Analytics",
        trainingPartnerId: "tp-002",
        centerId: "centre-002",
        startDate: new Date("2023-12-01"),
        endDate: new Date("2024-05-01"),
        capacity: 18,
        enrolled: 18,
        status: "completed",
        trainer: {
          name: "Priya Sharma",
          email: "priya@digitallearning.com",
          phone: "+91-8765432109",
        },
        students: ["student-002"],
        createdAt: new Date("2023-11-15"),
        updatedAt: new Date("2024-05-01"),
      },
      {
        id: "batch-003",
        name: "Mobile App Development",
        course: "Mobile Development",
        trainingPartnerId: "tp-003",
        centerId: "centre-003",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-08-01"),
        capacity: 20,
        enrolled: 12,
        status: "upcoming",
        trainer: {
          name: "Anil Patnaik",
          email: "anil@skilldev.org",
          phone: "+91-7654321099",
        },
        students: [],
        createdAt: new Date("2024-02-15"),
        updatedAt: new Date("2024-02-15"),
      },
    ]

    for (const batch of sampleBatches) {
      const existing = await Database.get(["batches", batch.id])
      if (!existing) {
        await Database.set(["batches", batch.id], batch)
        await Database.set(["batches", "training_partner", batch.trainingPartnerId, batch.id], batch)
        await Database.set(["batches", "centre", batch.centerId, batch.id], batch)
      }
    }
  }

  private static async initializePlacements() {
    const samplePlacements: Placement[] = [
      {
        id: "placement-001",
        studentId: "student-001",
        batchId: "batch-001",
        employerId: "employer-001",
        position: "Web Developer",
        salary: 450000,
        startDate: new Date("2024-01-15"),
        status: "offered",
        documents: ["offer_letter"],
        verificationStatus: "pending",
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "placement-002",
        studentId: "student-002",
        batchId: "batch-002",
        employerId: "employer-002",
        position: "Data Analyst",
        salary: 520000,
        startDate: new Date("2024-01-20"),
        status: "verified",
        documents: ["offer_letter", "joining_letter"],
        verificationStatus: "verified",
        createdAt: new Date("2024-01-18"),
        updatedAt: new Date("2024-01-20"),
      },
    ]

    for (const placement of samplePlacements) {
      const existing = await Database.get(["placements", placement.id])
      if (!existing) {
        await Database.set(["placements", placement.id], placement)
        await Database.set(["placements", "student", placement.studentId], placement)
        await Database.set(["placements", "batch", placement.batchId, placement.id], placement)
      }
    }
  }

  private static async initializePayments() {
    const samplePayments: Payment[] = [
      {
        id: "payment-001",
        trainingPartnerId: "tp-001",
        batchId: "batch-001",
        milestoneType: "batch_start",
        amount: 125000,
        status: "paid",
        dueDate: new Date("2024-01-20"),
        paidDate: new Date("2024-01-18"),
        invoiceNumber: "INV-2024-001",
        documents: ["invoice", "payment_receipt"],
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-18"),
      },
      {
        id: "payment-002",
        trainingPartnerId: "tp-002",
        batchId: "batch-002",
        milestoneType: "placement",
        amount: 250000,
        status: "pending",
        dueDate: new Date("2024-03-20"),
        documents: ["milestone_completion_certificate"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01"),
      },
      {
        id: "payment-003",
        trainingPartnerId: "tp-003",
        batchId: "batch-003",
        milestoneType: "mid_training",
        amount: 150000,
        status: "approved",
        dueDate: new Date("2024-03-25"),
        documents: ["progress_report", "attendance_sheet"],
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date("2024-03-15"),
      },
    ]

    for (const payment of samplePayments) {
      const existing = await Database.get(["payments", payment.id])
      if (!existing) {
        await Database.set(["payments", payment.id], payment)
        await Database.set(["payments", "training_partner", payment.trainingPartnerId, payment.id], payment)
        await Database.set(["payments", "batch", payment.batchId, payment.id], payment)
      }
    }
  }

  static async getTrainingPartnersByStatus(status: string): Promise<TrainingPartner[]> {
    const allTPs = await Database.list<TrainingPartner>(["training_partners"])
    return allTPs.filter((tp) => tp.status === status)
  }

  static async getStudentsByBatch(batchId: string): Promise<Student[]> {
    return await Database.list<Student>(["students", "batch", batchId])
  }

  static async getBatchesByTrainingPartner(tpId: string): Promise<Batch[]> {
    return await Database.list<Batch>(["batches", "training_partner", tpId])
  }

  static async getPlacementsByBatch(batchId: string): Promise<Placement[]> {
    return await Database.list<Placement>(["placements", "batch", batchId])
  }

  static async getPaymentsByTrainingPartner(tpId: string): Promise<Payment[]> {
    return await Database.list<Payment>(["payments", "training_partner", tpId])
  }

  static async getStatistics() {
    const totalTPs = await Database.count(["training_partners"])
    const activeTPs = (await this.getTrainingPartnersByStatus("active")).length
    const pendingTPs = (await this.getTrainingPartnersByStatus("pending")).length

    const totalStudents = await Database.count(["students"])
    const totalBatches = await Database.count(["batches"])
    const totalPlacements = await Database.count(["placements"])

    const allPayments = await Database.list<Payment>(["payments"])
    const totalPayments = allPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const paidPayments = allPayments
      .filter((p) => p.status === "paid")
      .reduce((sum, payment) => sum + payment.amount, 0)
    const pendingPayments = allPayments
      .filter((p) => p.status === "pending")
      .reduce((sum, payment) => sum + payment.amount, 0)

    return {
      trainingPartners: {
        total: totalTPs,
        active: activeTPs,
        pending: pendingTPs,
      },
      students: {
        total: totalStudents,
      },
      batches: {
        total: totalBatches,
      },
      placements: {
        total: totalPlacements,
      },
      payments: {
        total: totalPayments,
        paid: paidPayments,
        pending: pendingPayments,
      },
    }
  }
}
