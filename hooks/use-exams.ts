import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import type { Exam } from "@/lib/validations/exam";

export function useExams() {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const response = await axios.get("/exams");
      return response.data as Exam[];
    },
  });
}

export function useCreateRandomExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      duration: number;
      passingScore: number;
      questionCount: number;
      category: string;
      difficulty?: "Easy" | "Medium" | "Difficult";
    }) => {
      const response = await axios.post("/exams/random", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success("Exam created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create exam");
    },
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (examId: string) => {
      const response = await axios.delete(`/exams/${examId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success("Exam deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete exam");
    },
  });
}

export function useCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      duration: number;
      passingScore: number;
      questions: string[];
      category: string;
      course?: string;
      status: "Draft" | "Published" | "Archived";
    }) => {
      const response = await axios.post("/exams", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success("Exam created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create exam");
    },
  });
}
