import { NextRequest, NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'

// Demo accounts that should be accepted
const demoAccounts = {
  "super.admin@drishti.gov.in": {
    id: 1,
    email: "super.admin@drishti.gov.in",
    password: "SuperAdmin@123",
    name: "Super Administrator",
    role: "osda_admin",
    status: "active",
    permissions: ["all"]
  },
  "dept.user@drishti.gov.in": {
    id: 2,
    email: "dept.user@drishti.gov.in", 
    password: "DeptUser@123",
    name: "Department User",
    role: "osda_admin",
    status: "active",
    permissions: ["read", "approve", "monitor"]
  },
  "admin@techskills.com": {
    id: 3,
    email: "admin@techskills.com",
    password: "TPAdmin@123", 
    name: "TechSkills Admin",
    role: "training_partner",
    status: "active",
    permissions: ["manage_batches", "manage_students", "view_reports"]
  },
  "staff@techskills.com": {
    id: 4,
    email: "staff@techskills.com",
    password: "TPStaff@123",
    name: "TechSkills Staff",
    role: "training_partner", 
    status: "active",
    permissions: ["manage_students", "view_batches"]
  },
  "ramesh.kumar@student.com": {
    id: 5,
    email: "ramesh.kumar@student.com",
    password: "Student@123",
    name: "Ramesh Kumar",
    role: "student",
    status: "active", 
    permissions: ["view_profile", "view_batch", "view_placement"]
  },
  "hr@infosys.com": {
    id: 6,
    email: "hr@infosys.com", 
    password: "Employer@123",
    name: "Infosys HR",
    role: "employer",
    status: "active",
    permissions: ["view_candidates", "post_jobs"]
  },
  "auditor@kpmg.com": {
    id: 7,
    email: "auditor@kpmg.com",
    password: "Auditor@123", 
    name: "KPMG Auditor",
    role: "system_integrator",
    status: "active",
    permissions: ["audit_logs", "system_reports", "compliance_check"]
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'drishti-demo-secret-key-2024'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('🔐 Login attempt for:', email)

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if this is a demo account
    const account = demoAccounts[email as keyof typeof demoAccounts]
    
    if (!account) {
      console.log('❌ Account not found:', email)
      return NextResponse.json(
        { success: false, error: 'Invalid credentials or account not approved' },
        { status: 401 }
      )
    }

    if (account.password !== password) {
      console.log('❌ Invalid password for:', email)
      return NextResponse.json(
        { success: false, error: 'Invalid credentials or account not approved' },
        { status: 401 }
      )
    }

    if (account.status !== 'active') {
      console.log('❌ Account not active:', email, 'Status:', account.status)
      return NextResponse.json(
        { success: false, error: 'Account is not approved. Please contact support.' },
        { status: 403 }
      )
    }

    // Generate JWT token
    const token = sign(
      { 
        id: account.id,
        email: account.email,
        role: account.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    console.log('✅ Login successful for:', email, 'Role:', account.role)

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: account.id,
        email: account.email,
        name: account.name,
        role: account.role,
        permissions: account.permissions
      }
    })

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}