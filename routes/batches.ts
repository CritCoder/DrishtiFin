import { Database } from "../utils/database.ts"
import { DatabaseSchema } from "../utils/database-schema.ts"
import { AuthUtils } from "../utils/auth.ts"
import { requireAuth, requireAnyRole } from "../middleware/auth.ts"
import type { Batch, Student } from "../types/index.ts"

export async function batchRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace("/api/batches", "")
  const method = req.method

  // Initialize database if needed
  await DatabaseSchema.initialize()

  try {
    // GET /api/batches - List all batches
    if (path === "" && method === "GET") {
      return await handleListBatches(req)
    }

    // POST /api/batches - Create new batch
    if (path === "" && method === "POST") {
      return await handleCreateBatch(req)
    }

    // GET /api/batches/:id - Get specific batch
    if (path.match(/^\/[^/]+$/) && method === "GET") {
      const id = path.slice(1)
      return await handleGetBatch(req, id)
    }

    // PUT /api/batches/:id - Update batch
    if (path.match(/^\/[^/]+$/) && method === "PUT") {
      const id = path.slice(1)
      return await handleUpdateBatch(req, id)
    }

    // DELETE /api/batches/:id - Delete batch
    if (path.match(/^\/[^/]+$/) && method === "DELETE") {
      const id = path.slice(1)
      return await handleDeleteBatch(req, id)
    }

    // GET /api/batches/:id/students - Get students in batch
    if (path.match(/^\/[^/]+\/students$/) && method === "GET") {
      const id = path.split("/")[1]
      return await handleGetBatchStudents(req, id)
    }

    // POST /api/batches/:id/start - Start batch
    if (path.match(/^\/[^/]+\/start$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleStartBatch(req, id)
    }

    // POST /api/batches/:id/complete - Complete batch
    if (path.match(/^\/[^/]+\/complete$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleCompleteBatch(req, id)
    }

    // GET /api/batches/training-partner/:tpId - Get batches by training partner
    if (path.match(/^\/training-partner\/[^/]+$/) && method === "GET") {
      const tpId = path.split("/")[2]
      return await handleGetBatchesByTrainingPartner(req, tpId)
    }

    // GET /api/batches/stats - Get batch statistics
    if (path === "/stats" && method === "GET") {
      return await handleGetBatchStats(req)
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error("Batches API error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

async function handleListBatches(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const user = await AuthUtils.authenticate(req)
  const url = new URL(req.url)
  const status = url.searchParams.get("status")
  const trainingPartnerId = url.searchParams.get("trainingPartnerId")
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "10")

  let batches: Batch[] = await Database.list<Batch>(["batches"])

  // Filter by training partner if user is TP
  if (user!.role === "training_partner") {
    batches = batches.filter((batch) => batch.trainingPartnerId === user!.organizationId)
  }

  // Apply filters
  if (status) {
    batches = batches.filter((batch) => batch.status === status)
  }

  if (trainingPartnerId) {
    batches = batches.filter((batch) => batch.trainingPartnerId === trainingPartnerId)
  }

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedBatches = batches.slice(startIndex, endIndex)

  return new Response(
    JSON.stringify({
      success: true,
      data: paginatedBatches,
      pagination: {
        page,
        limit,
        total: batches.length,
        totalPages: Math.ceil(batches.length / limit),
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleCreateBatch(req: Request): Promise<Response> {
  // Check authentication - TPs and admins can create batches
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const body = await req.json()
  const { name, course, trainingPartnerId, centerId, startDate, endDate, capacity, trainer } = body

  if (!name || !course || !trainingPartnerId || !centerId || !startDate || !endDate || !capacity || !trainer) {
    return new Response(JSON.stringify({ error: "Required fields missing" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const batch: Batch = {
    id: Database.generateId(),
    name,
    course,
    trainingPartnerId,
    centerId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    capacity,
    enrolled: 0,
    status: "upcoming",
    trainer,
    students: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Save batch
  await Database.set(["batches", batch.id], batch)
  await Database.set(["batches", "training_partner", trainingPartnerId, batch.id], batch)
  await Database.set(["batches", "centre", centerId, batch.id], batch)

  return new Response(
    JSON.stringify({
      success: true,
      data: batch,
    }),
    {
      status: 201,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetBatch(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const batch = await Database.get<Batch>(["batches", id])

  if (!batch) {
    return new Response(JSON.stringify({ error: "Batch not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Training partners can only view their batches
  if (user.role === "training_partner" && batch.trainingPartnerId !== user.organizationId) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: batch,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleUpdateBatch(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const batch = await Database.get<Batch>(["batches", id])

  if (!batch) {
    return new Response(JSON.stringify({ error: "Batch not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Check permissions
  if (
    user.role !== "osda_admin" &&
    (user.role !== "training_partner" || batch.trainingPartnerId !== user.organizationId)
  ) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  const body = await req.json()
  const updatedBatch: Batch = {
    ...batch,
    ...body,
    id, // Ensure ID cannot be changed
    updatedAt: new Date(),
  }

  // Save updated batch
  await Database.set(["batches", id], updatedBatch)
  await Database.set(["batches", "training_partner", updatedBatch.trainingPartnerId, updatedBatch.id], updatedBatch)
  await Database.set(["batches", "centre", updatedBatch.centerId, updatedBatch.id], updatedBatch)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedBatch,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleDeleteBatch(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can delete batches
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const batch = await Database.get<Batch>(["batches", id])

  if (!batch) {
    return new Response(JSON.stringify({ error: "Batch not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Delete batch
  await Database.delete(["batches", id])
  await Database.delete(["batches", "training_partner", batch.trainingPartnerId, batch.id])
  await Database.delete(["batches", "centre", batch.centerId, batch.id])

  return new Response(
    JSON.stringify({
      success: true,
      message: "Batch deleted successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetBatchStudents(req: Request, id: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const students = await DatabaseSchema.getStudentsByBatch(id)

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

async function handleStartBatch(req: Request, id: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const batch = await Database.get<Batch>(["batches", id])

  if (!batch) {
    return new Response(JSON.stringify({ error: "Batch not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedBatch: Batch = {
    ...batch,
    status: "ongoing",
    updatedAt: new Date(),
  }

  await Database.set(["batches", id], updatedBatch)
  await Database.set(["batches", "training_partner", updatedBatch.trainingPartnerId, updatedBatch.id], updatedBatch)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedBatch,
      message: "Batch started successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleCompleteBatch(req: Request, id: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const batch = await Database.get<Batch>(["batches", id])

  if (!batch) {
    return new Response(JSON.stringify({ error: "Batch not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedBatch: Batch = {
    ...batch,
    status: "completed",
    updatedAt: new Date(),
  }

  await Database.set(["batches", id], updatedBatch)
  await Database.set(["batches", "training_partner", updatedBatch.trainingPartnerId, updatedBatch.id], updatedBatch)

  // Update all students in batch to completed status
  const students = await DatabaseSchema.getStudentsByBatch(id)
  for (const student of students) {
    const updatedStudent: Student = {
      ...student,
      status: "completed",
      updatedAt: new Date(),
    }
    await Database.set(["students", student.id], updatedStudent)
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedBatch,
      message: "Batch completed successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetBatchesByTrainingPartner(req: Request, tpId: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const batches = await DatabaseSchema.getBatchesByTrainingPartner(tpId)

  return new Response(
    JSON.stringify({
      success: true,
      data: batches,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetBatchStats(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  const stats = await DatabaseSchema.getStatistics()

  return new Response(
    JSON.stringify({
      success: true,
      data: stats.batches,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}
