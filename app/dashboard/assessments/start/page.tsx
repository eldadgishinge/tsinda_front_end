"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ExitAssessmentDialog } from "@/components/exit-assessment-dialog";

// Sample questions data
const questions = [
  {
    id: 1,
    question: "What is the main purpose of ABS (Anti-lock Braking System)?",
    hasImage: true,
    options: [
      "To reduce tire wear.",
      "To prevent the wheels from locking during braking.",
      "To enhance fuel efficiency.",
      "To provide smoother acceleration.",
    ],
  },
  // Add more questions as needed
];

export default function AssessmentStartPage() {
  // const searchParams = useSearchParams();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const totalQuestions = 10; //Number.parseInt(searchParams.get("count") || "25");
  const [currentQuestion, setCurrentQuestion] = useState(2); // 3rd question (0-based index)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(totalQuestions * 60); // 1 minute per question

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (selectedAnswer) {
      setCurrentQuestion((prev) => Math.min(totalQuestions - 1, prev + 1));
      setSelectedAnswer(""); // Reset selected answer for the next question
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => setShowExitDialog(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <X className="h-5 w-5" />
              <span className="font-medium">CLOSE</span>
            </button>
            <div className="text-sm font-medium">
              {currentQuestion + 1}/{totalQuestions}
            </div>
          </div>
          <div className="pb-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Question */}
          <div className="space-y-8">
            <h1 className="text-2xl font-bold">
              3. What is the main purpose of ABS (Anti-lock Braking System)?
            </h1>
            {questions[0].hasImage && (
              <div className="w-full aspect-square relative rounded-3xl overflow-hidden bg-[#FBF7F0] p-12">
                <img
                  src="/placeholder.svg"
                  alt="Question illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Right Column: Options */}
          <div>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
              className="space-y-4"
            >
              {questions[0].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-[#1045A1] transition-colors"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-grow cursor-pointer text-base text-gray-600"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="w-32 h-12"
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(0, prev - 1))
              }
            >
              BACK
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-[#1045A1] animate-spin" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            <Button
              className="w-32 h-12 bg-[#1045A1] hover:bg-[#0D3A8B] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <ExitAssessmentDialog
        open={showExitDialog}
        onOpenChange={setShowExitDialog}
      />
    </div>
  );
}
