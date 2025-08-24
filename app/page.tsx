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
import AnimatedCounter from "@/components/animated-counter"
import { UnicornHeroBackground } from "@/components/unicorn-hero-background"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* UnicornStudio Background */}
        <UnicornHeroBackground />
        
        {/* Content Overlay */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge
                  variant="secondary"
                  className="mb-8 px-4 py-2 text-sm font-medium bg-white/10 text-white border border-white/20 shadow-lg backdrop-blur-md rounded-full"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Government of India Initiative
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
                  Transforming Lives 
                  <br />
                  <span className="text-white/90">
                    Across India
                  </span>
                </h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-white mb-16 max-w-4xl mx-auto leading-relaxed font-medium"
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
                    className="text-lg px-10 py-6 bg-white text-black hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
                  >
                    Join as Training Partner <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-6 border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 bg-white/5"
                  >
                    Discover How It Works
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="text-center group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
                      <AnimatedCounter value={1247} />
                    </div>
                    <div className="text-xs text-white/70 font-medium">Active Training Partners</div>
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
                      <AnimatedCounter value={28934} />
                    </div>
                    <div className="text-xs text-white/70 font-medium">Students Trained</div>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
                      <AnimatedCounter value={78} suffix="%" />
                    </div>
                    <div className="text-xs text-white/70 font-medium">Placement Rate</div>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
                      <AnimatedCounter value={3.2} suffix="L" prefix="₹" decimals={1} />
                    </div>
                    <div className="text-xs text-white/70 font-medium">Average Salary</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              Our <span className="text-foreground/70">Mission & Vision</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Driving India's transformation through comprehensive skill development and training excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:bg-white/10 hover:border-white/20">
                <CardHeader className="text-center">
                  <motion.div
                    className="mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Target className="h-16 w-16 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <CardTitle className="text-3xl mb-6 text-foreground group-hover:text-foreground/90 transition-colors duration-300" style={{ fontFamily: 'var(--font-instrument-sans)' }}>Our Mission</CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                    To create a unified, transparent, and efficient ecosystem for government training programs that
                    empowers training partners, supports students, and connects skilled professionals with meaningful
                    employment opportunities across India.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:bg-white/10 hover:border-white/20">
                <CardHeader className="text-center">
                  <motion.div
                    className="mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Eye className="h-16 w-16 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <CardTitle className="text-3xl mb-6 text-foreground group-hover:text-foreground/90 transition-colors duration-300" style={{ fontFamily: 'var(--font-instrument-sans)' }}>Our Vision</CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                    To be the cornerstone of India's skill development infrastructure, enabling a future where every
                    citizen has access to quality training and employment opportunities, driving economic growth and
                    social progress.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              Comprehensive Training <span className="text-foreground/70">Management</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From partner onboarding to placement tracking, DRISHTI provides end-to-end solutions for India's skill
              development ecosystem with cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20">
                <CardHeader className="text-center p-10">
                  <motion.div 
                    className="w-20 h-20 bg-white/5 border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Users className="h-10 w-10 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <CardTitle className="text-2xl mb-6 text-foreground group-hover:text-foreground/90 transition-colors duration-300" style={{ fontFamily: 'var(--font-instrument-sans)' }}>Training Partner Management</CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                    Streamlined onboarding, verification, and monitoring of training organizations across India with
                    real-time compliance tracking.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20">
                <CardHeader className="text-center p-10">
                  <motion.div 
                    className="w-20 h-20 bg-white/5 border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BarChart3 className="h-10 w-10 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <CardTitle className="text-2xl mb-6 text-foreground group-hover:text-foreground/90 transition-colors duration-300" style={{ fontFamily: 'var(--font-instrument-sans)' }}>Real-time Analytics</CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                    Comprehensive dashboards and intelligent reports for tracking performance, placements, and outcomes
                    with predictive insights.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20">
                <CardHeader className="text-center p-10">
                  <motion.div 
                    className="w-20 h-20 bg-white/5 border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Shield className="h-10 w-10 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <CardTitle className="text-2xl mb-6 text-foreground group-hover:text-foreground/90 transition-colors duration-300" style={{ fontFamily: 'var(--font-instrument-sans)' }}>Quality Assurance</CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                    Robust verification systems, comprehensive audit trails, and automated compliance monitoring for
                    program integrity.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              How <span className="text-foreground/80">DRISHTI</span> Works
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A streamlined process designed for efficiency, transparency, and measurable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center group">
              <div className="w-24 h-24 bg-muted border border-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Register & Verify</h3>
              <p className="text-muted-foreground leading-relaxed">
                Training partners complete registration and undergo comprehensive verification process.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-muted border border-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Create Programs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Design and launch skill development programs tailored to market demands.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-muted border border-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor student progress, attendance, and performance in real-time.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-muted border border-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              Training <span className="text-foreground/80">Programs</span>
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
      <section className="py-32 bg-muted text-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8" style={{ fontFamily: 'var(--font-instrument-sans)' }}>Transforming Lives Across India</h2>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              Powered by <span className="text-foreground/80">Advanced Technology</span>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              What Our <span className="text-foreground/80">Partners</span> Say
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Success stories from training partners and students across India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-card/80 backdrop-blur-sm p-8">
              <CardHeader>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-muted border border-muted-foreground/20 rounded-full flex items-center justify-center mr-4">
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
                  <div className="w-16 h-16 bg-muted border border-muted-foreground/20 rounded-full flex items-center justify-center mr-4">
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
                  <div className="w-16 h-16 bg-muted border border-muted-foreground/20 rounded-full flex items-center justify-center mr-4">
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
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              <span className="text-foreground/80">Pan-India</span> Presence
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
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              Comprehensive <span className="text-foreground/80">Support</span>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
              Seamless <span className="text-foreground/80">Integrations</span>
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
      <section className="py-32 bg-muted text-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8" style={{ fontFamily: 'var(--font-instrument-sans)' }}>
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
