"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCourse } from "@/hooks/use-courses"

function isYouTubeUrl(url: string) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
}

function getYouTubeEmbedUrl(url: string) {
  // Handle youtu.be URLs
  if (url.includes("youtu.be")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle youtube.com URLs
  const videoId = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}`;
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
              isYouTubeUrl(course.videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(course.videoUrl)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

