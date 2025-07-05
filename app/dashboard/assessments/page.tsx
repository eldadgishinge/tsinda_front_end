"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useExams } from "@/hooks/use-exams";
import { useCategories } from "@/hooks/use-categories";
import axios from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<"category" | "general">(
    "category"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [languageFilter, setLanguageFilter] = useState<"all" | "ENG" | "KIN">("all");
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [questionCount, setQuestionCount] = useState<"10" | "25" | "50">("10");
  const [customLanguage, setCustomLanguage] = useState<"ENG" | "KIN">("ENG");
  const [isStartingCustom, setIsStartingCustom] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<any[]>([]);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  const router = useRouter();
  const { data: exams, isLoading: isLoadingExams } = useExams();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  // Filter categories based on language selection
  const filteredCategories = categories?.filter((category) => {
    if (languageFilter === "all") return true;
    return category.language === languageFilter;
  });

  // Filter exams by selected category
  const filteredExams = exams?.filter((exam) => {
    if (!selectedCategory) return false;
    return exam?.category?._id === selectedCategory && exam.status === "Published";
  });

  const handleStartCustomAssessment = async () => {
    setIsStartingCustom(true);
    setIsLoadingRandom(true);
    setShowCustomDialog(false);
    toast.success(`Preparing your ${questionCount}-question assessment in ${customLanguage === "ENG" ? "English" : "Kinyarwanda"}...`);
    
    try {
      const response = await axios.get(`/questions/random?count=${questionCount}&language=${customLanguage}`, {
        timeout: 10000 // 10 second timeout
      });
      window.sessionStorage.setItem('lastRandomApiResponse', JSON.stringify(response.data));
      const questions = response.data.questions || [];
      setRandomQuestions(questions);
    } catch (error: any) {
      toast.error(`Failed to load questions: ${error.response?.data?.message || error.message}`);
      setIsStartingCustom(false);
      setIsLoadingRandom(false);
    }
  };

  // useEffect to handle navigation when random questions are loaded
  useEffect(() => {
    if (isStartingCustom && randomQuestions && randomQuestions.length > 0) {
      
      // Get duration from the last random API response if available
      let duration = parseInt(questionCount);
      try {
        const lastRandomApi = window.sessionStorage.getItem('lastRandomApiResponse');
        if (lastRandomApi) {
          const parsed = JSON.parse(lastRandomApi);
          if (parsed.duration) duration = parsed.duration;
        }
      } catch {}

      // Create a temporary exam object with the random questions
      const tempExam = {
        _id: `temp-${Date.now()}`,
        title: `General Assessment (${questionCount} Questions) - ${customLanguage === "ENG" ? "English" : "Kinyarwanda"}`,
        description: `Custom general assessment with mixed questions in ${customLanguage === "ENG" ? "English" : "Kinyarwanda"}`,
        duration,
        passingScore: 70,
        questions: randomQuestions,
        category: { _id: "", categoryName: "General" },
        language: customLanguage === "ENG" ? "English" : "Kinyarwanda",
        status: "Published" as const,
        createdAt: new Date().toISOString(),
      };

      // Store the exam in sessionStorage for the assessment page
      sessionStorage.setItem("tempExam", JSON.stringify(tempExam));
      
      // Reset the state
      setIsStartingCustom(false);
      setIsLoadingRandom(false);
      
      // Navigate to the assessment immediately
      router.push(`/dashboard/assessments/start?id=${tempExam._id}`);
    }
  }, [isStartingCustom, randomQuestions, questionCount, customLanguage, router]);

  // Show loading state when fetching random questions
  if (isStartingCustom && isLoadingRandom) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Assessments</h1>
          <p className="text-gray-600">
            Discover your skill level and receive customized learning
            recommendations.
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-transparent rounded-full border-2 border-[#1045A1] border-b-transparent animate-spin mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold text-[#1045A1]">Preparing Your Assessment</h3>
              <p className="text-gray-600">
                Loading {questionCount} questions in {customLanguage === "ENG" ? "English" : "Kinyarwanda"}...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            onClick={() => {
              setActiveTab("category");
              setSelectedCategory(undefined);
            }}
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

        {/* Language Filter - Only show when "By Category" tab is active */}
        {activeTab === "category" && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Language:</span>
            <Select
              value={languageFilter}
              onValueChange={(value: "all" | "ENG" | "KIN") => setLanguageFilter(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ENG">English</SelectItem>
                <SelectItem value="KIN">Kinyarwanda</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {activeTab === "category" ? (
        <div>
          {!selectedCategory ? (
            // Show categories grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories?.map((category) => {
                // Count published exams for this category
                const categoryExams = exams?.filter(
                  (exam) => exam?.category?._id === category._id && exam.status === "Published"
                ) || [];
                
                return (
                  <div
                    key={category._id}
                    className="border rounded-lg overflow-hidden hover:border-[#1045A1] transition-colors cursor-pointer"
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{category.categoryName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          category.language === "ENG" 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-purple-100 text-purple-700"
                        }`}>
                          {category.language === "ENG" ? "English" : "Kinyarwanda"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{category.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{categoryExams.length} Available Exams</span>
                        <span>Click to view</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Show exams for selected category
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(undefined)}
                  className="flex items-center gap-2"
                >
                  ← Back to Categories
                </Button>
                <h2 className="text-xl font-semibold">
                  {categories?.find((c) => c._id === selectedCategory)?.categoryName} Exams
                </h2>
              </div>
              
              {filteredExams && filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
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
                ))
              ) : (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                  <p className="text-gray-500 mb-2">No exams available for this category</p>
                  <p className="text-sm text-gray-400">Check back later for new assessments</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Custom Assessment Option */}
          <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Custom Assessment</h3>
                <p className="text-sm text-gray-600">
                  Create a personalized assessment with questions from all categories
                </p>
              </div>
              <Button
                onClick={() => setShowCustomDialog(true)}
                className="bg-[#1045A1] hover:bg-[#0D3A8B]"
              >
                Create Custom Assessment
              </Button>
            </div>
          </div>

          {/* Existing Exams */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Exams</h3>
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
          </div>
        </div>
      )}

      {/* Custom Assessment Dialog */}
      <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Custom Assessment</DialogTitle>
            <DialogDescription>
              Choose your preferred language and number of questions for your personalized assessment. 
              Questions will be selected from all available categories in the selected language.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Language Selection */}
            <div>
              <h4 className="font-medium mb-3">Select Language</h4>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer text-center ${
                    customLanguage === "ENG" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setCustomLanguage("ENG")}
                >
                  <h3 className="font-semibold">English</h3>
                  <p className="text-sm text-gray-600">Questions in English</p>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer text-center ${
                    customLanguage === "KIN" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setCustomLanguage("KIN")}
                >
                  <h3 className="font-semibold">Kinyarwanda</h3>
                  <p className="text-sm text-gray-600">Questions in Kinyarwanda</p>
                </div>
              </div>
            </div>

            {/* Question Count Selection */}
            <div>
              <h4 className="font-medium mb-3">Select Number of Questions</h4>
              <div className="grid grid-cols-1 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer text-center ${
                    questionCount === "10" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setQuestionCount("10")}
                >
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-gray-600">Quick assessment - 10 minutes</p>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer text-center ${
                    questionCount === "25" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setQuestionCount("25")}
                >
                  <h3 className="font-semibold">25 Questions</h3>
                  <p className="text-sm text-gray-600">Standard assessment - 25 minutes</p>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer text-center ${
                    questionCount === "50" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setQuestionCount("50")}
                >
                  <h3 className="font-semibold">50 Questions</h3>
                  <p className="text-sm text-gray-600">Comprehensive assessment - 50 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCustomDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#1045A1] hover:bg-[#0D3A8B]"
              onClick={handleStartCustomAssessment}
              isLoading={isLoadingRandom}
            >
              Start Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
