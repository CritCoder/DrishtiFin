import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentsPage() {
  const milestones = [
    {
      id: 1,
      name: "Student Enrollment",
      description: "Payment for successful student enrollment",
      amount: 5000,
      status: "Active",
      completedCount: 245,
    },
    {
      id: 2,
      name: "Course Completion",
      description: "Payment for course completion with 80% attendance",
      amount: 15000,
      status: "Active",
      completedCount: 189,
    },
    {
      id: 3,
      name: "Placement Verification",
      description: "Payment for verified employment placement",
      amount: 25000,
      status: "Active",
      completedCount: 156,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payment Milestones</h1>
          <p className="text-slate-600">Monitor milestone definitions and payment status</p>
        </div>
        <div className="flex gap-3">
          <Link href="/payments/invoices">
            <Button variant="outline" size="sm" className="font-open-sans bg-transparent">
              View Invoices
            </Button>
          </Link>
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white font-open-sans">
            <TrendingUp className="h-4 w-4 mr-2" />
            Evaluate Milestones
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">590</div>
            <p className="text-xs text-muted-foreground">Completed this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,24,50,000</div>
            <p className="text-xs text-muted-foreground">Disbursed this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Milestone Definitions</CardTitle>
          <CardDescription>Configure payment milestones and track completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{milestone.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{milestone.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span>Amount: ₹{milestone.amount.toLocaleString()}</span>
                    <span>Completed: {milestone.completedCount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="default">{milestone.status}</Badge>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
