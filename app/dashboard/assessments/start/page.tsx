"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios"
import { Loader2 } from "lucide-react"

export default function AssessmentStartPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const examId = searchParams.get("id")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [attemptId, setAttemptId] = useState<string>()

  const { data: exam, isLoading } = useQuery({
    queryKey: ["exam", examId],
    queryFn: async () => {
      const response = await axios.get(`/exams/${examId}`)
      return response.data
    },
    enabled: !!examId,
  })

  const startExam = async () => {
    try {
      const response = await axios.post("/exam-attempts/start", {
        examId,
      })
      setAttemptId(response.data._id)

      // Request fullscreen
      const element = document.documentElement
      if (element.requestFullscreen) {
        await element.requestFullscreen()
      }
      setIsFullscreen(true)
      setHasStarted(true)
    } catch (error) {
      console.error("Failed to start exam:", error)
    }
  }

  const submitExam = useCallback(async () => {
    if (!attemptId) return
    try {
      await axios.put(`/exam-attempts/${attemptId}/complete`)
      router.push(`/dashboard/assessments/completed/${attemptId}`)
    } catch (error) {
      console.error("Failed to submit exam:", error)
    }
  }, [attemptId, router])

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true)
      } else if (hasStarted) {
        // Only submit if exam has started and user exits fullscreen
        submitExam()
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [hasStarted, submitExam])

  // Handle visibility change (tab change)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted) {
        submitExam()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [hasStarted, submitExam])

  // Submit on unmount if exam is still ongoing
  useEffect(() => {
    return () => {
      if (hasStarted && !isFullscreen) {
        submitExam()
      }
    }
  }, [hasStarted, isFullscreen, submitExam])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Exam not found</p>
      </div>
    )
  }

  if (hasStarted) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <div className="text-sm text-gray-500">
            Time Remaining: {exam.duration} minutes
          </div>
        </div>

        <div className="space-y-8">
          {exam.questions.map((question: any, index: number) => (
            <Card key={question._id} className="p-6">
              <h3 className="text-lg font-medium mb-4">
                {index + 1}. {question.text}
              </h3>
              {question.imageUrl && (
                <img
                  src={question.imageUrl}
                  alt="Question"
                  className="mb-4 rounded-lg"
                />
              )}
              <div className="space-y-2">
                {question.answerOptions.map((option: any, optionIndex: number) => (
                  <label
                    key={optionIndex}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:border-[#1045A1] cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={optionIndex}
                      className="text-[#1045A1]"
                      onChange={() => {
                        // Submit answer
                        axios.post("/exam-attempts/submit-answer", {
                          attemptId,
                          questionId: question._id,
                          selectedOption: optionIndex,
                        })
                      }}
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </Card>
          ))}

          <Button
            className="w-full bg-[#1045A1] hover:bg-[#0D3A8B]"
            onClick={submitExam}
          >
            Submit Exam
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-8">
        <h1 className="text-2xl font-bold mb-6">{exam.title}</h1>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Number of Questions</span>
            <span className="font-medium">{exam.questions.length}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{exam.duration} minutes</span>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Passing Score</span>
            <span className="font-medium">{exam.passingScore}%</span>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Information
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>The exam will open in full screen mode</li>
                  <li>Exiting full screen will submit your exam automatically</li>
                  <li>Changing tabs or applications will submit your exam</li>
                  <li>Make sure you have a stable internet connection</li>
                  <li>Ensure your device is fully charged or plugged in</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-[#1045A1] hover:bg-[#0D3A8B]"
          onClick={startExam}
        >
          Start Exam
        </Button>
      </Card>
    </div>
  )
}