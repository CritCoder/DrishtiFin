import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.batchName || !body.trainingPartner || !body.program) {
      return NextResponse.json(
        { error: 'Missing required fields: batchName, trainingPartner, program' },
        { status: 400 }
      )
    }

    // In a real application, this would save to a database
    console.log('Creating new batch:', body)
    
    // Mock successful creation
    const newBatch = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      status: 'draft'
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      batch: newBatch,
      message: 'Batch created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create batch API error:', error)
    return NextResponse.json(
      { error: 'Failed to create batch' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock batch data - replace with actual database query
    const batches = [
      {
        id: 1,
        name: "Web Development Batch 2024-A",
        tp: "TechSkills Training",
        status: "Active",
        students: 25,
        startDate: "2024-01-15",
        endDate: "2024-06-15",
      },
      {
        id: 2,
        name: "Data Analytics Batch 2024-B", 
        tp: "Digital Learning Solutions",
        status: "Completed",
        students: 30,
        startDate: "2023-12-01",
        endDate: "2024-05-01",
      },
      {
        id: 3,
        name: "Mobile App Development",
        tp: "Skill Development Corp",
        status: "Active",
        students: 22,
        startDate: "2024-02-01", 
        endDate: "2024-07-01",
      },
    ]

    return NextResponse.json({ batches })
  } catch (error) {
    console.error('Get batches API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch batches' },
      { status: 500 }
    )
  }
}