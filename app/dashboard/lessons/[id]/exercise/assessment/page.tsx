'use client'

import { useState } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { VideoPlayer } from "@/components/video-player"
import { useParams, useRouter } from 'next/navigation'
import { useCourse } from '@/hooks/use-courses'

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

function isVimeoUrl(url: string) {
  const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+/;
  return vimeoRegex.test(url);
}

function isMuxUrl(url: string) {
  const muxRegex = /^(https?:\/\/)?(www\.)?(player\.mux\.com)\/.+/;
  return muxRegex.test(url);
}

function getVimeoEmbedUrl(url: string) {
  // Extract video ID from Vimeo URL
  // Handle formats like: https://vimeo.com/1089134258
  const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
  return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&transparent=0&controls=1&pip=0&dnt=1`;
}

function getMuxEmbedUrl(url: string) {
  // For Mux URLs, we can use them directly as they are already embed URLs
  // Handle formats like: https://player.mux.com/7YaPTDv7oIZSpOUYagZ00frWuHAJ2NochiKjZYn01UORk
  return url;
}

export default function AssessmentPage() {
  const params = useParams();
  const lessonId = params.id as string;
  const { data: course, isLoading } = useCourse(lessonId);
  const router = useRouter();
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
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>BACK</span>
        </button>
        <h1 className="text-xl font-semibold">{course?.title || "Lesson"}</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-57px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Column - Video */}
          <div className="aspect-video bg-black flex items-center justify-center w-full">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center text-white">Loading...</div>
            ) : course?.videoUrl ? (
              isVimeoUrl(course.videoUrl) ? (
                <iframe
                  src={getVimeoEmbedUrl(course.videoUrl)}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              ) : isMuxUrl(course.videoUrl) ? (
                <iframe
                  src={getMuxEmbedUrl(course.videoUrl)}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              ) : (
                <video
                  src={course.videoUrl}
                  className="w-full h-full"
                  controls
                  poster={course?.thumbnailUrl || "/placeholder.jpg"}
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">No video available</div>
            )}
          </div>

          {/* Right Column - Quiz */}
          <div className="p-6 overflow-y-auto flex flex-col justify-center w-full">
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

