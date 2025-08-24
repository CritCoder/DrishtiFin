import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll return realistic dynamic data
    
    const now = new Date()
    const baseValues = {
      activeTrainingPartners: 1247,
      runningBatches: 3456, 
      successfulPlacements: 28934,
      pendingPayments: 4520000 // in paisa (45.2L)
    }

    // Add some realistic variation based on time
    const timeVariation = Math.sin(now.getTime() / (1000 * 60 * 60 * 24)) * 0.1
    
    const stats = {
      activeTrainingPartners: {
        count: Math.floor(baseValues.activeTrainingPartners * (1 + timeVariation)),
        change: 12.5 + (timeVariation * 10)
      },
      runningBatches: {
        count: Math.floor(baseValues.runningBatches * (1 + timeVariation * 0.5)),
        change: 8.2 + (timeVariation * 15)
      },
      successfulPlacements: {
        count: Math.floor(baseValues.successfulPlacements * (1 + timeVariation * 0.3)),
        change: 15.3 + (timeVariation * 20)
      },
      pendingPayments: {
        amount: Math.floor(baseValues.pendingPayments * (1 + timeVariation * 0.2)),
        change: -3.1 + (timeVariation * -5)
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Dashboard stats API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}