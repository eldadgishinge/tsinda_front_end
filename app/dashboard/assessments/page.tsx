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
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<"category" | "general">(
    "category"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [languageFilter, setLanguageFilter] = useState<"ENG" | "KIN">("ENG");
  const [questionCount, setQuestionCount] = useState<"10" | "20" | "50">("20");
  const [selectedLanguage, setSelectedLanguage] = useState<"ENG" | "KIN" | "">("");
  const [isStartingCustom, setIsStartingCustom] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<any[]>([]);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);
  
  const [showCategoryRandomDialog, setShowCategoryRandomDialog] = useState(false);
  const [selectedCategoryForRandom, setSelectedCategoryForRandom] = useState<any>(null);
  const [categoryQuestionCount, setCategoryQuestionCount] = useState<"20" | "30" | "40" | "50">("20");
  const [isStartingCategoryRandom, setIsStartingCategoryRandom] = useState(false);
  const [categoryRandomQuestions, setCategoryRandomQuestions] = useState<any[]>([]);
  const [isLoadingCategoryRandom, setIsLoadingCategoryRandom] = useState(false);

  const router = useRouter();
  const { data: exams, isLoading: isLoadingExams } = useExams();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const filteredCategories = categories?.filter((category) => {
    return category.language === languageFilter;
  });

  const filteredExams = exams?.filter((exam) => {
    if (!selectedCategory) return false;
    return exam?.category?._id === selectedCategory && exam.status === "Published";
  });

  const handleStartCategoryRandomAssessment = async (category?: any, questionCount?: string) => {
    const targetCategory = category || selectedCategoryForRandom;
    const targetQuestionCount = questionCount || categoryQuestionCount;
    
    if (!targetCategory) return;
    
    setIsStartingCategoryRandom(true);
    setIsLoadingCategoryRandom(true);
    setShowCategoryRandomDialog(false);
    
    try {
      const response = await axios.get(`/questions/random/category/${targetCategory._id}?count=${targetQuestionCount}&language=${languageFilter}`, {
        timeout: 10000
      });
      window.sessionStorage.setItem('lastCategoryRandomApiResponse', JSON.stringify(response.data));
      const questions = response.data.questions || [];
      setCategoryRandomQuestions(questions);
    } catch (error: any) {
      toast.error(`Failed to load questions: ${error.response?.data?.message || error.message}`);
      setIsStartingCategoryRandom(false);
      setIsLoadingCategoryRandom(false);
    }
  };

  const handleStartGeneralAssessment = async (count: string, language: "ENG" | "KIN") => {
    setIsStartingCustom(true);
    setIsLoadingRandom(true);
    setQuestionCount(count as "10" | "20" | "50");
    
    try {
      const response = await axios.get(`/questions/random?count=${count}&language=${language}`, {
        timeout: 10000
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

  useEffect(() => {
    if (isStartingCustom && randomQuestions && randomQuestions.length > 0) {
      
      let duration = parseInt(questionCount);
      let language = "English";
      try {
        const lastRandomApi = window.sessionStorage.getItem('lastRandomApiResponse');
        if (lastRandomApi) {
          const parsed = JSON.parse(lastRandomApi);
          if (parsed.duration) duration = parsed.duration;
          if (parsed.language) language = parsed.language;
        }
      } catch {}

      const tempExam = {
        _id: `temp-${Date.now()}`,
        title: `General Assessment (${questionCount} Questions)`,
        description: `General assessment with ${questionCount} questions from all categories`,
        duration,
        passingScore: 70,
        questions: randomQuestions,
        category: { _id: "", categoryName: "General" },
        language: language,
        status: "Published" as const,
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem("tempExam", JSON.stringify(tempExam));
      
      setIsStartingCustom(false);
      setIsLoadingRandom(false);
      
      router.push(`/dashboard/assessments/start?id=${tempExam._id}`);
    }
  }, [isStartingCustom, randomQuestions, questionCount, router]);

  useEffect(() => {
    if (isStartingCategoryRandom && categoryRandomQuestions && categoryRandomQuestions.length > 0) {
      
      let duration = parseInt(categoryQuestionCount);
      try {
        const lastRandomApi = window.sessionStorage.getItem('lastCategoryRandomApiResponse');
        if (lastRandomApi) {
          const parsed = JSON.parse(lastRandomApi);
          if (parsed.duration) duration = parsed.duration;
        }
      } catch {}

      const tempExam = {
        _id: `temp-category-${Date.now()}`,
        title: `${selectedCategoryForRandom?.categoryName} Assessment (${categoryQuestionCount} Questions)`,
        description: `Random assessment with ${categoryQuestionCount} questions from ${selectedCategoryForRandom?.categoryName}`,
        duration,
        passingScore: 70,
        questions: categoryRandomQuestions,
        category: { _id: selectedCategoryForRandom?._id || "", categoryName: selectedCategoryForRandom?.categoryName || "Category" },
        language: languageFilter === "ENG" ? "English" : "Kinyarwanda",
        status: "Published" as const,
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem("tempExam", JSON.stringify(tempExam));
      
      setIsStartingCategoryRandom(false);
      setIsLoadingCategoryRandom(false);
      
      router.push(`/dashboard/assessments/start?id=${tempExam._id}`);
    }
  }, [isStartingCategoryRandom, categoryRandomQuestions, categoryQuestionCount, selectedCategoryForRandom, languageFilter, router]);

  if ((isStartingCustom && isLoadingRandom) || (isStartingCategoryRandom && isLoadingCategoryRandom)) {
    return (
      <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Assessments</h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Discover your skill level and receive customized learning
            recommendations.
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-transparent rounded-full border-2 border-[#1045A1] border-b-transparent animate-spin mx-auto"></div>
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#1045A1]">Preparing Your Assessment</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                {isStartingCustom 
                  ? `Loading ${questionCount} questions for general assessment...`
                  : `Loading ${categoryQuestionCount} questions for ${selectedCategoryForRandom?.categoryName}...`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingExams || isLoadingCategories) {
    return (
      <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
        <div className="h-6 lg:h-8 w-32 lg:w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 lg:h-6 w-64 lg:w-96 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4">
              <div className="h-4 lg:h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 lg:h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 lg:h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Assessments</h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Discover your skill level and receive customized learning
          recommendations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "category" ? "default" : "ghost"}
            className={`text-sm lg:text-base ${
              activeTab === "category"
                ? "bg-[#E6EDF7] text-[#1045A1] hover:bg-blue-100"
                : ""
            }`}
            onClick={() => {
              setActiveTab("category");
              setSelectedCategory(undefined);
            }}
          >
            By Category
          </Button>
          <Button
            variant={activeTab === "general" ? "default" : "ghost"}
            className={`text-sm lg:text-base ${
              activeTab === "general"
                ? "bg-[#E6EDF7] text-[#1045A1] hover:bg-blue-100"
                : ""
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs lg:text-sm text-gray-600">Language:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguageFilter("ENG")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                languageFilter === "ENG"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguageFilter("KIN")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                languageFilter === "KIN"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Kinyarwanda
            </button>
          </div>
        </div>
      </div>

      {activeTab === "category" ? (
        <div>
          {!selectedCategory ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredCategories?.map((category) => {
                const categoryExams = exams?.filter(
                  (exam) => exam?.category?._id === category._id && exam.status === "Published"
                ) || [];
                
                return (
                  <div
                    key={category._id}
                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {category.categoryName.charAt(0)}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#1045A1] transition-colors duration-300">
                            {category.categoryName}
                          </h3>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                          category.language === "ENG" 
                            ? "bg-blue-100 text-blue-700 border border-blue-200" 
                            : "bg-purple-100 text-purple-700 border border-purple-200"
                        }`}>
                          {category.language === "ENG" ? "English" : "Kinyarwanda"}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">
                            {categoryExams.length} Available Exams
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#1045A1] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                          <span>View Exams</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(undefined)}
                  className="flex items-center gap-2 text-sm lg:text-base"
                >
                  ← Back to Categories
                </Button>
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
                  {categories?.find((c) => c._id === selectedCategory)?.categoryName} Assessments
                </h2>
              </div>
              
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Category Assessments</h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-3 sm:mb-4 lg:mb-6">
                  Choose your preferred assessment size with questions from {categories?.find((c) => c._id === selectedCategory)?.categoryName}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  <div 
                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
                    onClick={() => {
                      const category = categories?.find((c) => c._id === selectedCategory);
                      if (category) {
                        setSelectedCategoryForRandom(category);
                        setCategoryQuestionCount("10");
                        handleStartCategoryRandomAssessment(category, "10");
                      }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-xl">10</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#1045A1] transition-colors duration-300">Quick Assessment</h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">Perfect for a quick practice session</p>
                      
                      <div className="flex items-center justify-center gap-2 text-[#1045A1] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{isStartingCategoryRandom && categoryQuestionCount === "10" ? "Loading..." : "Start Now"}</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl border-2 border-[#1045A1] overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
                    onClick={() => {
                      const category = categories?.find((c) => c._id === selectedCategory);
                      if (category) {
                        setSelectedCategoryForRandom(category);
                        setCategoryQuestionCount("20");
                        handleStartCategoryRandomAssessment(category, "20");
                      }
                    }}
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        RECOMMENDED
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-xl">20</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#1045A1] transition-colors duration-300">Standard Assessment</h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">Balanced assessment for comprehensive practice</p>
                      
                      <div className="flex items-center justify-center gap-2 text-[#1045A1] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{isStartingCategoryRandom && categoryQuestionCount === "20" ? "Loading..." : "Start Now"}</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
                    onClick={() => {
                      const category = categories?.find((c) => c._id === selectedCategory);
                      if (category) {
                        setSelectedCategoryForRandom(category);
                        setCategoryQuestionCount("50");
                        handleStartCategoryRandomAssessment(category, "50");
                      }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-xl">50</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#1045A1] transition-colors duration-300">Comprehensive Assessment</h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">In-depth assessment for thorough evaluation</p>
                      
                      <div className="flex items-center justify-center gap-2 text-[#1045A1] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{isStartingCategoryRandom && categoryQuestionCount === "50" ? "Loading..." : "Start Now"}</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">General Assessments</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-3 sm:mb-4 lg:mb-6">
              Choose your preferred assessment size with questions from all categories
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div 
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
                onClick={() => {
                  handleStartGeneralAssessment("10", languageFilter);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">10</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#1045A1] transition-colors duration-300">Quick Assessment</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">Perfect for a quick practice session</p>
                  
                  <div className="flex items-center justify-center gap-2 text-[#1045A1] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>{isStartingCustom && questionCount === "10" ? "Loading..." : "Start Now"}</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div 
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl border-2 border-[#1045A1] overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
                onClick={() => {
                  handleStartGeneralAssessment("20", languageFilter);
                }}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    RECOMMENDED
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">20</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#1045A1] transition-colors duration-300">Standard Assessment</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">Balanced assessment for comprehensive practice</p>
                  
                  <div className="flex items-center justify-center gap-2 text-[#1045A1] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>{isStartingCustom && questionCount === "20" ? "Loading..." : "Start Now"}</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div 
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
                onClick={() => {
                  handleStartGeneralAssessment("50", languageFilter);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">50</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#1045A1] transition-colors duration-300">Comprehensive Assessment</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">In-depth assessment for thorough evaluation</p>
                  
                  <div className="flex items-center justify-center gap-2 text-[#1045A1] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>{isStartingCustom && questionCount === "50" ? "Loading..." : "Start Now"}</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      )}

      <Dialog open={showCategoryRandomDialog} onOpenChange={setShowCategoryRandomDialog}>
        <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Random Assessment</DialogTitle>
            <DialogDescription>
              Choose the number of questions for your random assessment from {selectedCategoryForRandom?.categoryName}. 
              Questions will be randomly selected from this category.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="font-medium mb-3">Select Number of Questions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer text-center ${
                    categoryQuestionCount === "20" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setCategoryQuestionCount("20")}
                >
                  <h3 className="font-semibold text-sm lg:text-base">20 Questions</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Quick assessment - 20 minutes</p>
                </div>

                <div
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer text-center ${
                    categoryQuestionCount === "30" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setCategoryQuestionCount("30")}
                >
                  <h3 className="font-semibold text-sm lg:text-base">30 Questions</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Standard assessment - 30 minutes</p>
                </div>

                <div
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer text-center ${
                    categoryQuestionCount === "40" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setCategoryQuestionCount("40")}
                >
                  <h3 className="font-semibold text-sm lg:text-base">40 Questions</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Extended assessment - 40 minutes</p>
                </div>

                <div
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer text-center ${
                    categoryQuestionCount === "50" ? "border-[#1045A1] bg-[#E6EDF7]" : ""
                  }`}
                  onClick={() => setCategoryQuestionCount("50")}
                >
                  <h3 className="font-semibold text-sm lg:text-base">50 Questions</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Comprehensive assessment - 50 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCategoryRandomDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#1045A1] hover:bg-[#0D3A8B]"
              onClick={handleStartCategoryRandomAssessment}
              isLoading={isLoadingCategoryRandom}
            >
              Start Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


