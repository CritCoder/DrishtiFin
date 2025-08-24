import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Create new FormData for the external API
    const externalFormData = new FormData()
    externalFormData.append('file', file)

    // Make the request to the external API from the server with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25000) // 25 second timeout
    
    try {
      const response = await fetch('https://dms.mydukaan.io/api/media/upload/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'accept-language': 'en-US,en;q=0.9',
          'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0Njg0ODQ1LCJqdGkiOiJjM2NlZmQ0ODVmNDg0NjExYWI5NjgzZWVlOTEwNmI4OSIsInVzZXJfaWQiOjQwNzczNzAsImhhc19wYXNzd29yZF9zZXQiOnRydWUsImVtYWlsIjoic3V1bWl0QHJhbmt6LmlvIiwidXNlcl9hY3RpdmUiOnRydWUsInVzZXJfZW1haWxfdmVyaWZpZWQiOnRydWUsInVzZXJuYW1lIjoic3V1bWl0QHJhbmt6LmlvIiwiYnV5ZXJfaWQiOjQyMjczMjksInNlbGxlcl9pZCI6NDA4OTY4NywicGlsb3RfaWQiOjEwMTE4NzUsInZlbmRvcl9pZCI6bnVsbCwiYnV5ZXJfdXVpZCI6Ijc2NWZlNWUyLWY3NWYtNDEyYi1hZTY4LTk5YTAzYmQxMTZkNSIsInNlbGxlcl91dWlkIjoiZTM4NmY4MzgtY2FkYy00MzlmLThhMzUtNjllMDEwZjE0MGUxIiwicGlsb3RfdXVpZCI6Ijc4NzI3MmU5LWUwNDctNDRmZi1hODEyLWY1MmI0NTA2MDY4MSIsInZlbmRvcl91dWlkIjpudWxsLCJ2ZW5kb3JfZGF0ZSI6bnVsbCwibXVsdGlwbGVfc3RvcmVzIjpmYWxzZSwic3RvcmVfdXVpZHMiOlsiYWUwYjkzYWYtYWQ5NS00YjhjLTk5YzItMTIzZjgxMTNhNmUxIl0sInN0b3JlX2lkcyI6WzgwOTcxNTE0XSwic3RhZmZfaWQiOm51bGwsInN0b3JlX3R5cGUiOjAsImN1c3RvbV9kYXRhIjp7fX0.d0t6UrGVcCNsvbO99oGScK5OkejRZ-8kRUSPpILYQvY',
          'origin': 'https://web.mydukaan.io',
          'referer': 'https://web.mydukaan.io/',
          'sec-ch-ua': '"Chromium";v="139", "Not;A=Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
          'x-mode': 'seller-web',
        },
        body: externalFormData,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('External API error:', response.status, errorText)
        return NextResponse.json(
          { error: `Upload failed: ${response.status} ${response.statusText}` },
          { status: response.status }
        )
      }

      const result = await response.json()
      return NextResponse.json(result)
      
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error('External API fetch error:', fetchError)
      throw fetchError
    }

  } catch (error) {
    console.error('Upload proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error during upload' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Upload endpoint is available' })
}