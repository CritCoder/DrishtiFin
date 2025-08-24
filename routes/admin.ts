import { Database } from "../utils/database.ts"
import { DatabaseSchema } from "../utils/database-schema.ts"
import { AuthUtils } from "../utils/auth.ts"
import { requireAuth } from "../middleware/auth.ts"

export async function adminRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace("/api/admin", "")
  const method = req.method

  try {
    // GET /api/admin/dashboard - Get admin dashboard data
    if (path === "/dashboard" && method === "GET") {
      return await handleGetDashboard(req)
    }

    // GET /api/admin/analytics - Get analytics data
    if (path === "/analytics" && method === "GET") {
      return await handleGetAnalytics(req)
    }

    // GET /api/admin/audit-logs - Get audit logs
    if (path === "/audit-logs" && method === "GET") {
      return await handleGetAuditLogs(req)
    }

    // POST /api/admin/audit-logs - Create audit log entry
    if (path === "/audit-logs" && method === "POST") {
      return await handleCreateAuditLog(req)
    }

    // GET /api/admin/system-health - Get system health status
    if (path === "/system-health" && method === "GET") {
      return await handleGetSystemHealth(req)
    }

    // GET /api/admin/reports/export - Export reports
    if (path === "/reports/export" && method === "GET") {
      return await handleExportReports(req)
    }

    // GET /api/admin/users - Get all users
    if (path === "/users" && method === "GET") {
      return await handleGetUsers(req)
    }

    // PUT /api/admin/users/:id/status - Update user status
    if (path.match(/^\/users\/[^/]+\/status$/) && method === "PUT") {
      const userId = path.split("/")[2]
      return await handleUpdateUserStatus(req, userId)
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error("Admin API error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

async function handleGetDashboard(req: Request): Promise<Response> {
  // Only OSDA admins can access dashboard
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  // Initialize database
  await DatabaseSchema.initialize()

  // Get comprehensive statistics
  const stats = await DatabaseSchema.getStatistics()

  // Get recent activities (mock data)
  const recentActivities = [
    {
      id: "activity-1",
      type: "batch_completed",
      description: "Batch BRSR-TECH-001 completed with 92% placement rate",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: "system",
    },
    {
      id: "activity-2",
      type: "tp_onboarded",
      description: "New training partner SkillUp Hub onboarded",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      user: "admin@drishti.gov.in",
    },
  ]

  // Calculate placement rate
  const placementRate = stats.students.total > 0 ? Math.round((stats.placements.total / stats.students.total) * 100) : 0

  // Calculate average salary (mock)
  const avgSalary = 320000 // ₹3.2L

  const dashboardData = {
    overview: {
      totalStudents: stats.students.total,
      placementRate: `${placementRate}%`,
      avgSalary: `₹${(avgSalary / 100000).toFixed(1)}L`,
      activeTPs: stats.trainingPartners.active,
    },
    trainingPartners: stats.trainingPartners,
    students: stats.students,
    batches: stats.batches,
    placements: stats.placements,
    payments: stats.payments,
    recentActivities,
    charts: {
      placementByDistrict: [
        { district: "Khordha", placements: 120 },
        { district: "Cuttack", placements: 95 },
        { district: "Puri", placements: 85 },
        { district: "Ganjam", placements: 75 },
        { district: "Kendrapara", placements: 65 },
      ],
      trainingPartnerPerformance: {
        excellent: 45,
        good: 35,
        average: 15,
        poor: 5,
      },
    },
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: dashboardData,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetAnalytics(req: Request): Promise<Response> {
  // Only OSDA admins and system integrators can access analytics
  const authError = await requireAuth(["osda_admin", "system_integrator"])(req)
  if (authError) return authError

  const url = new URL(req.url)
  const timeRange = url.searchParams.get("timeRange") || "30d"

  // Mock analytics data
  const analyticsData = {
    timeRange,
    metrics: {
      totalStudents: 2847,
      placementRate: 78,
      avgSalary: 320000,
      activeTPs: 189,
    },
    trends: {
      studentEnrollment: [
        { month: "Jan", count: 245 },
        { month: "Feb", count: 289 },
        { month: "Mar", count: 312 },
        { month: "Apr", count: 298 },
        { month: "May", count: 334 },
        { month: "Jun", count: 356 },
      ],
      placementTrends: [
        { month: "Jan", rate: 72 },
        { month: "Feb", rate: 75 },
        { month: "Mar", rate: 78 },
        { month: "Apr", rate: 76 },
        { month: "May", rate: 80 },
        { month: "Jun", rate: 78 },
      ],
    },
    topPerformers: {
      trainingPartners: [
        { name: "TechSkills Academy", score: 9.1, placements: 156 },
        { name: "Skill Development Corp", score: 8.7, placements: 142 },
        { name: "Digital Learning Solutions", score: 8.3, placements: 128 },
      ],
      courses: [
        { name: "Web Development", completionRate: 92, placementRate: 85 },
        { name: "Data Analytics", completionRate: 88, placementRate: 82 },
        { name: "Mobile Development", completionRate: 85, placementRate: 78 },
      ],
    },
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: analyticsData,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetAuditLogs(req: Request): Promise<Response> {
  // Only OSDA admins can access audit logs
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const url = new URL(req.url)
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "50")
  const action = url.searchParams.get("action")
  const user = url.searchParams.get("user")

  // Mock audit logs
  const auditLogs = [
    {
      id: "log-1",
      timestamp: "2024-03-15 14:32:18",
      user: "admin@drishti.gov.in",
      action: "CREATE",
      entity: "Training Partner",
      details: "Created TechSkills Academy",
      ipAddress: "203.192.12.45",
    },
    {
      id: "log-2",
      timestamp: "2024-03-15 13:45:22",
      user: "ramesh.kumar@techskills.com",
      action: "UPDATE",
      entity: "Student Batch",
      details: "Updated attendance for BRSR-TECH-001",
      ipAddress: "45.123.67.89",
    },
    {
      id: "log-3",
      timestamp: "2024-03-15 12:18:07",
      user: "priya.sharma@ruralskills.com",
      action: "DELETE",
      entity: "Placement Record",
      details: "Removed placement record #12345",
      ipAddress: "192.168.1.100",
    },
  ]

  // Apply filters
  let filteredLogs = auditLogs
  if (action) {
    filteredLogs = filteredLogs.filter((log) => log.action.toLowerCase().includes(action.toLowerCase()))
  }
  if (user) {
    filteredLogs = filteredLogs.filter((log) => log.user.toLowerCase().includes(user.toLowerCase()))
  }

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

  return new Response(
    JSON.stringify({
      success: true,
      data: paginatedLogs,
      pagination: {
        page,
        limit,
        total: filteredLogs.length,
        totalPages: Math.ceil(filteredLogs.length / limit),
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleCreateAuditLog(req: Request): Promise<Response> {
  // System can create audit logs
  const body = await req.json()
  const { action, entity, details, user, ipAddress } = body

  const auditLog = {
    id: Database.generateId(),
    timestamp: new Date().toISOString(),
    user: user || "system",
    action,
    entity,
    details,
    ipAddress: ipAddress || "unknown",
    createdAt: new Date(),
  }

  await Database.set(["audit_logs", auditLog.id], auditLog)

  return new Response(
    JSON.stringify({
      success: true,
      data: auditLog,
    }),
    {
      status: 201,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetSystemHealth(req: Request): Promise<Response> {
  // Only OSDA admins can check system health
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      database: {
        status: "operational",
        responseTime: "12ms",
        uptime: "99.9%",
      },
      authentication: {
        status: "operational",
        responseTime: "8ms",
        uptime: "99.8%",
      },
      integrations: {
        status: "operational",
        responseTime: "150ms",
        uptime: "99.5%",
      },
      fileStorage: {
        status: "operational",
        responseTime: "45ms",
        uptime: "99.7%",
      },
    },
    metrics: {
      totalRequests: 15420,
      errorRate: "0.2%",
      avgResponseTime: "95ms",
      memoryUsage: "68%",
      cpuUsage: "42%",
    },
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: healthData,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleExportReports(req: Request): Promise<Response> {
  // Only OSDA admins can export reports
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const url = new URL(req.url)
  const reportType = url.searchParams.get("type") || "summary"
  const format = url.searchParams.get("format") || "csv"

  // Mock report generation
  const reportData = {
    reportType,
    format,
    generatedAt: new Date().toISOString(),
    downloadUrl: `https://api.drishti.gov.in/reports/${reportType}-${Date.now()}.${format}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: reportData,
      message: "Report generated successfully",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleGetUsers(req: Request): Promise<Response> {
  // Only super admins can view all users
  const authError = await requireAuth(["osda_admin"])(req)
  if (authError) return authError

  const user = await AuthUtils.authenticate(req)
  if (user?.subtype !== "super_admin") {
    return new Response(JSON.stringify({ error: "Super admin access required" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  const users = await Database.list(["users"])

  // Remove sensitive information
  const sanitizedUsers = users.map((user: any) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    subtype: user.subtype,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }))

  return new Response(
    JSON.stringify({
      success: true,
      data: sanitizedUsers,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}

async function handleUpdateUserStatus(req: Request, userId: string): Promise<Response> {
  // Only super admins can update user status
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
  const { isActive } = body

  const targetUser = await Database.get(["users", userId])
  if (!targetUser) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    })
  }

  const updatedUser = {
    ...targetUser,
    isActive,
    updatedAt: new Date(),
  }

  await Database.set(["users", userId], updatedUser)
  await Database.set(["users", "email", targetUser.email], updatedUser)

  return new Response(
    JSON.stringify({
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  )
}
