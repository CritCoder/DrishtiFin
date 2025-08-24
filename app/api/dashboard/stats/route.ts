import { NextRequest, NextResponse } from 'next/server'
import { DashboardStatsService } from '@/lib/dashboard-stats-service'

export async function GET(request: NextRequest) {
  try {
    // Fetch real statistics from the system data
    const stats = await DashboardStatsService.getStats()
    
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