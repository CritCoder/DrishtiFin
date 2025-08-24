import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.registration || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, registration, email' },
        { status: 400 }
      )
    }

    // In a real application, this would save to a database
    console.log('Creating new training partner:', body)
    
    // Mock successful creation
    const newTP = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      status: 'pending',
      trustScore: 0,
      centres: 0,
      students: 0
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      trainingPartner: newTP,
      message: 'Training Partner created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create TP API error:', error)
    return NextResponse.json(
      { error: 'Failed to create training partner' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock training partner data - replace with actual database query
    const trainingPartners = [
      { 
        id: 1, 
        name: "TechSkills Training Pvt Ltd", 
        status: "Active", 
        trustScore: 85, 
        centres: 12, 
        students: 450 
      },
      { 
        id: 2, 
        name: "Digital Learning Solutions", 
        status: "Pending", 
        trustScore: 72, 
        centres: 8, 
        students: 320 
      },
      { 
        id: 3, 
        name: "Skill Development Corp", 
        status: "Active", 
        trustScore: 91, 
        centres: 15, 
        students: 680 
      },
    ]

    return NextResponse.json({ trainingPartners })
  } catch (error) {
    console.error('Get TPs API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch training partners' },
      { status: 500 }
    )
  }
}