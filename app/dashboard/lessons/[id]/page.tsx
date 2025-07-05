"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCourse } from "@/hooks/use-courses";
import {
  useEnrollInCourse,
  useCheckEnrollment,
  useUpdateProgress,
} from "@/hooks/use-enrollments";

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

export default function LessonDetailsPage() {
  const params = useParams();
  const lessonId = params.id as string;
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout>();
  const router = useRouter();

  const { data: course, isLoading: isLoadingCourse } = useCourse(
    params.id as string
  );
  const { data: enrollment, isLoading: isLoadingEnrollment } =
    useCheckEnrollment(params.id as string);
  const { mutate: enrollInCourse, isPending: isEnrolling } =
    useEnrollInCourse();
  const { mutate: updateProgress, isPending: isUpdatingProgress } =
    useUpdateProgress();

  useEffect(() => {
    // Clean up interval on unmount
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Handle video progress tracking
  const startProgressTracking = () => {
    if (!enrollment?.enrollment?._id) return;

    // Update progress every minute
    progressInterval.current = setInterval(() => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const progress = Math.round((video.currentTime / video.duration) * 100);

      if (progress !== videoProgress) {
        setVideoProgress(progress);
        updateProgress({
          enrollmentId: enrollment?.enrollment?._id || "",
          progress,
        });
      }
    }, 60000); // Every minute
  };

  const handleEnroll = () => {
    enrollInCourse(
      { courseId: params.id as string },
      {
        onSuccess: () => setShowEnrollDialog(false),
      }
    );
  };

  if (isLoadingCourse || isLoadingEnrollment) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-3">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="aspect-video bg-gray-200 animate-pulse" />
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
      <div className="flex-1">
        {enrollment?.isEnrolled ? (
          <div className="aspect-video bg-black flex items-center justify-center w-full max-h-[65vh]">
            {course?.videoUrl &&
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
                  ref={videoRef}
                  src={course.videoUrl}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '65vh' }}
                  controls
                  onPlay={startProgressTracking}
                  onPause={() => {
                    if (progressInterval.current) {
                      clearInterval(progressInterval.current);
                    }
                  }}
                  poster={course?.thumbnailUrl || "/placeholder.jpg"}
                />
              ))}
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Enroll into course</h2>
              <Button
                className="bg-[#1045A1] hover:bg-[#0D3A8B]"
                onClick={() => setShowEnrollDialog(true)}
              >
                Enroll Now
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enrollment Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enroll in Course</DialogTitle>
            <DialogDescription>
              Enrolling in this course will allow you to:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Track your progress</li>
                <li>Access course materials</li>
                <li>Take assessments</li>
                <li>Earn certificates</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEnrollDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#1045A1] hover:bg-[#0D3A8B]"
              onClick={handleEnroll}
              isLoading={isEnrolling}
            >
              Enroll Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <Link href={`/dashboard/lessons/${lessonId}/exercise`}>
          <Button
            variant={"outline"}
            className={`w-full h-10 justify-center rounded-full border-2 text-sm ${"border-[#1045A1] text-[#1045A1] hover:bg-blue-50"}`}
          >
            Exercise
          </Button>
        </Link>

        <Link href={`/dashboard/lessons/${lessonId}/notes`}>
          <Button
            variant={"default"}
            className={`w-full h-10 justify-center rounded-full border-2 text-sm ${"bg-[#1045A1] text-white hover:bg-[#0D3A8B] border-[#1045A1]"}`}
          >
            Notes
          </Button>
        </Link>

        <a
          href="https://chat.whatsapp.com/KdXzD6eogEX02d42yEPSVf"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center h-10 rounded-full border-2 text-sm ${"border-[#1045A1] text-[#1045A1] hover:bg-blue-50"}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="mr-2 h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0a12 12 0 1 1 0 24 12 12 0 0 1 0-24zm.14 4.5a7.34 7.34 0 0 0-6.46 10.82l.15.26L4.5 19.5l4.08-1.3a7.38 7.38 0 0 0 10.92-6.4c0-4.03-3.26-7.3-7.36-7.3zm0 1.16c3.41 0 6.19 2.78 6.19 6.15a6.17 6.17 0 0 1-9.37 5.27l-.23-.15-2.38.76.77-2.28a6.08 6.08 0 0 1-1.17-3.6 6.17 6.17 0 0 1 6.19-6.15z" />
          </svg>
          Join Community
        </a>

        <a
          href="https://forms.gle/AVy4oL5pJ4xV1BHX8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 rounded-full bg-[#1045A1] font-medium hover:bg-[#0D3A8B] text-sm text-white"
        >
          Register for info session
        </a>
      </div>
    </div>
  );
}
