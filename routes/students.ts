import { Database } from "../utils/database.ts"
import { DatabaseSchema } from "../utils/database-schema.ts"
import { AuthUtils } from "../utils/auth.ts"
import { requireAuth, requireAnyRole } from "../middleware/auth.ts"
import type { Student } from "../types/index.ts"

export async function studentRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace("/api/students", "")
  const method = req.method

  // Initialize database if needed
  await DatabaseSchema.initialize()

  try {
    // GET /api/students - List all students
    if (path === "" && method === "GET") {
      return await handleListStudents(req)
    }

    // POST /api/students - Create new student
    if (path === "" && method === "POST") {
      return await handleCreateStudent(req)
    }

    // GET /api/students/:id - Get specific student
    if (path.match(/^\/[^/]+$/) && method === "GET") {
      const id = path.slice(1)
      return await handleGetStudent(req, id)
    }

    // PUT /api/students/:id - Update student
    if (path.match(/^\/[^/]+$/) && method === "PUT") {
      const id = path.slice(1)
      return await handleUpdateStudent(req, id)
    }

    // DELETE /api/students/:id - Delete student
    if (path.match(/^\/[^/]+$/) && method === "DELETE") {
      const id = path.slice(1)
      return await handleDeleteStudent(req, id)
    }

    // POST /api/students/:id/enroll - Enroll student in batch
    if (path.match(/^\/[^/]+\/enroll$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleEnrollStudent(req, id)
    }

    // GET /api/students/batch/:batchId - Get students by batch
    if (path.match(/^\/batch\/[^/]+$/) && method === "GET") {
      const batchId = path.split("/")[2]
      return await handleGetStudentsByBatch(req, batchId)
    }

    // GET /api/students/stats - Get student statistics
    if (path === "/stats" && method === "GET") {
      return await handleGetStudentStats(req)
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error("Students API error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

async function handleListStudents(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const user = await AuthUtils.authenticate(req)
  const url = new URL(req.url)
  const status = url.searchParams.get("status")
  const batchId = url.searchParams.get("batchId")
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "10")

  let students: Student[] = await Database.list<Student>(["students"])

  // Filter by training partner if user is TP
  if (user!.role === "training_partner") {
    students = students.filter((student) => student.trainingPartnerId === user!.organizationId)
  }

  // Apply filters
  if (status) {
    students = students.filter((student) => student.status === status)
  }

  if (batchId) {
    students = students.filter((student) => student.batchId === batchId)
  }

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedStudents = students.slice(startIndex, endIndex)

  return new Response(
    JSON.stringify({
      success: true,
      data: paginatedStudents,
      pagination: {
        page,
        limit,
        total: students.length,
        totalPages: Math.ceil(students.length / limit),
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleCreateStudent(req: Request): Promise<Response> {
  // Check authentication - TPs and admins can create students
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const body = await req.json()
  const { firstName, lastName, email, phone, dateOfBirth, address, education, batchId, trainingPartnerId } = body

  if (!firstName || !lastName || !email || !phone || !dateOfBirth || !address || !education) {
    return new Response(JSON.stringify({ error: "Required fields missing" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  // Check if student already exists
  const existingStudent = await Database.get<Student>(["students", "email", email.toLowerCase()])
  if (existingStudent) {
    return new Response(JSON.stringify({ error: "Student already exists" }), {
      status: 409,
      headers: { "content-type": "application/json" },
    })
  }

  const student: Student = {
    id: Database.generateId(),
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone,
    dateOfBirth: new Date(dateOfBirth),
    address,
    education,
    batchId,
    trainingPartnerId,
    status: "enrolled",
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Save student
  await Database.set(["students", student.id], student)
  await Database.set(["students", "email", student.email], student)

  if (batchId) {
    await Database.set(["students", "batch", batchId, student.id], student)
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: student,
    }),
    {
      status: 201,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetStudent(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const student = await Database.get<Student>(["students", id])

  if (!student) {
    return new Response(JSON.stringify({ error: "Student not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Students can only view their own data
  if (user.role === "student" && user.id !== id) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  // Training partners can only view their students
  if (user.role === "training_partner" && student.trainingPartnerId !== user.organizationId) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: student,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleUpdateStudent(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const student = await Database.get<Student>(["students", id])

  if (!student) {
    return new Response(JSON.stringify({ error: "Student not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Check permissions
  if (
    user.role !== "osda_admin" &&
    (user.role !== "training_partner" || student.trainingPartnerId !== user.organizationId) &&
    (user.role !== "student" || user.id !== id)
  ) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  const body = await req.json()
  const updatedStudent: Student = {
    ...student,
    ...body,
    id, // Ensure ID cannot be changed
    updatedAt: new Date(),
  }

  // Save updated student
  await Database.set(["students", id], updatedStudent)
  await Database.set(["students", "email", updatedStudent.email], updatedStudent)

  if (updatedStudent.batchId) {
    await Database.set(["students", "batch", updatedStudent.batchId, updatedStudent.id], updatedStudent)
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedStudent,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleDeleteStudent(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can delete students
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const student = await Database.get<Student>(["students", id])

  if (!student) {
    return new Response(JSON.stringify({ error: "Student not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Delete student
  await Database.delete(["students", id])
  await Database.delete(["students", "email", student.email])

  if (student.batchId) {
    await Database.delete(["students", "batch", student.batchId, student.id])
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Student deleted successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleEnrollStudent(req: Request, id: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const body = await req.json()
  const { batchId } = body

  if (!batchId) {
    return new Response(JSON.stringify({ error: "Batch ID is required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const student = await Database.get<Student>(["students", id])

  if (!student) {
    return new Response(JSON.stringify({ error: "Student not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedStudent: Student = {
    ...student,
    batchId,
    status: "active",
    updatedAt: new Date(),
  }

  await Database.set(["students", id], updatedStudent)
  await Database.set(["students", "batch", batchId, id], updatedStudent)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedStudent,
      message: "Student enrolled successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetStudentsByBatch(req: Request, batchId: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const students = await DatabaseSchema.getStudentsByBatch(batchId)

  return new Response(
    JSON.stringify({
      success: true,
      data: students,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetStudentStats(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  const stats = await DatabaseSchema.getStatistics()

  return new Response(
    JSON.stringify({
      success: true,
      data: stats.students,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}
