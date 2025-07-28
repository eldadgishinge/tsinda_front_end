"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, BookOpen, MessageCircle, Calendar, Clock, Star, Sparkles, TrendingUp, Award, Users, CheckCircle, Target } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Enhanced Loading Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        
        {/* Enhanced Loading Video Area */}
        <div className="aspect-video bg-gray-200 animate-pulse rounded-2xl mx-6 mt-6" />
        
        {/* Enhanced Loading Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Course not found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()} className="bg-[#1045A1] hover:bg-[#0D3A8B]">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white bg-[#1045A1] hover:bg-[#0D3A8B] px-4 py-2 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{course?.title || "Untitled Course"}</h1>

            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 px-6 py-6">
        {enrollment?.isEnrolled ? (
          <div className="space-y-6">
            {/* Enhanced Video Player */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
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
            </div>


          </div>
        ) : (
          <div className="space-y-6">
            {/* Enhanced Enrollment Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to learn?</h2>
                    <p className="text-gray-600 text-lg">Enroll in this course to start your learning journey</p>
                  </div>
                  <Button
                    className="bg-[#1045A1] hover:bg-[#0D3A8B] px-8 py-3 text-lg font-semibold"
                    onClick={() => setShowEnrollDialog(true)}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Course Materials</h3>
                    <p className="text-sm text-gray-600">Access all resources</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Track Progress</h3>
                    <p className="text-sm text-gray-600">Monitor your learning</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Earn Certificate</h3>
                    <p className="text-sm text-gray-600">Get your completion badge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Enrollment Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Enroll in Course</DialogTitle>
                <p className="text-gray-600">Start your learning journey today</p>
              </div>
            </div>
            <DialogDescription className="text-left">
              <div className="space-y-4">
                <p className="text-gray-700">Enrolling in this course will give you access to:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Track your progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Access course materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">Take assessments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">Earn certificates</span>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEnrollDialog(false)}
              className="px-6 py-3"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#1045A1] hover:bg-[#0D3A8B] px-6 py-3"
              onClick={handleEnroll}
              isLoading={isEnrolling}
            >
              Enroll Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced Action Buttons */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href={`/dashboard/lessons/${lessonId}/exercise`}>
            <div className="group bg-[#1045A1] rounded-2xl shadow-lg hover:shadow-xl border border-[#1045A1] p-4 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Exercise</h3>
                  <p className="text-sm text-white/80">Practice skills</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href={`/dashboard/lessons/${lessonId}/notes`}>
            <div className="group bg-[#1045A1] rounded-2xl shadow-lg hover:shadow-xl border border-[#1045A1] p-4 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Notes</h3>
                  <p className="text-sm text-white/80">View materials</p>
                </div>
              </div>
            </div>
          </Link>

          <a
            href="https://chat.whatsapp.com/KdXzD6eogEX02d42yEPSVf"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#1045A1] rounded-2xl shadow-lg hover:shadow-xl border border-[#1045A1] p-4 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Community</h3>
                <p className="text-sm text-white/80">Join discussion</p>
              </div>
            </div>
          </a>

          <a
            href="https://forms.gle/AVy4oL5pJ4xV1BHX8"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#1045A1] rounded-2xl shadow-lg hover:shadow-xl border border-[#1045A1] p-4 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Info Session</h3>
                <p className="text-sm text-white/80">Register now</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
