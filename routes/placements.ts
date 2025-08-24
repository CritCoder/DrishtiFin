import { Database } from "../utils/database.ts"
import { DatabaseSchema } from "../utils/database-schema.ts"
import { AuthUtils } from "../utils/auth.ts"
import { requireAuth, requireAnyRole } from "../middleware/auth.ts"
import type { Placement } from "../types/index.ts"

export async function placementRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace("/api/placements", "")
  const method = req.method

  // Initialize database if needed
  await DatabaseSchema.initialize()

  try {
    // GET /api/placements - List all placements
    if (path === "" && method === "GET") {
      return await handleListPlacements(req)
    }

    // POST /api/placements - Create new placement
    if (path === "" && method === "POST") {
      return await handleCreatePlacement(req)
    }

    // GET /api/placements/:id - Get specific placement
    if (path.match(/^\/[^/]+$/) && method === "GET") {
      const id = path.slice(1)
      return await handleGetPlacement(req, id)
    }

    // PUT /api/placements/:id - Update placement
    if (path.match(/^\/[^/]+$/) && method === "PUT") {
      const id = path.slice(1)
      return await handleUpdatePlacement(req, id)
    }

    // DELETE /api/placements/:id - Delete placement
    if (path.match(/^\/[^/]+$/) && method === "DELETE") {
      const id = path.slice(1)
      return await handleDeletePlacement(req, id)
    }

    // POST /api/placements/:id/verify - Verify placement
    if (path.match(/^\/[^/]+\/verify$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleVerifyPlacement(req, id)
    }

    // POST /api/placements/:id/reject - Reject placement verification
    if (path.match(/^\/[^/]+\/reject$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleRejectPlacement(req, id)
    }

    // GET /api/placements/student/:studentId - Get placements by student
    if (path.match(/^\/student\/[^/]+$/) && method === "GET") {
      const studentId = path.split("/")[2]
      return await handleGetPlacementsByStudent(req, studentId)
    }

    // GET /api/placements/batch/:batchId - Get placements by batch
    if (path.match(/^\/batch\/[^/]+$/) && method === "GET") {
      const batchId = path.split("/")[2]
      return await handleGetPlacementsByBatch(req, batchId)
    }

    // GET /api/placements/stats - Get placement statistics
    if (path === "/stats" && method === "GET") {
      return await handleGetPlacementStats(req)
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error("Placements API error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

async function handleListPlacements(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "employer", "system_integrator"])(req)
  if (authError) return authError

  const user = await AuthUtils.authenticate(req)
  const url = new URL(req.url)
  const status = url.searchParams.get("status")
  const verificationStatus = url.searchParams.get("verificationStatus")
  const batchId = url.searchParams.get("batchId")
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "10")

  let placements: Placement[] = await Database.list<Placement>(["placements"])

  // Filter by user role
  if (user!.role === "training_partner") {
    // Get batches for this TP and filter placements
    const tpBatches = await DatabaseSchema.getBatchesByTrainingPartner(user!.organizationId!)
    const batchIds = tpBatches.map((batch) => batch.id)
    placements = placements.filter((placement) => batchIds.includes(placement.batchId))
  }

  if (user!.role === "employer") {
    placements = placements.filter((placement) => placement.employerId === user!.organizationId)
  }

  // Apply filters
  if (status) {
    placements = placements.filter((placement) => placement.status === status)
  }

  if (verificationStatus) {
    placements = placements.filter((placement) => placement.verificationStatus === verificationStatus)
  }

  if (batchId) {
    placements = placements.filter((placement) => placement.batchId === batchId)
  }

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPlacements = placements.slice(startIndex, endIndex)

  return new Response(
    JSON.stringify({
      success: true,
      data: paginatedPlacements,
      pagination: {
        page,
        limit,
        total: placements.length,
        totalPages: Math.ceil(placements.length / limit),
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleCreatePlacement(req: Request): Promise<Response> {
  // Check authentication - TPs, employers, and admins can create placements
  const authError = await requireAnyRole(["osda_admin", "training_partner", "employer"])(req)
  if (authError) return authError

  const body = await req.json()
  const { studentId, batchId, employerId, position, salary, startDate, documents } = body

  if (!studentId || !batchId || !employerId || !position || !salary || !startDate) {
    return new Response(JSON.stringify({ error: "Required fields missing" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const placement: Placement = {
    id: Database.generateId(),
    studentId,
    batchId,
    employerId,
    position,
    salary,
    startDate: new Date(startDate),
    status: "offered",
    documents: documents || [],
    verificationStatus: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Save placement
  await Database.set(["placements", placement.id], placement)
  await Database.set(["placements", "student", studentId], placement)
  await Database.set(["placements", "batch", batchId, placement.id], placement)

  return new Response(
    JSON.stringify({
      success: true,
      data: placement,
    }),
    {
      status: 201,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetPlacement(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const placement = await Database.get<Placement>(["placements", id])

  if (!placement) {
    return new Response(JSON.stringify({ error: "Placement not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Check access permissions based on role
  if (user.role === "employer" && placement.employerId !== user.organizationId) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  if (user.role === "student" && placement.studentId !== user.id) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: placement,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleUpdatePlacement(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const placement = await Database.get<Placement>(["placements", id])

  if (!placement) {
    return new Response(JSON.stringify({ error: "Placement not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Check permissions
  if (
    user.role !== "osda_admin" &&
    (user.role !== "employer" || placement.employerId !== user.organizationId) &&
    (user.role !== "student" || placement.studentId !== user.id)
  ) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  const body = await req.json()
  const updatedPlacement: Placement = {
    ...placement,
    ...body,
    id, // Ensure ID cannot be changed
    updatedAt: new Date(),
  }

  // Save updated placement
  await Database.set(["placements", id], updatedPlacement)
  await Database.set(["placements", "student", updatedPlacement.studentId], updatedPlacement)
  await Database.set(["placements", "batch", updatedPlacement.batchId, updatedPlacement.id], updatedPlacement)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedPlacement,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleDeletePlacement(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can delete placements
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const placement = await Database.get<Placement>(["placements", id])

  if (!placement) {
    return new Response(JSON.stringify({ error: "Placement not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Delete placement
  await Database.delete(["placements", id])
  await Database.delete(["placements", "student", placement.studentId])
  await Database.delete(["placements", "batch", placement.batchId, placement.id])

  return new Response(
    JSON.stringify({
      success: true,
      message: "Placement deleted successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleVerifyPlacement(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can verify placements
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const placement = await Database.get<Placement>(["placements", id])

  if (!placement) {
    return new Response(JSON.stringify({ error: "Placement not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedPlacement: Placement = {
    ...placement,
    verificationStatus: "verified",
    status: "completed",
    updatedAt: new Date(),
  }

  await Database.set(["placements", id], updatedPlacement)
  await Database.set(["placements", "student", updatedPlacement.studentId], updatedPlacement)
  await Database.set(["placements", "batch", updatedPlacement.batchId, updatedPlacement.id], updatedPlacement)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedPlacement,
      message: "Placement verified successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleRejectPlacement(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can reject placement verification
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const body = await req.json()
  const { reason } = body

  const placement = await Database.get<Placement>(["placements", id])

  if (!placement) {
    return new Response(JSON.stringify({ error: "Placement not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedPlacement: Placement = {
    ...placement,
    verificationStatus: "rejected",
    updatedAt: new Date(),
  }

  await Database.set(["placements", id], updatedPlacement)
  await Database.set(["placements", "student", updatedPlacement.studentId], updatedPlacement)
  await Database.set(["placements", "batch", updatedPlacement.batchId, updatedPlacement.id], updatedPlacement)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedPlacement,
      message: "Placement verification rejected",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetPlacementsByStudent(req: Request, studentId: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "student", "system_integrator"])(req)
  if (authError) return authError

  const placement = await Database.get<Placement>(["placements", "student", studentId])

  return new Response(
    JSON.stringify({
      success: true,
      data: placement ? [placement] : [],
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetPlacementsByBatch(req: Request, batchId: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const placements = await DatabaseSchema.getPlacementsByBatch(batchId)

  return new Response(
    JSON.stringify({
      success: true,
      data: placements,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetPlacementStats(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  const stats = await DatabaseSchema.getStatistics()

  return new Response(
    JSON.stringify({
      success: true,
      data: stats.placements,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}
