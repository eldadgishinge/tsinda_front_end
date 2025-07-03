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

  // Calculate progress
  const completedCourses =
    userEnrollments?.filter((enrollment) => enrollment.completedAt).length || 0;
  const progressPercentage = Math.round((completedCourses / 20) * 100); // 20 recommended courses

  // Get active enrollments (not completed)
  const activeEnrollments =
    userEnrollments
      ?.filter(
        (enrollment) =>
          !enrollment.completedAt && enrollment.status === "active"
      )
      .slice(0, 3) || [];

  // Get recommended courses (first 2)
  const recommendedCourses = courses?.slice(0, 2) || [];

  // Get number of students learning this week
  const studentsLearningThisWeek = allEnrollments?.length || 0;

  console.log("User Enrollments:", activeEnrollments);

  return (
    <div className="space-y-8">
      {/* Continue Learning Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-green-500 font-medium">
              • CONTINUE LEARNING
            </div>
            {activeEnrollments.length > 0 ? (
              <>
                <h1 className="text-2xl font-bold">
                  Continue where you left off
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeEnrollments.map((enrollment) => (
                    <Link
                      key={enrollment._id}
                      href={`/dashboard/lessons/${enrollment.course._id}`}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="aspect-video bg-gray-100 rounded-lg mb-4 relative">
                            <Image
                              src={enrollment.course.thumbnailUrl}
                              alt={enrollment.course.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="font-semibold mb-2">
                            {enrollment.course.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{enrollment.course.language}</span>
                            <span>{enrollment.progress}% completed</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">
                  You don't have any active Lessons
                </h1>
                <p className="text-gray-600">
                  Select a Lesson and start improving your skills
                </p>
              </>
            )}

            <div className="flex items-center justify-between">
              <Link href="/dashboard/lessons">
                <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
                  Explore Courses
                </Button>
              </Link>

              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {studentsLearningThisWeek} learning this week
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Card */}
      <Card className="w-full">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Learning progress</h2>
            <div className="relative w-16 h-16">
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
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {progressPercentage}%
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Here, you'll see your learning progress to determine when you're
            ready for the exam.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Lessons</span>
              <span className="text-[#1045A1]">{completedCourses}/20</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Questions done</span>
              <span className="text-[#1045A1]">6/200</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Lessons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recommended Lessons for you.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedCourses.map((course) => (
            <Link key={course._id} href={`/dashboard/lessons/${course._id}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 relative">
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{course.category?.categoryName}</span>
                    <span>1 hour</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quiz Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-gray-600">Not sure where to start?</h3>
              <h2 className="text-2xl font-bold">Take the tsindacyane Exam</h2>
              <p className="text-gray-600">
                Complete our short quiz and start your learning progress.
              </p>
            </div>
            <Link href="/dashboard/assessments">
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
                Take our quiz
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}