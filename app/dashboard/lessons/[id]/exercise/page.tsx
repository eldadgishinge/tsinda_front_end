"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCourse } from "@/hooks/use-courses"

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

export default function LessonExercisePage() {
  const params = useParams()
  const lessonId = params.id as string
  const { data: course, isLoading } = useCourse(lessonId)
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-white">
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
        <h1 className="text-xl font-semibold">{course?.title || "Lesson"}</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Column - Video */}
          <div className="aspect-video bg-black flex items-center justify-center w-full">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center text-white">Loading...</div>
            ) : course?.videoUrl ? (
              isVimeoUrl(course.videoUrl) ? (
                <iframe
                  src={getVimeoEmbedUrl(course.videoUrl)}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              ) : isMuxUrl(course.videoUrl) ? (
                <iframe
                  src={getMuxEmbedUrl(course.videoUrl)}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              ) : (
                <video
                  src={course.videoUrl}
                  className="w-full h-full"
                  controls
                  poster={course.thumbnailUrl}
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">No video available</div>
            )}
          </div>

          {/* Right Column - Assessment */}
          <div className="p-6 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-6">
              <h2 className="text-2xl font-bold">Start your Assessment</h2>

              <Link href={`/dashboard/lessons/${lessonId}/exercise/assessment`}>
                <Button className="w-full h-12 bg-[#1045A1] hover:bg-[#0D3A8B]">Get started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

