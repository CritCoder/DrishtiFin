"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { useSession, signOut } from "next-auth/react"

export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  role: "osda_admin" | "training_partner" | "student" | "employer" | "system_integrator"
  subtype?: string
  organizationId?: string
  permissions: string[]
  loginTime: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: { username: string; password: string; role: string; subtype?: string }) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
  hasRole: (role: string | string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ROLE_PERMISSIONS = {
  osda_admin: [
    "view_all_data",
    "manage_users",
    "manage_training_partners",
    "manage_batches",
    "manage_placements",
    "manage_payments",
    "view_reports",
    "manage_settings",
    "view_audit_logs",
    "manage_approvals",
    "manage_integrations",
  ],
  training_partner: [
    "view_own_data",
    "manage_own_batches",
    "manage_own_students",
    "view_own_placements",
    "submit_documents",
    "view_own_payments",
  ],
  student: ["view_own_profile", "view_own_batches", "view_own_placements", "submit_feedback"],
  employer: ["view_candidates", "post_jobs", "manage_placements", "view_reports"],
  system_integrator: ["view_all_data", "view_audit_logs", "generate_reports", "review_documents"],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = async () => {
      try {
        console.log("🔍 checkAuth starting...")
        
        // First check NextAuth session
        if (session?.user) {
          console.log("👤 NextAuth session found:", session.user)
          const userData = {
            id: session.user.email || '',
            username: session.user.email || '',
            email: session.user.email || '',
            firstName: session.user.name?.split(' ')[0] || '',
            lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
            role: "student" as const, // NextAuth users get student role by default
            permissions: ROLE_PERMISSIONS["student"] || [],
            loginTime: new Date().toISOString(),
          }
          console.log("✅ Setting user from NextAuth session:", userData)
          setUser(userData)
          setIsLoading(false)
          return
        }
        
        // Fallback to traditional token-based auth
        const token = localStorage.getItem("drishti_token")
        console.log("🎫 Token from localStorage:", token ? token.substring(0, 20) + "..." : "none")
        
        if (token) {
          console.log("📡 Making /me request...")
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          console.log("📡 /me response:", response.status, response.ok)
          
          if (response.ok) {
            const data = await response.json()
            console.log("📦 /me data:", data)
            const userData = {
              ...data.user,
              username: data.user.email,
              permissions: ROLE_PERMISSIONS[data.user.role as keyof typeof ROLE_PERMISSIONS] || [],
              loginTime: new Date().toISOString(),
            }
            console.log("✅ Setting user from checkAuth:", userData)
            setUser(userData)
          } else {
            console.log("❌ /me failed, removing token")
            localStorage.removeItem("drishti_token")
          }
        } else {
          console.log("❌ No token found")
        }
      } catch (error) {
        console.error("🚨 Error checking authentication:", error)
        localStorage.removeItem("drishti_token")
      } finally {
        console.log("🏁 checkAuth finished, setting isLoading to false")
        setIsLoading(false)
      }
    }

    // Only run checkAuth when NextAuth session status is determined
    if (status !== "loading") {
      checkAuth()
    }
  }, [session, status])

  const login = async (credentials: {
    username: string
    password: string
    role: string
    subtype?: string
  }): Promise<boolean> => {
    setIsLoading(true)

    try {
      console.log("🔄 Making login request with:", { email: credentials.username, password: credentials.password })
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password,
        }),
      })

      console.log("📡 Response status:", response.status, "ok:", response.ok)
      
      if (response.ok) {
        const data = await response.json()
        console.log("📦 Response data:", data)

        if (data.success && data.token && data.user) {
          const userData = {
            ...data.user,
            username: data.user.email,
            permissions: ROLE_PERMISSIONS[data.user.role as keyof typeof ROLE_PERMISSIONS] || [],
            loginTime: new Date().toISOString(),
          }

          console.log("✅ Login successful, setting user:", userData)
          setUser(userData)
          localStorage.setItem("drishti_token", data.token)
          console.log("💾 Token saved to localStorage:", data.token.substring(0, 20) + "...")
          console.log("👤 User state set, isAuthenticated should now be:", !!userData)
          return true
        } else {
          console.log("❌ Login failed - missing success/token/user in response")
        }
      } else {
        const errorData = await response.text()
        console.log("❌ Response not ok:", response.status, errorData)
      }

      return false
    } catch (error) {
      console.error("🚨 Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("drishti_token")
    sessionStorage.clear()
    
    // If user has NextAuth session, sign them out of NextAuth too
    if (session) {
      signOut({ callbackUrl: '/login' })
    } else {
      window.location.href = "/login"
    }
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false
  }

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    return user.role === role
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Helper function to get user role display name
export function getRoleDisplayName(role: string): string {
  const roleNames = {
    osda_admin: "OSDA Administrator",
    training_partner: "Training Partner",
    student: "Student/Trainee",
    employer: "Employer",
    system_integrator: "System Integrator/Auditor",
  }
  return roleNames[role as keyof typeof roleNames] || role
}

export function canAccessRoute(userRole: string, routePath: string): boolean {
  const routePermissions = {
    "/": ["osda_admin", "training_partner", "student", "employer", "system_integrator"],
    "/tps": ["osda_admin", "system_integrator"],
    "/batches": ["osda_admin", "training_partner", "system_integrator"],
    "/placements": ["osda_admin", "training_partner", "employer", "system_integrator"],
    "/approvals": ["osda_admin", "system_integrator"],
    "/payments": ["osda_admin", "training_partner"],
    "/reports": ["osda_admin", "system_integrator", "employer"],
    "/audit-logs": ["osda_admin", "system_integrator"],
    "/settings": ["osda_admin"],
    "/integrations": ["osda_admin"],
    "/files": ["osda_admin", "training_partner", "system_integrator"],
  }

  // Check for exact match first
  if (routePermissions[routePath as keyof typeof routePermissions]) {
    const allowedRoles = routePermissions[routePath as keyof typeof routePermissions]
    return allowedRoles.includes(userRole)
  }

  // Check for parent route matches (e.g., /tps/new should match /tps)
  const routeSegments = routePath.split("/").filter(Boolean)

  for (let i = routeSegments.length; i > 0; i--) {
    const parentRoute = "/" + routeSegments.slice(0, i).join("/")
    if (routePermissions[parentRoute as keyof typeof routePermissions]) {
      const allowedRoles = routePermissions[parentRoute as keyof typeof routePermissions]
      return allowedRoles.includes(userRole)
    }
  }

  // Default to allowing access if no specific restrictions found
  return true
}
