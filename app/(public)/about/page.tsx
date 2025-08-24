import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Award, Users2, TrendingUp, Globe, Shield, Zap } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    About DRISHTI
                  </Badge>
                  <h1 className="text-hero gradient-text">
                    Transforming India's Skill Development
                  </h1>
                  <p className="text-subheading text-muted-foreground">
                    A unified, transparent, and efficient ecosystem for government training programs that empowers training partners, supports students, and connects skilled professionals with meaningful employment opportunities across India.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">50,000+</div>
                      <div className="text-sm text-muted-foreground">Students Trained</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">85%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl"></div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Globe className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-heading">National Impact</h3>
                      <p className="text-body text-muted-foreground">
                        Connecting talent across 25 states with opportunities that drive economic growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display mb-4">Our Mission & Vision</h2>
            <p className="text-subheading text-muted-foreground max-w-3xl mx-auto">
              Driving India's skill development forward with clear purpose and ambitious goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden border-0 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-heading">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-body text-muted-foreground leading-relaxed">
                  To create a unified, transparent, and efficient ecosystem for government training programs that
                  empowers training partners, supports students, and connects skilled professionals with meaningful
                  employment opportunities across India.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 -translate-x-16"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-heading">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-body text-muted-foreground leading-relaxed">
                  To be the cornerstone of India's skill development infrastructure, enabling a future where every
                  citizen has access to quality training and employment opportunities, driving economic growth and
                  social progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display mb-4">Our Core Principles</h2>
            <p className="text-subheading text-muted-foreground max-w-3xl mx-auto">
              The values that guide our approach to skill development and platform management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
                              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-heading mb-3">Transparency</h3>
              <p className="text-body text-muted-foreground">
                Open data, clear processes, and public accountability in all operations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-heading mb-3">Quality</h3>
              <p className="text-body text-muted-foreground">
                Rigorous standards for training partners and continuous improvement of outcomes.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-heading mb-3">Accessibility</h3>
              <p className="text-body text-muted-foreground">
                Equal opportunities for all citizens regardless of background or location.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-heading mb-3">Innovation</h3>
              <p className="text-body text-muted-foreground">
                Leveraging technology to create efficient and effective training solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display mb-4">Governance & Leadership</h2>
            <p className="text-subheading text-muted-foreground max-w-3xl mx-auto">
              DRISHTI operates under the guidance of experienced leaders committed to transparency and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users2 className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-heading">Ministry of Skill Development</CardTitle>
                <CardDescription className="text-subheading">Policy Framework & Strategic Direction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-muted-foreground">
                  Provides overarching policy guidance and ensures alignment with national skill development objectives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-secondary-foreground" />
                </div>
                <CardTitle className="text-heading">OSDA Implementation Team</CardTitle>
                <CardDescription className="text-subheading">Program Execution & Management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-muted-foreground">
                  Dedicated team responsible for day-to-day operations, partner management, and program delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-10 w-10 text-accent-foreground" />
                </div>
                <CardTitle className="text-heading">Advisory Committee</CardTitle>
                <CardDescription className="text-subheading">Industry Expertise & Guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-muted-foreground">
                  Industry experts and stakeholders providing strategic advice on market needs and best practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-display mb-4">Our Impact</h2>
            <p className="text-subheading opacity-90 max-w-3xl mx-auto">
              Measurable outcomes that demonstrate our commitment to India's skill development goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="text-4xl font-bold mb-3 group-hover:scale-110 transition-transform">50,000+</div>
              <div className="text-caption opacity-80">Students Trained</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold mb-3 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-caption opacity-80">Training Partners</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold mb-3 group-hover:scale-110 transition-transform">25</div>
              <div className="text-caption opacity-80">States Covered</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold mb-3 group-hover:scale-110 transition-transform">85%</div>
              <div className="text-caption opacity-80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
