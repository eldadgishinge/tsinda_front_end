import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import type { Course } from "@/lib/validations/course";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axios.get("/courses");
      return response.data as Course[];
    },
  });
}

export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ["courses", courseId],
    queryFn: async () => {
      const response = await axios.get(`/courses/${courseId}`);
      return response.data as Course;
    },
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      language: string;
      category: string;
      instructor: string;
      videoUrl?: string;
      documentUrl?: string;
    }) => {
      const response = await axios.post("/courses", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create course");
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await axios.delete(`/courses/${courseId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete course");
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, ...data }: { courseId: string; [key: string]: any }) => {
      const response = await axios.put(`/courses/${courseId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update course");
    },
  });
}
