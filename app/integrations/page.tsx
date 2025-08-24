"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Link2, 
  CheckCircle, 
  XCircle, 
  Settings, 
  RefreshCw, 
  Globe, 
  Database, 
  Shield,
  AlertTriangle,
  Info
} from "lucide-react"

export default function IntegrationsPage() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnection = async (service: string) => {
    setIsConnecting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnecting(false)
  }

  const integrations = [
    {
      id: "gstn",
      name: "GSTN Verification",
      description: "Verify GST numbers and company details automatically",
      icon: Shield,
      status: "connected",
      lastSync: "2 hours ago",
      color: "green"
    },
    {
      id: "aadhar",
      name: "Aadhaar Verification",
      description: "Verify student identity using Aadhaar authentication",
      icon: Database,
      status: "connected",
      lastSync: "1 hour ago", 
      color: "green"
    },
    {
      id: "udyam",
      name: "Udyam Registration",
      description: "Fetch MSME registration details from Udyam portal",
      icon: Globe,
      status: "disconnected",
      lastSync: "Never",
      color: "red"
    },
    {
      id: "epfo",
      name: "EPFO Integration",
      description: "Track employment status and PF contributions",
      icon: Database,
      status: "warning",
      lastSync: "5 days ago",
      color: "yellow"
    }
  ]

  const webhooks = [
    {
      id: "placement_updates",
      name: "Placement Status Updates",
      url: "https://api.drishti.gov.in/webhooks/placements",
      status: "active",
      events: ["placement.created", "placement.updated", "placement.verified"]
    },
    {
      id: "student_enrollment",
      name: "Student Enrollment",
      url: "https://api.drishti.gov.in/webhooks/students",
      status: "inactive",
      events: ["student.enrolled", "student.completed", "student.dropped"]
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Integrations</h1>
          <p className="text-muted-foreground">Manage external service connections and data synchronization</p>
        </div>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList>
          <TabsTrigger value="services">External Services</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => {
              const Icon = integration.icon
              const statusColor = {
                connected: "text-green-600 bg-green-50",
                disconnected: "text-red-600 bg-red-50", 
                warning: "text-yellow-600 bg-yellow-50"
              }[integration.status]

              const StatusIcon = {
                connected: CheckCircle,
                disconnected: XCircle,
                warning: AlertTriangle
              }[integration.status]

              return (
                <Card key={integration.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium">{integration.name}</CardTitle>
                        <CardDescription className="text-xs">{integration.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={statusColor}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {integration.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Last sync: {integration.lastSync}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConnection(integration.id)}
                          disabled={isConnecting}
                        >
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                        {integration.status === "disconnected" && (
                          <Button 
                            size="sm"
                            onClick={() => handleConnection(integration.id)}
                            disabled={isConnecting}
                          >
                            <Link2 className="w-3 h-3 mr-1" />
                            Connect
                          </Button>
                        )}
                        {integration.id === "gstn" && integration.status === "connected" && (
                          <Button 
                            size="sm"
                            onClick={() => window.location.href = '/integrations/gstn'}
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            Verify Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Configure webhook endpoints for real-time data updates</p>
            <Button>Add Webhook</Button>
          </div>
          
          <div className="grid gap-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{webhook.name}</CardTitle>
                      <CardDescription className="font-mono text-xs">{webhook.url}</CardDescription>
                    </div>
                    <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                      {webhook.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Test</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Manage API keys for external integrations</p>
            <Button>Generate New Key</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">API Key Management</CardTitle>
              <CardDescription>Configure API keys for external service authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gstn-key">GSTN API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="gstn-key"
                    type="password"
                    placeholder="Enter GSTN API key"
                    defaultValue="••••••••••••••••"
                  />
                  <Button variant="outline">Update</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhar-key">Aadhaar Verification Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="aadhar-key"
                    type="password"
                    placeholder="Enter Aadhaar API key"
                    defaultValue="••••••••••••••••"
                  />
                  <Button variant="outline">Update</Button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Security Notice</p>
                    <p>API keys are encrypted and stored securely. Only the last 4 characters are displayed for security purposes.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}