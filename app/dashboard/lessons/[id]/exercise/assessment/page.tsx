'use client'

import { useState } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { VideoPlayer } from "@/components/video-player"

// Sample questions data
const questions = [
  {
    id: 1,
    question: "What is the main purpose of ABS (Anti-lock Braking System)?",
    options: [
      "To reduce tire wear.",
      "To prevent the wheels from locking during braking.",
      "To enhance fuel efficiency.",
      "To provide smoother acceleration."
    ]
  },
  // Add more questions as needed
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""))

  const handleNext = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)
    setSelectedAnswer("")
    setCurrentQuestion(prev => Math.min(prev + 1, 9))
  }

  const handleBack = () => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0))
    setSelectedAnswer(answers[currentQuestion - 1] || "")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-3">
        <Link 
          href="/dashboard/lessons"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>CLOSE</span>
        </Link>
        <h1 className="text-xl font-semibold">Driving Lesson 101</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-57px)]">
        {/* Left Side - Video */}
        <div className="w-full lg:w-2/3 h-full bg-black">
          <div className="h-full">
            <VideoPlayer 
              src="https://example.com/video.mp4"
              poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tsindacyane_design-kbHXDHkers9OV6WtZBSUGvsDAfpAam.png"
            />
          </div>
        </div>

        {/* Right Side - Quiz */}
        <div className="w-full lg:w-1/3 p-6 border-l">
          <div className="max-w-md mx-auto">
            {/* Progress Bar and Question Counter */}
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
              <div className="flex-1 mx-4">
                <Progress value={((currentQuestion + 1) / 10) * 100} className="h-2" />
              </div>
              <span className="text-sm font-medium">{currentQuestion + 1}/10</span>
            </div>

            {/* Question */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">
                1. What is the main purpose of ABS (Anti-lock Braking System)?
              </h2>

              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {questions[0].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                  className="flex-1 h-12"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="flex-1 h-12 bg-[#1045A1] hover:bg-[#0D3A8B]"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

