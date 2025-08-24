import { NextRequest, NextResponse } from 'next/server'
import { gstAPI } from '@/lib/gst-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gstin } = body

    if (!gstin) {
      return NextResponse.json(
        { error: 'GSTIN is required' },
        { status: 400 }
      )
    }

    // Validate GSTIN format
    if (typeof gstin !== 'string' || gstin.length !== 15) {
      return NextResponse.json(
        { error: 'Invalid GSTIN format. Must be 15 characters long.' },
        { status: 400 }
      )
    }

    // Call the GST API service
    const result = await gstAPI.verifyGSTIN(gstin)

    if (result.success && result.data) {
      return NextResponse.json({
        success: true,
        data: {
          gstin: result.data.gstin,
          lgnm: result.data.lgnm,
          tradeNam: result.data.tradeNam,
          sts: result.data.sts,
          dty: result.data.dty,
          ctb: result.data.ctb,
          rgdt: result.data.rgdt,
          cxdt: result.data.cxdt,
          lstupdt: result.data.lstupdt,
          pradr: result.data.pradr,
          adadr: result.data.adadr,
          nba: result.data.nba,
          einvoiceStatus: result.data.einvoiceStatus,
          stjCd: result.data.stjCd,
          stj: result.data.stj,
          ctjCd: result.data.ctjCd,
          ctj: result.data.ctj
        },
        transaction_id: result.transaction_id,
        timestamp: Date.now()
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'GST verification failed',
          transaction_id: result.transaction_id 
        },
        { status: 422 }
      )
    }
  } catch (error) {
    console.error('GST API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during GST verification' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to verify GSTIN.' },
    { status: 405 }
  )
}