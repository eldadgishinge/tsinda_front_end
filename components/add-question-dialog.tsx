"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createQuestionSchema,
  type CreateQuestionForm,
} from "@/lib/validations/question";
import axios from "@/lib/axios";

interface Category {
  _id: string;
  categoryName: string;
}

interface AddQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  categories: Category[];
}

const difficulties = ["Easy", "Medium", "Hard"] as const;
const statuses = ["Active", "Inactive"] as const;

export function AddQuestionDialog({
  open,
  onOpenChange,
  onSuccess,
  categories,
}: AddQuestionDialogProps) {
  const form = useForm<CreateQuestionForm>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      text: "",
      imageUrl: "",
      answerOptions: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      difficulty: undefined,
      status: undefined,
      category: undefined,
    },
  });

  const onSubmit = async (data: CreateQuestionForm) => {
    try {
      await axios.post("/questions", data);
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Create question error:", error);
      // Handle error (show toast, etc)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Question
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="font-medium">Answer Options</h3>
              {form.watch("answerOptions").map((_, index) => (
                <div key={index} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`answerOptions.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Option ${index + 1}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`answerOptions.${index}.isCorrect`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            type="radio"
                            checked={field.value}
                            onChange={() => {
                              // Uncheck all other options
                              form.setValue(
                                "answerOptions",
                                form
                                  .getValues("answerOptions")
                                  .map((option, i) => ({
                                    ...option,
                                    isCorrect: i === index,
                                  }))
                              );
                            }}
                            className="h-4 w-4 text-[#1045A1]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] h-12"
            >
              Create Question
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
