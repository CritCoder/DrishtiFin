"use client"

import { useState, useEffect } from 'react'

interface DashboardStat {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: string
}

interface DashboardStatsData {
  activeTrainingPartners: { count: number, change: number }
  runningBatches: { count: number, change: number }
  successfulPlacements: { count: number, change: number }
  pendingPayments: { amount: number, change: number }
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/dashboard/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: DashboardStatsData = await response.json()
        
        const formattedStats: DashboardStat[] = [
          {
            title: "Active Training Partners",
            value: data.activeTrainingPartners.count.toLocaleString(),
            change: `${data.activeTrainingPartners.change > 0 ? '+' : ''}${data.activeTrainingPartners.change.toFixed(1)}%`,
            changeType: data.activeTrainingPartners.change > 0 ? "positive" : data.activeTrainingPartners.change < 0 ? "negative" : "neutral",
            icon: "Users",
          },
          {
            title: "Running Batches",
            value: data.runningBatches.count.toLocaleString(),
            change: `${data.runningBatches.change > 0 ? '+' : ''}${data.runningBatches.change.toFixed(1)}%`,
            changeType: data.runningBatches.change > 0 ? "positive" : data.runningBatches.change < 0 ? "negative" : "neutral",
            icon: "GraduationCap",
          },
          {
            title: "Successful Placements",
            value: data.successfulPlacements.count.toLocaleString(),
            change: `${data.successfulPlacements.change > 0 ? '+' : ''}${data.successfulPlacements.change.toFixed(1)}%`,
            changeType: data.successfulPlacements.change > 0 ? "positive" : data.successfulPlacements.change < 0 ? "negative" : "neutral",
            icon: "Briefcase",
          },
          {
            title: "Pending Payments",
            value: `₹${(data.pendingPayments.amount / 100000).toFixed(2)}L`,
            change: `${data.pendingPayments.change > 0 ? '+' : ''}${data.pendingPayments.change.toFixed(1)}%`,
            changeType: data.pendingPayments.change > 0 ? "negative" : data.pendingPayments.change < 0 ? "positive" : "neutral",
            icon: "CreditCard",
          },
        ]

        setStats(formattedStats)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch stats')
        
        // Fallback to demo data for development
        const fallbackStats: DashboardStat[] = [
          {
            title: "Active Training Partners",
            value: "1,247",
            change: "+12.5%",
            changeType: "positive",
            icon: "Users",
          },
          {
            title: "Running Batches", 
            value: "3,456",
            change: "+8.2%",
            changeType: "positive",
            icon: "GraduationCap",
          },
          {
            title: "Successful Placements",
            value: "28,934",
            change: "+15.3%",
            changeType: "positive",
            icon: "Briefcase",
          },
          {
            title: "Pending Payments",
            value: "₹45.2L",
            change: "-3.1%",
            changeType: "negative",
            icon: "CreditCard",
          },
        ]
        setStats(fallbackStats)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error, refetch: () => setLoading(true) }
}