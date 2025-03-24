import * as z from "zod";

export const createQuestionSchema = z.object({
  text: z.string().min(5, "Question text must be at least 5 characters"),
  imageUrl: z.string().optional(),
  //.url("Please enter a valid image URL").optional(),
  answerOptions: z
    .array(
      z.object({
        text: z.string().min(1, "Answer option text is required"),
        isCorrect: z.boolean(),
      })
    )
    .length(4, "Question must have exactly 4 answer options"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    required_error: "Please select difficulty level",
  }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Please select status",
  }),
  category: z.string({
    required_error: "Please select a category",
  }),
});

export type CreateQuestionForm = z.infer<typeof createQuestionSchema>;

export interface Question {
  _id: string;
  text: string;
  imageUrl?: string;
  answerOptions: {
    text: string;
    isCorrect: boolean;
  }[];
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Active" | "Inactive";
  category: {
    _id: string;
    categoryName: string;
  };
  createdAt: string;
}
