"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function AssessmentCompletedPage() {
  const params = useParams()
  const router = useRouter()
  const attemptId = params.id as string
  const [tempResult, setTempResult] = useState<any>(null);

  useEffect(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.log('Error exiting fullscreen:', err)
      })
    }
  }, [])

  useEffect(() => {
    if (attemptId.startsWith('temp-')) {
      const tempExam = JSON.parse(sessionStorage.getItem('tempExam') || 'null');
      const tempAnswers = JSON.parse(sessionStorage.getItem('tempAnswers') || 'null');
      if (tempExam && tempAnswers) {
        const answersArr = tempExam.questions.map((q: any, idx: number) => {
          const selectedOption = tempAnswers[q?._id];
          const isCorrect = selectedOption !== undefined && q?.answerOptions?.[selectedOption]?.isCorrect;
          return {
            questionId: q,
            selectedOption,
            isCorrect,
          };
        });
        const correctCount = answersArr.filter((a: any) => a.isCorrect).length;
        const score = tempExam.questions.length > 0 ? Math.round((correctCount / tempExam.questions.length) * 100) : 0;
        const isPassed = score >= (tempExam.passingScore || 70);
        setTempResult({
          isPassed,
          score,
          exam: tempExam,
          answers: answersArr,
        });
      } else {
        setTempResult(undefined);
      }
    }
  }, [attemptId]);

  const { data: attempt, isLoading } = useQuery({
    queryKey: ["exam-attempt", attemptId],
    queryFn: async () => {
      const response = await axios.get(`/exam-attempts/${attemptId}`)
      return response.data
    },
    enabled: !!attemptId && !attemptId.startsWith('temp-'),
  })

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleRetry = () => {
    if (attemptId.startsWith('temp-')) {
      const tempExam = JSON.parse(sessionStorage.getItem('tempExam') || 'null');
      if (tempExam) {
        const shuffledExam = {
          ...tempExam,
          _id: `temp-retry-${Date.now()}`,
          title: `${tempExam.title} (Retry)`,
          questions: shuffleArray(tempExam.questions),
        };
        
        sessionStorage.removeItem('tempAnswers');
        sessionStorage.setItem("tempExam", JSON.stringify(shuffledExam));
        
        router.push(`/dashboard/assessments/start?id=${shuffledExam._id}`);
      }
    } else {
      if (attempt) {
        const tempExam = {
          _id: `temp-retry-${Date.now()}`,
          title: `${attempt.exam.title} (Retry)`,
          description: `Retry of ${attempt.exam.title}`,
          duration: attempt.exam.duration,
          passingScore: attempt.exam.passingScore,
          questions: shuffleArray(attempt.answers.map((a: any) => a.questionId)),
          category: attempt.exam.category,
          language: attempt.exam.language,
          status: "Published" as const,
          createdAt: new Date().toISOString(),
        };
        
        sessionStorage.setItem("tempExam", JSON.stringify(tempExam));
        sessionStorage.removeItem('tempAnswers');
        
        router.push(`/dashboard/assessments/start?id=${tempExam._id}`);
      }
    }
  };

  if (attemptId.startsWith('temp-')) {
    if (tempResult === null) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )
    }
    if (tempResult === undefined) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500">Exam attempt not found</p>
        </div>
      )
    }
    const { isPassed, score, exam, answers } = tempResult;
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <Card className="p-4 lg:p-8 mb-6 lg:mb-8">
        <div className="flex justify-end mb-4 lg:mb-6">
          <Button 
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm h-8 lg:h-10 px-3 lg:px-4"
          >
            <RotateCcw className="h-3 w-3 lg:h-4 lg:w-4" />
            Retry Assessment
          </Button>
        </div>
        
          <div className="text-center mb-6 lg:mb-8">
            {isPassed ? (
              <div className="text-green-500 mb-4">
                <CheckCircle2 className="h-12 w-12 lg:h-16 lg:w-16 mx-auto" />
                <h1 className="text-xl lg:text-2xl font-bold mt-4">Congratulations!</h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  You have passed the exam with a score of {score}%
                </p>
              </div>
            ) : (
              <div className="text-red-500 mb-4">
                <XCircle className="h-12 w-12 lg:h-16 lg:w-16 mx-auto" />
                <h1 className="text-xl lg:text-2xl font-bold mt-4">Keep Practicing</h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  You scored {score}%. The passing score was {exam.passingScore}%
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
            <div className="text-center p-3 lg:p-4 bg-gray-50 rounded-lg">
              <div className="text-xs lg:text-sm text-gray-500">Total Questions</div>
              <div className="text-xl lg:text-2xl font-bold">{exam.questions.length}</div>
            </div>
            <div className="text-center p-3 lg:p-4 bg-gray-50 rounded-lg">
              <div className="text-xs lg:text-sm text-gray-500">Correct Answers</div>
              <div className="text-xl lg:text-2xl font-bold">
                {answers.filter((a: any) => a.isCorrect).length}
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-lg lg:text-xl font-semibold">Review Questions</h2>
            {answers.map((answer: any, index: number) => (
              <div
                key={answer.questionId._id}
                className={`p-4 lg:p-6 rounded-lg border ${
                  answer.isCorrect ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex items-start justify-between mb-3 lg:mb-4">
                  <h3 className="text-base lg:text-lg font-medium">
                    {index + 1}. {answer.questionId.text}
                  </h3>
                  {answer.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 lg:h-6 lg:w-6 text-red-500" />
                  )}
                </div>

                {answer.questionId.imageUrl && (
                  <img
                    src={answer.questionId.imageUrl}
                    alt="Question"
                    className="mb-3 lg:mb-4 rounded-lg"
                  />
                )}

                <div className="space-y-2">
                  {answer.questionId.answerOptions.map(
                    (option: any, optionIndex: number) => (
                      <div
                        key={optionIndex}
                        className={`p-2 lg:p-3 rounded-lg border text-sm lg:text-base ${
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
                          <span className="text-green-600 ml-2 text-xs lg:text-sm">(Correct)</span>
                        )}
                        {optionIndex === answer.selectedOption &&
                          !option.isCorrect && (
                            <span className="text-red-600 ml-2 text-xs lg:text-sm">
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

          <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
            <Button 
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm h-8 lg:h-10 px-3 lg:px-4 w-full sm:w-auto"
            >
              <RotateCcw className="h-3 w-3 lg:h-4 lg:w-4" />
              Retry Same Questions
            </Button>
            <Link href="/dashboard/assessments" className="w-full sm:w-auto">
              <Button 
                size="sm"
                className="bg-[#1045A1] hover:bg-[#0D3A8B] text-xs lg:text-sm h-8 lg:h-10 px-3 lg:px-4 w-full sm:w-auto"
              >
                Back to Assessments
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

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
    <div className="max-w-4xl mx-auto p-4 lg:p-6">
      <Card className="p-4 lg:p-8 mb-6 lg:mb-8">
        <div className="flex justify-end mb-4 lg:mb-6">
          <Button 
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm h-8 lg:h-10 px-3 lg:px-4"
          >
            <RotateCcw className="h-3 w-3 lg:h-4 lg:w-4" />
            Retry Assessment
          </Button>
        </div>
        
        <div className="text-center mb-6 lg:mb-8">
          {attempt.isPassed ? (
            <div className="text-green-500 mb-4">
              <CheckCircle2 className="h-12 w-12 lg:h-16 lg:w-16 mx-auto" />
              <h1 className="text-xl lg:text-2xl font-bold mt-4">Congratulations!</h1>
              <p className="text-gray-600 text-sm lg:text-base">
                You have passed the exam with a score of {attempt.score}%
              </p>
            </div>
          ) : (
            <div className="text-red-500 mb-4">
              <XCircle className="h-12 w-12 lg:h-16 lg:w-16 mx-auto" />
              <h1 className="text-xl lg:text-2xl font-bold mt-4">Keep Practicing</h1>
              <p className="text-gray-600 text-sm lg:text-base">
                You scored {attempt.score}%. The passing score was{" "}
                {attempt.exam.passingScore}%
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
          <div className="text-center p-3 lg:p-4 bg-gray-50 rounded-lg">
            <div className="text-xs lg:text-sm text-gray-500">Total Questions</div>
            <div className="text-xl lg:text-2xl font-bold">{attempt.answers.length}</div>
          </div>
          <div className="text-center p-3 lg:p-4 bg-gray-50 rounded-lg">
            <div className="text-xs lg:text-sm text-gray-500">Correct Answers</div>
            <div className="text-xl lg:text-2xl font-bold">
              {attempt.answers.filter((a: any) => a.isCorrect).length}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <h2 className="text-lg lg:text-xl font-semibold">Review Questions</h2>
          {attempt.answers.map((answer: any, index: number) => (
            <div
              key={answer.questionId._id}
              className={`p-4 lg:p-6 rounded-lg border ${
                answer.isCorrect ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <h3 className="text-base lg:text-lg font-medium">
                  {index + 1}. {answer.questionId.text}
                </h3>
                {answer.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 lg:h-6 lg:w-6 text-red-500" />
                )}
              </div>

              {answer.questionId.imageUrl && (
                <img
                  src={answer.questionId.imageUrl}
                  alt="Question"
                  className="mb-3 lg:mb-4 rounded-lg"
                />
              )}

              <div className="space-y-2">
                {answer.questionId.answerOptions.map(
                  (option: any, optionIndex: number) => (
                    <div
                      key={optionIndex}
                      className={`p-2 lg:p-3 rounded-lg border text-sm lg:text-base ${
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
                        <span className="text-green-600 ml-2 text-xs lg:text-sm">(Correct)</span>
                      )}
                      {optionIndex === answer.selectedOption &&
                        !option.isCorrect && (
                          <span className="text-red-600 ml-2 text-xs lg:text-sm">
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

        <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
          <Button 
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm h-8 lg:h-10 px-3 lg:px-4 w-full sm:w-auto"
          >
            <RotateCcw className="h-3 w-3 lg:h-4 lg:w-4" />
            Retry Same Questions
          </Button>
          <Link href="/dashboard/assessments" className="w-full sm:w-auto">
            <Button 
              size="sm"
              className="bg-[#1045A1] hover:bg-[#0D3A8B] text-xs lg:text-sm h-8 lg:h-10 px-3 lg:px-4 w-full sm:w-auto"
            >
              Back to Assessments
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}