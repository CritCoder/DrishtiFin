"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle, Loader2, Search } from "lucide-react"

interface GSTVerificationData {
  gstin: string
  lgnm: string
  tradeNam: string
  sts: string
  ctb: string
  rgdt: string
  pradr: {
    addr: {
      bnm: string
      loc: string
      st: string
      bno: string
      dst: string
      pncd: string
      stcd: string
      flno: string
    }
  }
}

interface GSTVerificationInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string, verificationData?: GSTVerificationData) => void
  required?: boolean
  disabled?: boolean
  className?: string
  id?: string
}

export function GSTVerificationInput({
  label = "GST Number",
  placeholder = "Enter 15-digit GST number",
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  id = "gst-number"
}: GSTVerificationInputProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'unverified' | 'verified' | 'invalid' | 'error'>('unverified')
  const [verificationData, setVerificationData] = useState<GSTVerificationData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Reset verification status when value changes
  useEffect(() => {
    if (value !== verificationData?.gstin) {
      setVerificationStatus('unverified')
      setVerificationData(null)
      setError(null)
    }
  }, [value, verificationData?.gstin])

  const handleVerification = async () => {
    if (!value || value.length !== 15) {
      setError("Please enter a valid 15-digit GST number")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      const response = await fetch('/api/gst/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gstin: value }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        const apiData = result.data
        const mappedData: GSTVerificationData = {
          gstin: apiData.gstin,
          lgnm: apiData.lgnm,
          tradeNam: apiData.tradeNam,
          sts: apiData.sts,
          ctb: apiData.ctb,
          rgdt: apiData.rgdt,
          pradr: apiData.pradr
        }

        setVerificationData(mappedData)
        setVerificationStatus(mappedData.sts === "Active" ? 'verified' : 'invalid')
        
        // Pass verification data back to parent component
        onChange(value, mappedData)
      } else {
        setError(result.error || "GST verification failed")
        setVerificationStatus('error')
      }
    } catch (err) {
      console.error('GST verification error:', err)
      setError("Verification failed. Please check your connection and try again.")
      setVerificationStatus('error')
    } finally {
      setIsVerifying(false)
    }
  }

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return (
          <Badge variant="default" className="text-green-600 bg-green-50 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case 'invalid':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            {verificationData?.sts || 'Invalid'}
          </Badge>
        )
      case 'error':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {getStatusBadge()}
      </div>
      
      <div className="flex space-x-2">
        <Input
          id={id}
          placeholder={placeholder}
          maxLength={15}
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          disabled={disabled || isVerifying}
          className={
            verificationStatus === 'verified' ? 'border-green-300 focus:border-green-500' :
            verificationStatus === 'invalid' || verificationStatus === 'error' ? 'border-red-300 focus:border-red-500' :
            ''
          }
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleVerification}
          disabled={disabled || isVerifying || !value || value.length !== 15}
          className="shrink-0"
        >
          {isVerifying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {verificationData && verificationStatus !== 'error' && (
        <div className="p-3 bg-slate-50 rounded-lg border">
          <div className="text-sm">
            <p className="font-semibold text-slate-900">{verificationData.lgnm}</p>
            <p className="text-slate-600">{verificationData.ctb}</p>
            <p className="text-xs text-slate-500 mt-1">
              {verificationData.pradr.addr.dst}, {verificationData.pradr.addr.stcd}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}