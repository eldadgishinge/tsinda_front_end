"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";
import { useCourse } from "@/hooks/use-courses";
import { useState } from "react";
import { EditCourseDialog } from "@/components/edit-course-dialog";
import { useCategories } from "@/hooks/use-categories";
import { useUsers } from "@/hooks/use-users";
import { useUpdateCourse } from "@/hooks/use-courses";
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
  const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
  return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&transparent=0&controls=1&pip=0&dnt=1`;
}

function getMuxEmbedUrl(url: string) {
  return url;
}

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: course } = useCourse(params?.id?.toString());
  const [isPublishing, setIsPublishing] = useState(false);
  const { data: categories } = useCategories();
  const { data: instructors } = useUsers();
  const { mutate: updateCourse, isPending: isSaving } = useUpdateCourse();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [pdfViewerType, setPdfViewerType] = useState<'mozilla' | 'google'>('mozilla');
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [hasMozillaFailed, setHasMozillaFailed] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);

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
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  <span className="text-xs text-gray-500 font-medium">Video:</span>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Course Video</p>
                        <p className="text-xs text-gray-500">Video Content</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white"
                      onClick={() => setShowVideoPreview(true)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Watch Video
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {course.documentUrl && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17v-2a2 2 0 012-2h6a2 2 0 012 2v2" /></svg>
                  <span className="text-xs text-gray-500 font-medium">Document:</span>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Course Document</p>
                        <p className="text-xs text-gray-500">PDF Document</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white"
                      onClick={() => {
                        setShowDocumentPreview(true);
                        setPdfViewerType('mozilla');
                        setIsPdfLoading(true);
                        setHasMozillaFailed(false);
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Document
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = course.documentUrl;
                        link.download = 'course-document.pdf';
                        link.click();
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </Button>
                  </div>
                </div>
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

      {/* PDF Document Preview Modal */}
      <Dialog open={showDocumentPreview} onOpenChange={setShowDocumentPreview}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-lg font-semibold">
              Document Preview
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
                    <p className="text-lg font-semibold text-gray-900">Loading Document</p>
                    <p className="text-sm text-gray-600">Please wait while we prepare your PDF...</p>
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
              title="Document Preview"
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
                  link.download = 'course-document.pdf';
                  link.click();
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download PDF
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Preview Modal */}
      <Dialog open={showVideoPreview} onOpenChange={setShowVideoPreview}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-lg font-semibold">
              Video Preview
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            <div className="aspect-video bg-black flex items-center justify-center w-full">
              {course.videoUrl &&
                (isVimeoUrl(course.videoUrl) ? (
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
                    className="w-full h-full object-contain"
                    controls
                    poster={course?.thumbnailUrl || "/placeholder.jpg"}
                  />
                ))}
            </div>
          </div>
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Video Content</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
