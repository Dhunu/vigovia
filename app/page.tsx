"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MapPin,
  Calendar,
  Plane,
  Star,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Shield
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const features = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Smart Itinerary Planning",
      description: "Create detailed day-by-day travel plans with activities, transfers, and accommodations."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Real-time Scheduling",
      description: "Automatically organize your travel timeline with optimal timing and logistics."
    },
    {
      icon: <Plane className="h-8 w-8" />,
      title: "Flight Integration",
      description: "Seamlessly manage flight details and connect them with your travel itinerary."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Group Travel Ready",
      description: "Plan for solo trips or groups with capacity management and shared activities."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Destinations",
      description: "Create itineraries for any destination worldwide with local insights."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Beautiful PDFs",
      description: "Generate professional, printable itineraries that wow your clients."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Travel Agent",
      content: "Vigovia has transformed how I create itineraries. What used to take hours now takes minutes!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Tour Operator",
      content: "The professional PDF output impresses our clients every time. Best investment we've made.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Travel Consultant",
      content: "Intuitive interface and powerful features. My productivity has increased by 300%.",
      rating: 5
    }
  ]

  const stats = [
    { number: "10,000+", label: "Itineraries Created" },
    { number: "500+", label: "Travel Agencies" },
    { number: "50+", label: "Countries Covered" },
    { number: "99.9%", label: "Uptime" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF4FF] to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-[#541C9C]">vigovia</div>
              <span className="text-sm text-[#680099] font-medium">PLAN.PACK.GO</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-[#680099] hover:text-[#541C9C] transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-[#680099] hover:text-[#541C9C] transition-colors">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-[#680099] hover:text-[#541C9C] transition-colors">
                Pricing
              </Link>
              <Button asChild className="bg-[#541C9C] hover:bg-[#680099]">
                <Link href="/create">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center bg-[#936FE0]/10 text-[#541C9C] px-3 py-1 rounded-full text-sm font-medium">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Professional Itinerary Builder
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-[#541C9C] leading-tight">
                    Create
                    <span className="bg-gradient-to-r from-[#541C9C] to-[#936FE0] bg-clip-text text-transparent">
                      {" "}Beautiful{" "}
                    </span>
                    Travel Itineraries
                  </h1>
                  <p className="text-xl text-[#680099] leading-relaxed">
                    Build comprehensive travel plans with activities, transfers, flights, and pricing.
                    Generate professional PDFs that impress your clients and streamline your workflow.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-[#541C9C] to-[#680099] hover:from-[#680099] hover:to-[#936FE0] text-white px-8 py-3 text-lg">
                    <Link href="/create" className="flex items-center">
                      Start Building Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-[#541C9C] text-[#541C9C] hover:bg-[#541C9C] hover:text-white px-8 py-3 text-lg">
                    View Demo
                  </Button>
                </div>

                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-r from-[#541C9C] to-[#936FE0] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="ml-3 text-[#680099] font-medium">Join 10,000+ travel professionals</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-[#541C9C] to-[#680099] text-white">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Day 1 - Tokyo, Japan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-[#FBF4FF] rounded-lg">
                        <Clock className="h-5 w-5 text-[#541C9C]" />
                        <div>
                          <p className="font-semibold text-[#541C9C]">9:00 AM - Tokyo Skytree</p>
                          <p className="text-sm text-[#680099]">Panoramic city views • 2 hours • $25</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#FBF4FF] rounded-lg">
                        <Clock className="h-5 w-5 text-[#541C9C]" />
                        <div>
                          <p className="font-semibold text-[#541C9C]">2:00 PM - Senso-ji Temple</p>
                          <p className="text-sm text-[#680099]">Historic temple visit • 1.5 hours • Free</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#FBF4FF] rounded-lg">
                        <Clock className="h-5 w-5 text-[#541C9C]" />
                        <div>
                          <p className="font-semibold text-[#541C9C]">7:00 PM - Shibuya Crossing</p>
                          <p className="text-sm text-[#680099]">Famous intersection • 1 hour • Free</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#541C9C]/20 to-[#936FE0]/20 rounded-2xl transform rotate-3 scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#936FE0]/10 to-[#541C9C]/10 rounded-2xl transform -rotate-2 scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#541C9C] mb-2">{stat.number}</div>
                  <div className="text-[#680099] font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#541C9C] mb-6">
                Everything You Need to Create
                <span className="bg-gradient-to-r from-[#541C9C] to-[#936FE0] bg-clip-text text-transparent">
                  {" "}Perfect Itineraries
                </span>
              </h2>
              <p className="text-xl text-[#680099] max-w-3xl mx-auto">
                Powerful features designed specifically for travel professionals who want to deliver exceptional experiences.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <CardContent className="p-8">
                    <div className="text-[#541C9C] mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#541C9C] mb-3">{feature.title}</h3>
                    <p className="text-[#680099] leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-[#541C9C]/5 to-[#936FE0]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#541C9C] mb-6">
                Simple 3-Step Process
              </h2>
              <p className="text-xl text-[#680099] max-w-3xl mx-auto">
                From initial planning to final delivery, create professional itineraries in minutes.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Add Basic Information",
                  description: "Enter customer details, destination, dates, and trip duration to get started.",
                  icon: <Users className="h-8 w-8" />
                },
                {
                  step: "02",
                  title: "Build Your Itinerary",
                  description: "Add activities, transfers, and flights with detailed timing and pricing.",
                  icon: <Calendar className="h-8 w-8" />
                },
                {
                  step: "03",
                  title: "Generate & Share",
                  description: "Create beautiful PDF itineraries that you can share with clients instantly.",
                  icon: <Star className="h-8 w-8" />
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#541C9C] to-[#680099] text-white rounded-full text-2xl font-bold mb-6">
                        {step.step}
                      </div>
                      <div className="text-[#541C9C] mb-4 flex justify-center">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#541C9C] mb-3">{step.title}</h3>
                      <p className="text-[#680099] leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-[#936FE0]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#541C9C] mb-6">
                Trusted by Travel Professionals
              </h2>
              <p className="text-xl text-[#680099] max-w-3xl mx-auto">
                See why thousands of travel agents and tour operators choose Vigovia for their itinerary needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#680099] mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-bold text-[#541C9C]">{testimonial.name}</p>
                      <p className="text-[#680099] text-sm">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#541C9C] to-[#680099]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Travel Planning?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of travel professionals who have streamlined their workflow with Vigovia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-[#541C9C] hover:bg-purple-50 px-8 py-3 text-lg font-semibold">
                <Link href="/create" className="flex items-center">
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#541C9C] px-8 py-3 text-lg">
                Schedule Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6 text-purple-100">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>Secure & reliable</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#321E5D] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Our offerings</h3>
              <ul className="space-y-2 text-sm">
                <li>Holidays</li>
                <li>Visa</li>
                <li>Forex</li>
                <li>Hotels</li>
                <li>Flights</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Popular destinations</h3>
              <ul className="space-y-2 text-sm">
                <li>Dubai</li>
                <li>Bali</li>
                <li>Thailand</li>
                <li>Singapore</li>
                <li>Malaysia</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Vigovia Specials</h3>
              <ul className="space-y-2 text-sm">
                <li>Featured Experience</li>
                <li>Group Tours</li>
                <li>Backpackers Club</li>
                <li>Offline Events</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Vigovia Blog</li>
                <li>Partner Portal</li>
                <li>Accreditations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="text-sm space-y-2">
                <p>Need help? Call us</p>
                <p className="font-semibold">+91-98xxx64641</p>
                <p>Email: contact@vigovia.com</p>
                <p>HD-109 Cinnabar Hills,Links Business Park,Bangalore North,Bangalore,Karnataka,India-560071</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">vigovia</div>
              <span className="text-sm">PLAN.PACK.GO</span>
            </div>
            <div className="text-sm">© 2025 Vigovia Travel Technologies (P) Ltd. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
