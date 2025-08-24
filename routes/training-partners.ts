import { Database } from "../utils/database.ts"
import { DatabaseSchema } from "../utils/database-schema.ts"
import { AuthUtils } from "../utils/auth.ts"
import { requireAuth, requireAnyRole } from "../middleware/auth.ts"
import type { TrainingPartner, Centre } from "../types/index.ts"

export async function trainingPartnerRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace("/api/training-partners", "")
  const method = req.method

  // Initialize database if needed
  await DatabaseSchema.initialize()

  try {
    // GET /api/training-partners - List all training partners
    if (path === "" && method === "GET") {
      return await handleListTrainingPartners(req)
    }

    // POST /api/training-partners - Create new training partner
    if (path === "" && method === "POST") {
      return await handleCreateTrainingPartner(req)
    }

    // GET /api/training-partners/:id - Get specific training partner
    if (path.match(/^\/[^/]+$/) && method === "GET") {
      const id = path.slice(1)
      return await handleGetTrainingPartner(req, id)
    }

    // PUT /api/training-partners/:id - Update training partner
    if (path.match(/^\/[^/]+$/) && method === "PUT") {
      const id = path.slice(1)
      return await handleUpdateTrainingPartner(req, id)
    }

    // DELETE /api/training-partners/:id - Delete training partner
    if (path.match(/^\/[^/]+$/) && method === "DELETE") {
      const id = path.slice(1)
      return await handleDeleteTrainingPartner(req, id)
    }

    // POST /api/training-partners/:id/approve - Approve training partner
    if (path.match(/^\/[^/]+\/approve$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleApproveTrainingPartner(req, id)
    }

    // POST /api/training-partners/:id/reject - Reject training partner
    if (path.match(/^\/[^/]+\/reject$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleRejectTrainingPartner(req, id)
    }

    // GET /api/training-partners/:id/centres - Get centres for training partner
    if (path.match(/^\/[^/]+\/centres$/) && method === "GET") {
      const id = path.split("/")[1]
      return await handleGetTrainingPartnerCentres(req, id)
    }

    // GET /api/training-partners/:id/batches - Get batches for training partner
    if (path.match(/^\/[^/]+\/batches$/) && method === "GET") {
      const id = path.split("/")[1]
      return await handleGetTrainingPartnerBatches(req, id)
    }

    // GET /api/training-partners/:id/payments - Get payments for training partner
    if (path.match(/^\/[^/]+\/payments$/) && method === "GET") {
      const id = path.split("/")[1]
      return await handleGetTrainingPartnerPayments(req, id)
    }

    // GET /api/training-partners/stats - Get training partner statistics
    if (path === "/stats" && method === "GET") {
      return await handleGetTrainingPartnerStats(req)
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error("Training Partners API error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

async function handleListTrainingPartners(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  const url = new URL(req.url)
  const status = url.searchParams.get("status")
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "10")

  let trainingPartners: TrainingPartner[]

  if (status) {
    trainingPartners = await DatabaseSchema.getTrainingPartnersByStatus(status)
  } else {
    trainingPartners = await Database.list<TrainingPartner>(["training_partners"])
  }

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTPs = trainingPartners.slice(startIndex, endIndex)

  return new Response(
    JSON.stringify({
      success: true,
      data: paginatedTPs,
      pagination: {
        page,
        limit,
        total: trainingPartners.length,
        totalPages: Math.ceil(trainingPartners.length / limit),
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleCreateTrainingPartner(req: Request): Promise<Response> {
  // Check authentication - only OSDA admins can create TPs
  const authError = await requireAnyRole(["osda_admin"])(req)
  if (authError) return authError

  const body = await req.json()
  const { name, email, phone, gstNumber, panNumber, address, contactPerson } = body

  if (!name || !email || !phone || !address || !contactPerson) {
    return new Response(JSON.stringify({ error: "Required fields missing" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  // Check if training partner already exists
  const existingTP = await Database.get<TrainingPartner>(["training_partners", "email", email.toLowerCase()])
  if (existingTP) {
    return new Response(JSON.stringify({ error: "Training partner already exists" }), {
      status: 409,
      headers: { "content-type": "application/json" },
    })
  }

  const trainingPartner: TrainingPartner = {
    id: Database.generateId(),
    name,
    email: email.toLowerCase(),
    phone,
    gstNumber,
    panNumber,
    address,
    contactPerson,
    status: "pending",
    trustScore: 0,
    documentsSubmitted: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Save training partner
  await Database.set(["training_partners", trainingPartner.id], trainingPartner)
  await Database.set(["training_partners", "email", trainingPartner.email], trainingPartner)

  return new Response(
    JSON.stringify({
      success: true,
      data: trainingPartner,
    }),
    {
      status: 201,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetTrainingPartner(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  // Training partners can only view their own data
  if (user.role === "training_partner" && user.organizationId !== id) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  const trainingPartner = await Database.get<TrainingPartner>(["training_partners", id])

  if (!trainingPartner) {
    return new Response(JSON.stringify({ error: "Training partner not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: trainingPartner,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleUpdateTrainingPartner(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  // Only OSDA admins or the TP itself can update
  if (user.role !== "osda_admin" && (user.role !== "training_partner" || user.organizationId !== id)) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  const trainingPartner = await Database.get<TrainingPartner>(["training_partners", id])

  if (!trainingPartner) {
    return new Response(JSON.stringify({ error: "Training partner not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const body = await req.json()
  const updatedTP: TrainingPartner = {
    ...trainingPartner,
    ...body,
    id, // Ensure ID cannot be changed
    updatedAt: new Date(),
  }

  // Save updated training partner
  await Database.set(["training_partners", id], updatedTP)
  await Database.set(["training_partners", "email", updatedTP.email], updatedTP)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedTP,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleDeleteTrainingPartner(req: Request, id: string): Promise<Response> {
  // Only OSDA super admins can delete
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const trainingPartner = await Database.get<TrainingPartner>(["training_partners", id])

  if (!trainingPartner) {
    return new Response(JSON.stringify({ error: "Training partner not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Delete training partner
  await Database.delete(["training_partners", id])
  await Database.delete(["training_partners", "email", trainingPartner.email])

  return new Response(
    JSON.stringify({
      success: true,
      message: "Training partner deleted successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleApproveTrainingPartner(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can approve
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const user = await AuthUtils.authenticate(req)
  const trainingPartner = await Database.get<TrainingPartner>(["training_partners", id])

  if (!trainingPartner) {
    return new Response(JSON.stringify({ error: "Training partner not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedTP: TrainingPartner = {
    ...trainingPartner,
    status: "active",
    approvedBy: user!.email,
    approvedAt: new Date(),
    updatedAt: new Date(),
  }

  await Database.set(["training_partners", id], updatedTP)
  await Database.set(["training_partners", "email", updatedTP.email], updatedTP)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedTP,
      message: "Training partner approved successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleRejectTrainingPartner(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can reject
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const body = await req.json()
  const { reason } = body

  const trainingPartner = await Database.get<TrainingPartner>(["training_partners", id])

  if (!trainingPartner) {
    return new Response(JSON.stringify({ error: "Training partner not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedTP: TrainingPartner = {
    ...trainingPartner,
    status: "rejected",
    updatedAt: new Date(),
  }

  await Database.set(["training_partners", id], updatedTP)
  await Database.set(["training_partners", "email", updatedTP.email], updatedTP)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedTP,
      message: "Training partner rejected",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetTrainingPartnerCentres(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const centres = await Database.list<Centre>(["centres", "training_partner", id])

  return new Response(
    JSON.stringify({
      success: true,
      data: centres,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetTrainingPartnerBatches(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const batches = await DatabaseSchema.getBatchesByTrainingPartner(id)

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

async function handleGetTrainingPartnerPayments(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const payments = await DatabaseSchema.getPaymentsByTrainingPartner(id)

  return new Response(
    JSON.stringify({
      success: true,
      data: payments,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetTrainingPartnerStats(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  const stats = await DatabaseSchema.getStatistics()

  return new Response(
    JSON.stringify({
      success: true,
      data: stats.trainingPartners,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}
