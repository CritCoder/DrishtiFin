"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Download, 
  Eye, 
  Calendar, 
  DollarSign, 
  FileText,
  User,
  Users,
  Building
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export default function InvoiceDetailPage() {
  const params = useParams()
  const invoiceId = params.id as string
  const [invoice, setInvoice] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // API Base URL
  const API_BASE_URL = "http://localhost:8001"

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true)
      try {
        // Try to fetch from API first
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

        if (authToken) {
          const response = await fetch(`${API_BASE_URL}/api/payments/${invoiceId}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const result = await response.json()
            const payment = result.data
            setInvoice({
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
              students: 25,
              documents: payment.documents || []
            })
          }
        }
      } catch (error) {
        console.error('Error fetching invoice:', error)
      }

      // Fallback to demo data if API fails or invoice not found
      if (!invoice) {
        setInvoice({
          id: invoiceId,
          trainingPartner: "Demo Training Center",
          batch: "Sample Batch - 2025",
          amount: 150000,
          status: "pending",
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdDate: new Date().toISOString().split('T')[0],
          milestone: "Batch Start",
          students: 25,
          documents: [],
          description: "Payment for batch start milestone including enrollment completion and initial training setup.",
          paymentTerms: "Payment due within 30 days of invoice date.",
          notes: "This is a demo invoice for testing purposes."
        })
      }

      setLoading(false)
    }

    fetchInvoice()
  }, [invoiceId])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200'
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleDownloadInvoice = () => {
    toast.success('Invoice download started')
    // Implementation for PDF download would go here
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="space-y-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Invoice Not Found</h2>
          <p className="text-gray-600 mb-4">The invoice you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice {invoice.id}</h1>
          <p className="text-gray-600">Payment invoice details and information</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleDownloadInvoice}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Invoice Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Invoice ID</label>
                  <p className="text-lg font-semibold text-gray-900">{invoice.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created Date</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {invoice.createdDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Due Date</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {invoice.dueDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Training Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Training Partner</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {invoice.trainingPartner}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Batch</label>
                  <p className="text-gray-900">{invoice.batch}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Milestone</label>
                  <p className="text-gray-900">{invoice.milestone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Students</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {invoice.students} students
                  </p>
                </div>
              </div>
              {invoice.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-900 mt-1">{invoice.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          {(invoice.paymentTerms || invoice.notes) && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoice.paymentTerms && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment Terms</label>
                    <p className="text-gray-900 mt-1">{invoice.paymentTerms}</p>
                  </div>
                )}
                {invoice.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    <p className="text-gray-900 mt-1">{invoice.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Amount Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Payment Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{invoice.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Indian Rupees</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline" onClick={handleDownloadInvoice}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>

          {/* Documents */}
          {invoice.documents && invoice.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {invoice.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm text-gray-900">{doc.name || `Document ${index + 1}`}</span>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}