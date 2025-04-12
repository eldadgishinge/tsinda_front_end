import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface Answer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
}

interface ExamAttempt {
  _id: string;
  exam: {
    _id: string;
    title: string;
    category: {
      _id: string;
      categoryName: string;
    };
  };
  answers: Answer[];
  score: number;
  isPassed: boolean;
  endTime: string;
}

export function useExamAttempts() {
  return useQuery({
    queryKey: ["exam-attempts"],
    queryFn: async () => {
      const response = await axios.get("/exam-attempts/completed");
      return response.data as ExamAttempt[];
    },
  });
}
