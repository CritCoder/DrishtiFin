"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Users,
  GraduationCap,
  Briefcase,
  CreditCard,
  CheckCircle,
  FileText,
  Shield,
  Settings,
  Menu,
  X,
  UserCheck,
  TrendingUp,
  Upload,
  Search,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useAuth, getRoleDisplayName } from "@/lib/auth"

const navigationItems = [
  {
    id: "analytics_overview",
    label: "Analytics",
    icon: BarChart3,
    href: "/app",
    roles: ["osda_admin", "training_partner", "system_integrator", "employer"],
  },
  {
    id: "student_dashboard",
    label: "Dashboard",
    icon: BarChart3,
    href: "/student/dashboard",
    roles: ["student"],
  },
  {
    id: "tp_list",
    label: "Training Partners",
    icon: Users,
    href: "/tps",
    roles: ["osda_admin", "system_integrator"],
  },
  {
    id: "batches_list",
    label: "Batches",
    icon: GraduationCap,
    href: "/batches",
    roles: ["osda_admin", "training_partner", "system_integrator"],
  },
  {
    id: "my_batch",
    label: "My Batch",
    icon: GraduationCap,
    href: "/student/batch",
    roles: ["student"],
  },
  {
    id: "placements_list",
    label: "Placements",
    icon: Briefcase,
    href: "/placements",
    roles: ["osda_admin", "training_partner", "system_integrator"],
  },
  {
    id: "my_placement",
    label: "My Placement",
    icon: Briefcase,
    href: "/student/placement",
    roles: ["student"],
  },
  {
    id: "payments_milestones",
    label: "Payments",
    icon: CreditCard,
    href: "/payments",
    roles: ["osda_admin"],
  },
  {
    id: "approvals_list",
    label: "Approvals",
    icon: CheckCircle,
    href: "/approvals",
    roles: ["osda_admin", "system_integrator"],
  },
  {
    id: "reports_export",
    label: "Reports",
    icon: FileText,
    href: "/reports",
    roles: ["osda_admin", "system_integrator"],
  },
  {
    id: "audit_logs",
    label: "Audit Logs",
    icon: Shield,
    href: "/audit-logs",
    roles: ["osda_admin", "system_integrator"],
  },
  {
    id: "settings_general",
    label: "Settings",
    icon: Settings,
    href: "/settings",
    roles: ["osda_admin"],
  },
]

const shortcuts = [
  {
    id: "tp_create",
    label: "New Training Partner",
    icon: UserCheck,
    href: "/tps/new",
    roles: ["osda_admin"],
  },
  {
    id: "batches_create",
    label: "New Batch",
    icon: GraduationCap,
    href: "/batches/new",
    roles: ["osda_admin", "training_partner"],
  },
  {
    id: "files_upload",
    label: "Upload Files",
    icon: Upload,
    href: "/files/upload",
    roles: ["osda_admin", "training_partner"],
  },
  {
    id: "integrations_gstn_verify",
    label: "GSTN Verification",
    icon: Search,
    href: "/integrations/gstn",
    roles: ["osda_admin", "system_integrator"],
  },
]

interface DashboardSidebarProps {
  activeItem?: string
}

export function DashboardSidebar({ activeItem }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentRole, setCurrentRole] = useState<string>('osda_admin')
  const { user, logout } = useAuth()

  // Use actual authenticated user role - no role switching allowed
  useEffect(() => {
    if (user?.role) {
      setCurrentRole(user.role)
    } else {
      // Default to student role for unauthenticated users (temporary for development)
      setCurrentRole('student')
    }
  }, [user?.role])
  
  const currentUser = user || { role: currentRole }
  const visibleNavigationItems = navigationItems.filter((item) => currentUser && item.roles.includes(currentUser.role))

  const visibleShortcuts = shortcuts.filter((item) => currentUser && item.roles.includes(currentUser.role))

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-sidebar-accent-foreground" />
            </div>
            <Link href="/app" className="font-montserrat font-bold text-lg text-sidebar-foreground">
              DRISHTI
            </Link>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-montserrat font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Main Navigation
            </h3>
          )}
          <nav className="space-y-1">
            {visibleNavigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id

              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sidebar-foreground hover:shadow-lg hover:shadow-blue-500/20 hover:bg-sidebar-accent transition-all duration-200",
                      isActive && "bg-black text-white hover:bg-black hover:shadow-lg hover:shadow-gray-500/30 shadow-md border-l-4 border-gray-400",
                      isCollapsed && "px-2",
                    )}
                  >
                    <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                    {!isCollapsed && <span className="font-open-sans">{item.label}</span>}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        {visibleShortcuts.length > 0 && (
          <div>
            {!isCollapsed && (
              <h3 className="text-xs font-montserrat font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
            )}
            <nav className="space-y-1">
              {visibleShortcuts.map((item) => {
                const Icon = item.icon
                const isActive = activeItem === item.id

                return (
                  <Link key={item.id} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive && "bg-black text-white hover:bg-black hover:shadow-lg hover:shadow-gray-500/30 shadow-md border-l-4 border-gray-400",
                        isCollapsed && "px-2",
                      )}
                    >
                      <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                      {!isCollapsed && <span className="font-open-sans text-sm">{item.label}</span>}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "space-x-3")}>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-sm font-montserrat font-semibold text-muted-foreground">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-open-sans font-medium text-sidebar-foreground truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user ? getRoleDisplayName(user.role) : ""}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => {
              if (confirm("Are you sure you want to logout?")) {
                logout()
              }
            }}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
