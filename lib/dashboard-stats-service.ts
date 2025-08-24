// Import seed data directly to avoid Deno dependencies
const DEMO_TRAINING_PARTNERS = [
  {
    id: "tp-001",
    name: "TechSkills Academy",
    status: "active",
  },
  {
    id: "tp-002", 
    name: "Digital Learning Solutions",
    status: "active",
  }
]

const DEMO_BATCHES = [
  {
    id: "batch-001",
    name: "BBSR-TECH-001",
    status: "ongoing",
  },
  {
    id: "batch-002",
    name: "CTC-DATA-002", 
    status: "ongoing",
  }
]

const DEMO_PLACEMENTS = [
  {
    id: "placement-001",
    status: "completed",
  },
  {
    id: "placement-002",
    status: "completed", 
  },
  {
    id: "placement-003",
    status: "completed",
  }
]

const DEMO_PAYMENTS = [
  {
    id: "payment-001",
    amount: 125000,
    status: "pending",
  },
  {
    id: "payment-002", 
    amount: 87500,
    status: "pending",
  },
  {
    id: "payment-003",
    amount: 150000,
    status: "paid",
  }
]

interface DashboardStatsData {
  activeTrainingPartners: { count: number; change: number }
  runningBatches: { count: number; change: number }
  successfulPlacements: { count: number; change: number }
  pendingPayments: { amount: number; change: number }
}

export class DashboardStatsService {
  
  static async getStats(): Promise<DashboardStatsData> {
    try {
      // In a real application, you would fetch from your actual database
      // For now, we'll calculate from the seed data which represents real system data
      
      // Count active training partners
      const activeTrainingPartners = DEMO_TRAINING_PARTNERS.filter(tp => tp.status === 'active')
      
      // Count running batches
      const runningBatches = DEMO_BATCHES.filter(batch => batch.status === 'ongoing')
      
      // Count successful placements (completed status)
      const successfulPlacements = DEMO_PLACEMENTS.filter(placement => placement.status === 'completed')
      
      // Calculate pending payments total (unpaid invoices)
      const pendingPayments = DEMO_PAYMENTS
        .filter(payment => payment.status === 'pending')
        .reduce((total, payment) => total + payment.amount, 0)
      
      // Calculate growth percentages (mock calculation for demo)
      // In real system, you'd compare with previous period data
      const currentMonth = new Date().getMonth()
      const growthVariation = Math.sin(currentMonth) * 5 // Simulate seasonal variation
      
      return {
        activeTrainingPartners: {
          count: activeTrainingPartners.length,
          change: parseFloat((11.5 + growthVariation).toFixed(1))
        },
        runningBatches: {
          count: runningBatches.length,
          change: parseFloat((6.7 + growthVariation * 0.8).toFixed(1))
        },
        successfulPlacements: {
          count: successfulPlacements.length,
          change: parseFloat((13.3 + growthVariation * 1.2).toFixed(1))
        },
        pendingPayments: {
          amount: pendingPayments,
          change: parseFloat((-2.6 + growthVariation * -0.5).toFixed(1))
        }
      }
      
    } catch (error) {
      console.error('Error calculating dashboard stats:', error)
      throw new Error('Failed to calculate dashboard statistics')
    }
  }
  
  // Helper method for getting detailed breakdown
  static async getDetailedStats() {
    const activePartners = DEMO_TRAINING_PARTNERS.filter(tp => tp.status === 'active')
    const runningBatches = DEMO_BATCHES.filter(batch => batch.status === 'ongoing')
    const completedPlacements = DEMO_PLACEMENTS.filter(placement => placement.status === 'completed')
    
    return {
      trainingPartners: {
        total: DEMO_TRAINING_PARTNERS.length,
        active: activePartners.length,
        inactive: DEMO_TRAINING_PARTNERS.length - activePartners.length
      },
      batches: {
        total: DEMO_BATCHES.length,
        running: runningBatches.length,
        completed: DEMO_BATCHES.filter(b => b.status === 'completed').length,
        planned: DEMO_BATCHES.filter(b => b.status === 'planned').length
      },
      students: {
        total: 156, // Mock count for demo
        active: 134,
        totalEnrolled: 48
      },
      placements: {
        total: DEMO_PLACEMENTS.length,
        successful: completedPlacements.length,
        pending: DEMO_PLACEMENTS.filter(p => p.status === 'offered' || p.status === 'accepted').length
      },
      payments: {
        totalPending: DEMO_PAYMENTS
          .filter(p => p.status === 'pending')
          .reduce((sum, p) => sum + p.amount, 0),
        totalPaid: DEMO_PAYMENTS
          .filter(p => p.status === 'paid')
          .reduce((sum, p) => sum + p.amount, 0),
        totalOverdue: DEMO_PAYMENTS
          .filter(p => p.status === 'overdue')
          .reduce((sum, p) => sum + p.amount, 0)
      }
    }
  }
}