"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default function AssessmentCompletedPage() {
  const params = useParams()
  const attemptId = params.id as string

  // Exit fullscreen when component mounts
  useEffect(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.log('Error exiting fullscreen:', err)
      })
    }
  }, [])

  const { data: attempt, isLoading } = useQuery({
    queryKey: ["exam-attempt", attemptId],
    queryFn: async () => {
      const response = await axios.get(`/exam-attempts/${attemptId}`)
      return response.data
    },
    enabled: !!attemptId,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!attempt) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Exam attempt not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-8 mb-8">
        <div className="text-center mb-8">
          {attempt.isPassed ? (
            <div className="text-green-500 mb-4">
              <CheckCircle2 className="h-16 w-16 mx-auto" />
              <h1 className="text-2xl font-bold mt-4">Congratulations!</h1>
              <p className="text-gray-600">
                You have passed the exam with a score of {attempt.score}%
              </p>
            </div>
          ) : (
            <div className="text-red-500 mb-4">
              <XCircle className="h-16 w-16 mx-auto" />
              <h1 className="text-2xl font-bold mt-4">Keep Practicing</h1>
              <p className="text-gray-600">
                You scored {attempt.score}%. The passing score was{" "}
                {attempt.exam.passingScore}%
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Questions</div>
            <div className="text-2xl font-bold">{attempt.answers.length}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Correct Answers</div>
            <div className="text-2xl font-bold">
              {attempt.answers.filter((a: any) => a.isCorrect).length}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Review Questions</h2>
          {attempt.answers.map((answer: any, index: number) => (
            <div
              key={answer.questionId._id}
              className={`p-6 rounded-lg border ${
                answer.isCorrect ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium">
                  {index + 1}. {answer.questionId.text}
                </h3>
                {answer.isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>

              {answer.questionId.imageUrl && (
                <img
                  src={answer.questionId.imageUrl}
                  alt="Question"
                  className="mb-4 rounded-lg"
                />
              )}

              <div className="space-y-2">
                {answer.questionId.answerOptions.map(
                  (option: any, optionIndex: number) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg border ${
                        option.isCorrect
                          ? "bg-green-100 border-green-200"
                          : optionIndex === answer.selectedOption &&
                            !answer.isCorrect
                          ? "bg-red-100 border-red-200"
                          : "bg-white"
                      }`}
                    >
                      {option.text}
                      {option.isCorrect && (
                        <span className="text-green-600 ml-2">(Correct)</span>
                      )}
                      {optionIndex === answer.selectedOption &&
                        !option.isCorrect && (
                          <span className="text-red-600 ml-2">
                            (Your Answer)
                          </span>
                        )}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/dashboard/assessments">
            <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
              Back to Assessments
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}