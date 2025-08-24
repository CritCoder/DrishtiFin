"use client"

import { Bell, Search, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardHeaderProps {
  title?: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const pathname = usePathname()

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ label: "Dashboard", href: "/" }]

    let currentPath = ""
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === segments.length - 1

      // Convert segment to readable label
      let label = segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      if (segment === "tps") label = "Training Partners"
      if (segment === "new") label = "New"
      if (segment === "audit-logs") label = "Audit Logs"

      breadcrumbs.push({
        label,
        href: isLast ? "" : currentPath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index === 0 && <Home className="w-4 h-4 mr-1 text-slate-500" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-blue-600 hover:text-blue-800 font-medium">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-semibold">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />}
              </div>
            ))}
          </nav>

          {/* Center - Search */}
          <div className="flex-1 flex justify-center px-8">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search across system..."
                className="pl-10 w-full bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right - Notifications only */}
          <div className="flex items-center">
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative text-slate-600 hover:bg-slate-100">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
