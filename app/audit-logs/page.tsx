import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, User, FileText } from "lucide-react"

export default function AuditLogsPage() {
  const logs = [
    {
      id: 1,
      action: "Training Partner Created",
      actor: "admin@drishti.gov.in",
      entity: "TechSkills Training Pvt Ltd",
      timestamp: "2024-01-20 14:30:25",
      ip: "192.168.1.100",
    },
    {
      id: 2,
      action: "Batch Approved",
      actor: "approver@drishti.gov.in",
      entity: "Web Development Batch 2024-C",
      timestamp: "2024-01-20 13:45:12",
      ip: "192.168.1.101",
    },
    {
      id: 3,
      action: "Payment Processed",
      actor: "finance@drishti.gov.in",
      entity: "Invoice #INV-2024-001",
      timestamp: "2024-01-20 12:15:08",
      ip: "192.168.1.102",
    },
    {
      id: 4,
      action: "Document Uploaded",
      actor: "tp@techskills.com",
      entity: "Registration Certificate",
      timestamp: "2024-01-20 11:20:45",
      ip: "203.0.113.45",
    },
    {
      id: 5,
      action: "Student Enrolled",
      actor: "tp@digitallearning.com",
      entity: "Student ID: STU-2024-0156",
      timestamp: "2024-01-20 10:35:22",
      ip: "203.0.113.67",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input placeholder="Search audit logs..." className="pl-10" />
            </div>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Actor Filter
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Entity Filter
            </Button>
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline">{log.action}</Badge>
                    <span className="text-sm text-slate-600">{log.entity}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {log.actor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {log.timestamp}
                    </div>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
