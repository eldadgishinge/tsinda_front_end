import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import type { Question } from "@/lib/validations/question";

export function useQuestions() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await axios.get("/questions");
      return response.data as Question[];
    },
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      text: string;
      imageUrl?: string;
      answerOptions: { text: string; isCorrect: boolean }[];
      difficulty: "Easy" | "Medium" | "Difficult";
      status: "Active" | "Inactive";
      category: string;
    }) => {
      const response = await axios.post("/questions", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create question");
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: string) => {
      const response = await axios.delete(`/questions/${questionId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete question");
    },
  });
}
