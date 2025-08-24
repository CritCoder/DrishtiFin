"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth" 
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  Building2,
  GraduationCap,
  Briefcase,
  FileCheck,
  CreditCard,
  FileText,
  Settings,
  Clock,
  Upload,
  Plus,
  LogOut,
  User
} from "lucide-react"

const navigationItems = [
  {
    id: "analytics_overview",
    label: "Analytics",
    href: "/app",
    icon: BarChart3,
    roles: ["osda_admin", "training_partner", "student", "employer", "system_integrator"],
  },
  {
    id: "tp_list", 
    label: "Training Partners",
    href: "/tps",
    icon: Building2,
    roles: ["osda_admin", "system_integrator"],
  },
  {
    id: "batches_list",
    label: "Batches",
    href: "/batches", 
    icon: GraduationCap,
    roles: ["osda_admin", "training_partner", "system_integrator"],
  },
  {
    id: "placements_list",
    label: "Placements",
    href: "/placements",
    icon: Briefcase,
    roles: ["osda_admin", "training_partner", "employer", "system_integrator"],
  },
  {
    id: "approvals_list",
    label: "Approvals", 
    href: "/approvals",
    icon: FileCheck,
    roles: ["osda_admin", "system_integrator"],
  },
  {
    id: "payments_milestones",
    label: "Payments",
    href: "/payments",
    icon: CreditCard,
    roles: ["osda_admin", "training_partner"],
  },
  {
    id: "reports_export",
    label: "Reports",
    href: "/reports",
    icon: FileText,
    roles: ["osda_admin", "system_integrator", "employer"],
  },
  {
    id: "integrations_gstn_verify",
    label: "Integrations",
    href: "/integrations", 
    icon: Settings,
    roles: ["osda_admin"],
  },
  {
    id: "audit_logs",
    label: "Audit Logs",
    href: "/audit-logs",
    icon: Clock,
    roles: ["osda_admin", "system_integrator"],
  }
]

const shortcuts = [
  {
    id: "new_batch",
    label: "New Batch",
    href: "/batches/new",
    icon: Plus,
    roles: ["osda_admin", "training_partner"],
  },
  {
    id: "upload_files", 
    label: "Upload Files",
    href: "/files/upload",
    icon: Upload,
    roles: ["osda_admin", "training_partner", "system_integrator"],
  }
]

// Student-specific navigation
const studentNavigation = [
  {
    id: "student_dashboard",
    label: "Dashboard", 
    href: "/student/dashboard",
    icon: BarChart3,
    roles: ["student"],
  },
  {
    id: "my_batch",
    label: "My Batch",
    href: "/student/batch",
    icon: GraduationCap,
    roles: ["student"],
  },
  {
    id: "my_placement",
    label: "My Placement", 
    href: "/student/placement",
    icon: Briefcase,
    roles: ["student"],
  }
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
  
  // Determine which navigation to show
  const navItems = currentUser.role === 'student' ? studentNavigation : navigationItems
  const visibleNavigationItems = navItems.filter((item) => currentUser && item.roles.includes(currentUser.role))
  const visibleShortcuts = shortcuts.filter((item) => currentUser && item.roles.includes(currentUser.role))

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <Link href="/app" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-lg text-gray-900">DRISHTI</span>
            </Link>
          </div>
        ) : (
          <Link href="/app" className="hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 w-8 p-0 rounded-md"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto py-4">
          {/* Main Navigation */}
          {!isCollapsed && (
            <div className="px-3 mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Main Navigation  
              </p>
            </div>
          )}
          <nav className={cn("px-3", isCollapsed ? "space-y-3" : "space-y-1")}>
            {visibleNavigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              return (
                <Link key={item.id} href={item.href}>
                  <div
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <Icon className={cn("w-5 h-5 flex-shrink-0", !isCollapsed && "mr-3")} />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-16 px-2 py-1 ml-6 text-sm font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions */}
          {visibleShortcuts.length > 0 && (
            <div className="mt-8">
              {!isCollapsed && (
                <div className="px-3 mb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Quick Actions
                  </p>
                </div>
              )}
              <nav className={cn("px-3", isCollapsed ? "space-y-3" : "space-y-1")}>
                {visibleShortcuts.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.id} href={item.href}>
                      <div
                        className={cn(
                          "group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200",
                          isCollapsed && "justify-center px-2"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 flex-shrink-0", !isCollapsed && "mr-3")} />
                        {!isCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                        {isCollapsed && (
                          <div className="absolute left-16 px-2 py-1 ml-6 text-sm font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            {item.label}
                          </div>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}
        </div>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          {user && (
            <div className={cn("flex items-center", isCollapsed && "justify-center")}>
              {!isCollapsed ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name || user.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate capitalize">
                        {user.role.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 w-8 p-0 ml-2 flex-shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}