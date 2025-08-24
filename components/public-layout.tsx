"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl">DRISHTI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                How It Works <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/how-it-works/training-partners" className="block px-4 py-2 text-sm hover:bg-muted">
                  Training Partners
                </Link>
                <Link href="/how-it-works/students" className="block px-4 py-2 text-sm hover:bg-muted">
                  Students
                </Link>
                <Link href="/how-it-works/employers" className="block px-4 py-2 text-sm hover:bg-muted">
                  Employers
                </Link>
              </div>
            </div>
            <Link href="/programs" className="text-sm font-medium hover:text-primary transition-colors">
              Programs
            </Link>
            <Link href="/employers" className="text-sm font-medium hover:text-primary transition-colors">
              Employers
            </Link>
            <Link href="/news" className="text-sm font-medium hover:text-primary transition-colors">
              News
            </Link>
            <Link href="/help" className="text-sm font-medium hover:text-primary transition-colors">
              Help
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/tp/register">Register as TP</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
              <Link href="/about" className="block text-sm font-medium">
                About
              </Link>
              <Link href="/how-it-works" className="block text-sm font-medium">
                How It Works
              </Link>
              <Link href="/programs" className="block text-sm font-medium">
                Programs
              </Link>
              <Link href="/employers" className="block text-sm font-medium">
                Employers
              </Link>
              <Link href="/news" className="block text-sm font-medium">
                News
              </Link>
              <Link href="/help" className="block text-sm font-medium">
                Help
              </Link>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/tp/register">Register as TP</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">D</span>
                </div>
                <span className="font-bold text-xl">DRISHTI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering government training programs with comprehensive partner management and student tracking
                capabilities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="text-muted-foreground hover:text-foreground">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/tp/register" className="text-muted-foreground hover:text-foreground">
                    Register as TP
                  </Link>
                </li>
                <li>
                  <Link href="/employers" className="text-muted-foreground hover:text-foreground">
                    For Employers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/developers" className="text-muted-foreground hover:text-foreground">
                    Developers
                  </Link>
                </li>
                <li>
                  <Link href="/transparency" className="text-muted-foreground hover:text-foreground">
                    Transparency
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-muted-foreground hover:text-foreground">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="text-muted-foreground hover:text-foreground">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link href="/rti" className="text-muted-foreground hover:text-foreground">
                    RTI
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2024 DRISHTI. All rights reserved. Government of India.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-foreground">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
