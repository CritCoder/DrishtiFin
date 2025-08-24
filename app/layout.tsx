import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth"
// import { NextAuthProvider } from "@/lib/next-auth"
import { ConditionalLayout } from "@/components/conditional-layout"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="font-sans">
        {/* <NextAuthProvider> */}
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </AuthProvider>
        {/* </NextAuthProvider> */}
      </body>
    </html>
  )
}
