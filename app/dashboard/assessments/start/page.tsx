"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

// Separate component that uses useSearchParams
function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = searchParams.get("id");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [attemptId, setAttemptId] = useState<string>();
  const [isAttempting, setIsAttempting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Check for temporary exam in sessionStorage first
  const tempExam = examId?.startsWith("temp-") ? 
    JSON.parse(sessionStorage.getItem("tempExam") || "null") : null;

  console.log("Exam ID:", examId);
  console.log("Is temp exam:", examId?.startsWith("temp-"));
  console.log("Temp exam from storage:", tempExam);

  const { data: exam, isLoading } = useQuery({
    queryKey: ["exam", examId],
    queryFn: async () => {
      const response = await axios.get(`/exams/${examId}`);
      return response.data;
    },
    enabled: !!examId && !examId.startsWith("temp-"),
  });

  // Use temp exam if available, otherwise use fetched exam
  const currentExam = tempExam || exam;
  const isTempExam = !!tempExam;

  console.log("Current exam:", currentExam);
  console.log("Is temp exam flag:", isTempExam);

  // Remove auto-start for temp exams in useEffect
  // useEffect(() => {
  //   console.log("Auto-start useEffect triggered:", { isTempExam, tempExam, hasStarted });
    
  //   if (isTempExam && tempExam && !hasStarted) {
  //     console.log("Auto-starting temp exam...");
      
  //     // Auto-start the assessment for temp exams
  //     setAttemptId(`temp-attempt-${Date.now()}`);
  //     setTimeRemaining(tempExam.duration * 60);
  //     setHasStarted(true);
      
  //     // Request fullscreen
  //     const element = document.documentElement;
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen().catch(() => {
  //         // If fullscreen fails, continue anyway
  //         setIsFullscreen(true);
  //       });
  //     } else {
  //       setIsFullscreen(true);
  //     }
  //   }
  // }, [isTempExam, tempExam, hasStarted]);

  const startExam = async () => {
    setIsAttempting(true);
    try {
      if (isTempExam) {
        // For temp exams, just start the assessment without backend
        setAttemptId(`temp-attempt-${Date.now()}`);
        setTimeRemaining(currentExam.duration * 60);
        // Request fullscreen
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        }
        setIsFullscreen(true);
        setHasStarted(true);
      } else {
        // For regular exams, use the backend
        const response = await axios.post("/exam-attempts/start", {
          examId,
        });
        setAttemptId(response.data._id);
        // Set initial time remaining in seconds
        setTimeRemaining(currentExam.duration * 60);
        // Request fullscreen
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        }
        setIsFullscreen(true);
        setHasStarted(true);
      }
    } catch (error) {
      console.error("Failed to start exam:", error);
      toast.error("Failed to start exam. Please try again.");
    } finally {
      setIsAttempting(false);
    }
  };

  const submitExam = useCallback(async () => {
    if (!attemptId) return;
    setIsSubmitting(true);
    try {
      if (isTempExam) {
        // For temp exams, save answers to sessionStorage for the completed page
        sessionStorage.setItem('tempAnswers', JSON.stringify(answers));
        router.push(`/dashboard/assessments/completed/${attemptId}`);
      } else {
        // For regular exams, submit to backend
        await axios.put(`/exam-attempts/${attemptId}/complete`);
        router.push(`/dashboard/assessments/completed/${attemptId}`);
      }
    } catch (error) {
      console.error("Failed to submit exam:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [attemptId, router, isTempExam, answers]);

  const handleAnswerSelect = async (questionId: string, selectedOption: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
    
    if (!isTempExam) {
      try {
        await axios.post("/exam-attempts/submit-answer", {
          attemptId,
          questionId,
          selectedOption,
        });
      } catch (error) {
        console.error("Failed to submit answer:", error);
        toast.error("Failed to save answer. Please try again.");
      }
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isLastQuestion = currentQuestionIndex === currentExam?.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else if (hasStarted) {
        // Only submit if exam has started and user exits fullscreen
        submitExam();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [hasStarted, submitExam]);

  // Handle visibility change (tab change)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted) {
        submitExam();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasStarted, submitExam]);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (hasStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up, submit exam
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [hasStarted, timeRemaining, submitExam]);

  // Submit on unmount if exam is still ongoing
  useEffect(() => {
    return () => {
      if (hasStarted && !isFullscreen) {
        submitExam();
      }
    };
  }, [hasStarted, isFullscreen, submitExam]);

  if (isLoading && !tempExam) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!currentExam) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Exam not found</p>
      </div>
    );
  }

  // For temp exams, show the Start Exam button (do not auto-start)
  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-6">{currentExam.title}</h1>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Number of Questions</span>
              <span className="font-medium">{currentExam.questions.length}</span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">{currentExam.duration} minutes</span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Passing Score</span>
              <span className="font-medium">{currentExam.passingScore}%</span>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Important Information
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>The exam will open in full screen mode</li>
                    <li>
                      Exiting full screen will submit your exam automatically
                    </li>
                    <li>Changing tabs or applications will submit your exam</li>
                    <li>Make sure you have a stable internet connection</li>
                    <li>Ensure your device is fully charged or plugged in</li>
                    <li>You can navigate between questions using Previous/Next buttons</li>
                    <li>You must answer each question before proceeding</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-[#1045A1] hover:bg-[#0D3A8B]"
            onClick={startExam}
            disabled={isAttempting}
          >
            {isAttempting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting...
              </>
            ) : (
              "Start Exam"
            )}
          </Button>
        </Card>
      </div>
    );
  }

  if (hasStarted) {
    const currentQuestion = currentExam.questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestion?._id];

    return (
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header with progress */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{currentExam.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {currentExam.questions.length}
            </div>
            <div className="text-sm font-medium text-red-600">
              Time: {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-[#1045A1] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / currentExam.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-medium mb-4">
            {currentQuestionIndex + 1}. {currentQuestion.text}
          </h3>
          {currentQuestion.imageUrl && (
            <img
              src={currentQuestion.imageUrl}
              alt="Question"
              className="mb-4 rounded-lg max-w-full"
            />
          )}
          <div className="space-y-2">
            {currentQuestion.answerOptions.map(
              (option: any, optionIndex: number) => (
                <label
                  key={optionIndex}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAnswer === optionIndex 
                      ? 'border-[#1045A1] bg-blue-50' 
                      : 'hover:border-[#1045A1]'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion?._id}`}
                    value={optionIndex}
                    checked={selectedAnswer === optionIndex}
                    className="text-[#1045A1]"
                    onChange={() => handleAnswerSelect(currentQuestion?._id, optionIndex)}
                  />
                  <span>{option.text}</span>
                </label>
              )
            )}
          </div>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={isFirstQuestion}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {!isLastQuestion ? (
              <Button
                className="bg-[#1045A1] hover:bg-[#0D3A8B] flex items-center space-x-2"
                onClick={goToNextQuestion}
                disabled={selectedAnswer === undefined}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="bg-[#1045A1] hover:bg-[#0D3A8B]"
                onClick={submitExam}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Exam"
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Question navigation dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {currentExam.questions.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuestionIndex 
                  ? 'bg-[#1045A1]' 
                  : answers[currentExam.questions[index]?._id] !== undefined 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
              }`}
              title={`Question ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-8">
        <h1 className="text-2xl font-bold mb-6">{currentExam.title}</h1>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Number of Questions</span>
            <span className="font-medium">{currentExam.questions.length}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{currentExam.duration} minutes</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Passing Score</span>
            <span className="font-medium">{currentExam.passingScore}%</span>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Information
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>The exam will open in full screen mode</li>
                  <li>
                    Exiting full screen will submit your exam automatically
                  </li>
                  <li>Changing tabs or applications will submit your exam</li>
                  <li>Make sure you have a stable internet connection</li>
                  <li>Ensure your device is fully charged or plugged in</li>
                  <li>You can navigate between questions using Previous/Next buttons</li>
                  <li>You must answer each question before proceeding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-[#1045A1] hover:bg-[#0D3A8B]"
          onClick={startExam}
          disabled={isAttempting}
        >
          {isAttempting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Starting...
            </>
          ) : (
            "Start Exam"
          )}
        </Button>
      </Card>
    </div>
  );
}

// Main component with Suspense
export default function AssessmentStartPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>}>
      <AssessmentContent />
    </Suspense>
  );
}