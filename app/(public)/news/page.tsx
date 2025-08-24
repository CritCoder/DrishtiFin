import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Calendar, ArrowRight, TrendingUp } from "lucide-react"

export default function NewsPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay informed about the latest developments, policy updates, and success stories from the DRISHTI
              ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search news and updates..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="policy">Policy Updates</SelectItem>
                  <SelectItem value="success">Success Stories</SelectItem>
                  <SelectItem value="announcements">Announcements</SelectItem>
                  <SelectItem value="partnerships">Partnerships</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Latest Updates</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Important announcements and developments in India's skill development landscape.
            </p>
          </div>

          {/* Featured Article */}
          <Card className="mb-12 hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-24 w-24 text-primary mx-auto mb-4" />
                  <Badge className="mb-4">Featured</Badge>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">Policy Update</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    December 15, 2024
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">New Guidelines for Training Partner Certification Released</h3>
                <p className="text-muted-foreground mb-6">
                  The Ministry of Skill Development has announced updated guidelines for training partner certification,
                  introducing enhanced quality standards and streamlined verification processes. These changes will take
                  effect from January 2025 and aim to improve training outcomes across all programs.
                </p>
                <Button asChild>
                  <Link href="/news/new-guidelines-training-partner-certification">
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Success Story</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 12, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">50,000 Students Successfully Placed This Year</CardTitle>
                <CardDescription>
                  DRISHTI achieves milestone with record placement numbers across all training programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The platform has facilitated over 50,000 successful job placements in 2024, marking a 35% increase
                  from the previous year. Technology and healthcare sectors led the growth...
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Partnership</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 10, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">Strategic Partnership with Leading Tech Companies</CardTitle>
                <CardDescription>
                  Major technology firms join DRISHTI to enhance employment opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Five leading technology companies have signed MoUs with DRISHTI to provide direct hiring opportunities
                  for skilled graduates. This partnership is expected to create 10,000+ job opportunities...
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Announcement</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 8, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">New Training Programs Launched for 2025</CardTitle>
                <CardDescription>Expanded curriculum covering emerging technologies and skills</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  DRISHTI announces 15 new training programs for 2025, including AI/ML, cybersecurity, and green energy
                  sectors. Registration opens January 15, 2025...
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Event</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 5, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">National Skill Development Summit 2024</CardTitle>
                <CardDescription>Annual conference brings together stakeholders from across India</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The three-day summit concluded with key insights on future skill requirements and policy
                  recommendations. Over 500 training partners and 100 employers participated...
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Policy Update</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 3, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">Enhanced Support for Rural Training Centers</CardTitle>
                <CardDescription>New initiatives to expand skill development in rural areas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Government announces additional funding and infrastructure support for training centers in rural
                  areas, aiming to bridge the urban-rural skill gap...
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Success Story</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Nov 28, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">From Trainee to Entrepreneur: Success Stories</CardTitle>
                <CardDescription>DRISHTI graduates launch successful startups and create jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Several DRISHTI graduates have launched their own companies, creating employment opportunities for
                  others. These success stories highlight the entrepreneurial impact of skill development...
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="bg-transparent">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest news, policy updates, and success stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email address" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
