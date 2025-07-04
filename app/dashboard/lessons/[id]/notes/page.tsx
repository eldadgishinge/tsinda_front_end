"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/hooks/use-courses";
import { useCheckEnrollment } from "@/hooks/use-enrollments";

function isVimeoUrl(url: string) {
  const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+/;
  return vimeoRegex.test(url);
}

function isMuxUrl(url: string) {
  const muxRegex = /^(https?:\/\/)?(www\.)?(player\.mux\.com)\/.+/;
  return muxRegex.test(url);
}

function getVimeoEmbedUrl(url: string) {
  // Extract video ID from Vimeo URL
  // Handle formats like: https://vimeo.com/1089134258
  const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
  return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&transparent=0&controls=1&pip=0&dnt=1`;
}

function getMuxEmbedUrl(url: string) {
  // For Mux URLs, we can use them directly as they are already embed URLs
  // Handle formats like: https://player.mux.com/7YaPTDv7oIZSpOUYagZ00frWuHAJ2NochiKjZYn01UORk
  return url;
}

export default function LessonNotesPage() {
  const params = useParams();
  const router = useRouter();
  const { data: course, isLoading: isLoadingCourse } = useCourse(
    params.id as string
  );
  const { data: enrollment, isLoading: isLoadingEnrollment } =
    useCheckEnrollment(params.id as string);

  if (isLoadingCourse || isLoadingEnrollment) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-3">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex-1 p-6">
          <div className="max-w-md mx-auto">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  if (!enrollment?.isEnrolled) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-3">
          <Link
            href="/dashboard/lessons"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>CLOSE</span>
          </Link>
          <h1 className="text-xl font-semibold">{course.title}</h1>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-57px)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              Enroll to Access Notes
            </h2>
            <Link href={`/dashboard/lessons/${params.id}`}>
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
                Enroll Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>BACK</span>
        </button>
        <h1 className="text-xl font-semibold">{course.title}</h1>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left: Video */}
          <div className="aspect-video bg-black flex items-center justify-center w-full max-h-[65vh]">
            {course.videoUrl &&
              (isVimeoUrl(course.videoUrl) ? (
                <iframe
                  src={getVimeoEmbedUrl(course.videoUrl)}
                  className="w-full h-full border-0 object-contain"
                  style={{ maxHeight: '65vh' }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              ) : isMuxUrl(course.videoUrl) ? (
                <iframe
                  src={getMuxEmbedUrl(course.videoUrl)}
                  className="w-full h-full border-0 object-contain"
                  style={{ maxHeight: '65vh' }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              ) : (
                <video
                  src={course.videoUrl}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '65vh' }}
                  controls
                  poster={course.thumbnailUrl}
                />
              ))}
          </div>

          {/* Right: Notes */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-2xl font-bold text-center">Course Notes</h2>
            {course.documentUrl ? (
              <div className="flex flex-col space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-between h-10 border-2 border-[#1045A1] text-[#1045A1] hover:bg-[#1045A1]/10 text-sm"
                  onClick={() => window.open(course.documentUrl, "_blank")}
                >
                  Preview Notes
                  <Download className="h-5 w-5" />
                </Button>
                <a
                  href={course.documentUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full justify-between h-10 bg-[#1045A1] hover:bg-[#0D3A8B] text-sm">
                    Download Notes
                    <Download className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No notes available for this course.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
