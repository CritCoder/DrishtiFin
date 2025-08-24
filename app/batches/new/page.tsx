import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function NewBatchPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Batch Details</CardTitle>
          <CardDescription>Create a new training batch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batchName">Batch Name</Label>
              <Input id="batchName" placeholder="e.g., Web Development Batch 2024-A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trainingPartner">Training Partner</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select training partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techskills">TechSkills Training</SelectItem>
                  <SelectItem value="digital">Digital Learning Solutions</SelectItem>
                  <SelectItem value="skilldev">Skill Development Corp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="program">Training Program</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webdev">Web Development</SelectItem>
                  <SelectItem value="data">Data Analytics</SelectItem>
                  <SelectItem value="mobile">Mobile App Development</SelectItem>
                  <SelectItem value="digital">Digital Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Batch Capacity</Label>
              <Input id="capacity" type="number" placeholder="e.g., 30" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor">Lead Instructor</Label>
              <Input id="instructor" placeholder="Enter instructor name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Training Location</Label>
              <Input id="location" placeholder="Enter training location" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Batch Description</Label>
            <Textarea id="description" placeholder="Enter batch description, objectives, and key details..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prerequisites">Prerequisites</Label>
            <Textarea id="prerequisites" placeholder="List any prerequisites or requirements for students..." rows={3} />
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/batches">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button>Create Batch</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}