interface GSTAddress {
  bnm: string // Building Name
  loc: string // Location
  st: string  // Street
  bno: string // Building Number
  dst: string // District
  pncd: string // Pin Code
  stcd: string // State Code
  flno: string // Floor Number
  landMark?: string
  locality?: string
  lt?: string
  lg?: string
  geocodelvl?: string
}

interface GSTData {
  stjCd: string // State Jurisdiction Code
  lgnm: string  // Legal Name
  stj: string   // State Jurisdiction
  dty: string   // Dealer Type
  adadr: Array<{
    addr: GSTAddress
    ntr: string
  }>
  cxdt: string  // Cancellation Date
  nba: string[] // Nature of Business Activities
  gstin: string // GSTIN
  lstupdt: string // Last Updated
  rgdt: string  // Registration Date
  ctb: string   // Constitution of Business
  pradr: {      // Principal Address
    addr: GSTAddress
    ntr: string
  }
  tradeNam: string // Trade Name
  sts: string   // Status (Active/Cancelled/Suspended)
  ctjCd: string // Central Jurisdiction Code
  ctj: string   // Central Jurisdiction
  einvoiceStatus: string // E-Invoice Status
}

interface GSTAPIResponse {
  code: number
  timestamp: number
  data: {
    data: GSTData
    status_cd: string
  }
  transaction_id: string
}

interface GSTVerificationResult {
  success: boolean
  data?: GSTData
  error?: string
  transaction_id?: string
}

class GSTAPIService {
  private baseUrl = 'https://api.sandbox.co.in/gst/compliance/public/gstin/search'
  private authToken: string
  private apiKey: string

  constructor() {
    // These should come from environment variables
    this.authToken = process.env.SANDBOX_GST_AUTH_TOKEN || ''
    this.apiKey = process.env.SANDBOX_GST_API_KEY || 'key_live_5f19ac36580846aaa54605444ad0eed1'
    
    if (!this.authToken) {
      console.warn('GST API: Missing SANDBOX_GST_AUTH_TOKEN environment variable')
    }
  }

  async verifyGSTIN(gstin: string): Promise<GSTVerificationResult> {
    if (!gstin || gstin.length !== 15) {
      return {
        success: false,
        error: 'Invalid GSTIN format. GSTIN must be 15 characters long.'
      }
    }

    // Validate GSTIN format
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    if (!gstinRegex.test(gstin)) {
      return {
        success: false,
        error: 'Invalid GSTIN format.'
      }
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'authorization': this.authToken,
          'x-api-key': this.apiKey,
          'x-accept-cache': 'true',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gstin })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: GSTAPIResponse = await response.json()

      if (result.code === 200 && result.data.status_cd === "1") {
        return {
          success: true,
          data: result.data.data,
          transaction_id: result.transaction_id
        }
      } else {
        return {
          success: false,
          error: 'GSTIN verification failed or GSTIN not found.',
          transaction_id: result.transaction_id
        }
      }
    } catch (error) {
      console.error('GST API Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'GST verification service unavailable'
      }
    }
  }

  // Helper method to format dates from DD/MM/YYYY to readable format
  formatDate(dateStr: string): string {
    if (!dateStr) return 'N/A'
    const [day, month, year] = dateStr.split('/')
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    return `${day} ${months[parseInt(month) - 1]} ${year}`
  }

  // Helper method to get status color/variant
  getStatusInfo(status: string): { variant: 'default' | 'destructive' | 'secondary', color: string } {
    switch (status.toLowerCase()) {
      case 'active':
        return { variant: 'default', color: 'green' }
      case 'cancelled':
        return { variant: 'destructive', color: 'red' }
      case 'suspended':
        return { variant: 'secondary', color: 'yellow' }
      default:
        return { variant: 'secondary', color: 'gray' }
    }
  }

  // Helper method to format full address
  formatAddress(addr: GSTAddress): string {
    const parts = [
      addr.bnm,
      addr.flno && addr.bno ? `${addr.flno}, ${addr.bno}` : (addr.flno || addr.bno),
      addr.st,
      addr.loc,
      `${addr.dst}, ${addr.stcd}`,
      addr.pncd
    ].filter(Boolean)
    
    return parts.join(', ')
  }
}

// Export singleton instance
export const gstAPI = new GSTAPIService()
export type { GSTData, GSTVerificationResult, GSTAddress }