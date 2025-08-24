import { serve } from "https://deno.land/std@0.208.0/http/server.ts"

// Import route handlers
import { authRoutes } from "./routes/auth.ts"
import { trainingPartnerRoutes } from "./routes/training-partners.ts"
import { studentRoutes } from "./routes/students.ts"
import { batchRoutes } from "./routes/batches.ts"
import { placementRoutes } from "./routes/placements.ts"
import { paymentRoutes } from "./routes/payments.ts"
import { integrationRoutes } from "./routes/integrations.ts"
import { adminRoutes } from "./routes/admin.ts"

// CORS configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
}

// Main request handler
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    // Health check
    if (path === "/" || path === "/health") {
      return new Response(
        JSON.stringify({
          status: "healthy",
          service: "DRISHTI API",
          version: "1.0.0",
          timestamp: new Date().toISOString(),
        }),
        {
          headers: {
            "content-type": "application/json",
            ...corsHeaders,
          },
        },
      )
    }

    // Seed database endpoint
    if (path === "/seed") {
      try {
        const { initializeDemoData } = await import("./utils/seed-data.ts")
        const { authRoutes } = await import("./routes/auth.ts")
        
        // Initialize demo users via auth route (which calls initializeDemoUsers)
        await authRoutes(new Request(`${url.origin}/api/auth/login`, { method: 'POST', body: JSON.stringify({}) }))
        // Initialize demo data
        await initializeDemoData()
        
        return new Response(
          JSON.stringify({
            success: true,
            message: "Demo data seeded successfully",
            timestamp: new Date().toISOString(),
          }),
          {
            headers: {
              "content-type": "application/json",
              ...corsHeaders,
            },
          },
        )
      } catch (error) {
        return new Response(
          JSON.stringify({
            error: "Failed to seed database",
            message: error.message,
          }),
          {
            status: 500,
            headers: {
              "content-type": "application/json",
              ...corsHeaders,
            },
          },
        )
      }
    }

    // Route to appropriate handlers
    if (path.startsWith("/api/auth")) {
      return await authRoutes(req)
    }

    if (path.startsWith("/api/training-partners")) {
      return await trainingPartnerRoutes(req)
    }

    if (path.startsWith("/api/students")) {
      return await studentRoutes(req)
    }

    if (path.startsWith("/api/batches")) {
      return await batchRoutes(req)
    }

    if (path.startsWith("/api/placements")) {
      return await placementRoutes(req)
    }

    if (path.startsWith("/api/payments")) {
      return await paymentRoutes(req)
    }

    if (path.startsWith("/api/integrations")) {
      return await integrationRoutes(req)
    }

    if (path.startsWith("/api/admin")) {
      return await adminRoutes(req)
    }

    // 404 for unmatched routes
    return new Response(JSON.stringify({ error: "Not Found", path }), {
      status: 404,
      headers: {
        "content-type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error) {
    console.error("Server error:", error)
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
          ...corsHeaders,
        },
      },
    )
  }
}

// Start the server
const port = 8001
serve(handler, { port })
console.log(`🚀 DRISHTI API Server running on http://localhost:${port}`)
