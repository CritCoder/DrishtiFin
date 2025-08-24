import { Database } from "../utils/database.ts"
import { AuthUtils } from "../utils/auth.ts"
import { requireAuth, requireAnyRole } from "../middleware/auth.ts"

export async function integrationRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace("/api/integrations", "")
  const method = req.method

  try {
    // POST /api/integrations/gstn/verify - Verify GSTN number
    if (path === "/gstn/verify" && method === "POST") {
      return await handleGSTNVerification(req)
    }

    // POST /api/integrations/pan/verify - Verify PAN number
    if (path === "/pan/verify" && method === "POST") {
      return await handlePANVerification(req)
    }

    // POST /api/integrations/epfo/verify - Verify EPFO details
    if (path === "/epfo/verify" && method === "POST") {
      return await handleEPFOVerification(req)
    }

    // POST /api/integrations/mca/lookup - MCA company lookup
    if (path === "/mca/lookup" && method === "POST") {
      return await handleMCALookup(req)
    }

    // POST /api/integrations/aadhar/verify - Verify Aadhar (mock)
    if (path === "/aadhar/verify" && method === "POST") {
      return await handleAadharVerification(req)
    }

    // GET /api/integrations/config - Get integration configuration
    if (path === "/config" && method === "GET") {
      return await handleGetIntegrationConfig(req)
    }

    // PUT /api/integrations/config - Update integration configuration
    if (path === "/config" && method === "PUT") {
      return await handleUpdateIntegrationConfig(req)
    }

    // POST /api/integrations/webhook/payment - Payment gateway webhook
    if (path === "/webhook/payment" && method === "POST") {
      return await handlePaymentWebhook(req)
    }

    // GET /api/integrations/status - Get integration status
    if (path === "/status" && method === "GET") {
      return await handleGetIntegrationStatus(req)
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error("Integrations API error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

async function handleGSTNVerification(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const body = await req.json()
  const { gstnNumber } = body

  if (!gstnNumber) {
    return new Response(JSON.stringify({ error: "GSTN number is required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  // Mock GSTN verification - in production, this would call actual GSTN API
  const isValidFormat = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstnNumber)

  if (!isValidFormat) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid GSTN format",
        data: null,
      }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      },
    )
  }

  // Mock successful verification
  const mockData = {
    gstnNumber,
    legalName: "TechSkills Training Private Limited",
    tradeName: "TechSkills Academy",
    registrationDate: "2020-04-15",
    status: "Active",
    address: {
      building: "Tech Park",
      street: "Sector 15",
      city: "Bhubaneswar",
      state: "Odisha",
      pincode: "751024",
    },
    businessType: "Private Limited Company",
    verified: true,
    verifiedAt: new Date().toISOString(),
  }

  // Store verification result
  await Database.set(["verifications", "gstn", gstnNumber], {
    ...mockData,
    verifiedBy: (await AuthUtils.authenticate(req))?.email,
    createdAt: new Date(),
  })

  return new Response(
    JSON.stringify({
      success: true,
      data: mockData,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handlePANVerification(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const body = await req.json()
  const { panNumber } = body

  if (!panNumber) {
    return new Response(JSON.stringify({ error: "PAN number is required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  // Mock PAN verification
  const isValidFormat = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)

  if (!isValidFormat) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid PAN format",
        data: null,
      }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      },
    )
  }

  // Mock successful verification
  const mockData = {
    panNumber,
    name: "TECHSKILLS TRAINING PRIVATE LIMITED",
    status: "Valid",
    category: "Company",
    verified: true,
    verifiedAt: new Date().toISOString(),
  }

  // Store verification result
  await Database.set(["verifications", "pan", panNumber], {
    ...mockData,
    verifiedBy: (await AuthUtils.authenticate(req))?.email,
    createdAt: new Date(),
  })

  return new Response(
    JSON.stringify({
      success: true,
      data: mockData,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleEPFOVerification(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const body = await req.json()
  const { uan, employeeName } = body

  if (!uan || !employeeName) {
    return new Response(JSON.stringify({ error: "UAN and employee name are required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  // Mock EPFO verification
  const mockData = {
    uan,
    employeeName,
    employerName: "TechSkills Training Pvt Ltd",
    status: "Active",
    dateOfJoining: "2023-01-15",
    lastContribution: "2024-02-01",
    verified: true,
    verifiedAt: new Date().toISOString(),
  }

  // Store verification result
  await Database.set(["verifications", "epfo", uan], {
    ...mockData,
    verifiedBy: (await AuthUtils.authenticate(req))?.email,
    createdAt: new Date(),
  })

  return new Response(
    JSON.stringify({
      success: true,
      data: mockData,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleMCALookup(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner"])(req)
  if (authError) return authError

  const body = await req.json()
  const { cin } = body

  if (!cin) {
    return new Response(JSON.stringify({ error: "CIN is required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  // Mock MCA lookup
  const mockData = {
    cin,
    companyName: "TECHSKILLS TRAINING PRIVATE LIMITED",
    registrationNumber: "U80904OR2020PTC032145",
    dateOfIncorporation: "2020-04-15",
    companyCategory: "Company limited by Shares",
    companySubCategory: "Non-govt company",
    classOfCompany: "Private",
    authorizedCapital: "1000000",
    paidUpCapital: "500000",
    registeredAddress: "Tech Park, Sector 15, Bhubaneswar, Odisha - 751024",
    status: "Active",
    verified: true,
    verifiedAt: new Date().toISOString(),
  }

  // Store lookup result
  await Database.set(["verifications", "mca", cin], {
    ...mockData,
    verifiedBy: (await AuthUtils.authenticate(req))?.email,
    createdAt: new Date(),
  })

  return new Response(
    JSON.stringify({
      success: true,
      data: mockData,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleAadharVerification(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "training_partner", "student"])(req)
  if (authError) return authError

  const body = await req.json()
  const { aadharNumber, name } = body

  if (!aadharNumber || !name) {
    return new Response(JSON.stringify({ error: "Aadhar number and name are required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  // Mock Aadhar verification (in production, use UIDAI APIs)
  const isValidFormat = /^[0-9]{12}$/.test(aadharNumber)

  if (!isValidFormat) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid Aadhar format",
        data: null,
      }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      },
    )
  }

  // Mock successful verification
  const mockData = {
    aadharNumber: aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX-XXXX-$3"), // Mask for privacy
    name,
    status: "Verified",
    verified: true,
    verifiedAt: new Date().toISOString(),
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: mockData,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetIntegrationConfig(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  // Get integration configuration
  const config = (await Database.get(["config", "integrations"])) || {
    gstn: {
      enabled: true,
      mode: "mock", // mock or live
      apiUrl: "https://api.gstn.gov.in",
    },
    pan: {
      enabled: true,
      mode: "mock",
      apiUrl: "https://api.pan.gov.in",
    },
    epfo: {
      enabled: true,
      mode: "mock",
      apiUrl: "https://api.epfo.gov.in",
    },
    mca: {
      enabled: true,
      mode: "mock",
      apiUrl: "https://api.mca.gov.in",
    },
    aadhar: {
      enabled: true,
      mode: "mock",
      apiUrl: "https://api.uidai.gov.in",
    },
    paymentGateway: {
      enabled: true,
      provider: "razorpay",
      mode: "test",
    },
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: config,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleUpdateIntegrationConfig(req: Request): Promise<Response> {
  // Only super admins can update integration config
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const user = await AuthUtils.authenticate(req)
  if (user?.subtype !== "super_admin") {
    return new Response(JSON.stringify({ error: "Super admin access required" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  const body = await req.json()

  // Save integration configuration
  await Database.set(["config", "integrations"], body)

  return new Response(
    JSON.stringify({
      success: true,
      data: body,
      message: "Integration configuration updated successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handlePaymentWebhook(req: Request): Promise<Response> {
  // Payment gateway webhook - no authentication required
  const body = await req.json()
  const { event, paymentId, status, amount, metadata } = body

  console.log("Payment webhook received:", { event, paymentId, status, amount })

  // Process payment webhook
  if (event === "payment.captured" && metadata?.drishtiPaymentId) {
    const payment = await Database.get(["payments", metadata.drishtiPaymentId])

    if (payment) {
      const updatedPayment = {
        ...payment,
        status: "paid",
        paidDate: new Date(),
        invoiceNumber: paymentId,
        updatedAt: new Date(),
      }

      await Database.set(["payments", metadata.drishtiPaymentId], updatedPayment)
      await Database.set(
        ["payments", "training_partner", payment.trainingPartnerId, metadata.drishtiPaymentId],
        updatedPayment,
      )
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Webhook processed successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetIntegrationStatus(req: Request): Promise<Response> {
  // Check authentication
  const authError = await requireAnyRole(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  // Mock integration status
  const status = {
    gstn: {
      status: "operational",
      lastChecked: new Date().toISOString(),
      responseTime: "120ms",
      uptime: "99.9%",
    },
    pan: {
      status: "operational",
      lastChecked: new Date().toISOString(),
      responseTime: "95ms",
      uptime: "99.8%",
    },
    epfo: {
      status: "operational",
      lastChecked: new Date().toISOString(),
      responseTime: "200ms",
      uptime: "99.5%",
    },
    mca: {
      status: "operational",
      lastChecked: new Date().toISOString(),
      responseTime: "150ms",
      uptime: "99.7%",
    },
    aadhar: {
      status: "operational",
      lastChecked: new Date().toISOString(),
      responseTime: "180ms",
      uptime: "99.6%",
    },
    paymentGateway: {
      status: "operational",
      lastChecked: new Date().toISOString(),
      responseTime: "80ms",
      uptime: "99.9%",
    },
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: status,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}
