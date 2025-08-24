"use client"

import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivities } from "@/components/recent-activities"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <DashboardStats />
      <DashboardCharts />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <RecentActivities />
        </div>
        <div className="space-y-4">
          {/* Quick Actions Card */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-montserrat font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/tps/new">
                <button className="w-full text-left p-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                  <span className="font-open-sans font-medium">Create New TP</span>
                </button>
              </Link>
              <Link href="/files/upload">
                <button className="w-full text-left p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                  <span className="font-open-sans font-medium">Upload Documents</span>
                </button>
              </Link>
              <Link href="/reports">
                <button className="w-full text-left p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                  <span className="font-open-sans font-medium">Generate Report</span>
                </button>
              </Link>
            </div>
          </div>

          {/* System Status Card */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-montserrat font-semibold text-lg text-foreground mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-open-sans text-sm text-muted-foreground">API Status</span>
                <span className="text-green-600 font-open-sans text-sm font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-open-sans text-sm text-muted-foreground">Database</span>
                <span className="text-green-600 font-open-sans text-sm font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-open-sans text-sm text-muted-foreground">Integrations</span>
                <span className="text-yellow-600 font-open-sans text-sm font-medium">Partial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
