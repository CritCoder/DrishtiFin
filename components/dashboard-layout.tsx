"use client"

import type React from "react"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { ProtectedRoute } from "@/components/auth/protected-route"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  const getPageInfo = (path: string) => {
    if (path === "/")
      return {
        activeItem: "analytics_overview",
        title: "Analytics Overview",
        subtitle: "Monitor key performance indicators and system health",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }

    // Training Partners section
    if (path === "/tps")
      return {
        activeItem: "tp_list",
        title: "Training Partners",
        subtitle: "Manage and monitor training partner organizations",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path === "/tps/new")
      return {
        activeItem: "tp_list",
        title: "New Training Partner",
        subtitle: "Create a new training partner record",
        showBackButton: true,
        backUrl: "/tps",
        backLabel: "Back to Training Partners",
      }
    if (path.startsWith("/tps/") && path !== "/tps/new")
      return {
        activeItem: "tp_list",
        title: "Training Partner Details",
        subtitle: "View and manage training partner information",
        showBackButton: true,
        backUrl: "/tps",
        backLabel: "Back to Training Partners",
      }

    // Batches section
    if (path === "/batches")
      return {
        activeItem: "batches_list",
        title: "Batches & Students",
        subtitle: "Track training batches and student progress",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path === "/batches/new")
      return {
        activeItem: "batches_list",
        title: "New Batch",
        subtitle: "Create a new training batch",
        showBackButton: true,
        backUrl: "/batches",
        backLabel: "Back to Batches",
      }
    if (path.startsWith("/batches/") && path !== "/batches/new")
      return {
        activeItem: "batches_list",
        title: "Batch Details",
        subtitle: "View and manage batch information",
        showBackButton: true,
        backUrl: "/batches",
        backLabel: "Back to Batches",
      }

    // Placements section
    if (path === "/placements")
      return {
        activeItem: "placements_list",
        title: "Placements",
        subtitle: "Monitor job placements and verification",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path === "/placements/new")
      return {
        activeItem: "placements_list",
        title: "New Placement",
        subtitle: "Record a new job placement",
        showBackButton: true,
        backUrl: "/placements",
        backLabel: "Back to Placements",
      }
    if (path.startsWith("/placements/") && path !== "/placements/new")
      return {
        activeItem: "placements_list",
        title: "Placement Details",
        subtitle: "View and manage placement information",
        showBackButton: true,
        backUrl: "/placements",
        backLabel: "Back to Placements",
      }

    // Other sections with consistent pattern
    if (path.startsWith("/approvals"))
      return {
        activeItem: "approvals_list",
        title: "Approvals",
        subtitle: "Review and process pending approvals",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path.startsWith("/payments"))
      return {
        activeItem: "payments_milestones",
        title: "Payments",
        subtitle: "Manage milestone payments and invoicing",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path.startsWith("/reports"))
      return {
        activeItem: "reports_export",
        title: "Reports & Analytics",
        subtitle: "Generate comprehensive system reports",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path.startsWith("/files"))
      return {
        activeItem: "files_upload",
        title: "File Management",
        subtitle: "Upload and manage documents",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path.startsWith("/integrations"))
      return {
        activeItem: "integrations_gstn_verify",
        title: "Integrations",
        subtitle: "Manage external system integrations",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path.startsWith("/audit"))
      return {
        activeItem: "audit_logs",
        title: "Audit Logs",
        subtitle: "View system activity and changes",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }
    if (path.startsWith("/settings"))
      return {
        activeItem: "settings_general",
        title: "Settings",
        subtitle: "Configure system preferences",
        showBackButton: false,
        backUrl: "",
        backLabel: "",
      }

    return {
      activeItem: "analytics_overview",
      title: "DRISHTI",
      subtitle: "Training Partner Management System",
      showBackButton: false,
      backUrl: "",
      backLabel: "",
    }
  }

  const pageInfo = getPageInfo(pathname)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <DashboardSidebar activeItem={pageInfo.activeItem} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            title={pageInfo.title}
            subtitle={pageInfo.subtitle}
            showBackButton={pageInfo.showBackButton}
            backUrl={pageInfo.backUrl}
            backLabel={pageInfo.backLabel}
          />

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
