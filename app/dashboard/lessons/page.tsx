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

  // Filter courses by current language
  const filteredCourses =
    courses?.filter(
      (course) =>
        course && course.language === (language === "en" ? "English" : "Kinyarwanda")
    ) || [];

  // Get enrollment status for each course
  const coursesWithStatus = filteredCourses
    .filter((course) => course && course._id) // Filter out null/undefined courses
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

  // Filter by status if not "all"
  const displayedCourses =
    status === "all"
      ? coursesWithStatus
      : coursesWithStatus.filter((course) => course.status === status);

  if (isLoadingCourses || isLoadingEnrollments) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4" />
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Lessons</h1>
        <p className="text-gray-600">
          Improve your driving skills through interactive, hands on professional
          courses.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              language === "en"
                ? "bg-[#E6EDF7] text-[#1045A1]"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
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
          <span className="text-gray-600">Status</span>
          <select
            className="border rounded-lg px-4 py-2 bg-white"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="absolute top-4 right-4">
                      <Lock className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                  {course.status !== "not-started" && (
                    <div className="absolute bottom-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium">
                      {course.progress}% Complete
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{course.title || "Untitled Course"}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{course.category?.categoryName || "Uncategorized"}</span>
                    <span>{course?.language || "Unknown"}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No courses found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}