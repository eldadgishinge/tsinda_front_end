"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/hooks/use-courses";
import { useCheckEnrollment } from "@/hooks/use-enrollments";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [showNotesPreview, setShowNotesPreview] = useState(false);
  const [pdfViewerType, setPdfViewerType] = useState<'mozilla' | 'google'>('mozilla');
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [hasMozillaFailed, setHasMozillaFailed] = useState(false);

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
        <h1 className="text-xl font-semibold">{course?.title || "Untitled Course"}</h1>
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
                  onClick={() => {
                    setShowNotesPreview(true);
                    setPdfViewerType('mozilla');
                    setIsPdfLoading(true);
                    setHasMozillaFailed(false);
                  }}
                >
                  Preview Notes
                  <Download className="h-5 w-5" />
                </Button>
                <Button 
                  className="w-full justify-between h-10 bg-[#1045A1] hover:bg-[#0D3A8B] text-sm shadow-sm hover:shadow-md transition-all duration-200"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = course.documentUrl;
                    link.download = 'course-notes.pdf';
                    link.click();
                  }}
                >
                  Download Notes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No notes available for this course.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDF Notes Preview Modal */}
      <Dialog open={showNotesPreview} onOpenChange={setShowNotesPreview}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-lg font-semibold">
              Notes Preview
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 relative">
            {isPdfLoading && (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-900">Loading Notes</p>
                    <p className="text-sm text-gray-600">Please wait while we prepare your notes...</p>
                  </div>
                </div>
              </div>
            )}
            <iframe
              src={
                pdfViewerType === 'mozilla'
                  ? `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(course.documentUrl)}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&pagemode=none&disableprint=true&disablecopy=true&disableedit=true&disableannotations=true&disableforms=true&disablefilling=true&disablemodifications=true`
                  : `https://docs.google.com/gview?url=${encodeURIComponent(course.documentUrl)}&embedded=true&rm=minimal&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&pagemode=none&disableprint=true&disablecopy=true&disableedit=true&disableannotations=true&disableforms=true&disablefilling=true&disablemodifications=true`
              }
              className="w-full h-[70vh] border-0"
              title="Notes Preview"
              onLoad={() => {
                setIsPdfLoading(false);
                if (pdfViewerType === 'mozilla') {
                  setHasMozillaFailed(false);
                }
              }}
              onError={() => {
                if (pdfViewerType === 'mozilla' && !hasMozillaFailed) {
                  setHasMozillaFailed(true);
                  setPdfViewerType('google');
                  setIsPdfLoading(true);
                } else {
                  setIsPdfLoading(false);
                }
              }}
            />
          </div>
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = course.documentUrl;
                  link.download = 'course-notes.pdf';
                  link.click();
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Notes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
