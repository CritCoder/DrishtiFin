"use client"

import React, { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Search,
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  FileText,
  Settings,
  BarChart3,
  CreditCard,
  Shield,
  Clock,
  ArrowRight,
  Command
} from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchResult {
  id: string
  title: string
  subtitle?: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  keywords: string[]
}

const searchData: SearchResult[] = [
  // Navigation
  {
    id: "dashboard",
    title: "Analytics Overview",
    subtitle: "Main dashboard with key metrics",
    category: "Navigation",
    icon: BarChart3,
    href: "/app",
    keywords: ["dashboard", "analytics", "overview", "metrics", "stats"]
  },
  {
    id: "training-partners",
    title: "Training Partners",
    subtitle: "Manage training partner organizations",
    category: "Navigation", 
    icon: Building2,
    href: "/tps",
    keywords: ["training partners", "tps", "organizations", "manage"]
  },
  {
    id: "batches",
    title: "Batches & Students",
    subtitle: "Track training batches and student progress",
    category: "Navigation",
    icon: GraduationCap,
    href: "/batches",
    keywords: ["batches", "students", "training", "progress", "enrollment"]
  },
  {
    id: "placements",
    title: "Placements",
    subtitle: "Monitor job placements and verification", 
    category: "Navigation",
    icon: Briefcase,
    href: "/placements",
    keywords: ["placements", "jobs", "employment", "verification"]
  },
  {
    id: "payments",
    title: "Payments",
    subtitle: "Manage milestone payments and invoicing",
    category: "Navigation",
    icon: CreditCard,
    href: "/payments",
    keywords: ["payments", "milestones", "invoicing", "money"]
  },
  {
    id: "approvals",
    title: "Approvals",
    subtitle: "Review and process pending approvals",
    category: "Navigation",
    icon: Shield,
    href: "/approvals", 
    keywords: ["approvals", "pending", "review", "process"]
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    subtitle: "Generate comprehensive system reports",
    category: "Navigation",
    icon: FileText,
    href: "/reports",
    keywords: ["reports", "analytics", "generate", "data", "export"]
  },
  {
    id: "integrations",
    title: "Integrations",
    subtitle: "Manage external system connections",
    category: "Navigation",
    icon: Settings,
    href: "/integrations",
    keywords: ["integrations", "external", "api", "connections"]
  },
  {
    id: "audit-logs",
    title: "Audit Logs",
    subtitle: "View system activity and changes",
    category: "Navigation",
    icon: Clock,
    href: "/audit-logs",
    keywords: ["audit", "logs", "activity", "history", "changes"]
  },

  // Actions
  {
    id: "new-tp",
    title: "Create New Training Partner",
    subtitle: "Add a new training partner organization",
    category: "Actions",
    icon: Building2,
    href: "/tps/new",
    keywords: ["create", "new", "training partner", "add", "organization"]
  },
  {
    id: "new-batch", 
    title: "Create New Batch",
    subtitle: "Start a new training batch",
    category: "Actions",
    icon: GraduationCap,
    href: "/batches/new",
    keywords: ["create", "new", "batch", "training", "start"]
  },
  {
    id: "new-placement",
    title: "Record New Placement",
    subtitle: "Add a new job placement record",
    category: "Actions",
    icon: Briefcase,
    href: "/placements/new", 
    keywords: ["record", "new", "placement", "job", "employment"]
  },

  // Students (Demo Data)
  {
    id: "student-rahul",
    title: "Rahul Kumar",
    subtitle: "Web Developer at Tech Solutions Ltd - ₹4,50,000",
    category: "Students",
    icon: Users,
    href: "/placements/1",
    keywords: ["rahul", "kumar", "student", "web developer", "tech solutions", "placement", "verified"]
  },
  {
    id: "student-priya",
    title: "Priya Sharma", 
    subtitle: "Data Analyst at DataCorp Analytics - ₹5,20,000",
    category: "Students",
    icon: Users,
    href: "/placements/2",
    keywords: ["priya", "sharma", "student", "data analyst", "datacorp", "pending", "placement"]
  },
  {
    id: "student-amit",
    title: "Amit Singh",
    subtitle: "App Developer at Mobile Innovations - ₹4,80,000",
    category: "Students",
    icon: Users,
    href: "/placements/3",
    keywords: ["amit", "singh", "student", "app developer", "mobile", "verified", "placement"]
  },

  // Companies (Demo Data)
  {
    id: "company-tech-solutions",
    title: "Tech Solutions Ltd",
    subtitle: "Web development company - 1 placement",
    category: "Companies",
    icon: Building2,
    href: "/placements/1",
    keywords: ["tech solutions", "web development", "company", "rahul kumar"]
  },
  {
    id: "company-datacorp",
    title: "DataCorp Analytics",
    subtitle: "Data analytics company - 1 placement",
    category: "Companies",
    icon: Building2,
    href: "/placements/2",
    keywords: ["datacorp", "data analytics", "company", "priya sharma"]
  },
  {
    id: "company-mobile-innovations",
    title: "Mobile Innovations",
    subtitle: "Mobile app development - 1 placement", 
    category: "Companies",
    icon: Building2,
    href: "/placements/3",
    keywords: ["mobile innovations", "mobile app", "company", "amit singh"]
  },

  // Training Partners
  {
    id: "tp-techskills",
    title: "TechSkills Training Center",
    subtitle: "Computer training and certification",
    category: "Training Partners",
    icon: Building2,
    href: "/tps/techskills",
    keywords: ["techskills", "training partner", "computer", "certification"]
  },
  {
    id: "tp-skilldev",
    title: "SkillDev Institute",
    subtitle: "Professional skill development programs",
    category: "Training Partners", 
    icon: Building2,
    href: "/tps/skilldev",
    keywords: ["skilldev", "institute", "training partner", "professional", "skills"]
  },

  // Batches
  {
    id: "batch-data-entry-2024-01",
    title: "Data Entry Operator - Batch 2024-01",
    subtitle: "25 students • Started Jan 2024 • TechSkills",
    category: "Batches",
    icon: GraduationCap,
    href: "/batches/data-entry-2024-01",
    keywords: ["data entry", "batch", "2024", "techskills", "25 students"]
  },
  {
    id: "batch-hardware-2024-02", 
    title: "Computer Hardware - Batch 2024-02",
    subtitle: "20 students • Started Feb 2024 • SkillDev",
    category: "Batches",
    icon: GraduationCap,
    href: "/batches/hardware-2024-02",
    keywords: ["computer hardware", "batch", "2024", "skilldev", "20 students"]
  },

  // Job Roles/Positions
  {
    id: "role-web-developer",
    title: "Web Developer Positions",
    subtitle: "2 placements • Average salary ₹4,50,000",
    category: "Job Roles",
    icon: Briefcase,
    href: "/placements?filter=web-developer",
    keywords: ["web developer", "job role", "placement", "salary", "technology"]
  },
  {
    id: "role-data-analyst",
    title: "Data Analyst Positions", 
    subtitle: "1 placement • Average salary ₹5,20,000",
    category: "Job Roles",
    icon: Briefcase,
    href: "/placements?filter=data-analyst",
    keywords: ["data analyst", "job role", "placement", "analytics", "salary"]
  }
]

