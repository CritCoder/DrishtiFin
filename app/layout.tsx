import type React from "react"
import type { Metadata } from "next"
import { Geist, Instrument_Sans } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth"
import { NextAuthProvider } from "@/lib/next-auth"
import { ConditionalLayout } from "@/components/conditional-layout"
import { Toaster } from "@/components/ui/toaster"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "DRISHTI - Training Partner Management System",
  description: "Government training partner management and analytics platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrumentSans.variable} antialiased`}>
      <body className="font-sans">
        <NextAuthProvider>
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster />
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
