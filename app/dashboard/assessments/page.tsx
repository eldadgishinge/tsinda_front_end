"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useExams } from "@/hooks/use-exams";
import { useCategories } from "@/hooks/use-categories";
import { useCreateRandomExam } from "@/hooks/use-exams";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<"category" | "general">(
    "category"
  );
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [questionCount, setQuestionCount] = useState<"10" | "25">("10");

  const router = useRouter();
  const { data: exams, isLoading: isLoadingExams } = useExams();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { mutateAsync: createRandomExam, isPending: isCreating } =
    useCreateRandomExam();

  const handleStartAssessment = async () => {
    if (!selectedCategory) return;

    try {
      const result = await createRandomExam({
        title: `${
          categories?.find((c) => c._id === selectedCategory)?.categoryName
        } Assessment`,
        description: "Category assessment",
        duration: parseInt(questionCount),
        passingScore: 70,
        questionCount: parseInt(questionCount),
        category: selectedCategory,
      });

      if (result.exam?._id) {
        router.push(`/dashboard/assessments/start?id=${result.exam._id}`);
      }
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  if (isLoadingExams || isLoadingCategories) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Assessments</h1>
        <p className="text-gray-600">
          Discover your skill level and receive customized learning
          recommendations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "category" ? "default" : "ghost"}
            className={
              activeTab === "category"
                ? "bg-[#E6EDF7] text-[#1045A1] hover:bg-blue-100"
                : ""
            }
            onClick={() => setActiveTab("category")}
          >
            By Category
          </Button>
          <Button
            variant={activeTab === "general" ? "default" : "ghost"}
            className={
              activeTab === "general"
                ? "bg-[#E6EDF7] text-[#1045A1] hover:bg-blue-100"
                : ""
            }
            onClick={() => setActiveTab("general")}
          >
            General
          </Button>
        </div>
      </div>

      {activeTab === "category" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="border rounded-lg overflow-hidden hover:border-[#1045A1] transition-colors cursor-pointer"
              onClick={() => {
                setSelectedCategory(category._id);
                setShowQuestionDialog(true);
              }}
            >
              <div className="p-6 space-y-4">
                <h3 className="font-semibold">{category.categoryName}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Multiple Choice</span>
                  <span>10-25 Questions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {exams
            ?.filter((exam) => exam.status === "Published")
            ?.map((exam) => (
              <Link
                key={exam._id}
                href={`/dashboard/assessments/start?id=${exam._id}`}
                className="block border rounded-lg p-6 hover:border-[#1045A1] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {exam.questions.length} Questions
                    </div>
                    <div className="text-sm text-gray-500">
                      {exam.duration} minutes
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}

      <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Number of Questions</DialogTitle>
            <DialogDescription>
              Select how many questions you want to answer. More questions will
              give you a more accurate assessment.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer text-center ${
                questionCount === "10" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
              }`}
              onClick={() => setQuestionCount("10")}
            >
              <h3 className="font-semibold">10 Questions</h3>
              <p className="text-sm text-gray-600">10 minutes</p>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer text-center ${
                questionCount === "25" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
              }`}
              onClick={() => setQuestionCount("25")}
            >
              <h3 className="font-semibold">25 Questions</h3>
              <p className="text-sm text-gray-600">25 minutes</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowQuestionDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#1045A1] hover:bg-[#0D3A8B]"
              onClick={handleStartAssessment}
              isLoading={isCreating}
            >
              Start Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
