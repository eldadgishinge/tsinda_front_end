import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";

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
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
              alt="Tsindacyane Logo"
              width={150}
              height={30}
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Log in to your account
            </Link>
            <Link href="/signup">
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
                Create an account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-8">
              Your Journey to Safe Driving Begins Here! Learn Anytime, Anywhere.
            </h1>
            <Link href="/signup">
              <Button size="lg" className="bg-[#1045A1] hover:bg-[#0D3A8B]">
                Start Your Learning Adventure Now
              </Button>
            </Link>

            <div className="mt-16 relative aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Student driver learning with an instructor"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                  <Play className="w-8 h-8 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              Take A short Quiz
            </h2>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold">
                    3. What is the main purpose of ABS (Anti-lock Braking
                    System)?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="Car braking on wet road"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      {[
                        "To reduce tire wear.",
                        "To prevent the wheels from locking during braking.",
                        "To enhance fuel efficiency.",
                        "To provide smoother acceleration.",
                      ].map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-3 p-4 rounded-lg border hover:border-blue-600 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="abs-question"
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-2 text-blue-600">Pricing Plans</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Flexible plans tailored to your needs
            </h2>
            <p className="text-gray-600 mb-12">
              Transparent pricing that adapts as you grow. Try any plan free for
              30 days.
            </p>

            <Card className="max-w-sm mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Advanced Plan</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold">$30</span>
                  <span className="text-gray-600 ml-2">per month</span>
                </div>
                <p className="text-gray-600 mb-8">
                  Enhanced features and detailed reporting.
                </p>
                <Link href="/signup">
                  <Button className="w-full bg-[#1045A1] hover:bg-[#0D3A8B]">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Don't just take our word for it!
                </h2>
                <p className="text-gray-600">
                  Listen to our amazing users who are excelling in their
                  theoretical driving classes.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                    <div className="flex mb-2">
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    {testimonial.quote && (
                      <p className="mb-2 text-sm">{testimonial.quote}</p>
                    )}
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Untitled UI</h3>
                  <p className="text-sm text-gray-600">
                    Create exceptional driving experiences that bring joy to
                    learners.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="text-sm font-medium">Stay informed</div>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-64"
                  />
                  <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2077 SmartDrive. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900"
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
