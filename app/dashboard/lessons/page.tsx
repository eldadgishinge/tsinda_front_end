"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
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
      <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
        <div>
          <div className="h-6 lg:h-8 w-32 lg:w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 lg:h-6 w-64 lg:w-96 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-2 sm:mb-3 lg:mb-4 animate-pulse" />
                <div className="h-4 lg:h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 lg:h-4 w-full bg-gray-200 rounded animate-pulse mb-2 sm:mb-3 lg:mb-4" />
                <div className="flex items-center justify-between">
                  <div className="h-3 lg:h-4 w-16 lg:w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 lg:h-4 w-16 lg:w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Lessons</h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Improve your driving skills through interactive, hands on professional
          courses.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <div className="flex gap-2">
          <button
            className={`px-2 sm:px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base ${
              language === "en"
                ? "bg-[#E6EDF7] text-[#1045A1]"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          <button
            className={`px-2 sm:px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base ${
              language === "rw"
                ? "bg-[#E6EDF7] text-[#1045A1]"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setLanguage("rw")}
          >
            Kinyarwanda
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-xs lg:text-sm">Status</span>
          <select
            className="border rounded-lg px-2 sm:px-3 lg:px-4 py-2 bg-white text-xs lg:text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as EnrollmentStatus)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="not-started">Not Started</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {displayedCourses && displayedCourses.length > 0 ? (
          displayedCourses.map((course) => (
            <Card key={course._id}>
              <Link href={`/dashboard/lessons/${course._id}`}>
                <div className="relative aspect-[2/1] bg-gray-100">
                  <Image
                    src={course.thumbnailUrl || "/placeholder.jpg"}
                    alt={course.title || "Course"}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  {!course.isPublished && (
                    <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
                      <Lock className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                    </div>
                  )}
                  {course.status !== "not-started" && (
                    <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4 bg-white rounded-full px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium">
                      {course.progress}% Complete
                    </div>
                  )}
                </div>
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <h3 className="font-semibold mb-2 text-sm lg:text-base">{course.title || "Untitled Course"}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm mb-2 sm:mb-3 lg:mb-4">
                    {course.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
                    <span>{course.category?.categoryName || "Uncategorized"}</span>
                    <span>{course?.language || "Unknown"}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-6 sm:py-8 lg:py-12">
            <p className="text-gray-500 text-sm lg:text-base">No courses found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}