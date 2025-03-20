'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VideoPlayer } from "@/components/video-player"

type Tab = 'lesson' | 'exercise' | 'notes' | 'community'

export default function LessonDetailsPage() {
  const params = useParams()
  const pathname = usePathname()
  const lessonId = params.id
  
  // Determine active tab based on the current pathname
  const getActiveTab = (): Tab => {
    if (pathname.includes('/exercise')) return 'exercise'
    if (pathname.includes('/notes')) return 'notes'
    if (pathname.includes('/community')) return 'community'
    return 'lesson'
  }

  const activeTab = getActiveTab()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-3">
        <Link 
          href="/dashboard/lessons"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>CLOSE</span>
        </Link>
        <h1 className="text-xl font-semibold">Driving Lesson 101</h1>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <VideoPlayer 
              src="https://example.com/video.mp4"
              poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tsindacyane_design-aGy4X2R8Ah4QNn1PpIcaCKQRmimbLG.png"
            />
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href={`/dashboard/lessons/${lessonId}/exercise`}>
              <Button 
                variant={activeTab === 'exercise' ? 'default' : 'outline'}
                className={`w-full h-12 justify-center rounded-full border-2 ${
                  activeTab === 'exercise' 
                    ? 'bg-[#1045A1] text-white hover:bg-[#0D3A8B] border-[#1045A1]' 
                    : 'border-[#1045A1] text-[#1045A1] hover:bg-blue-50'
                }`}
              >
                Exercise
              </Button>
            </Link>
            
            <Link href={`/dashboard/lessons/${lessonId}/notes`}>
              <Button 
                variant={activeTab === 'notes' ? 'default' : 'outline'}
                className={`w-full h-12 justify-center rounded-full border-2 ${
                  activeTab === 'notes' 
                    ? 'bg-[#1045A1] text-white hover:bg-[#0D3A8B] border-[#1045A1]' 
                    : 'border-[#1045A1] text-[#1045A1] hover:bg-blue-50'
                }`}
              >
                Notes
              </Button>
            </Link>
            
            <Button 
              variant={activeTab === 'community' ? 'default' : 'outline'}
              className={`h-12 justify-center rounded-full border-2 ${
                activeTab === 'community' 
                  ? 'bg-[#1045A1] text-white hover:bg-[#0D3A8B] border-[#1045A1]' 
                  : 'border-[#1045A1] text-[#1045A1] hover:bg-blue-50'
              }`}
            >
              <svg 
                viewBox="0 0 24 24" 
                className="mr-2 h-5 w-5 fill-current" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0a12 12 0 1 1 0 24 12 12 0 0 1 0-24zm.14 4.5a7.34 7.34 0 0 0-6.46 10.82l.15.26L4.5 19.5l4.08-1.3a7.38 7.38 0 0 0 10.92-6.4c0-4.03-3.26-7.3-7.36-7.3zm0 1.16c3.41 0 6.19 2.78 6.19 6.15a6.17 6.17 0 0 1-9.37 5.27l-.23-.15-2.38.76.77-2.28a6.08 6.08 0 0 1-1.17-3.6 6.17 6.17 0 0 1 6.19-6.15z"/>
              </svg>
              Join Community
            </Button>
            
            <Button 
              className="h-12 justify-center rounded-full bg-[#1045A1] font-medium hover:bg-[#0D3A8B]"
            >
              Register for info session
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

