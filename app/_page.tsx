import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Play, Menu, X } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Alex Taylor",
    quote: "",
    image: "/placeholder.svg",
    stars: 5,
  },
  {
    name: "Mia Roberts",
    quote:
      "TheoryDrive has revolutionized our approach to teaching driving concepts!",
    image: "/placeholder.svg",
    stars: 5,
  },
  {
    name: "Ethan Clark",
    quote: "",
    image: "/placeholder.svg",
    stars: 5,
  },
  {
    name: "Chloe Adams",
    quote: "",
    image: "/placeholder.svg",
    stars: 5,
  },
];

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
                alt="Tsindacyane Logo"
                width={150}
                height={30}
                className="h-6 sm:h-7 lg:h-8 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/login"
              className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Log in to your account
            </Link>
            <Link href="/signup">
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-2.5 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
                Create an account
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/login"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in to your account
              </Link>
              <Link href="/signup">
                <Button 
                  className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-sm py-3 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create an account
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="py-8 sm:py-12 lg:py-20 text-center">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-4 sm:mb-6 lg:mb-8 px-2">
              Your Journey to Safe Driving Begins Here! Learn Anytime, Anywhere.
            </h1>
            <Link href="/signup">
              <Button size="lg" className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base px-6 py-3">
                Start Your Learning Adventure Now
              </Button>
            </Link>

            <div className="mt-8 sm:mt-12 lg:mt-16 relative aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Student driver learning with an instructor"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                  <Play className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
              Take A short Quiz
            </h2>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                    3. What is the main purpose of ABS (Anti-lock Braking
                    System)?
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="Car braking on wet road"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                      {[
                        "To reduce tire wear.",
                        "To prevent the wheels from locking during braking.",
                        "To enhance fuel efficiency.",
                        "To provide smoother acceleration.",
                      ].map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border hover:border-blue-600 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="abs-question"
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm lg:text-base text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="mb-2 text-blue-600 text-sm lg:text-base">Pricing Plans</div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold mb-4">
              Flexible plans tailored to your needs
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 lg:mb-12 text-sm lg:text-base px-4">
              Transparent pricing that adapts as you grow. Try any plan free for
              30 days.
            </p>

            <Card className="max-w-sm mx-auto">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <h3 className="text-lg lg:text-xl font-semibold mb-4">Advanced Plan</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">$30</span>
                  <span className="text-gray-600 ml-2 text-sm lg:text-base">per month</span>
                </div>
                <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
                  Enhanced features and detailed reporting.
                </p>
                <Link href="/signup">
                  <Button className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 sm:mb-8 lg:mb-12 gap-4">
              <div className="max-w-2xl">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold mb-4">
                  Don't just take our word for it!
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                  Listen to our amazing users who are excelling in their
                  theoretical driving classes.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="w-8 h-8 lg:w-10 lg:h-10">
                  <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8 lg:w-10 lg:h-10">
                  <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden group"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80"
                    alt={`${testimonial.name}'s testimonial`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3 sm:p-4 lg:p-6 text-white">
                    <div className="flex mb-2">
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 fill-current" />
                      ))}
                    </div>
                    {testimonial.quote && (
                      <p className="mb-2 text-xs lg:text-sm">{testimonial.quote}</p>
                    )}
                    <p className="font-semibold text-sm lg:text-base">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="w-5 h-5 lg:w-6 lg:h-6"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base">Untitled UI</h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Create exceptional driving experiences that bring joy to
                    learners.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center w-full sm:w-auto">
                <div className="text-xs lg:text-sm font-medium">Stay informed</div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full sm:w-64 text-sm"
                  />
                  <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base w-full sm:w-auto">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 lg:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs lg:text-sm text-gray-600">
              © 2077 SmartDrive. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 lg:gap-6 justify-center sm:justify-end">
              <Link
                href="#"
                className="text-xs lg:text-sm text-gray-600 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs lg:text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs lg:text-sm text-gray-600 hover:text-gray-900"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
