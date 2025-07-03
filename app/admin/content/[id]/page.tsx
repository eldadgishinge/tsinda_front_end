"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";
import { useCourse } from "@/hooks/use-courses";
import { useState } from "react";
import { EditCourseDialog } from "@/components/edit-course-dialog";
import { useCategories } from "@/hooks/use-categories";
import { useUsers } from "@/hooks/use-users";
import { useUpdateCourse } from "@/hooks/use-courses";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: course } = useCourse(params?.id?.toString());
  const [isPublishing, setIsPublishing] = useState(false);
  const { data: categories } = useCategories();
  const { data: instructors } = useUsers();
  const { mutate: updateCourse, isPending: isSaving } = useUpdateCourse();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await axios.put(`/courses/${params.id}`, {
        isPublished: true,
      });
      router.push("/admin/content");
    } catch (error) {
      console.error("Publish course error:", error);
      // Handle error (show toast, etc)
    } finally {
      setIsPublishing(false);
    }
  };

  if (!course) {
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <div className="w-8 h-8 bg-transparent rounded-full border-2 border-neutral-600 border-b-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative pb-24">
      {/* Hero Banner */}
      <div className="relative w-full aspect-video max-h-[340px] rounded-2xl overflow-hidden shadow-lg border bg-gray-100 mb-8">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute left-0 bottom-0 p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold shadow ${
              course.isPublished
                ? "bg-green-600 text-white"
                : "bg-yellow-500 text-white"
            }`}>
              {course.isPublished ? "Published" : "Draft"}
            </span>
            {course.category?.categoryName && (
              <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-white/80 text-green-800 shadow">
                {course.category.categoryName}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">{course.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-700 font-bold">
              {course.instructor?.name?.[0] || "?"}
            </div>
            <div>
              <div className="font-medium text-white text-shadow-sm">{course.instructor?.name}</div>
              <div className="text-xs text-gray-200">{course.instructor?.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overview Card */}
        <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl shadow-md border p-8 space-y-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0H3" /></svg>
            Overview
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" /></svg>
              <span className="text-xs text-gray-500 font-medium">Description:</span>
              <span className="text-gray-800 text-sm">{course.description}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
              <span className="text-xs text-gray-500 font-medium">Language:</span>
              <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 ml-1">{course.language}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0" /></svg>
              <span className="text-xs text-gray-500 font-medium">Instructor:</span>
              <span className="text-gray-800 text-sm">{course.instructor?.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18" /></svg>
              <span className="text-xs text-gray-500 font-medium">Created:</span>
              <span className="text-gray-800 text-sm">{new Date(course.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
              <span className="text-xs text-gray-500 font-medium">Status:</span>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                course.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {course.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        </div>

        {/* Media Card */}
        <div className="bg-gradient-to-br from-white via-gray-50 to-green-50 rounded-xl shadow-md border p-8 space-y-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Media & Resources
          </h2>
          <div className="space-y-4">
            {course.videoUrl && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                <span className="text-xs text-gray-500 font-medium">Video:</span>
                <a
                  href={course.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:underline break-all ml-1"
                >
                  {course.videoUrl}
                </a>
              </div>
            )}
            {course.documentUrl && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17v-2a2 2 0 012-2h6a2 2 0 012 2v2" /></svg>
                <span className="text-xs text-gray-500 font-medium">Document:</span>
                <a
                  href={course.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-green-700 hover:underline break-all ml-1"
                >
                  {course.documentUrl}
                </a>
              </div>
            )}
            {!course.videoUrl && !course.documentUrl && (
              <div className="text-gray-400 text-sm italic">No media or resources available.</div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        {!course.isPublished && (
          <Button
            className="bg-[#1045A1] hover:bg-[#0D3A8B] px-6 py-3 text-base font-semibold shadow-lg"
            onClick={handlePublish}
            isLoading={isPublishing}
            loadingText="Publishing..."
          >
            Publish Course
          </Button>
        )}
        <Button
          className="bg-white border shadow-lg text-gray-700 hover:bg-gray-100 px-6 py-3 text-base font-semibold"
          onClick={() => setShowEditDialog(true)}
        >
          Edit
        </Button>
      </div>

      <EditCourseDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        course={course}
        categories={categories || []}
        instructors={instructors || []}
        isSaving={isSaving}
        onSubmit={(data) => {
          updateCourse(
            { courseId: course._id, ...data },
            {
              onSuccess: () => setShowEditDialog(false),
            }
          );
        }}
      />
    </div>
  );
}
