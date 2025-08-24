import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function ApprovalsPage() {
  const approvals = [
    {
      id: 1,
      type: "Training Partner Registration",
      entity: "TechSkills Training Pvt Ltd",
      status: "Pending",
      priority: "High",
      submittedDate: "2024-01-20",
      submittedBy: "System Admin",
    },
    {
      id: 2,
      type: "Batch Creation",
      entity: "Web Development Batch 2024-C",
      status: "Approved",
      priority: "Medium",
      submittedDate: "2024-01-18",
      submittedBy: "TP Manager",
    },
    {
      id: 3,
      type: "Payment Milestone",
      entity: "Placement Verification - Batch 2024-A",
      status: "Rejected",
      priority: "High",
      submittedDate: "2024-01-15",
      submittedBy: "Finance Team",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Approval Inbox</h1>
          <p className="text-slate-600">Review and process pending approvals</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Bulk Approve
          </Button>
          <Button variant="outline" size="sm">
            <XCircle className="h-4 w-4 mr-2" />
            Bulk Reject
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input placeholder="Search approvals..." className="pl-10" />
            </div>
            <Button variant="outline">Status Filter</Button>
            <Button variant="outline">Date Range</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvals.map((approval) => (
              <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{approval.type}</h3>
                    <Badge variant={approval.priority === "High" ? "destructive" : "secondary"} className="text-xs">
                      {approval.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{approval.entity}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {approval.submittedDate}
                    </div>
                    <span>by {approval.submittedBy}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      approval.status === "Pending"
                        ? "secondary"
                        : approval.status === "Approved"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {approval.status}
                  </Badge>
                  <Link href={`/approvals/${approval.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
