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
      <header className="absolute top-0 z-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl text-white">DRISHTI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              About
            </Link>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-white/90 hover:text-white transition-colors">
                How It Works <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-black/80 backdrop-blur-md border border-white/20 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/how-it-works/training-partners" className="block px-4 py-2 text-sm text-white hover:bg-white/10">
                  Training Partners
                </Link>
                <Link href="/how-it-works/students" className="block px-4 py-2 text-sm text-white hover:bg-white/10">
                  Students
                </Link>
                <Link href="/how-it-works/employers" className="block px-4 py-2 text-sm text-white hover:bg-white/10">
                  Employers
                </Link>
              </div>
            </div>
            <Link href="/programs" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Programs
            </Link>
            <Link href="/employers" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Employers
            </Link>
            <Link href="/news" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              News
            </Link>
            <Link href="/help" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Help
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm" asChild>
              <Link href="/tp/register">Register as TP</Link>
            </Button>
            <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
              <Link href="/about" className="block text-sm font-medium text-white">
                About
              </Link>
              <Link href="/how-it-works" className="block text-sm font-medium text-white">
                How It Works
              </Link>
              <Link href="/programs" className="block text-sm font-medium text-white">
                Programs
              </Link>
              <Link href="/employers" className="block text-sm font-medium text-white">
                Employers
              </Link>
              <Link href="/news" className="block text-sm font-medium text-white">
                News
              </Link>
              <Link href="/help" className="block text-sm font-medium text-white">
                Help
              </Link>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full bg-transparent border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/tp/register">Register as TP</Link>
                </Button>
                <Button className="w-full bg-white/20 border border-white/30 text-white hover:bg-white/30" asChild>
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
