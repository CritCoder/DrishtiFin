"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, CheckCircle, AlertCircle, Building, MapPin, Calendar, Loader2 } from "lucide-react"

interface GSTNAddress {
  bnm: string
  loc: string
  st: string
  bno: string
  dst: string
  pncd: string
  stcd: string
  flno: string
}

interface GSTNData {
  gstin: string
  lgnm: string
  tradeNam: string
  sts: string
  dty: string
  ctb: string
  rgdt: string
  cxdt: string
  lstupdt: string
  pradr: {
    addr: GSTNAddress
    ntr: string
  }
  adadr: Array<{
    addr: GSTNAddress
    ntr: string
  }>
  nba: string[]
  einvoiceStatus: string
}

interface VerificationResult {
  data: GSTNData
  status_cd: string
}

export default function GSTNVerificationPage() {
  const [gstin, setGstin] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [recentVerifications, setRecentVerifications] = useState([
    {
      id: 1,
      gstin: "27AAPFU0939F1ZV",
      companyName: "TechSkills Training Pvt Ltd",
      status: "Verified",
      date: "2024-01-20",
    },
    {
      id: 2,
      gstin: "29AABCU9603R1ZX",
      companyName: "Digital Learning Solutions",
      status: "Invalid",
      date: "2024-01-19",
    },
    { id: 3, gstin: "07AAGFF2194N1Z1", companyName: "Skill Development Corp", status: "Verified", date: "2024-01-18" },
  ])

  const handleVerification = async () => {
    if (!gstin || gstin.length !== 15) {
      setError("Please enter a valid 15-digit GSTIN")
      return
    }

    setIsVerifying(true)
    setError(null)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock response based on provided example
    let result: VerificationResult
    if (gstin === "27AARFR5953J1ZF") {
      result = {
        data: {
          gstin: "27AARFR5953J1ZF",
          lgnm: "RISEMETRIC TECHNOLOGY LLP",
          tradeNam: "RISEMETRIC TECHNOLOGY LLP",
          sts: "Cancelled",
          dty: "Regular",
          ctb: "Limited Liability Partnership",
          rgdt: "01/07/2017",
          cxdt: "17/03/2020",
          lstupdt: "17/03/2020",
          pradr: {
            addr: {
              bnm: "KAPIL BUILDING",
              loc: "MANVELPADA, VIRAR EAST",
              st: "RUSHIVIHAR COMPLEX",
              bno: "I-404",
              dst: "Thane",
              pncd: "401305",
              stcd: "Maharashtra",
              flno: "4TH FLOOR",
            },
            ntr: "Others",
          },
          adadr: [
            {
              addr: {
                bnm: "Crescent Business Park",
                loc: "sakinaka, andheri",
                st: "Andheri Kurla road",
                bno: "814",
                dst: "Mumbai",
                pncd: "400072",
                stcd: "Maharashtra",
                flno: "8th Floor",
              },
              ntr: "Others",
            },
          ],
          nba: ["Others"],
          einvoiceStatus: "No",
        },
        status_cd: "1",
      }
    } else {
      // Mock other GSTIN responses
      result = {
        data: {
          gstin: gstin,
          lgnm: "Sample Company Pvt Ltd",
          tradeNam: "Sample Company",
          sts: "Active",
          dty: "Regular",
          ctb: "Private Limited Company",
          rgdt: "01/04/2018",
          cxdt: "",
          lstupdt: "15/01/2024",
          pradr: {
            addr: {
              bnm: "Business Center",
              loc: "Commercial Area",
              st: "Main Road",
              bno: "123",
              dst: "Mumbai",
              pncd: "400001",
              stcd: "Maharashtra",
              flno: "Ground Floor",
            },
            ntr: "Others",
          },
          adadr: [],
          nba: ["Others"],
          einvoiceStatus: "Yes",
        },
        status_cd: "1",
      }
    }
    
    setVerificationResult(result)
    
    // Add to recent verifications (avoid duplicates)
    const newVerification = {
      id: Date.now(),
      gstin: result.data.gstin,
      companyName: result.data.lgnm,
      status: result.data.sts === "Active" ? "Verified" : result.data.sts,
      date: new Date().toISOString().split('T')[0]
    }
    
    setRecentVerifications(prev => {
      const filtered = prev.filter(v => v.gstin !== newVerification.gstin)
      return [newVerification, ...filtered].slice(0, 10) // Keep only last 10
    })

    setIsVerifying(false)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A"
    const [day, month, year] = dateStr.split("/")
    return `${day}/${month}/${year}`
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default"
      case "cancelled":
        return "destructive"
      case "suspended":
        return "secondary"
      default:
        return "outline"
    }
  }


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">GSTN Verification</h1>
          <p className="text-slate-600">Verify GST details for training partners and employers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Verify GSTIN</CardTitle>
            <CardDescription>Enter GSTIN to verify company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN Number</Label>
              <Input
                id="gstin"
                placeholder="Enter 15-digit GSTIN (e.g., 27AARFR5953J1ZF)"
                maxLength={15}
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                disabled={isVerifying}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
            <Button className="w-full" onClick={handleVerification} disabled={isVerifying || !gstin}>
              {isVerifying ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              {isVerifying ? "Verifying..." : "Verify GSTIN"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification Result</CardTitle>
            <CardDescription>Company details from GSTN database</CardDescription>
          </CardHeader>
          <CardContent>
            {verificationResult ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{verificationResult.data.lgnm}</h3>
                    <p className="text-sm text-slate-600">Trade Name: {verificationResult.data.tradeNam}</p>
                    <p className="text-xs text-slate-500 mt-1">GSTIN: {verificationResult.data.gstin}</p>
                  </div>
                  <Badge variant={getStatusVariant(verificationResult.data.sts)}>
                    {verificationResult.data.sts === "Active" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {verificationResult.data.sts}
                  </Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-slate-700">Business Type</p>
                    <p className="text-slate-600">{verificationResult.data.ctb}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Registration Type</p>
                    <p className="text-slate-600">{verificationResult.data.dty}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Registration Date</p>
                    <p className="text-slate-600">{formatDate(verificationResult.data.rgdt)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">E-Invoice Status</p>
                    <p className="text-slate-600">{verificationResult.data.einvoiceStatus}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-slate-700 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Principal Address
                  </h4>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>{verificationResult.data.pradr.addr.bnm}</p>
                    <p>
                      {verificationResult.data.pradr.addr.flno}, {verificationResult.data.pradr.addr.bno}
                    </p>
                    <p>
                      {verificationResult.data.pradr.addr.st}, {verificationResult.data.pradr.addr.loc}
                    </p>
                    <p>
                      {verificationResult.data.pradr.addr.dst}, {verificationResult.data.pradr.addr.stcd} -{" "}
                      {verificationResult.data.pradr.addr.pncd}
                    </p>
                  </div>
                </div>

                {verificationResult.data.adadr.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2 flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        Additional Address
                      </h4>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>{verificationResult.data.adadr[0].addr.bnm}</p>
                        <p>
                          {verificationResult.data.adadr[0].addr.flno}, {verificationResult.data.adadr[0].addr.bno}
                        </p>
                        <p>
                          {verificationResult.data.adadr[0].addr.st}, {verificationResult.data.adadr[0].addr.loc}
                        </p>
                        <p>
                          {verificationResult.data.adadr[0].addr.dst}, {verificationResult.data.adadr[0].addr.stcd} -{" "}
                          {verificationResult.data.adadr[0].addr.pncd}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  Last updated: {formatDate(verificationResult.data.lstupdt)}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Building className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p>Enter a GSTIN to see verification results</p>
                <p className="text-xs mt-2">Try: 27AARFR5953J1ZF for demo</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Verifications</CardTitle>
          <CardDescription>Previously verified GSTIN numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVerifications.map((verification) => (
              <div key={verification.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{verification.companyName}</h3>
                  <p className="text-sm text-slate-600 mt-1">GSTIN: {verification.gstin}</p>
                  <p className="text-xs text-slate-500 mt-1">Verified on {verification.date}</p>
                </div>
                <Badge variant={verification.status === "Verified" ? "default" : "destructive"}>
                  {verification.status === "Verified" ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {verification.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
