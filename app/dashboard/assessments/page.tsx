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
import { RotateCcw, BookOpen, Target, Zap, Clock, Star, ArrowRight, CheckCircle, Play, Sparkles, TrendingUp, Award } from "lucide-react";
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
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes("No questions found")) {
        toast("No questions found in this category");
      } else {
        toast.error(`Failed to load questions: ${errorMessage}`);
      }
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
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes("No questions found")) {
        toast("No questions found in this category");
      } else {
        toast.error(`Failed to load questions: ${errorMessage}`);
      }
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
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-100 border-t-[#1045A1] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-[#1045A1] animate-pulse" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Preparing Your Assessment</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {isStartingCustom 
                ? `Loading ${questionCount} questions for your general assessment...`
                : `Loading ${categoryQuestionCount} questions from ${selectedCategoryForRandom?.categoryName}...`
              }
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingExams || isLoadingCategories) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-5 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 space-y-4 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
              <div className="flex justify-between items-center">
                <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-2xl flex items-center justify-center shadow-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Assessments</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Test your knowledge and track your progress with our comprehensive assessments
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Personalized Learning</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Track Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Tab Navigation */}
          <div className="flex gap-3">
            <Button
              variant={activeTab === "category" ? "default" : "outline"}
              className={`font-medium transition-all duration-300 px-6 py-3 ${
                activeTab === "category"
                  ? "bg-[#1045A1] text-white shadow-lg hover:bg-[#0D3A8B] hover:shadow-xl"
                  : "hover:bg-gray-50 border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => {
                setActiveTab("category");
                setSelectedCategory(undefined);
              }}
            >
              <BookOpen className="w-5 h-5 mr-3" />
              By Category
            </Button>
            <Button
              variant={activeTab === "general" ? "default" : "outline"}
              className={`font-medium transition-all duration-300 px-6 py-3 ${
                activeTab === "general"
                  ? "bg-[#1045A1] text-white shadow-lg hover:bg-[#0D3A8B] hover:shadow-xl"
                  : "hover:bg-gray-50 border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setActiveTab("general")}
            >
              <Zap className="w-5 h-5 mr-3" />
              General
            </Button>
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Language:</span>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setLanguageFilter("ENG")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  languageFilter === "ENG"
                    ? "bg-white text-[#1045A1] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguageFilter("KIN")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  languageFilter === "KIN"
                    ? "bg-white text-[#1045A1] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Kinyarwanda
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeTab === "category" ? (
        <div>
          {!selectedCategory ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories?.map((category) => {
                const categoryExams = exams?.filter(
                  (exam) => exam?.category?._id === category._id && exam.status === "Published"
                ) || [];
                
                return (
                  <div
                    key={category._id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]"
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">
                              {category.categoryName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#1045A1] transition-colors duration-300">
                              {category.categoryName}
                            </h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              category.language === "ENG" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-purple-100 text-purple-800"
                            }`}>
                              {category.language === "ENG" ? "English" : "Kinyarwanda"}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[#1045A1] group-hover:translate-x-2 transition-all duration-300" />
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed line-clamp-2 text-base">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-semibold text-gray-700">
                            {categoryExams.length} Available Exams
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#1045A1] font-semibold text-sm">
                          <span>View Exams</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(undefined)}
                  className="flex items-center gap-3 px-6 py-3"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  Back to Categories
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {categories?.find((c) => c._id === selectedCategory)?.categoryName} Assessments
                  </h2>
                  <p className="text-gray-600 mt-2 text-lg">Choose your preferred assessment size</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div 
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-3 hover:scale-105"
                  onClick={() => {
                    const category = categories?.find((c) => c._id === selectedCategory);
                    if (category) {
                      setSelectedCategoryForRandom(category);
                      setCategoryQuestionCount("10");
                      handleStartCategoryRandomAssessment(category, "10");
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-2xl">10</span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#1045A1] transition-colors duration-300">Quick Assessment</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-base">Perfect for a quick practice session</p>
                    
                    <div className="flex items-center justify-center gap-3 text-[#1045A1] font-semibold text-base group-hover:gap-4 transition-all duration-300">
                      {isStartingCategoryRandom && categoryQuestionCount === "10" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#1045A1] border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span>Start Now</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div 
                  className="group relative bg-white rounded-2xl shadow-xl hover:shadow-3xl border-2 border-[#1045A1] overflow-visible transition-all duration-300 cursor-pointer transform hover:-translate-y-3 hover:scale-105"
                  onClick={() => {
                    const category = categories?.find((c) => c._id === selectedCategory);
                    if (category) {
                      setSelectedCategoryForRandom(category);
                      setCategoryQuestionCount("20");
                      handleStartCategoryRandomAssessment(category, "20");
                    }
                  }}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-2xl">20</span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#1045A1] transition-colors duration-300">Standard Assessment</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-base">Balanced assessment for comprehensive practice</p>
                    
                    <div className="flex items-center justify-center gap-3 text-[#1045A1] font-semibold text-base group-hover:gap-4 transition-all duration-300">
                      {isStartingCategoryRandom && categoryQuestionCount === "20" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#1045A1] border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span>Start Now</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div 
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-3 hover:scale-105"
                  onClick={() => {
                    const category = categories?.find((c) => c._id === selectedCategory);
                    if (category) {
                      setSelectedCategoryForRandom(category);
                      setCategoryQuestionCount("50");
                      handleStartCategoryRandomAssessment(category, "50");
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-2xl">50</span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#1045A1] transition-colors duration-300">Comprehensive Assessment</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-base">In-depth assessment for thorough evaluation</p>
                    
                    <div className="flex items-center justify-center gap-3 text-[#1045A1] font-semibold text-base group-hover:gap-4 transition-all duration-300">
                      {isStartingCategoryRandom && categoryQuestionCount === "50" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#1045A1] border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span>Start Now</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">General Assessments</h3>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Choose your preferred assessment size with questions from all categories. 
              Perfect for testing your overall knowledge across different subjects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-3 hover:scale-105 min-h-[360px]"
              onClick={() => {
                handleStartGeneralAssessment("10", languageFilter);
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-10 text-center flex flex-col justify-center h-full">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-3xl">10</span>
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-[#1045A1] transition-colors duration-300">Quick Assessment</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">Perfect for a quick practice session</p>
                
                <div className="flex items-center justify-center gap-3 text-[#1045A1] font-semibold text-lg group-hover:gap-4 transition-all duration-300 mt-auto">
                  {isStartingCustom && questionCount === "10" ? (
                    <>
                      <div className="w-6 h-6 border-2 border-[#1045A1] border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      <span>Start Now</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div 
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-3xl border-2 border-[#1045A1] overflow-visible transition-all duration-300 cursor-pointer transform hover:-translate-y-3 hover:scale-105 min-h-[360px]"
              onClick={() => {
                handleStartGeneralAssessment("20", languageFilter);
              }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <span className="bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  RECOMMENDED
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-10 text-center flex flex-col justify-center h-full pt-12">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-3xl">20</span>
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-[#1045A1] transition-colors duration-300">Standard Assessment</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">Balanced assessment for comprehensive practice</p>
                
                <div className="flex items-center justify-center gap-3 text-[#1045A1] font-semibold text-lg group-hover:gap-4 transition-all duration-300 mt-auto">
                  {isStartingCustom && questionCount === "20" ? (
                    <>
                      <div className="w-6 h-6 border-2 border-[#1045A1] border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      <span>Start Now</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-3 hover:scale-105 min-h-[360px]"
              onClick={() => {
                handleStartGeneralAssessment("50", languageFilter);
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-10 text-center flex flex-col justify-center h-full">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-3xl">50</span>
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-[#1045A1] transition-colors duration-300">Comprehensive Assessment</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">In-depth assessment for thorough evaluation</p>
                
                <div className="flex items-center justify-center gap-3 text-[#1045A1] font-semibold text-lg group-hover:gap-4 transition-all duration-300 mt-auto">
                  {isStartingCustom && questionCount === "50" ? (
                    <>
                      <div className="w-6 h-6 border-2 border-[#1045A1] border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      <span>Start Now</span>
                    </>
                  )}
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
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer text-center transition-all duration-200 ${
                    categoryQuestionCount === "20" ? "border-[#1045A1] bg-[#E6EDF7]" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCategoryQuestionCount("20")}
                >
                  <h3 className="font-semibold text-sm lg:text-base">20 Questions</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Quick assessment - 20 minutes</p>
                </div>

                <div
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer text-center transition-all duration-200 ${
                    categoryQuestionCount === "30" ? "border-[#1045A1] bg-[#E6EDF7]" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCategoryQuestionCount("30")}
                >
                  <h3 className="font-semibold text-sm lg:text-base">30 Questions</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Standard assessment - 30 minutes</p>
                </div>

                <div
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer text-center transition-all duration-200 ${
                    categoryQuestionCount === "40" ? "border-[#1045A1] bg-[#E6EDF7]" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCategoryQuestionCount("40")}
                >
                  <h3 className="font-semibold text-sm lg:text-base">40 Questions</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Extended assessment - 40 minutes</p>
                </div>

                <div
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer text-center transition-all duration-200 ${
                    categoryQuestionCount === "50" ? "border-[#1045A1] bg-[#E6EDF7]" : "hover:bg-gray-50"
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


