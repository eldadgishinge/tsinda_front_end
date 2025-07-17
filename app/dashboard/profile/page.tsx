"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useCategories } from "@/hooks/use-categories";
import { useExamAttempts } from "@/hooks/use-exam-attempts";
import { useUser } from "@/hooks/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CategoryProgress {
  categoryId: string;
  categoryName: string;
  totalQuestions: number;
  completedQuestions: number;
}

export default function ProfilePage() {
  const { data: user } = useUser();
  const { data: categories } = useCategories();
  const { data: examAttempts } = useExamAttempts();
  const router = useRouter();
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>(
    []
  );
  const [totalProgress, setTotalProgress] = useState(0);

  // Calculate progress for each category
  useEffect(() => {
    if (!categories || !examAttempts) return;

    const progress = categories.map((category) => {
      // Get all exam attempts for this category
      const categoryAttempts = examAttempts.filter(
        (attempt) => attempt?.exam?.category?._id === category._id
      );

      // Count unique questions answered in this category
      const uniqueQuestions = new Set();
      categoryAttempts.forEach((attempt) => {
        attempt.answers.forEach((answer) => {
          uniqueQuestions.add(answer.questionId);
        });
      });

      return {
        categoryId: category._id,
        categoryName: category.categoryName,
        totalQuestions: 120, // Required questions per category
        completedQuestions: uniqueQuestions.size,
      };
    });

    setCategoryProgress(progress);

    // Calculate total progress
    const totalCompleted = progress.reduce(
      (sum, cat) => sum + cat.completedQuestions,
      0
    );
    const totalRequired = progress.length * 120;
    setTotalProgress(Math.min((totalCompleted / totalRequired) * 100, 100));
  }, [categories, examAttempts]);

  // Function to shuffle array
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to handle retry
  const handleRetry = (attempt: any) => {
    // Create a temp exam with shuffled questions
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
    
    // Store the temp exam for retry
    sessionStorage.setItem("tempExam", JSON.stringify(tempExam));
    sessionStorage.removeItem('tempAnswers');
    
    // Navigate to start page
    router.push(`/dashboard/assessments/start?id=${tempExam._id}`);
  };

  // If user is admin, redirect to admin dashboard
  if (user?.role === "admin") {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12 overflow-x-hidden">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
        <p className="text-gray-600 text-sm lg:text-base">Track your learning progress</p>
      </div>

      {/* Learning Progress Section */}
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">Learning progress</h2>
          <p className="text-gray-600 text-sm lg:text-base">
            After the bar is full you will be ready for your exams
          </p>
        </div>

        <div className="relative my-4 sm:my-6">
          {/* Progress Bar */}
          <Progress value={totalProgress} className="h-3 sm:h-4" />

          {/* Progress Steps */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoryProgress.map((category) => (
              <Card
                key={category.categoryId}
                className="p-3 sm:p-4 relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                      category.completedQuestions >= category.totalQuestions
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {category.completedQuestions >= category.totalQuestions ? (
                      <Check className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />
                    ) : (
                      <div className="h-2 w-4 sm:h-3 sm:w-5 bg-[#1045A1] rounded-full" />
                    )}
                  </div>
                  <span className="font-medium text-sm lg:text-base">{category.categoryName}</span>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={
                      (category.completedQuestions / category.totalQuestions) *
                      100
                    }
                    className="h-2 sm:h-3"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>
                      {category.completedQuestions} / {category.totalQuestions}
                    </span>
                    <span>
                      {Math.round(
                        (category.completedQuestions /
                          category.totalQuestions) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Past Tests Section */}
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">Past tests</h2>
          <p className="text-gray-600 text-sm lg:text-base">Here are your completed exams</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {examAttempts?.map((attempt) => (
            <div
              key={attempt._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:py-4 border-b last:border-b-0 gap-3 sm:gap-4"
            >
              <div className="space-y-1">
                <div className="font-medium text-sm lg:text-base">{attempt.exam?.title || "Untitled Exam"}</div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {new Date(attempt.endTime).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div
                  className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                    attempt.isPassed
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Score: {attempt.score}%
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRetry(attempt)}
                    className="flex items-center gap-1 text-xs sm:text-sm h-8 sm:h-9"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Retry
                  </Button>
                <Link href={`/dashboard/assessments/completed/${attempt._id}`}>
                  <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-xs sm:text-sm h-8 sm:h-9">
                    View
                  </Button>
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
