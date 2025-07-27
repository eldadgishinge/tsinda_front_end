'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Play } from 'lucide-react'

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
    quote: "Tsindacyane has made learning to drive so much easier and enjoyable!",
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
    quote: "I love how I can learn at my own pace with Tsindacyane.",
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
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
              alt="Tsindacyane Logo"
              width={150}
              height={30}
              className="h-8 w-auto max-w-[120px] lg:max-w-[150px]"
            />
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Link href="/login" className="text-xs lg:text-sm text-gray-600 hover:text-gray-900 hidden sm:block">
              Log in to your account
            </Link>
            <Link href="/signup">
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-xs lg:text-sm px-3 lg:px-4">
                Create an account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-6 lg:mb-8">
              Tsinda Coming Soon
            </h1>
            <Link href="/login">
              <Button size="lg" className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base">
                Start Your Learning Adventure Now
              </Button>
            </Link>

            <div className="mt-12 lg:mt-16 relative aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden group">
              <Image
                src="/image.png"
                alt="Road with traffic sign"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay for shadow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
              <button
                onClick={() => window.location.href = '/login'}
                className="absolute inset-0 flex items-center justify-center transition group-hover:bg-black/30"
                aria-label="Play video"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="lg:w-20 lg:h-20"
                  style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.35))' }}
                >
                  <circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.7" />
                  <polygon points="32,25 60,40 32,55" fill="#1045A1" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-12 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl xl:text-5xl font-bold text-center mb-12 lg:mb-16">
              Take A short Quiz
            </h2>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-4 lg:p-8">
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h3 className="text-lg lg:text-xl font-semibold">
                      {currentQuestion + 1}. {quizQuestions[currentQuestion].question}
                    </h3>
                    <span className="text-sm text-gray-500">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                  </div>
                  <div className={currentQuestion === 0 ? "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" : "max-w-2xl mx-auto"}>
                    {currentQuestion === 0 && (
                      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O9tuSjcrDuWmy6QnbVmiY45YbrwYWz.png"
                          alt="ABS braking system"
                          fill
                          className="object-contain p-4 lg:p-8"
                        />
                      </div>
                    )}
                    <div className="space-y-3 lg:space-y-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center space-x-3 p-3 lg:p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedAnswer === option 
                              ? 'border-[#1045A1] bg-[#E6EDF7]' 
                              : 'hover:border-[#1045A1]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="quiz-question"
                            className="w-4 h-4 text-[#1045A1]"
                            checked={selectedAnswer === option}
                            onChange={() => handleAnswerSelect(option)}
                          />
                          <span className="text-sm lg:text-base text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentQuestion === 0}
                      className="w-full sm:w-auto"
                    >
                      Back
                    </Button>
                    {currentQuestion === quizQuestions.length - 1 ? (
                      <Link href="/login" className="w-full sm:w-auto">
                        <Button
                          className="bg-[#1045A1] hover:bg-[#0D3A8B] w-full sm:w-auto"
                          disabled={!selectedAnswer}
                        >
                          Submit
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        className="bg-[#1045A1] hover:bg-[#0D3A8B] w-full sm:w-auto"
                        onClick={handleNext}
                        disabled={!selectedAnswer}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-2 text-[#1045A1]">Pricing Plans</div>
            <h2 className="text-2xl lg:text-3xl xl:text-5xl font-bold mb-4">
              Flexible plans tailored to your needs
            </h2>
            <p className="text-gray-600 mb-8 lg:mb-12 text-sm lg:text-base">
              Transparent pricing that adapts as you grow. Try any plan free for 30 days.
            </p>

            <Card className="max-w-sm mx-auto">
              <CardContent className="p-6 lg:p-8 text-center">
                <h3 className="text-lg lg:text-xl font-semibold mb-4">Advanced Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl lg:text-5xl font-bold">3,500 RWF</span>
                  <span className="text-gray-600 ml-2 text-sm lg:text-base">per month</span>
                </div>
                <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
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
        <section className="py-12 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-3xl xl:text-5xl font-bold mb-4">
                Don't just take our word for it!
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base">
                Listen to our amazing users who are excelling in their theoretical driving classes.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {testimonials && testimonials.length > 0 ? (
                  testimonials.slice(currentTestimonial, currentTestimonial + 2).map((testimonial, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4 lg:p-6 flex flex-col h-full">
                        <div className="flex-grow">
                          <div className="flex mb-3 lg:mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 lg:w-5 lg:h-5 ${
                                  i < testimonial.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 mb-3 lg:mb-4 italic text-sm lg:text-base">"{testimonial.quote}"</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden mr-3 lg:mr-4">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm lg:text-base">{testimonial.name}</p>
                            <p className="text-xs lg:text-sm text-gray-500">Tsindacyane User</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No testimonials available at the moment.</p>
                )}
              </div>
              <div className="flex justify-center mt-6 lg:mt-8 space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                  disabled={!testimonials || testimonials.length === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                  disabled={!testimonials || testimonials.length === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-[#1045A1] flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="w-4 h-4 lg:w-6 lg:h-6"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base">Tsinda</h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Create exceptional driving experiences that bring joy to learners.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center w-full lg:w-auto">
                <div className="text-xs lg:text-sm font-medium">Stay informed</div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full sm:w-64 text-sm"
                  />
                  <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm w-full sm:w-auto">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs lg:text-sm text-gray-600">
              © {new Date().getFullYear()} Tsinda. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <Link href="/terms" className="text-xs lg:text-sm text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs lg:text-sm text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs lg:text-sm text-gray-600 hover:text-gray-900">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

