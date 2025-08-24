import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Download, Eye, Building, DollarSign } from "lucide-react"
import Link from "next/link"

export default function PlacementsPage() {
  const placements = [
    {
      id: 1,
      student: "Rahul Kumar",
      company: "Tech Solutions Ltd",
      position: "Web Developer",
      salary: 450000,
      status: "Verified",
      date: "2024-01-15",
    },
    {
      id: 2,
      student: "Priya Sharma",
      company: "DataCorp Analytics",
      position: "Data Analyst",
      salary: 520000,
      status: "Pending",
      date: "2024-01-20",
    },
    {
      id: 3,
      student: "Amit Singh",
      company: "Mobile Innovations",
      position: "App Developer",
      salary: 480000,
      status: "Verified",
      date: "2024-01-18",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Link href="/placements/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Placement
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input placeholder="Search placements..." className="pl-10" />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {placements.map((placement) => (
              <div key={placement.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{placement.student}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {placement.company}
                    </div>
                    <span>{placement.position}</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />₹{placement.salary.toLocaleString()}
                    </div>
                    <span>{placement.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={placement.status === "Verified" ? "default" : "secondary"}>{placement.status}</Badge>
                  <Link href={`/placements/${placement.id}`}>
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
