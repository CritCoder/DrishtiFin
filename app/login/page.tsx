"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { signIn } from "next-auth/react"
import { useNotificationModal } from "@/components/notification-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, Users, GraduationCap, FileCheck, User, Info } from "lucide-react"

const demoCredentials = {
  osda_admin: {
    super_admin: { username: "super.admin@drishti.gov.in", password: "SuperAdmin@123" },
    department_user: { username: "dept.user@drishti.gov.in", password: "DeptUser@123" },
  },
  training_partner: {
    tp_admin: { username: "admin@techskills.com", password: "TPAdmin@123" },
    tp_staff: { username: "staff@techskills.com", password: "TPStaff@123" },
  },
  student: { username: "ramesh.kumar@student.com", password: "Student@123" },
  employer: { username: "hr@infosys.com", password: "Employer@123" },
  system_integrator: { username: "auditor@kpmg.com", password: "Auditor@123" },
}

const userRoles = [
  {
    id: "osda_admin",
    title: "OSDA Admin",
    description: "Government officials with full system control",
    icon: Shield,
    subtypes: [
      { id: "super_admin", title: "Super Admin", description: "All permissions including system settings" },
      { id: "department_user", title: "Department User", description: "Review, approvals, and monitoring" },
    ],
  },
  {
    id: "training_partner",
    title: "Training Partner",
    description: "Organizations empaneled with OSDA",
    icon: Users,
    subtypes: [
      { id: "tp_admin", title: "TP Admin", description: "Organization-level control, manage centres & staff" },
      { id: "tp_staff", title: "TP Staff", description: "Batch-level data entry: attendance, placements" },
    ],
  },
  {
    id: "student",
    title: "Student/Trainee",
    description: "Beneficiaries of skilling programs",
    icon: GraduationCap,
    subtypes: [],
  },
  {
    id: "employer",
    title: "Employer",
    description: "Companies hiring OSDA candidates",
    icon: User,
    subtypes: [],
  },
  {
    id: "system_integrator",
    title: "System Integrator/Auditor",
    description: "External audit agencies with read-only access",
    icon: FileCheck,
    subtypes: [],
  },
]

