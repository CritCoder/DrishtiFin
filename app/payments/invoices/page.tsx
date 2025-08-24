"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  Download, 
  Eye, 
  Calendar, 
  DollarSign, 
  FileText,
  Filter,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  // API Base URL
  const API_BASE_URL = "http://localhost:8001"

  // Fetch invoices from API
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_BASE_URL}/api/payments`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer demo-token', // Using demo token for now
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const result = await response.json()
          const paymentsAsInvoices = result.data.map((payment: any) => ({
            id: payment.id,
            trainingPartner: payment.trainingPartnerId, 
            batch: payment.batchId,
            amount: payment.amount,
            status: payment.status,
            dueDate: payment.dueDate?.split('T')[0] || new Date().toISOString().split('T')[0],
            createdDate: payment.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
            milestone: payment.milestoneType === 'batch_start' ? 'Batch Start' : 
                     payment.milestoneType === 'mid_training' ? 'Mid Training' :
                     payment.milestoneType === 'placement' ? 'Placement' : payment.milestoneType,
            students: 25 // Default for demo
          }))
          setInvoices(paymentsAsInvoices)
        } else {
          // Fallback to mock data if API fails
          setInvoices([
        {
          id: "INV-2024-001",
          trainingPartner: "TechSkills Training Center",
          batch: "Data Entry Operator - 2024-01",
          amount: 250000,
          status: "Paid",
          dueDate: "2024-01-31",
          createdDate: "2024-01-15",
          milestone: "First Assessment",
          students: 25
        },
        {
          id: "INV-2024-002", 
          trainingPartner: "SkillDev Institute",
          batch: "Computer Hardware - 2024-02",
          amount: 180000,
          status: "Pending",
          dueDate: "2024-02-28",
          createdDate: "2024-02-10",
          milestone: "Enrollment Completion",
          students: 18
        },
        {
          id: "INV-2024-003",
          trainingPartner: "TechSkills Training Center", 
          batch: "Digital Marketing - 2024-03",
          amount: 320000,
          status: "Overdue",
          dueDate: "2024-01-20",
          createdDate: "2024-01-05",
          milestone: "Final Assessment",
          students: 32
        },
        {
          id: "INV-2024-004",
          trainingPartner: "ProSkills Academy",
          batch: "Web Development - 2024-04",
          amount: 450000,
          status: "Draft",
          dueDate: "2024-03-15",
          createdDate: "2024-02-28",
          milestone: "Mid-term Assessment",
          students: 30
        }
          ])
        }
      } catch (error) {
        console.error('Error fetching invoices:', error)
        toast.error('Failed to load invoices')
        // Fallback to mock data on error
        setInvoices([
          {
            id: "INV-2024-001",
            trainingPartner: "TechSkills Training Center",
            batch: "Data Entry Operator - 2024-01",
            amount: 250000,
            status: "Paid",
            dueDate: "2024-01-31",
            createdDate: "2024-01-15",
            milestone: "First Assessment",
            students: 25
          }
        ])
      }
      setLoading(false)
    }

    fetchInvoices()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200'
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleCreateInvoice = async () => {
    setCreating(true)
    try {
      // First try to authenticate and get a token
      const authResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: "super.admin@drishti.gov.in",
          password: "SuperAdmin@123"
        })
      })

      let authToken = null
      if (authResponse.ok) {
        const authResult = await authResponse.json()
        authToken = authResult.token
      }

      if (!authToken) {
        // Fallback to demo invoice creation if auth fails
        const demoInvoice = {
          id: `INV-${Date.now()}`,
          trainingPartner: "Demo Training Center",
          batch: "Sample Batch - " + new Date().getFullYear(),
          amount: 150000,
          status: "pending",
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdDate: new Date().toISOString().split('T')[0],
          milestone: "Batch Start",
          students: 25
        }
        
        setInvoices(prev => [demoInvoice, ...prev])
        toast.success('Demo invoice created successfully!')
        setCreating(false)
        return
      }

      // Try to create invoice via API
      const newInvoiceData = {
        trainingPartnerId: "tp-demo-001",
        batchId: "batch-demo-001",
        milestoneType: "batch_start",
        amount: 150000,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        documents: []
      }

      const response = await fetch(`${API_BASE_URL}/api/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvoiceData)
      })

      if (response.ok) {
        const result = await response.json()
        toast.success('Invoice created successfully!')
        
        const newInvoice = {
          id: result.data.id,
          trainingPartner: result.data.trainingPartnerId,
          batch: result.data.batchId,
          amount: result.data.amount,
          status: result.data.status,
          dueDate: result.data.dueDate?.split('T')[0],
          createdDate: new Date().toISOString().split('T')[0],
          milestone: result.data.milestoneType === 'batch_start' ? 'Batch Start' : result.data.milestoneType,
          students: 25
        }
        
        setInvoices(prev => [newInvoice, ...prev])
      } else {
        // Fallback if API creation fails
        const demoInvoice = {
          id: `INV-${Date.now()}`,
          trainingPartner: "Demo Training Center",
          batch: "Sample Batch - " + new Date().getFullYear(),
          amount: 150000,
          status: "pending",
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdDate: new Date().toISOString().split('T')[0],
          milestone: "Batch Start",
          students: 25
        }
        
        setInvoices(prev => [demoInvoice, ...prev])
        toast.success('Demo invoice created successfully!')
      }
    } catch (error) {
      console.error('Error creating invoice:', error)
      // Always provide fallback demo creation
      const demoInvoice = {
        id: `INV-${Date.now()}`,
        trainingPartner: "Demo Training Center",
        batch: "Sample Batch - " + new Date().getFullYear(),
        amount: 150000,
        status: "pending",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdDate: new Date().toISOString().split('T')[0],
        milestone: "Batch Start",
        students: 25
      }
      
      setInvoices(prev => [demoInvoice, ...prev])
      toast.success('Demo invoice created successfully!')
    }
    setCreating(false)
  }

  const handleExportCSV = () => {
    const csvData = [
      ['Invoice ID', 'Training Partner', 'Batch', 'Amount (INR)', 'Status', 'Due Date', 'Milestone', 'Students'],
      ...invoices.map((inv: any) => [
        inv.id,
        inv.trainingPartner,
        inv.batch,
        inv.amount.toString(),
        inv.status,
        inv.dueDate,
        inv.milestone,
        inv.students.toString()
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `invoices_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Invoices</h1>
          <p className="text-gray-600">Manage training partner payment invoices and milestones</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm" onClick={handleCreateInvoice} disabled={creating}>
            <Plus className="h-4 w-4 mr-2" />
            {creating ? 'Creating...' : 'New Invoice'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{invoices.reduce((sum: number, inv: any) => sum + inv.amount, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {invoices.filter((inv: any) => inv.status === 'Paid').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {invoices.filter((inv: any) => inv.status === 'Overdue').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search invoices..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice: any) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Training Partner:</span><br />
                      {invoice.trainingPartner}
                    </div>
                    <div>
                      <span className="font-medium">Batch:</span><br />
                      {invoice.batch}
                    </div>
                    <div>
                      <span className="font-medium">Milestone:</span><br />
                      {invoice.milestone}
                    </div>
                    <div>
                      <span className="font-medium">Students:</span><br />
                      {invoice.students} students
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ₹{invoice.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {invoice.dueDate}
                    </div>
                    <span>Created: {invoice.createdDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/payments/invoices/${invoice.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
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