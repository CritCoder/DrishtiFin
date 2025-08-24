import { Database } from "../utils/database.ts"
import { AuthUtils } from "../utils/auth.ts"
import { initializeDemoData } from "../utils/seed-data.ts"
import type { User } from "../types/index.ts"

const DEMO_USERS = [
  {
    email: "super.admin@drishti.gov.in",
    password: "SuperAdmin@123",
    role: "osda_admin",
    subtype: "super_admin",
    firstName: "Super",
    lastName: "Administrator",
  },
  {
    email: "dept.user@drishti.gov.in",
    password: "DeptUser@123",
    role: "osda_admin",
    subtype: "department_user",
    firstName: "Department",
    lastName: "User",
  },
  {
    email: "admin@techskills.com",
    password: "TPAdmin@123",
    role: "training_partner",
    subtype: "tp_admin",
    firstName: "TP",
    lastName: "Administrator",
    organizationName: "TechSkills Academy",
  },
  {
    email: "staff@techskills.com",
    password: "TPStaff@123",
    role: "training_partner",
    subtype: "tp_staff",
    firstName: "TP",
    lastName: "Staff",
    organizationName: "TechSkills Academy",
  },
  {
    email: "ramesh.kumar@student.com",
    password: "Student@123",
    role: "student",
    firstName: "Ramesh",
    lastName: "Kumar",
  },
  {
    email: "hr@infosys.com",
    password: "Employer@123",
    role: "employer",
    firstName: "HR",
    lastName: "Manager",
    organizationName: "Infosys Limited",
  },
  {
    email: "auditor@kpmg.com",
    password: "Auditor@123",
    role: "system_integrator",
    firstName: "System",
    lastName: "Auditor",
    organizationName: "KPMG India",
  },
]

// Initialize demo users in database
async function initializeDemoUsers() {
  for (const demoUser of DEMO_USERS) {
    const existingUser = await Database.get<User>(["users", "email", demoUser.email])

    if (!existingUser) {
      const user: User = {
        id: Database.generateId(),
        email: demoUser.email,
        passwordHash: await AuthUtils.hashPassword(demoUser.password),
        role: demoUser.role as any,
        subtype: demoUser.subtype as any,
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        organizationId: demoUser.role === "training_partner" ? "tp-001" : undefined,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await Database.set(["users", user.id], user)
      await Database.set(["users", "email", user.email], user)
    }
  }
}

// CORS configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
}

export async function authRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace("/api/auth", "")

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  // Initialize demo users and data on first request
  await initializeDemoUsers()
  await initializeDemoData()

  try {
    switch (path) {
      case "/login":
        return await handleLogin(req)
      case "/register":
        return await handleRegister(req)
      case "/me":
        return await handleMe(req)
      case "/logout":
        return await handleLogout(req)
      case "/refresh":
        return await handleRefresh(req)
      default:
        return new Response(JSON.stringify({ error: "Not Found" }), {
          status: 404,
          headers: { "content-type": "application/json" },
        })
    }
  } catch (error) {
    console.error("Auth route error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

async function handleLogin(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json", ...corsHeaders },
    })
  }

  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password are required" }), {
      status: 400,
      headers: { "content-type": "application/json", ...corsHeaders },
    })
  }

  // Find user by email
  const user = await Database.get<User>(["users", "email", email.toLowerCase()])

  if (!user || !user.isActive) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "content-type": "application/json", ...corsHeaders },
    })
  }

  // Verify password
  const isValidPassword = await AuthUtils.verifyPassword(password, user.passwordHash)

  if (!isValidPassword) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "content-type": "application/json", ...corsHeaders },
    })
  }

  // Generate JWT token
  const token = await AuthUtils.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    subtype: user.subtype,
    organizationId: user.organizationId,
  })

  // Update last login
  user.updatedAt = new Date()
  await Database.set(["users", user.id], user)

  return new Response(
    JSON.stringify({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        subtype: user.subtype,
        organizationId: user.organizationId,
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json", ...corsHeaders },
    },
  )
}

async function handleRegister(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    })
  }

  const body = await req.json()
  const { email, password, firstName, lastName, role, subtype, organizationName, phone } = body

  if (!email || !password || !firstName || !lastName || !role) {
    return new Response(JSON.stringify({ error: "Required fields missing" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  // Check if user already exists
  const existingUser = await Database.get<User>(["users", "email", email.toLowerCase()])

  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 409,
      headers: { "content-type": "application/json" },
    })
  }

  // Create new user
  const user: User = {
    id: Database.generateId(),
    email: email.toLowerCase(),
    passwordHash: await AuthUtils.hashPassword(password),
    role: role as any,
    subtype: subtype as any,
    firstName,
    lastName,
    phone,
    organizationId: role === "training_partner" ? Database.generateId() : undefined,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Save user
  await Database.set(["users", user.id], user)
  await Database.set(["users", "email", user.email], user)

  // Generate JWT token
  const token = await AuthUtils.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    subtype: user.subtype,
    organizationId: user.organizationId,
  })

  return new Response(
    JSON.stringify({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        subtype: user.subtype,
        organizationId: user.organizationId,
      },
    }),
    {
      status: 201,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleMe(req: Request): Promise<Response> {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    })
  }

  const user = await AuthUtils.authenticate(req)

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  // Get full user details
  const fullUser = await Database.get<User>(["users", user.id])

  if (!fullUser) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  return new Response(
    JSON.stringify({
      user: {
        id: fullUser.id,
        email: fullUser.email,
        firstName: fullUser.firstName,
        lastName: fullUser.lastName,
        role: fullUser.role,
        subtype: fullUser.subtype,
        organizationId: fullUser.organizationId,
        phone: fullUser.phone,
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleLogout(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    })
  }

  return new Response(JSON.stringify({ success: true, message: "Logged out successfully" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

async function handleRefresh(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    })
  }

  const user = await AuthUtils.authenticate(req)

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  // Generate new token
  const token = await AuthUtils.generateToken(user)

  return new Response(JSON.stringify({ success: true, token }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