interface SpotlightSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setResults(searchData.slice(0, 8)) // Show initial results
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Search functionality
  useEffect(() => {
    if (!query.trim()) {
      setResults(searchData.slice(0, 8))
      setSelectedIndex(0)
      return
    }

    const searchTerms = query.toLowerCase().split(" ")
    const filteredResults = searchData.filter(item => {
      const searchableText = [
        item.title,
        item.subtitle || "",
        item.category,
        ...item.keywords
      ].join(" ").toLowerCase()

      return searchTerms.every(term => searchableText.includes(term))
    })

    setResults(filteredResults.slice(0, 8))
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case "ArrowUp":
          e.preventDefault() 
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  const handleSelect = (result: SearchResult) => {
    router.push(result.href)
    onClose()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Navigation": return "bg-blue-100 text-blue-800"
      case "Actions": return "bg-green-100 text-green-800" 
      case "Students": return "bg-purple-100 text-purple-800"
      case "Companies": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="flex items-center border-b border-gray-200 px-4 py-3">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <Input
            ref={inputRef}
            placeholder="Search across system..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base placeholder:text-gray-500 flex-1"
          />
          <div className="flex items-center gap-3 ml-3 text-xs text-gray-500">
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded border">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center w-6 h-6"
            >
              <span className="text-gray-500 font-medium">×</span>
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-1">Try different keywords or check spelling</p>
            </div>
          ) : (
            <div className="p-2">
              {results.map((result, index) => {
                const Icon = result.icon
                const isSelected = index === selectedIndex
                
                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                      isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 truncate">
                          {result.title}
                        </span>
                        <Badge variant="outline" className={cn("text-xs", getCategoryColor(result.category))}>
                          {result.category}
                        </Badge>
                      </div>
                      {result.subtitle && (
                        <p className="text-sm text-gray-500 truncate">
                          {result.subtitle}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function useSpotlightSearch() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }
}