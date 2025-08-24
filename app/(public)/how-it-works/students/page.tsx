import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, BookOpen, Award, Briefcase, CheckCircle, ArrowRight, Users, Clock, TrendingUp } from "lucide-react"

export default function StudentsPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">For Students</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover training programs, track your progress, and connect with employment opportunities through
              DRISHTI.
            </p>
            <Button size="lg" asChild>
              <Link href="/programs">
                Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Student Journey */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Learning Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From discovery to employment, DRISHTI supports you at every step of your skill development journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Discover</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse and find training programs that match your interests and career goals
              </p>
              <Badge variant="secondary">Free</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. Learn</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enroll in programs and gain practical skills through hands-on training
              </p>
              <Badge variant="secondary">3-6 months</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. Certify</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete assessments and receive recognized certifications
              </p>
              <Badge variant="secondary">Industry-recognized</Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">4. Work</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get connected with employers and secure meaningful employment
              </p>
              <Badge variant="secondary">78% placement rate</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose DRISHTI Programs?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Government-backed training programs designed for real-world success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Quality Assured</CardTitle>
                <CardDescription>Government-verified training partners</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All training partners undergo rigorous verification to ensure high-quality training delivery and
                  infrastructure standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Industry-Recognized</CardTitle>
                <CardDescription>Certifications valued by employers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Earn certifications that are recognized across industries and increase your employability in the job
                  market.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Job Placement</CardTitle>
                <CardDescription>Direct connection to employers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access to a network of verified employers actively seeking skilled candidates from DRISHTI programs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Peer Learning</CardTitle>
                <CardDescription>Learn with like-minded individuals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Join a community of learners and build networks that support your professional growth.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Flexible Learning</CardTitle>
                <CardDescription>Programs designed for working professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Multiple batch timings and flexible schedules to accommodate different learning preferences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Career Growth</CardTitle>
                <CardDescription>Skills for long-term success</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Focus on both technical and soft skills to ensure comprehensive professional development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popular Training Programs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore some of the most in-demand skill development programs available through DRISHTI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>Full-stack web development skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">6 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Placement Rate:</span>
                    <span className="font-medium text-primary">85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Salary:</span>
                    <span className="font-medium">₹4.2L</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Digital Marketing</CardTitle>
                <CardDescription>Comprehensive digital marketing skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">4 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Placement Rate:</span>
                    <span className="font-medium text-primary">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Salary:</span>
                    <span className="font-medium">₹3.5L</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Data Analytics</CardTitle>
                <CardDescription>Data analysis and visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">5 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Placement Rate:</span>
                    <span className="font-medium text-primary">82%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Salary:</span>
                    <span className="font-medium">₹5.1L</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/programs">
                View All Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Skill Development Journey</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers through DRISHTI training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/programs">Browse Programs</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/help/contact">Get Guidance</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
