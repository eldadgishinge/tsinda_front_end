"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserEnrollments, getAllEnrollments } from "@/hooks/use-enrollments";
import { useCourses } from "@/hooks/use-courses";
import { BookOpen, Play, Target, TrendingUp, Clock, Star, Sparkles, Award, Users, CheckCircle, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { data: userEnrollments, isLoading: isLoadingUserEnrollments } =
    useUserEnrollments();
  const { data: allEnrollments, isLoading: isLoadingAllEnrollments } =
    getAllEnrollments();
  const { data: courses, isLoading: isLoadingCourses } = useCourses();

  const completedCourses =
    userEnrollments?.filter((enrollment) => enrollment.completedAt).length || 0;
  const progressPercentage = Math.round((completedCourses / 20) * 100);

  const activeEnrollments =
    userEnrollments
      ?.filter(
        (enrollment) =>
          enrollment?.course && 
          !enrollment.completedAt && 
          enrollment.status === "active"
      )
      .slice(0, 3) || [];

  const recommendedCourses = courses?.filter(course => course && course._id).slice(0, 2) || [];

  const studentsLearningThisWeek = allEnrollments?.length || 0;

  console.log("User Enrollments:", activeEnrollments);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Welcome back!</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Continue your learning journey and track your progress
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

      {/* Continue Learning Section */}
      <Card className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Play className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-green-600 font-semibold text-sm">CONTINUE LEARNING</div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeEnrollments.length > 0 ? "Continue where you left off" : "Start your learning journey"}
                </h2>
              </div>
            </div>

            {activeEnrollments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeEnrollments.map((enrollment) => (
                  <Link
                    key={enrollment._id}
                    href={`/dashboard/lessons/${enrollment.course?._id}`}
                  >
                    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-[1.02]">
                      <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <Image
                          src={enrollment.course?.thumbnailUrl || "/placeholder.jpg"}
                          alt={enrollment.course?.title || "Course"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Progress Badge */}
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold shadow-lg">
                          {enrollment.progress || 0}% Complete
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#1045A1] transition-colors duration-300 line-clamp-2">
                          {enrollment.course?.title || "Untitled Course"}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="font-medium">{enrollment.course?.language || "Unknown"}</span>
                          <div className="flex items-center gap-2 text-[#1045A1] font-semibold">
                            <span>Continue</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No active lessons</h3>
                <p className="text-gray-600 mb-6">Select a lesson and start improving your skills</p>
                <Link href="/dashboard/lessons">
                  <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] px-6 py-3">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <Link href="/dashboard/lessons">
                <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] px-6 py-3">
                  Explore All Courses
                </Button>
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-500 shadow-md"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{studentsLearningThisWeek} learning this week</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Learning Progress</h2>
                <p className="text-gray-600 text-sm">Track your journey to exam readiness</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-4 flex-1">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Lessons Completed</span>
                    <span className="text-[#1045A1] font-semibold">{completedCourses}/20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(completedCourses / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Questions Done</span>
                    <span className="text-[#1045A1] font-semibold">6/200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(6 / 200) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="relative w-20 h-20 ml-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${progressPercentage}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#1045A1]">
                  {progressPercentage}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                <p className="text-gray-600 text-sm">Jump into your learning</p>
              </div>
            </div>

            <div className="space-y-4">
              <Link href="/dashboard/assessments">
                <div className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 hover:border-blue-300 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Take Assessment</h3>
                      <p className="text-sm text-gray-600">Test your knowledge</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              <Link href="/dashboard/lessons">
                <div className="group bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:border-green-300 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Browse Lessons</h3>
                      <p className="text-sm text-gray-600">Explore all courses</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Lessons Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <Star className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recommended for you</h2>
            <p className="text-gray-600">Curated lessons based on your progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendedCourses.map((course) => (
            <Link key={course._id} href={`/dashboard/lessons/${course._id}`}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-[1.02]">
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <Image
                    src={course.thumbnailUrl || "/placeholder.jpg"}
                    alt={course.title || "Course"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Recommended Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    RECOMMENDED
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#1045A1] transition-colors duration-300 line-clamp-2">
                    {course.title || "Untitled Course"}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {course.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {course.category?.categoryName || "Uncategorized"}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>1 hour</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}