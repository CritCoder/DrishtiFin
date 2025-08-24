import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Award, Users2 } from "lucide-react"

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About DRISHTI</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transforming India's skill development landscape through technology, transparency, and collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a unified, transparent, and efficient ecosystem for government training programs that
                  empowers training partners, supports students, and connects skilled professionals with meaningful
                  employment opportunities across India.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the cornerstone of India's skill development infrastructure, enabling a future where every
                  citizen has access to quality training and employment opportunities, driving economic growth and
                  social progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Governance & Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              DRISHTI operates under the guidance of experienced leaders committed to transparency and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users2 className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Ministry of Skill Development</CardTitle>
                <CardDescription>Policy Framework & Strategic Direction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Provides overarching policy guidance and ensures alignment with national skill development objectives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>OSDA Implementation Team</CardTitle>
                <CardDescription>Program Execution & Management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Dedicated team responsible for day-to-day operations, partner management, and program delivery.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Advisory Committee</CardTitle>
                <CardDescription>Industry Expertise & Guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Industry experts and stakeholders providing strategic advice on market needs and best practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Principles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The values that guide our approach to skill development and platform management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                Transparency
              </Badge>
              <p className="text-sm text-muted-foreground">
                Open data, clear processes, and public accountability in all operations.
              </p>
            </div>

            <div className="text-center">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                Quality
              </Badge>
              <p className="text-sm text-muted-foreground">
                Rigorous standards for training partners and continuous improvement of outcomes.
              </p>
            </div>

            <div className="text-center">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                Accessibility
              </Badge>
              <p className="text-sm text-muted-foreground">
                Equal opportunities for all citizens regardless of background or location.
              </p>
            </div>

            <div className="text-center">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                Innovation
              </Badge>
              <p className="text-sm text-muted-foreground">
                Leveraging technology to create efficient and effective training solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Measurable outcomes that demonstrate our commitment to India's skill development goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-80">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-80">Training Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-sm opacity-80">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
