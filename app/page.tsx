"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  Star,
  Globe,
  Award,
  Target,
  Eye,
  Zap,
  BookOpen,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
  Mail,
  Building2,
  GraduationCap,
  Briefcase,
  FileText,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PublicLayout } from "@/components/public-layout"
import ThreeHeroBackground from "@/components/three-hero-background"
import AnimatedCounter from "@/components/animated-counter"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Three.js Background */}
        <ThreeHeroBackground />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/90" style={{ zIndex: 2 }} />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl"
            animate={{ 
              x: [-128, 50, -128],
              y: [-128, -200, -128],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge
                variant="secondary"
                className="mb-8 px-6 py-3 text-base font-medium bg-white/10 text-white border-white/20 backdrop-blur-sm"
              >
                <Globe className="w-5 h-5 mr-2" />
                Government of India Initiative
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white">
                Transforming Lives 
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Across India
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Real impact, measurable results, sustainable growth
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/tp/register">
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 border-0"
                >
                  Join as Training Partner <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 bg-transparent"
                >
                  Discover How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <AnimatedCounter value={1247} />
                  </div>
                  <div className="text-sm text-white/80 font-medium">Active Training Partners</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <AnimatedCounter value={28934} />
                  </div>
                  <div className="text-sm text-white/80 font-medium">Students Trained</div>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <AnimatedCounter value={78} suffix="%" />
                  </div>
                  <div className="text-sm text-white/80 font-medium">Placement Rate</div>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <AnimatedCounter value={3.2} suffix="L" prefix="₹" decimals={1} />
                  </div>
                  <div className="text-sm text-white/80 font-medium">Average Salary</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              Our <span className="gradient-text">Mission & Vision</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Driving India's transformation through comprehensive skill development and training excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm p-8">
              <CardHeader className="text-center">
                <Target className="h-16 w-16 text-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-3xl mb-6 text-foreground">Our Mission</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  To create a unified, transparent, and efficient ecosystem for government training programs that
                  empowers training partners, supports students, and connects skilled professionals with meaningful
                  employment opportunities across India.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm p-8">
              <CardHeader className="text-center">
                <Eye className="h-16 w-16 text-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-3xl mb-6 text-foreground">Our Vision</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  To be the cornerstone of India's skill development infrastructure, enabling a future where every
                  citizen has access to quality training and employment opportunities, driving economic growth and
                  social progress.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              Comprehensive Training <span className="gradient-text">Management</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From partner onboarding to placement tracking, DRISHTI provides end-to-end solutions for India's skill
              development ecosystem with cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-6 text-foreground">Training Partner Management</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Streamlined onboarding, verification, and monitoring of training organizations across India with
                  real-time compliance tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-6 text-foreground">Real-time Analytics</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Comprehensive dashboards and intelligent reports for tracking performance, placements, and outcomes
                  with predictive insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <div className="w-20 h-20 bg-gradient-to-br from-chart-3 to-chart-3/70 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-6 text-foreground">Quality Assurance</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Robust verification systems, comprehensive audit trails, and automated compliance monitoring for
                  program integrity.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              How <span className="gradient-text">DRISHTI</span> Works
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A streamlined process designed for efficiency, transparency, and measurable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Register & Verify</h3>
              <p className="text-muted-foreground leading-relaxed">
                Training partners complete registration and undergo comprehensive verification process.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Create Programs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Design and launch skill development programs tailored to market demands.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-chart-3 to-chart-3/70 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor student progress, attendance, and performance in real-time.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-chart-4 to-chart-4/70 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Achieve Placements</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect graduates with employers and track successful placements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              Training <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Comprehensive skill development programs across diverse sectors and industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <BookOpen className="h-16 w-16 text-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">Technical Skills</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  IT, manufacturing, healthcare, and emerging technology training programs designed for industry
                  readiness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <Briefcase className="h-16 w-16 text-accent mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">Professional Development</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Soft skills, leadership, communication, and workplace readiness programs for career advancement.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <GraduationCap className="h-16 w-16 text-chart-3 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">Certification Programs</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Industry-recognized certifications and credentials that enhance employability and career prospects.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-r from-primary via-primary/90 to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Transforming Lives Across India</h2>
            <p className="text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Real impact, measurable results, sustainable growth
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 text-center max-w-6xl mx-auto">
            <div className="group">
              <div className="text-6xl md:text-7xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                1,247
              </div>
              <div className="text-xl opacity-90">Active Training Partners</div>
            </div>
            <div className="group">
              <div className="text-6xl md:text-7xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                28,934
              </div>
              <div className="text-xl opacity-90">Students Trained</div>
            </div>
            <div className="group">
              <div className="text-6xl md:text-7xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                78%
              </div>
              <div className="text-xl opacity-90">Placement Rate</div>
            </div>
            <div className="group">
              <div className="text-6xl md:text-7xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                ₹3.2L
              </div>
              <div className="text-xl opacity-90">Average Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              Powered by <span className="gradient-text">Advanced Technology</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Cutting-edge solutions that ensure scalability, security, and seamless user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <Zap className="h-16 w-16 text-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">Lightning Fast</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Optimized performance with sub-second response times and real-time data synchronization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <Shield className="h-16 w-16 text-accent mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">Enterprise Security</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Bank-grade security with end-to-end encryption and comprehensive audit trails.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <TrendingUp className="h-16 w-16 text-chart-3 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">Scalable Infrastructure</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Cloud-native architecture that grows with your needs and handles millions of users.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              What Our <span className="gradient-text">Partners</span> Say
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Success stories from training partners and students across India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm p-8">
              <CardHeader>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mr-4">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">TechSkills Institute</CardTitle>
                    <CardDescription className="text-muted-foreground">Training Partner</CardDescription>
                  </div>
                </div>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  "DRISHTI has transformed how we manage our training programs. The platform's intuitive design and
                  comprehensive features have increased our efficiency by 300%."
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm p-8">
              <CardHeader>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mr-4">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">Priya Sharma</CardTitle>
                    <CardDescription className="text-muted-foreground">Graduate Student</CardDescription>
                  </div>
                </div>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  "The training I received through DRISHTI helped me secure a job at a leading IT company. The placement
                  support was exceptional."
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm p-8">
              <CardHeader>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-chart-3 to-chart-3/70 rounded-full flex items-center justify-center mr-4">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">Infosys HR Team</CardTitle>
                    <CardDescription className="text-muted-foreground">Employer Partner</CardDescription>
                  </div>
                </div>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  "DRISHTI graduates consistently demonstrate high-quality skills and work readiness. They've become our
                  preferred hiring source."
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Geographic Reach Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              <span className="gradient-text">Pan-India</span> Presence
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Serving communities across all states and union territories with localized support.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            <div className="group">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold mb-2 text-foreground">28</div>
              <div className="text-muted-foreground">States & UTs</div>
            </div>
            <div className="group">
              <Building2 className="h-16 w-16 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold mb-2 text-foreground">150+</div>
              <div className="text-muted-foreground">Cities</div>
            </div>
            <div className="group">
              <Users className="h-16 w-16 text-chart-3 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold mb-2 text-foreground">500+</div>
              <div className="text-muted-foreground">Local Partners</div>
            </div>
            <div className="group">
              <Globe className="h-16 w-16 text-chart-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold mb-2 text-foreground">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              Comprehensive <span className="gradient-text">Support</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Dedicated assistance every step of the way, from onboarding to ongoing operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <Clock className="h-16 w-16 text-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">24/7 Availability</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Round-the-clock technical support and assistance for uninterrupted operations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <Phone className="h-16 w-16 text-accent mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">Dedicated Support</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Personal account managers and technical specialists for enterprise partners.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <FileText className="h-16 w-16 text-chart-3 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl mb-6 text-foreground">Training Resources</CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  Comprehensive documentation, video tutorials, and best practice guides.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              Seamless <span className="gradient-text">Integrations</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Connect with existing systems and third-party services for enhanced functionality.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            <div className="group p-8 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl">
              <Settings className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-2 text-foreground">Government APIs</h3>
              <p className="text-muted-foreground">GSTN, PAN, Aadhaar verification</p>
            </div>
            <div className="group p-8 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl">
              <BarChart3 className="h-16 w-16 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-2 text-foreground">Analytics Tools</h3>
              <p className="text-muted-foreground">Business intelligence platforms</p>
            </div>
            <div className="group p-8 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl">
              <Mail className="h-16 w-16 text-chart-3 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-2 text-foreground">Communication</h3>
              <p className="text-muted-foreground">Email, SMS, and notification services</p>
            </div>
            <div className="group p-8 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl">
              <Shield className="h-16 w-16 text-chart-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-2 text-foreground">Security Systems</h3>
              <p className="text-muted-foreground">Identity and access management</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-primary via-primary/90 to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Transform <span className="text-white/90">Skill Development?</span>
          </h2>
          <p className="text-2xl opacity-90 mb-16 leading-relaxed max-w-4xl mx-auto">
            Join thousands of training partners already using DRISHTI to deliver quality education, track outcomes, and
            build India's skilled workforce of tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/tp/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-xl px-12 py-6 bg-white text-primary hover:bg-white/90 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey Today
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/help/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-12 py-6 border-2 border-white text-white hover:bg-white/10 transition-all duration-200 bg-transparent"
              >
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
