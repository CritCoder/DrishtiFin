"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, GraduationCap, Briefcase, CreditCard, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ElementType
}

function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-open-sans font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-montserrat font-bold text-foreground">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {changeType === "positive" && <TrendingUp className="w-3 h-3 mr-1 text-green-600" />}
          {changeType === "negative" && <TrendingDown className="w-3 h-3 mr-1 text-red-600" />}
          <span
            className={cn(
              "font-open-sans",
              changeType === "positive" && "text-green-600",
              changeType === "negative" && "text-red-600",
            )}
          >
            {change}
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const { stats, loading, error } = useDashboardStats()

  const iconMap: Record<string, React.ElementType> = {
    Users,
    GraduationCap, 
    Briefcase,
    CreditCard,
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-4 bg-muted animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2"></div>
              <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p>Failed to load dashboard stats</p>
              <p className="text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard 
          key={stat.title} 
          {...stat} 
          icon={iconMap[stat.icon] || Users}
        />
      ))}
    </div>
  )
}
