import { NextRequest, NextResponse } from "next/server"
import { createHash, randomBytes, pbkdf2Sync } from "crypto"

// This would typically connect to your database
// For now, we'll simulate storing the user data
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      firstName,
      lastName,
      role,
      organizationName,
      password,
      phone,
    } = body

    // Validate required fields
    if (!email || !firstName || !role || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already completed profile
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: "Profile already completed" },
        { status: 400 }
      )
    }

    // Hash password using Node.js crypto
    const salt = randomBytes(32).toString('hex')
    const hashedPassword = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

    // Create user profile
    const userProfile = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      role,
      organizationName: organizationName || null,
      password: hashedPassword,
      phone: phone || null,
      profileCompleted: true,
      createdAt: new Date().toISOString(),
    }

    // Store user (in a real app, this would go to your database)
    users.push(userProfile)

    console.log("✅ Profile completed for:", email, "Role:", role)

    return NextResponse.json(
      {
        success: true,
        message: "Profile completed successfully",
        user: {
          id: userProfile.id,
          email: userProfile.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          role: userProfile.role,
          organizationName: userProfile.organizationName,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Profile completion error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}