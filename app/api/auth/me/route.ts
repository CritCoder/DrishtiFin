import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'drishti-demo-secret-key-2024'

// Demo account data for user lookup
const demoAccounts = {
  1: {
    id: 1,
    email: "super.admin@drishti.gov.in",
    name: "Super Administrator",
    role: "osda_admin",
    status: "active",
    permissions: ["all"]
  },
  2: {
    id: 2,
    email: "dept.user@drishti.gov.in",
    name: "Department User", 
    role: "osda_admin",
    status: "active",
    permissions: ["read", "approve", "monitor"]
  },
  3: {
    id: 3,
    email: "admin@techskills.com",
    name: "TechSkills Admin",
    role: "training_partner",
    status: "active",
    permissions: ["manage_batches", "manage_students", "view_reports"]
  },
  4: {
    id: 4,
    email: "staff@techskills.com", 
    name: "TechSkills Staff",
    role: "training_partner",
    status: "active",
    permissions: ["manage_students", "view_batches"]
  },
  5: {
    id: 5,
    email: "ramesh.kumar@student.com",
    name: "Ramesh Kumar",
    role: "student", 
    status: "active",
    permissions: ["view_profile", "view_batch", "view_placement"]
  },
  6: {
    id: 6,
    email: "hr@infosys.com",
    name: "Infosys HR",
    role: "employer",
    status: "active", 
    permissions: ["view_candidates", "post_jobs"]
  },
  7: {
    id: 7,
    email: "auditor@kpmg.com",
    name: "KPMG Auditor",
    role: "system_integrator",
    status: "active",
    permissions: ["audit_logs", "system_reports", "compliance_check"]
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove "Bearer " prefix
    
    try {
      const decoded = verify(token, JWT_SECRET) as any
      console.log('🔍 Token decoded:', decoded)
      
      // Look up user data
      const user = demoAccounts[decoded.id as keyof typeof demoAccounts]
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        )
      }

      console.log('✅ User authenticated:', user.email, 'Role:', user.role)

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          permissions: user.permissions
        }
      })

    } catch (tokenError) {
      console.error('❌ Token verification failed:', tokenError)
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Auth me API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}