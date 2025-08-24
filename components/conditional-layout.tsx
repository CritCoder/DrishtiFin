"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  const isAuthRoute = pathname === "/login" || pathname === "/register"
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/how-it-works") ||
    pathname.startsWith("/programs") ||
    pathname.startsWith("/tp/register") ||
    pathname.startsWith("/employers") ||
    pathname.startsWith("/news") ||
    pathname.startsWith("/transparency") ||
    pathname.startsWith("/help") ||
    pathname.startsWith("/status") ||
    pathname.startsWith("/developers") ||
    pathname.startsWith("/legal") ||
    pathname.startsWith("/accessibility") ||
    pathname.startsWith("/rti") ||
    pathname.startsWith("/sitemap")

  const isDashboardRoute = pathname.startsWith("/app")

  if (isAuthRoute || isPublicRoute) {
    return <>{children}</>
  }

  if (isDashboardRoute) {
    return <DashboardLayout>{children}</DashboardLayout>
  }

  return <>{children}</>
}
