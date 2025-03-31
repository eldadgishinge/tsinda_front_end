import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios"
import toast from "react-hot-toast"
import type { Course } from "@/lib/validations/course"

interface Enrollment {
  _id: string
  course: Course
  progress: number
  completedAt?: string
  status: "active" | "expired" | "cancelled"
}

export function useUserEnrollments() {
  return useQuery({
    queryKey: ["enrollments", "user"],
    queryFn: async () => {
      const response = await axios.get("/enrollments/user")
      return response.data as Enrollment[]
    },
  })
}

export function getAllEnrollments() {
  return useQuery({
    queryKey: ["enrollments", "all"],
    queryFn: async () => {
      const response = await axios.get("/enrollments")
      return response.data as Enrollment[]
    },
  })
}

export function useCheckEnrollment(courseId: string) {
  return useQuery({
    queryKey: ["enrollments", "check", courseId],
    queryFn: async () => {
      const response = await axios.get(`/enrollments/check/${courseId}`)
      return response.data as {
        isEnrolled: boolean
        enrollment?: Enrollment
      }
    },
  })
}

export function useEnrollInCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ courseId }: { courseId: string }) => {
      const response = await axios.post("/enrollments", { courseId })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] })
      toast.success("Successfully enrolled in course")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to enroll in course")
    },
  })
}

export function useUpdateProgress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      enrollmentId,
      progress,
    }: {
      enrollmentId: string
      progress: number
    }) => {
      const response = await axios.put(`/enrollments/${enrollmentId}/progress`, {
        progress,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] })
    },
    onError: (error: any) => {
      console.error("Failed to update progress:", error)
    },
  })
}