'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Play, ArrowRight, BookOpen, Target, Users, Award, CheckCircle, Sparkles, TrendingUp, Shield } from 'lucide-react'

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "What is the main purpose of ABS (Anti-lock Braking System)?",
    options: [
      "To reduce tire wear",
      "To prevent the wheels from locking during braking",
      "To enhance fuel efficiency",
      "To provide smoother acceleration"
    ]
  },
  {
    id: 2,
    question: "What should you do when approaching a yellow traffic light?",
    options: [
      "Speed up to get through before it turns red",
      "Stop if it's safe to do so, otherwise proceed with caution",
      "Ignore it and continue driving normally",
      "Honk your horn to alert other drivers"
    ]
  },
]

const testimonials = [
  {
    name: "Alex Taylor",
    quote: "Tsinda has made learning to drive so much easier and enjoyable!",
    image: "/placeholder.svg",
    stars: 5,
  },
  {
    name: "Mia Roberts",
    quote: "The interactive quizzes really helped me prepare for my theory test.",
    image: "/placeholder.svg",
    stars: 4,
  },
  {
    name: "Ethan Clark",
    quote: "I love how I can learn at my own pace with Tsinda.",
    image: "/placeholder.svg",
    stars: 5,
  },
  {
    name: "Chloe Adams",
    quote: "The variety of content keeps me engaged and learning effectively.",
    image: "/placeholder.svg",
    stars: 4,
  },
]

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Learning",
    description: "Access a wide range of courses and materials designed for all skill levels."
  },
  {
    icon: Target,
    title: "Interactive Assessments",
    description: "Test your knowledge with our engaging quiz system and track your progress."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow learners and share experiences in our community."
  }
]

