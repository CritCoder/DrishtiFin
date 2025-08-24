"use client"

import type React from "react"

import { useAuth } from "@/lib/auth"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { canAccessRoute } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  requiredPermissions?: string[]
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  fallback,
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    console.log("🔒 ProtectedRoute check:", { isLoading, isAuthenticated, user: !!user, pathname })
    
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      console.log("❌ Not authenticated, redirecting to login from:", pathname)
      window.location.href = "/login"
      return
    }
    
    // Check if user has permission to access this route
    if (!isLoading && user && !canAccessRoute(user.role, pathname)) {
      console.log("❌ User role", user.role, "cannot access:", pathname)
      window.location.href = "/login"
    }
  }, [isLoading, isAuthenticated, user, pathname])


  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login redirect if not authenticated
  if (!isAuthenticated || !user) {
    return null // Will redirect via useEffect
  }

  // Check role-based access
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>You don't have permission to access this page. Your role: {user.role}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => window.history.back()} variant="outline" className="mr-2">
                Go Back
              </Button>
              <Button onClick={logout} variant="destructive">
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  // Check permission-based access
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((permission) => user.permissions.includes(permission))

    if (!hasAllPermissions) {
      return (
        fallback || (
          <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <CardTitle>Insufficient Permissions</CardTitle>
                <CardDescription>You don't have the required permissions to access this feature.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={() => window.history.back()} variant="outline" className="mr-2">
                  Go Back
                </Button>
                <Button onClick={logout} variant="destructive">
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      )
    }
  }

  // Check route-based access
  if (!canAccessRoute(user.role, pathname)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle>Route Access Denied</CardTitle>
              <CardDescription>This page is not available for your role: {user.role}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => (window.location.href = "/")} variant="outline" className="mr-2">
                Go to Dashboard
              </Button>
              <Button onClick={logout} variant="destructive">
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
