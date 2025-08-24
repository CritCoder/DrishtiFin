import { Database } from "../utils/database.ts"
import { DatabaseSchema } from "../utils/database-schema.ts"
import { AuthUtils } from "../utils/auth.ts"
import { requireAuth, requireAnyRole } from "../middleware/auth.ts"
import type { Payment } from "../types/index.ts"

export async function paymentRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace("/api/payments", "")
  const method = req.method

  // Initialize database if needed
  await DatabaseSchema.initialize()

  try {
    // GET /api/payments - List all payments
    if (path === "" && method === "GET") {
      return await handleListPayments(req)
    }

    // POST /api/payments - Create new payment
    if (path === "" && method === "POST") {
      return await handleCreatePayment(req)
    }

    // GET /api/payments/:id - Get specific payment
    if (path.match(/^\/[^/]+$/) && method === "GET") {
      const id = path.slice(1)
      return await handleGetPayment(req, id)
    }

    // PUT /api/payments/:id - Update payment
    if (path.match(/^\/[^/]+$/) && method === "PUT") {
      const id = path.slice(1)
      return await handleUpdatePayment(req, id)
    }

    // DELETE /api/payments/:id - Delete payment
    if (path.match(/^\/[^/]+$/) && method === "DELETE") {
      const id = path.slice(1)
      return await handleDeletePayment(req, id)
    }

    // POST /api/payments/:id/approve - Approve payment
    if (path.match(/^\/[^/]+\/approve$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleApprovePayment(req, id)
    }

    // POST /api/payments/:id/reject - Reject payment
    if (path.match(/^\/[^/]+\/reject$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleRejectPayment(req, id)
    }

    // POST /api/payments/:id/mark-paid - Mark payment as paid
    if (path.match(/^\/[^/]+\/mark-paid$/) && method === "POST") {
      const id = path.split("/")[1]
      return await handleMarkPaymentPaid(req, id)
    }

    // GET /api/payments/training-partner/:tpId - Get payments by training partner
    if (path.match(/^\/training-partner\/[^/]+$/) && method === "GET") {
      const tpId = path.split("/")[2]
      return await handleGetPaymentsByTrainingPartner(req, tpId)
    }

    // GET /api/payments/batch/:batchId - Get payments by batch
    if (path.match(/^\/batch\/[^/]+$/) && method === "GET") {
      const batchId = path.split("/")[2]
      return await handleGetPaymentsByBatch(req, batchId)
    }

    // GET /api/payments/stats - Get payment statistics
    if (path === "/stats" && method === "GET") {
      return await handleGetPaymentStats(req)
    }

    // GET /api/payments/milestones - Get milestone configuration
    if (path === "/milestones" && method === "GET") {
      return await handleGetMilestones(req)
    }

    // PUT /api/payments/milestones - Update milestone configuration
    if (path === "/milestones" && method === "PUT") {
      return await handleUpdateMilestones(req)
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error("Payments API error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

async function handleListPayments(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const user = await AuthUtils.authenticate(req)
  const url = new URL(req.url)
  const status = url.searchParams.get("status")
  const milestoneType = url.searchParams.get("milestoneType")
  const trainingPartnerId = url.searchParams.get("trainingPartnerId")
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "10")

  let payments: Payment[] = await Database.list<Payment>(["payments"])

  // Filter by training partner if user is TP
  if (user!.role === "training_partner") {
    payments = payments.filter((payment) => payment.trainingPartnerId === user!.organizationId)
  }

  // Apply filters
  if (status) {
    payments = payments.filter((payment) => payment.status === status)
  }

  if (milestoneType) {
    payments = payments.filter((payment) => payment.milestoneType === milestoneType)
  }

  if (trainingPartnerId) {
    payments = payments.filter((payment) => payment.trainingPartnerId === trainingPartnerId)
  }

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPayments = payments.slice(startIndex, endIndex)

  return new Response(
    JSON.stringify({
      success: true,
      data: paginatedPayments,
      pagination: {
        page,
        limit,
        total: payments.length,
        totalPages: Math.ceil(payments.length / limit),
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleCreatePayment(req: Request): Promise<Response> {
  // Check authentication - TPs and admins can create payments
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const body = await req.json()
  const { trainingPartnerId, batchId, milestoneType, amount, dueDate, documents } = body

  if (!trainingPartnerId || !batchId || !milestoneType || !amount || !dueDate) {
    return new Response(JSON.stringify({ error: "Required fields missing" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const payment: Payment = {
    id: Database.generateId(),
    trainingPartnerId,
    batchId,
    milestoneType: milestoneType as any,
    amount,
    status: "pending",
    dueDate: new Date(dueDate),
    documents: documents || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Save payment
  await Database.set(["payments", payment.id], payment)
  await Database.set(["payments", "training_partner", trainingPartnerId, payment.id], payment)
  await Database.set(["payments", "batch", batchId, payment.id], payment)

  return new Response(
    JSON.stringify({
      success: true,
      data: payment,
    }),
    {
      status: 201,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetPayment(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const payment = await Database.get<Payment>(["payments", id])

  if (!payment) {
    return new Response(JSON.stringify({ error: "Payment not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Training partners can only view their payments
  if (user.role === "training_partner" && payment.trainingPartnerId !== user.organizationId) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: payment,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleUpdatePayment(req: Request, id: string): Promise<Response> {
  // Check authentication
  const user = await AuthUtils.authenticate(req)
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const payment = await Database.get<Payment>(["payments", id])

  if (!payment) {
    return new Response(JSON.stringify({ error: "Payment not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Check permissions
  if (
    user.role !== "osda_admin" &&
    (user.role !== "training_partner" || payment.trainingPartnerId !== user.organizationId)
  ) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  const body = await req.json()
  const updatedPayment: Payment = {
    ...payment,
    ...body,
    id, // Ensure ID cannot be changed
    updatedAt: new Date(),
  }

  // Save updated payment
  await Database.set(["payments", id], updatedPayment)
  await Database.set(
    ["payments", "training_partner", updatedPayment.trainingPartnerId, updatedPayment.id],
    updatedPayment,
  )
  await Database.set(["payments", "batch", updatedPayment.batchId, updatedPayment.id], updatedPayment)

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedPayment,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleDeletePayment(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can delete payments
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const payment = await Database.get<Payment>(["payments", id])

  if (!payment) {
    return new Response(JSON.stringify({ error: "Payment not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  // Delete payment
  await Database.delete(["payments", id])
  await Database.delete(["payments", "training_partner", payment.trainingPartnerId, payment.id])
  await Database.delete(["payments", "batch", payment.batchId, payment.id])

  return new Response(
    JSON.stringify({
      success: true,
      message: "Payment deleted successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleApprovePayment(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can approve payments
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const payment = await Database.get<Payment>(["payments", id])

  if (!payment) {
    return new Response(JSON.stringify({ error: "Payment not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedPayment: Payment = {
    ...payment,
    status: "approved",
    updatedAt: new Date(),
  }

  await Database.set(["payments", id], updatedPayment)
  await Database.set(
    ["payments", "training_partner", updatedPayment.trainingPartnerId, updatedPayment.id],
    updatedPayment,
  )

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedPayment,
      message: "Payment approved successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleRejectPayment(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can reject payments
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const body = await req.json()
  const { reason } = body

  const payment = await Database.get<Payment>(["payments", id])

  if (!payment) {
    return new Response(JSON.stringify({ error: "Payment not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedPayment: Payment = {
    ...payment,
    status: "rejected",
    updatedAt: new Date(),
  }

  await Database.set(["payments", id], updatedPayment)
  await Database.set(
    ["payments", "training_partner", updatedPayment.trainingPartnerId, updatedPayment.id],
    updatedPayment,
  )

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedPayment,
      message: "Payment rejected",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleMarkPaymentPaid(req: Request, id: string): Promise<Response> {
  // Only OSDA admins can mark payments as paid
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const body = await req.json()
  const { invoiceNumber, paidDate } = body

  const payment = await Database.get<Payment>(["payments", id])

  if (!payment) {
    return new Response(JSON.stringify({ error: "Payment not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedPayment: Payment = {
    ...payment,
    status: "paid",
    invoiceNumber,
    paidDate: paidDate ? new Date(paidDate) : new Date(),
    updatedAt: new Date(),
  }

  await Database.set(["payments", id], updatedPayment)
  await Database.set(
    ["payments", "training_partner", updatedPayment.trainingPartnerId, updatedPayment.id],
    updatedPayment,
  )

  return new Response(
    JSON.stringify({
      success: true,
      data: updatedPayment,
      message: "Payment marked as paid",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetPaymentsByTrainingPartner(req: Request, tpId: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const payments = await DatabaseSchema.getPaymentsByTrainingPartner(tpId)

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

async function handleGetPaymentsByBatch(req: Request, batchId: string): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "system_integrator"])(req)
  if (authError) return authError

  const payments = await Database.list<Payment>(["payments", "batch", batchId])

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

async function handleGetPaymentStats(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  const stats = await DatabaseSchema.getStatistics()

  return new Response(
    JSON.stringify({
      success: true,
      data: stats.payments,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetMilestones(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  // Default milestone configuration
  const milestones = {
    batch_start: { percentage: 33, description: "Payment on batch start" },
    mid_training: { percentage: 33, description: "Payment at mid-training completion" },
    placement: { percentage: 34, description: "Payment on successful placement" },
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: milestones,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleUpdateMilestones(req: Request): Promise<Response> {
  // Only OSDA admins can update milestone configuration
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const body = await req.json()

  // Save milestone configuration
  await Database.set(["config", "milestones"], body)

  return new Response(
    JSON.stringify({
      success: true,
      data: body,
      message: "Milestone configuration updated successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}
