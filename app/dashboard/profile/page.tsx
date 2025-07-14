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
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-600">Track your learning progress</p>
      </div>

      {/* Learning Progress Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Learning progress</h2>
          <p className="text-gray-600">
            After the bar is full you will be ready for your exams
          </p>
        </div>

        <div className="relative my-6">
          {/* Progress Bar */}
          <Progress value={totalProgress} className="h-4" />

          {/* Progress Steps */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryProgress.map((category) => (
              <Card
                key={category.categoryId}
                className="p-4 relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      category.completedQuestions >= category.totalQuestions
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {category.completedQuestions >= category.totalQuestions ? (
                      <Check className="h-6 w-6 text-green-500" />
                    ) : (
                      <div className="h-3 w-5 bg-[#1045A1] rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{category.categoryName}</span>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={
                      (category.completedQuestions / category.totalQuestions) *
                      100
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-600">
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
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Past tests</h2>
          <p className="text-gray-600">Here are your completed exams</p>
        </div>

        <div className="space-y-4">
          {examAttempts?.map((attempt) => (
            <div
              key={attempt._id}
              className="flex items-center justify-between py-4 border-b last:border-b-0"
            >
              <div className="space-y-1">
                <div className="font-medium">{attempt.exam?.title || "Untitled Exam"}</div>
                <div className="text-sm text-gray-600">
                  {new Date(attempt.endTime).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`px-2 py-1 rounded-full text-sm ${
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
                    className="flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Retry
                  </Button>
                  <Link href={`/dashboard/assessments/completed/${attempt._id}`}>
                    <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
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
