"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserEnrollments, getAllEnrollments } from "@/hooks/use-enrollments";
import { useCourses } from "@/hooks/use-courses";

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
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 overflow-x-hidden">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="text-green-500 font-medium text-sm lg:text-base">
              • CONTINUE LEARNING
            </div>
            {activeEnrollments.length > 0 ? (
              <>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
                  Continue where you left off
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {activeEnrollments.map((enrollment) => (
                    <Link
                      key={enrollment._id}
                      href={`/dashboard/lessons/${enrollment.course?._id}`}
                    >
                      <Card>
                        <CardContent className="p-3 sm:p-4 lg:p-6">
                          <div className="aspect-video bg-gray-100 rounded-lg mb-2 sm:mb-3 lg:mb-4 relative">
                            <Image
                              src={enrollment.course?.thumbnailUrl || "/placeholder.jpg"}
                              alt={enrollment.course?.title || "Course"}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="font-semibold mb-2 text-sm lg:text-base">
                            {enrollment.course?.title || "Untitled Course"}
                          </h3>
                          <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
                            <span>{enrollment.course?.language || "Unknown"}</span>
                            <span>{enrollment.progress || 0}% completed</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
                  You don't have any active Lessons
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Select a Lesson and start improving your skills
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <Link href="/dashboard/lessons">
                <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base">
                  Explore Courses
                </Button>
              </Link>

              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white bg-gray-200"
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-xs lg:text-sm">
                  {studentsLearningThisWeek} learning this week
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold">Your Learning progress</h2>
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
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
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs lg:text-sm font-medium">
                {progressPercentage}%
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm lg:text-base">
            Here, you'll see your learning progress to determine when you're
            ready for the exam.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs lg:text-sm">
              <span>Lessons</span>
              <span className="text-[#1045A1]">{completedCourses}/20</span>
            </div>
            <div className="flex justify-between text-xs lg:text-sm">
              <span>Questions done</span>
              <span className="text-[#1045A1]">6/200</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Recommended Lessons for you.</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {recommendedCourses.map((course) => (
            <Link key={course._id} href={`/dashboard/lessons/${course._id}`}>
              <Card>
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-2 sm:mb-3 lg:mb-4 relative">
                    <Image
                      src={course.thumbnailUrl || "/placeholder.jpg"}
                      alt={course.title || "Course"}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm lg:text-base">{course.title || "Untitled Course"}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm mb-2 sm:mb-3 lg:mb-4">
                    {course.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
                    <span>{course.category?.categoryName || "Uncategorized"}</span>
                    <span>1 hour</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="text-blue-500 font-medium text-sm lg:text-base">
              • QUIZ
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
              Test your knowledge
            </h2>
            <p className="text-gray-600 text-sm lg:text-base">
              Take quizzes to assess your understanding and track your progress.
            </p>
            <Link href="/dashboard/assessments">
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base">
                Start Quiz
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}