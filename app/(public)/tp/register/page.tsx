import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, Shield, Clock, CheckCircle, Upload, ArrowRight, AlertCircle } from "lucide-react"

export default function TPRegisterPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Training Partner</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join India's largest skill development network and help shape the future workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Government Verified
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                7-10 Days Processing
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Free Registration
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Registration Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your organization verified and ready to deliver training programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Submit Application</h3>
              <p className="text-sm text-muted-foreground">Complete the registration form with organization details</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Document Verification</h3>
              <p className="text-sm text-muted-foreground">Upload required documents for verification</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Facility Inspection</h3>
              <p className="text-sm text-muted-foreground">On-site verification of training infrastructure</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold mb-2">Approval & Onboarding</h3>
              <p className="text-sm text-muted-foreground">Get approved and access the platform</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Training Partner Registration</CardTitle>
                <CardDescription>
                  Please provide accurate information. All fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Organization Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Organization Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization Name *</Label>
                      <Input id="org-name" placeholder="Enter organization name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-type">Organization Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private-limited">Private Limited Company</SelectItem>
                          <SelectItem value="public-limited">Public Limited Company</SelectItem>
                          <SelectItem value="partnership">Partnership Firm</SelectItem>
                          <SelectItem value="proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="trust">Trust</SelectItem>
                          <SelectItem value="society">Society</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incorporation-year">Year of Incorporation *</Label>
                      <Input id="incorporation-year" type="number" placeholder="YYYY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gst-number">GST Number *</Label>
                      <Input id="gst-number" placeholder="Enter GST number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pan-number">PAN Number *</Label>
                      <Input id="pan-number" placeholder="Enter PAN number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cin-number">CIN Number</Label>
                      <Input id="cin-number" placeholder="Enter CIN number (if applicable)" />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-person">Contact Person Name *</Label>
                      <Input id="contact-person" placeholder="Enter contact person name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation *</Label>
                      <Input id="designation" placeholder="Enter designation" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alt-phone">Alternative Phone</Label>
                      <Input id="alt-phone" placeholder="Enter alternative phone" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="Enter website URL" />
                    </div>
                  </div>
                </div>

                {/* Address Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Address Details</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Complete Address *</Label>
                      <Textarea id="address" placeholder="Enter complete address" rows={3} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="Enter city" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                            <SelectItem value="arunachal-pradesh">Arunachal Pradesh</SelectItem>
                            <SelectItem value="assam">Assam</SelectItem>
                            <SelectItem value="bihar">Bihar</SelectItem>
                            <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                            <SelectItem value="goa">Goa</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="haryana">Haryana</SelectItem>
                            <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                            <SelectItem value="jharkhand">Jharkhand</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="kerala">Kerala</SelectItem>
                            <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="manipur">Manipur</SelectItem>
                            <SelectItem value="meghalaya">Meghalaya</SelectItem>
                            <SelectItem value="mizoram">Mizoram</SelectItem>
                            <SelectItem value="nagaland">Nagaland</SelectItem>
                            <SelectItem value="odisha">Odisha</SelectItem>
                            <SelectItem value="punjab">Punjab</SelectItem>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="sikkim">Sikkim</SelectItem>
                            <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="telangana">Telangana</SelectItem>
                            <SelectItem value="tripura">Tripura</SelectItem>
                            <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                            <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                            <SelectItem value="west-bengal">West Bengal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input id="pincode" placeholder="Enter PIN code" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training Capabilities */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Training Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="training-sectors">Training Sectors *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology & IT</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail & Sales</SelectItem>
                          <SelectItem value="finance">Finance & Banking</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="training-capacity">Training Capacity (per batch) *</Label>
                      <Input id="training-capacity" type="number" placeholder="Enter capacity" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facility-area">Facility Area (sq ft) *</Label>
                      <Input id="facility-area" type="number" placeholder="Enter area in sq ft" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience-years">Years of Experience *</Label>
                      <Input id="experience-years" type="number" placeholder="Enter years" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <Label htmlFor="training-programs">Proposed Training Programs *</Label>
                    <Textarea
                      id="training-programs"
                      placeholder="List the training programs you plan to offer"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Certificate of Incorporation *</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>GST Registration Certificate *</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>PAN Card *</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bank Account Details *</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Facility Ownership/Lease Documents *</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Audited Financial Statements</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/legal/terms" className="text-primary hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/legal/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="accuracy" />
                    <Label htmlFor="accuracy" className="text-sm leading-relaxed">
                      I certify that all information provided is accurate and complete to the best of my knowledge
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="verification" />
                    <Label htmlFor="verification" className="text-sm leading-relaxed">
                      I understand that false information may result in rejection of application or termination of
                      partnership
                    </Label>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Important Notice</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Processing time: 7-10 business days after document submission</li>
                        <li>• Facility inspection will be scheduled after initial verification</li>
                        <li>• All uploaded documents should be clear and legible</li>
                        <li>• You will receive email updates on application status</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1">
                    Submit Application <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 bg-transparent">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our support team is here to assist you throughout the registration process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Documentation Guide</CardTitle>
                <CardDescription>Step-by-step guide for document preparation</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="w-full bg-transparent">
                  Download Guide
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Eligibility Checker</CardTitle>
                <CardDescription>Verify if your organization meets requirements</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="w-full bg-transparent">
                  Check Eligibility
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Support Center</CardTitle>
                <CardDescription>Get help from our dedicated support team</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/help/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