const heroSlides = [
  {
    title: "One Platform to Streamline",
    subtitle: "All Training Analytics",
    description: "Empowering government training programs with comprehensive partner management and student tracking capabilities through modern technology."
  },
  {
    title: "Comprehensive Training",
    subtitle: "Partner Management",
    description: "Connect, verify and monitor training organizations across India with real-time compliance tracking and performance insights."
  },
  {
    title: "Real-time Analytics",
    subtitle: "& Reporting Dashboard", 
    description: "Advanced analytics and intelligent reports for tracking performance, placements, and outcomes with predictive insights."
  }
]

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [selectedSubtype, setSelectedSubtype] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const { showNotification, NotificationComponent } = useNotificationModal()
  const [showDemoDrawer, setShowDemoDrawer] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const selectedRoleData = userRoles.find((role) => role.id === selectedRole)
  const currentSlideData = heroSlides[currentSlide]

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const fillDemoCredentials = (roleId: string, subtypeId?: string) => {
    const roleCreds = demoCredentials[roleId as keyof typeof demoCredentials]
    if (roleCreds) {
      if (subtypeId && typeof roleCreds === "object" && "username" in roleCreds === false) {
        const subtypeCreds = (roleCreds as any)[subtypeId]
        if (subtypeCreds) {
          setCredentials(subtypeCreds)
        }
      } else if (typeof roleCreds === "object" && "username" in roleCreds) {
        setCredentials(roleCreds)
      }
    }
  }

  const selectDemoAccount = (roleId: string, subtypeId?: string) => {
    setSelectedRole(roleId)
    if (subtypeId) {
      setSelectedSubtype(subtypeId)
    } else {
      setSelectedSubtype("")
    }
    fillDemoCredentials(roleId, subtypeId)
    setShowDemoDrawer(false)
  }

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId)
    setSelectedSubtype("")
    const role = userRoles.find((r) => r.id === roleId)
    if (role && role.subtypes.length === 0) {
      fillDemoCredentials(roleId)
    } else {
      setCredentials({ username: "", password: "" })
    }
  }

  const handleSubtypeChange = (subtypeId: string) => {
    setSelectedSubtype(subtypeId)
    fillDemoCredentials(selectedRole, subtypeId)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      setError("Please select your role to continue")
      return
    }
    if (selectedRoleData?.subtypes && selectedRoleData.subtypes.length > 0 && !selectedSubtype) {
      setError("Please select your specific role type")
      return
    }
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password")
      return
    }

    setError("")
    const success = await login({
      username: credentials.username,
      password: credentials.password,
      role: selectedRole,
      subtype: selectedSubtype || undefined,
    })

    if (success) {
      // Show success notification for different user types
      const roleDisplayNames: Record<string, string> = {
        'osda_admin': 'OSDA Administrator',
        'training_partner': 'Training Partner',
        'student': 'Student',
        'employer': 'Employer',
        'system_integrator': 'System Integrator'
      }

      const roleName = roleDisplayNames[selectedRole] || selectedRole
      
      showNotification({
        status: 'success',
        title: `Welcome back!`,
        message: `Successfully logged in as ${roleName}. You now have access to your personalized dashboard and features.`,
        actionLabel: 'Continue to Dashboard',
        onAction: () => window.location.href = "/app",
        showEmailIndicator: false
      })
      
      // Delay redirect to show the notification
      setTimeout(() => {
        window.location.href = "/app"
      }, 2500)
    } else {
      showNotification({
        status: 'error',
        title: 'Login Failed',
        message: 'Invalid credentials or account not approved. Please check your email and password or contact support.',
        actionLabel: 'Try Again'
      })
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      <div className="grid lg:grid-cols-2 h-screen">
        {/* Left Column - Hero Section */}
        <div className="hidden lg:flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

          <div className="relative z-10 flex flex-col justify-center items-center text-center p-8 text-white w-full">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 border border-white/20">
              <span className="text-3xl font-serif font-bold text-white">D</span>
            </div>

            <div className="transition-all duration-500 ease-in-out">
              <h1 className="text-4xl font-serif font-bold mb-4 leading-tight max-w-2xl">
                {currentSlideData.title.split(' ').slice(0, -1).join(' ')} <span className="text-purple-400">{currentSlideData.title.split(' ').pop()}</span>
              </h1>
              <h2 className="text-3xl font-serif font-bold mb-6 text-gray-200">{currentSlideData.subtitle}</h2>

              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-8">
                {currentSlideData.description}
              </p>
            </div>

            <div className="flex space-x-4">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentSlide 
                      ? "bg-purple-400 shadow-lg shadow-purple-400/50" 
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="flex items-center justify-center p-4 lg:p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-lg">
            <div className="text-center mb-6">
              <div className="lg:hidden w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-serif font-bold text-white">D</span>
              </div>

              <h1 className="text-3xl font-serif font-bold text-foreground mb-2 leading-tight">
                Welcome back to DRISHTI
              </h1>
              <p className="text-muted-foreground text-lg mb-4">Please enter your details to sign in</p>

              <Drawer open={showDemoDrawer} onOpenChange={setShowDemoDrawer} direction="right">
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                    onClick={() => setShowDemoDrawer(true)}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Demo Credentials
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="w-[600px] max-w-[90vw]">
                  <DrawerHeader className="border-b border-gray-200 pb-4">
                    <DrawerTitle className="font-serif text-xl text-gray-900 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Demo Login Credentials
                    </DrawerTitle>
                    <DrawerDescription className="text-sm text-gray-600">
                      Click any credential below to instantly login and explore different user roles
                    </DrawerDescription>
                  </DrawerHeader>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {userRoles.map((role) => {
                      const Icon = role.icon
                      return (
                        <div key={role.id} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                          <div className="p-3 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-blue-700" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm text-gray-900">{role.title}</h4>
                                <p className="text-xs text-gray-600 leading-tight">{role.description}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 space-y-2">
                            {role.subtypes.length > 0 ? (
                              role.subtypes.map((subtype) => {
                                const creds = (demoCredentials[role.id as keyof typeof demoCredentials] as any)?.[subtype.id]
                                return (
                                  <button
                                    key={subtype.id}
                                    onClick={() => selectDemoAccount(role.id, subtype.id)}
                                    className="w-full text-left p-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg border border-blue-200 hover:border-blue-300 transition-all group"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium text-xs text-blue-900">{subtype.title}</span>
                                      <span className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Click →</span>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-xs text-blue-700">{subtype.description}</p>
                                      <div className="text-xs text-blue-800 font-mono space-y-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-blue-600">📧</span>
                                          <span className="truncate text-xs">{creds?.username}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-blue-600">🔐</span>
                                          <span className="truncate text-xs">{creds?.password}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                )
                              })
                            ) : (
                              <button
                                onClick={() => selectDemoAccount(role.id)}
                                className="w-full text-left p-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg border border-green-200 hover:border-green-300 transition-all group"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-xs text-green-900">Direct Access</span>
                                  <span className="text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">Click →</span>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-xs text-green-800 font-mono space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-green-600">📧</span>
                                      <span className="truncate text-xs">{(demoCredentials[role.id as keyof typeof demoCredentials] as any)?.username}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-green-600">🔐</span>
                                      <span className="truncate text-xs">{(demoCredentials[role.id as keyof typeof demoCredentials] as any)?.password}</span>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Info className="w-3 h-3 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-amber-900 text-sm mb-1">Demo Environment</h5>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          These are demo accounts with pre-populated data. Each role has different permissions and access levels.
                        </p>
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full h-12 text-base bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700"
                onClick={() => signIn('google', { callbackUrl: '/app' })}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 4.12-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 text-base bg-gray-900 hover:bg-black border-2 border-gray-900 text-white"
                onClick={() => signIn('github', { callbackUrl: '/app' })}
              >
                <svg className="w-5 h-5 mr-3 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-border" />
              </div>
              <div className="relative flex justify-center text-base">
                <span className="bg-white px-4 text-muted-foreground">Or sign in with</span>
              </div>
            </div>

            <div className="space-y-6 mb-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Select Your Role</Label>
                <Select value={selectedRole} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Choose your role in the system" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => {
                      const Icon = role.icon
                      return (
                        <SelectItem
                          key={role.id}
                          value={role.id}
                          className="py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white data-[highlighted]:bg-black data-[highlighted]:text-white"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-white data-[highlighted]:text-white" />
                            <div className="min-h-[2.5rem] flex flex-col justify-center">
                              <div className="font-medium text-foreground group-hover:text-white data-[highlighted]:text-white leading-tight">
                                {role.title}
                              </div>
                              <div className="text-xs text-muted-foreground group-hover:text-white data-[highlighted]:text-white leading-tight">
                                {role.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              {selectedRoleData?.subtypes && selectedRoleData.subtypes.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Specific Role</Label>
                  <Select value={selectedSubtype} onValueChange={handleSubtypeChange}>
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue placeholder="Choose your specific role type" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedRoleData.subtypes.map((subtype) => (
                        <SelectItem
                          key={subtype.id}
                          value={subtype.id}
                          className="py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white data-[highlighted]:bg-black data-[highlighted]:text-white"
                        >
                          <div className="min-h-[2.5rem] flex flex-col justify-center">
                            <div className="font-medium text-foreground group-hover:text-white data-[highlighted]:text-white leading-tight">
                              {subtype.title}
                            </div>
                            <div className="text-xs text-muted-foreground group-hover:text-white data-[highlighted]:text-white leading-tight">
                              {subtype.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                  <AlertDescription className="text-base">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="username" className="text-base font-semibold">
                  Email Address
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your email address"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  className="w-full h-12 text-base bg-input border-2 focus:border-accent"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-base font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full h-12 text-base bg-input border-2 focus:border-accent pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base bg-primary hover:bg-primary/90 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In →"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-base text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </form>

            <div className="text-center mt-6 p-4 bg-gray-50 rounded-lg border">
              <p className="text-base text-gray-700 mb-2">New to DRISHTI?</p>
              <button
                type="button"
                onClick={() => (window.location.href = "/register")}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Create Account →
              </button>
            </div>

            <div className="text-center mt-6 text-sm text-muted-foreground">
              <p>© 2024 DRISHTI</p>
              <div className="flex justify-center space-x-4 mt-2">
                <button className="hover:text-foreground transition-colors">Privacy Policy</button>
                <button className="hover:text-foreground transition-colors">Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationComponent />
    </div>
  )
}
