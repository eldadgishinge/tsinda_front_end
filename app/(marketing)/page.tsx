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
    question: "When should you check your tire pressure?",
    options: [
      "Only when the tires look flat",
      "Once a year during maintenance",
      "At least once a month and before long trips",
      "Only during winter months"
    ]
  },
  // Add more questions as needed
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
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Log in to your account
            </Link>
            <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
              Create an account
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-8">

              {/* Your Journey to Safe Driving Begins Here! Learn Anytime, Anywhere. */}
              Tsinda  Coming Soon
            </h1>
            <Button size="lg" className="bg-[#1045A1] hover:bg-[#0D3A8B]">
              Start Your Learning Adventure Now
            </Button>

            <div className="mt-16 relative aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden">
              <Link href="/signup">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Container-Vumwn0SEPA8kKQCIHkyxybvPJ6jxRr.png"
                  alt="Road with traffic sign"
                  fill
                  className="object-cover cursor-pointer"
                />
              </Link>
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
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      {currentQuestion + 1}. {quizQuestions[currentQuestion].question}
                    </h3>
                    <span className="text-sm text-gray-500">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O9tuSjcrDuWmy6QnbVmiY45YbrwYWz.png"
                        alt="Car tires"
                        fill
                        className="object-contain p-8"
                      />
                    </div>
                    <div className="space-y-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
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
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentQuestion === 0}
                    >
                      Back
                    </Button>
                    <Button
                      className="bg-[#1045A1] hover:bg-[#0D3A8B]"
                      onClick={handleNext}
                      disabled={currentQuestion === quizQuestions.length - 1 || !selectedAnswer}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-2 text-[#1045A1]">Pricing Plans</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Flexible plans tailored to your needs
            </h2>
            <p className="text-gray-600 mb-12">
              Transparent pricing that adapts as you grow. Try any plan free for 30 days.
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
                <Button className="w-full bg-[#1045A1] hover:bg-[#0D3A8B]">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Don't just take our word for it!
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Listen to our amazing users who are excelling in their theoretical driving classes.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials && testimonials.length > 0 ? (
                  testimonials.slice(currentTestimonial, currentTestimonial + 2).map((testimonial, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex-grow">
                          <div className="flex mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < testimonial.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">Tsindacyane User</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No testimonials available at the moment.</p>
                )}
              </div>
              <div className="flex justify-center mt-8 space-x-4">
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1045A1] flex items-center justify-center">
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
                    Create exceptional driving experiences that bring joy to learners.
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
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

