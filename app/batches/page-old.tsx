import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Users, Calendar } from "lucide-react"
import Link from "next/link"

export default function BatchesPage() {
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

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input placeholder="Search batches..." className="pl-10" />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{batch.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{batch.tp}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {batch.students} students
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {batch.startDate} - {batch.endDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={batch.status === "Active" ? "default" : "secondary"}>{batch.status}</Badge>
                  <Link href={`/batches/${batch.id}`}>
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
