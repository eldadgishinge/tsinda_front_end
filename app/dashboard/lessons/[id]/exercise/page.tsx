"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"

export default function LessonExercisePage() {
  const params = useParams()
  const lessonId = params.id

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-3">
        <Link href="/dashboard/lessons" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
          <span>CLOSE</span>
        </Link>
        <h1 className="text-xl font-semibold">Driving Lesson 101</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Column - Video */}
          <div className="h-full bg-black">
            <VideoPlayer
              src="https://example.com/video.mp4"
              poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tsindacyane_design-kbHXDHkers9OV6WtZBSUGvsDAfpAam.png"
            />
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

