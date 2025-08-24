"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DollarSign, TrendingUp, Clock, CheckCircle, Settings } from "lucide-react"
import Link from "next/link"

interface Milestone {
  id: number
  name: string
  description: string
  amount: number
  status: string
  completedCount: number
}

export default function PaymentsPage() {
  const { toast } = useToast()
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    status: 'Active'
  })
  const [milestones, setMilestones] = useState<Milestone[]>([
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
  ])

  const handleConfigure = (milestone: Milestone) => {
    setSelectedMilestone(milestone)
    setFormData({
      name: milestone.name,
      description: milestone.description,
      amount: milestone.amount.toString(),
      status: milestone.status
    })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.amount.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields."
      })
      return
    }

    if (selectedMilestone) {
      // Update existing milestone
      setMilestones(prev => prev.map(m => 
        m.id === selectedMilestone.id 
          ? { ...m, 
              name: formData.name,
              description: formData.description,
              amount: parseInt(formData.amount),
              status: formData.status
            }
          : m
      ))
      toast({
        title: "Milestone Updated",
        description: `${formData.name} has been updated successfully.`
      })
    } else {
      // Create new milestone
      const newMilestone: Milestone = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        amount: parseInt(formData.amount),
        status: formData.status,
        completedCount: 0
      }
      setMilestones(prev => [...prev, newMilestone])
      toast({
        title: "Milestone Created",
        description: `${formData.name} has been created successfully.`
      })
    }
    
    setIsDialogOpen(false)
    setSelectedMilestone(null)
    setFormData({ name: '', description: '', amount: '', status: 'Active' })
  }

  const handleCreate = () => {
    setSelectedMilestone(null)
    setFormData({ name: '', description: '', amount: '', status: 'Active' })
    setIsDialogOpen(true)
  }

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
          <Button size="sm" onClick={handleCreate} className="bg-slate-900 hover:bg-slate-800 text-white font-open-sans">
            <TrendingUp className="h-4 w-4 mr-2" />
            Create Milestone
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
                  <Button variant="ghost" size="sm" onClick={() => handleConfigure(milestone)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedMilestone ? 'Configure Milestone' : 'Create New Milestone'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
                placeholder="Milestone name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Milestone description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₹) *
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="col-span-3"
                placeholder="Payment amount"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedMilestone ? 'Update' : 'Create'} Milestone
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
