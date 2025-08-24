"use client"

import { Bell, Search, ChevronRight, Home, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SpotlightSearch, useSpotlightSearch } from "@/components/spotlight-search"

interface DashboardHeaderProps {
  title?: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { isOpen, open, close } = useSpotlightSearch()

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ label: "Dashboard", href: "/app" }]

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
    <header className="bg-sidebar border-b border-sidebar-border h-16 flex-shrink-0">
      <div className="px-6 h-16 flex items-center relative">
          {/* Left - Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm flex-1">
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

          {/* Center - Search (absolutely centered) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Button
              variant="outline"
              onClick={open}
              className="w-96 justify-start text-muted-foreground hover:bg-gray-50 border-gray-300"
            >
              <Search className="w-4 h-4 mr-3 text-gray-400" />
              <span className="flex-1 text-left">Search across system...</span>
              <div className="flex items-center gap-1 text-xs text-gray-400 ml-3">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </Button>
          </div>

          {/* Right - Notifications only */}
          <div className="flex items-center justify-end flex-1">
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
      
      <SpotlightSearch isOpen={isOpen} onClose={close} />
    </header>
  )
}
