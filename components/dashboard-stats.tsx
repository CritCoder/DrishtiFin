"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, GraduationCap, Briefcase, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const stats = [
    {
      title: "Active Training Partners",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Running Batches",
      value: "3,456",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: GraduationCap,
    },
    {
      title: "Successful Placements",
      value: "28,934",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Briefcase,
    },
    {
      title: "Pending Payments",
      value: "₹45.2L",
      change: "-3.1%",
      changeType: "negative" as const,
      icon: CreditCard,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
