"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, BookOpen, Play, CheckCircle, Clock, Star, Sparkles, TrendingUp, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { useCourses } from "@/hooks/use-courses";
import { useUserEnrollments } from "@/hooks/use-enrollments";

type EnrollmentStatus = "all" | "completed" | "in-progress" | "not-started";

export default function LessonsPage() {
  const [status, setStatus] = useState<EnrollmentStatus>("all");
  const { language, setLanguage } = useLanguage();
  const { data: courses, isLoading: isLoadingCourses } = useCourses();
  const { data: enrollments, isLoading: isLoadingEnrollments } =
    useUserEnrollments();

  const filteredCourses =
    courses?.filter(
      (course) =>
        course && course.language === (language === "en" ? "English" : "Kinyarwanda")
    ) || [];

  const coursesWithStatus = filteredCourses
    .filter((course) => course && course._id)
    .map((course) => {
      const enrollment = enrollments?.find((e) => e?.course?._id === course._id);
      let courseStatus: EnrollmentStatus = "not-started";

      if (enrollment) {
        if (enrollment.completedAt) {
          courseStatus = "completed";
        } else if (enrollment.progress > 0) {
          courseStatus = "in-progress";
        }
      }

      return {
        ...course,
        status: courseStatus,
        progress: enrollment?.progress || 0,
      };
    });

  const displayedCourses =
    status === "all"
      ? coursesWithStatus
      : coursesWithStatus.filter((course) => course.status === status);

  if (isLoadingCourses || isLoadingEnrollments) {
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
            <div key={i} className="bg-white rounded-2xl p-6 space-y-4 border border-gray-200 shadow-lg">
              <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
              <div className="space-y-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
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
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Lessons</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Improve your driving skills through interactive, hands-on professional courses
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Interactive Learning</span>
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
          {/* Language Filter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Language:</span>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === "en"
                    ? "bg-white text-[#1045A1] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setLanguage("en")}
              >
                English
              </button>
              <button
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === "rw"
                    ? "bg-white text-[#1045A1] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setLanguage("rw")}
              >
                Kinyarwanda
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Status:</span>
            <select
              className="border border-gray-300 rounded-xl px-6 py-3 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1045A1] focus:border-transparent transition-all duration-300"
              value={status}
              onChange={(e) => setStatus(e.target.value as EnrollmentStatus)}
            >
              <option value="all">All Courses</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedCourses && displayedCourses.length > 0 ? (
          displayedCourses.map((course) => (
            <div key={course._id} className="group">
              <Link href={`/dashboard/lessons/${course._id}`}>
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] group-hover:shadow-3xl">
                  <div className="relative aspect-[2/1] bg-gray-100 overflow-hidden">
                    <Image
                      src={course.thumbnailUrl || "/placeholder.jpg"}
                      alt={course.title || "Course"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Status Badges */}
                    {!course.isPublished && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <Lock className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                    
                    {course.status !== "not-started" && (
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
                        {course.progress}% Complete
                      </div>
                    )}
                    
                    {/* Status Icon */}
                    <div className="absolute top-4 left-4">
                      {course.status === "completed" && (
                        <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      )}
                      {course.status === "in-progress" && (
                        <div className="bg-blue-500 text-white rounded-full p-2 shadow-lg">
                          <Clock className="w-5 h-5" />
                        </div>
                      )}
                      {course.status === "not-started" && (
                        <div className="bg-gray-500 text-white rounded-full p-2 shadow-lg">
                          <Play className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#1045A1] transition-colors duration-300 line-clamp-2">
                        {course.title || "Untitled Course"}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {course.description || "No description available"}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {course.category?.categoryName || "Uncategorized"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-medium">{course?.language || "Unknown"}</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar for In Progress Courses */}
                    {course.status === "in-progress" && course.progress > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">No courses found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No courses match the selected criteria. Try adjusting your filters or check back later for new content.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}