export default function HomePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<(string | null)[]>(Array(10).fill(null))
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1 && selectedAnswer) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
    }
  }

  const nextTestimonial = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white">
      {/* Enhanced Navigation */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="hover:opacity-80 transition-all duration-300 hover:scale-105">
              <Image
                src="/logo.svg"
                alt="Tsinda Logo"
                width={150}
                height={30}
                className="h-10 w-auto max-w-[140px] lg:max-w-[160px]"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">
              <span className="block sm:hidden">Login</span>
              <span className="hidden sm:block">Log in to your account</span>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm px-6 lg:px-8 h-11 lg:h-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold">
                Create an account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Enhanced Hero Section */}
        <section className="py-16 lg:py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold max-w-5xl mx-auto leading-tight mb-6 lg:mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Welcome to <span className="text-[#1045A1]">Tsinda</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 lg:mb-12 leading-relaxed">
                Your gateway to comprehensive learning and skill development. 
                Join thousands of learners advancing their careers with our innovative platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 lg:mb-16">
                <Link href="/login">
                  <Button size="lg" className="bg-[#1045A1] hover:bg-[#0D3A8B] text-base lg:text-lg px-8 lg:px-10 h-12 lg:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    Start Your Learning Adventure
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="lg" className="text-base lg:text-lg px-8 lg:px-10 h-12 lg:h-14 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200">
                    Create Free Account
                  </Button>
                </Link>
              </div> */}
              
              <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold max-w-5xl mx-auto leading-tight mb-6 lg:mb-8">
                <span className="text-[#1045A1]">Tsinda</span> <span className="text-black">Coming Soon</span>
              </h1>
              
              <div className="flex justify-center mb-12 lg:mb-16">
                <Link href="/login">
                  <Button size="lg" className="bg-[#1045A1] hover:bg-[#0D3A8B] text-base lg:text-lg px-8 lg:px-10 h-12 lg:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    Start Your Learning Adventure Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/9] max-w-5xl mx-auto rounded-3xl overflow-hidden group shadow-2xl">
              <Image
                src="/image.png"
                alt="Road with traffic sign"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              <button
                onClick={() => window.location.href = '/login'}
                className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40"
                aria-label="Play video"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 lg:w-10 lg:h-10 text-[#1045A1] ml-1" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-sm font-medium text-[#1045A1] mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>Why Choose Tsinda</span>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform provides all the tools and resources you need to excel in your learning journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Quiz Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 bg-[#1045A1]/10 px-4 py-2 rounded-full text-sm font-medium text-[#1045A1] mb-6">
                <Target className="w-4 h-4" />
                <span>Interactive Learning</span>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
                Take a Short Quiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Test your knowledge with our interactive quiz system and see how much you can learn.
              </p>
            </div>
            
            <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-8 lg:p-12">
                <div className="space-y-8 lg:space-y-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                      {currentQuestion + 1}. {quizQuestions[currentQuestion].question}
                    </h3>
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-gray-700">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className={currentQuestion === 0 ? "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" : "max-w-2xl mx-auto"}>
                    {currentQuestion === 0 && (
                      <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O9tuSjcrDuWmy6QnbVmiY45YbrwYWz.png"
                          alt="ABS braking system"
                          fill
                          className="object-contain p-6 lg:p-8"
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center space-x-4 p-4 lg:p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedAnswer === option 
                              ? 'border-[#1045A1] bg-[#1045A1]/5 shadow-md' 
                              : 'border-gray-200 hover:border-[#1045A1]/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="quiz-question"
                            className="w-5 h-5 text-[#1045A1]"
                            checked={selectedAnswer === option}
                            onChange={() => handleAnswerSelect(option)}
                          />
                          <span className="text-base lg:text-lg text-gray-700 font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentQuestion === 0}
                      className="w-full sm:w-auto h-12 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    {currentQuestion === quizQuestions.length - 1 ? (
                      <Link href="/login" className="w-full sm:w-auto">
                        <Button
                          className="bg-[#1045A1] hover:bg-[#0D3A8B] w-full sm:w-auto h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                          disabled={!selectedAnswer}
                        >
                          Submit Quiz
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        className="bg-[#1045A1] hover:bg-[#0D3A8B] w-full sm:w-auto h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={handleNext}
                        disabled={!selectedAnswer}
                      >
                        Next Question
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Enhanced Pricing Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-sm font-medium text-green-700 mb-6">
              <Award className="w-4 h-4" />
              <span>Pricing Plans</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
              Flexible plans tailored to your needs
            </h2>
            <p className="text-lg text-gray-600 mb-12 lg:mb-16 max-w-2xl mx-auto">
              Transparent pricing that adapts as you grow. Try any plan free for 30 days.
            </p>

            <Card className="max-w-md mx-auto bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Advanced Plan</h3>
                  <div className="mb-6">
                    <span className="text-5xl lg:text-6xl font-bold text-[#1045A1]">3,500</span>
                    <span className="text-xl text-gray-600 ml-2">RWF</span>
                    <span className="text-gray-500 ml-2 text-base">per month</span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Enhanced features and detailed reporting for serious learners.
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Full course access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Interactive assessments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Progress tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Certificate upon completion</span>
                  </div>
                </div>
                
                <Link href="/signup" className="w-full">
                  <Button className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-semibold">
                    Get Started Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full text-sm font-medium text-yellow-700 mb-6">
                <Star className="w-4 h-4" />
                <span>Student Testimonials</span>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
                Don't just take our word for it!
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Listen to our amazing users who are excelling in their theoretical driving classes.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {testimonials && testimonials.length > 0 ? (
                  testimonials.slice(currentTestimonial, currentTestimonial + 2).map((testimonial, index) => (
                    <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl rounded-2xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-8 lg:p-10 flex flex-col h-full">
                        <div className="flex-grow">
                          <div className="flex mb-6">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 lg:w-6 lg:h-6 ${
                                  i < testimonial.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                        </div>
                        <div className="flex items-center pt-6 border-t border-gray-200">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden mr-4 shadow-lg">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={56}
                              height={56}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-lg">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">Tsinda User</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No testimonials available at the moment.</p>
                )}
              </div>
              <div className="flex justify-center mt-8 lg:mt-12 space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!testimonials || testimonials.length === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!testimonials || testimonials.length === 0}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Newsletter Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] rounded-3xl p-8 lg:p-12 text-white">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      width={32}
                      height={32}
                      className="w-6 h-6 lg:w-8 lg:h-8"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl lg:text-2xl mb-2">Stay Updated</h3>
                    <p className="text-white/90 text-base lg:text-lg">
                      Get the latest updates and learning tips delivered to your inbox.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full sm:w-80 text-base h-12 rounded-xl border-0 shadow-lg"
                  />
                  <Button className="bg-white text-[#1045A1] hover:bg-gray-100 text-base h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                    Subscribe Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.svg"
                alt="Tsinda Logo"
                width={120}
                height={30}
                className="h-6 w-auto"
              />
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} Tsinda. All rights reserved.
              </div>
            </div>
            <div className="flex flex-wrap gap-6 lg:gap-8">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

