"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle2, XCircle, RotateCcw, Trophy, Target, Clock, BookOpen, Star, Award, TrendingUp } from "lucide-react"
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
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">Loading your results...</p>
          </div>
        </div>
      )
    }
    if (tempResult === undefined) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">Exam attempt not found</p>
            <Link href="/dashboard/assessments">
              <Button className="mt-4 bg-gray-900 hover:bg-gray-800">
                Back to Assessments
              </Button>
            </Link>
          </div>
        </div>
      )
    }
    const { isPassed, score, exam, answers } = tempResult;
    const correctAnswers = answers.filter((a: any) => a.isCorrect).length;
    const totalQuestions = exam.questions.length;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          {/* Assessment Summary */}
          <Card className="p-6 mb-6 bg-white shadow-sm border-0">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {exam.title}
                </h1>
                <p className="text-gray-600">Assessment Complete</p>
              </div>
              <Button 
                onClick={handleRetry}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-sm h-8 px-3"
              >
                <RotateCcw className="h-3 w-3" />
                Retry
              </Button>
            </div>
            
            {/* Result Hero Section */}
            <div className="text-center mb-6">
              {isPassed ? (
                <div className="inline-flex flex-col items-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 max-w-lg">
                  <div className="relative mb-3">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                      <Trophy className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-700 mb-2">Congratulations!</h2>
                  <p className="text-emerald-600 text-lg mb-3">
                    You passed with a score of <span className="font-bold text-xl">{score}%</span>
                  </p>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-1 text-sm font-semibold">
                    PASSED
                  </Badge>
                </div>
              ) : (
                <div className="inline-flex flex-col items-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200 max-w-lg">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-red-700 mb-2">Keep Practicing</h2>
                  <p className="text-red-600 text-lg mb-2">
                    You scored <span className="font-bold text-xl">{score}%</span>
                  </p>
                  <p className="text-red-500 text-sm mb-3">
                    Passing score: {exam.passingScore}%
                  </p>
                  <Badge className="bg-red-100 text-red-800 border-red-200 px-4 py-1 text-sm font-semibold">
                    NEEDS IMPROVEMENT
                  </Badge>
                </div>
              )}
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">{totalQuestions}</div>
                <div className="text-xs text-gray-600 font-medium">Total Questions</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">{correctAnswers}</div>
                <div className="text-xs text-gray-600 font-medium">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">{score}%</div>
                <div className="text-xs text-gray-600 font-medium">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="h-4 w-4 text-orange-600" />
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">{totalQuestions - correctAnswers}</div>
                <div className="text-xs text-gray-600 font-medium">Incorrect</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium text-sm">Performance</span>
                <span className="text-gray-600 text-sm">{score}%</span>
              </div>
              <Progress value={score} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>{exam.passingScore}% (Pass)</span>
                <span>100%</span>
              </div>
            </div>
          </Card>

          {/* Questions Review */}
          <Card className="p-6 bg-white shadow-sm border-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-gray-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Question Review</h2>
            </div>
            
            <div className="space-y-4">
              {answers.map((answer: any, index: number) => (
                <div
                  key={answer.questionId._id}
                  className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    answer.isCorrect 
                      ? "bg-emerald-50 border-emerald-200" 
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        answer.isCorrect 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {index + 1}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 leading-relaxed">
                        {answer.questionId.text}
                      </h3>
                    </div>
                    {answer.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>

                  {answer.questionId.imageUrl && (
                    <div className="mb-4">
                      <img
                        src={answer.questionId.imageUrl}
                        alt="Question"
                        className="rounded-lg max-w-full h-auto shadow-sm"
                      />
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {answer.questionId.answerOptions.map(
                      (option: any, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            option.isCorrect
                              ? "bg-emerald-100 border-emerald-300"
                              : optionIndex === answer.selectedOption &&
                                !answer.isCorrect
                              ? "bg-red-100 border-red-300"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 font-medium text-sm">{option.text}</span>
                            <div className="flex items-center gap-2">
                              {option.isCorrect && (
                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                                  Correct
                                </Badge>
                              )}
                              {optionIndex === answer.selectedOption &&
                                !option.isCorrect && (
                                  <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                                    Your Answer
                                  </Badge>
                                )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {answer.questionId.rightAnswerDescription && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <h4 className="font-semibold text-blue-800 text-sm">Explanation</h4>
                      </div>
                      <p className="text-blue-700 leading-relaxed text-sm">{answer.questionId.rightAnswerDescription}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <Button 
              onClick={handleRetry}
              variant="outline"
              size="lg"
              className="flex items-center gap-2 text-base h-10 px-6"
            >
              <RotateCcw className="h-4 w-4" />
              Retry Assessment
            </Button>
            <Link href="/dashboard/assessments" className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-base h-10 px-6 w-full sm:w-auto"
              >
                Back to Assessments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!attempt) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 text-lg">Exam attempt not found</p>
          <Link href="/dashboard/assessments">
            <Button className="mt-4 bg-gray-900 hover:bg-gray-800">
              Back to Assessments
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const correctAnswers = attempt.answers.filter((a: any) => a.isCorrect).length;
  const totalQuestions = attempt.answers.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Assessment Summary */}
        <Card className="p-6 mb-6 bg-white shadow-sm border-0">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {attempt.exam.title}
              </h1>
              <p className="text-gray-600">Assessment Complete</p>
            </div>
            <Button 
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-sm h-8 px-3"
            >
              <RotateCcw className="h-3 w-3" />
              Retry
            </Button>
          </div>
          
          {/* Result Hero Section */}
          <div className="text-center mb-6">
            {attempt.isPassed ? (
              <div className="inline-flex flex-col items-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 max-w-lg">
                <div className="relative mb-3">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                    <Trophy className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-emerald-700 mb-2">Congratulations!</h2>
                <p className="text-emerald-600 text-lg mb-3">
                  You passed with a score of <span className="font-bold text-xl">{attempt.score}%</span>
                </p>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-1 text-sm font-semibold">
                  PASSED
                </Badge>
              </div>
            ) : (
              <div className="inline-flex flex-col items-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200 max-w-lg">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-700 mb-2">Keep Practicing</h2>
                <p className="text-red-600 text-lg mb-2">
                  You scored <span className="font-bold text-xl">{attempt.score}%</span>
                </p>
                <p className="text-red-500 text-sm mb-3">
                  Passing score: {attempt.exam.passingScore}%
                </p>
                <Badge className="bg-red-100 text-red-800 border-red-200 px-4 py-1 text-sm font-semibold">
                  NEEDS IMPROVEMENT
                </Badge>
              </div>
            )}
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">{totalQuestions}</div>
              <div className="text-xs text-gray-600 font-medium">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">{correctAnswers}</div>
              <div className="text-xs text-gray-600 font-medium">Correct Answers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">{attempt.score}%</div>
              <div className="text-xs text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award className="h-4 w-4 text-orange-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">{totalQuestions - correctAnswers}</div>
              <div className="text-xs text-gray-600 font-medium">Incorrect</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium text-sm">Performance</span>
              <span className="text-gray-600 text-sm">{attempt.score}%</span>
            </div>
            <Progress value={attempt.score} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>{attempt.exam.passingScore}% (Pass)</span>
              <span>100%</span>
            </div>
          </div>
        </Card>

        {/* Questions Review */}
        <Card className="p-6 bg-white shadow-sm border-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Question Review</h2>
          </div>
          
          <div className="space-y-4">
            {attempt.answers.map((answer: any, index: number) => (
              <div
                key={answer.questionId._id}
                className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  answer.isCorrect 
                    ? "bg-emerald-50 border-emerald-200" 
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      answer.isCorrect 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 leading-relaxed">
                      {answer.questionId.text}
                    </h3>
                  </div>
                  {answer.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                </div>

                {answer.questionId.imageUrl && (
                  <div className="mb-4">
                    <img
                      src={answer.questionId.imageUrl}
                      alt="Question"
                      className="rounded-lg max-w-full h-auto shadow-sm"
                    />
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  {answer.questionId.answerOptions.map(
                    (option: any, optionIndex: number) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          option.isCorrect
                            ? "bg-emerald-100 border-emerald-300"
                            : optionIndex === answer.selectedOption &&
                              !answer.isCorrect
                            ? "bg-red-100 border-red-300"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 font-medium text-sm">{option.text}</span>
                          <div className="flex items-center gap-2">
                            {option.isCorrect && (
                              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                                Correct
                              </Badge>
                            )}
                            {optionIndex === answer.selectedOption &&
                              !option.isCorrect && (
                                <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                                  Your Answer
                                </Badge>
                              )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {answer.questionId.rightAnswerDescription && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <h4 className="font-semibold text-blue-800 text-sm">Explanation</h4>
                    </div>
                    <p className="text-blue-700 leading-relaxed text-sm">{answer.questionId.rightAnswerDescription}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <Button 
            onClick={handleRetry}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 text-base h-10 px-6"
          >
            <RotateCcw className="h-4 w-4" />
            Retry Assessment
          </Button>
          <Link href="/dashboard/assessments" className="w-full sm:w-auto">
            <Button 
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-base h-10 px-6 w-full sm:w-auto"
            >
              Back to Assessments
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}