"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Checkbox } from "@/components/ui/checkbox";
import { createExamSchema, type CreateExamForm } from "@/lib/validations/exam";
import { useCreateExam } from "@/hooks/use-exams";
import { useCategories } from "@/hooks/use-categories";
import { useCourses } from "@/hooks/use-courses";
import { useQuestions } from "@/hooks/use-questions";

interface AddExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddExamDialog({ open, onOpenChange }: AddExamDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { mutate: createExam, isPending } = useCreateExam();
  const { data: categories } = useCategories();
  const { data: courses } = useCourses();
  const { data: questions } = useQuestions();

  const form = useForm<CreateExamForm>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "30",
      passingScore: "70",
      questions: [],
      category: undefined,
      course: undefined,
      language: "English",
      status: "Draft",
    },
  });

  // Filter courses by selected category
  const filteredCourses = courses?.filter(
    (course) => course.category?._id === selectedCategory
  );

  // Filter questions by selected category
  const filteredQuestions = questions?.filter(
    (question) => question?.category?._id === selectedCategory
  );

  const onSubmit = (data: CreateExamForm) => {
    createExam(
      {
        ...data,
        duration: Number(data.duration),
        passingScore: Number(data.passingScore),
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Exam</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passingScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Score (%)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} max={100} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCategory(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
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

              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredCourses?.map((course) => (
                          <SelectItem key={course._id} value={course._id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Kinyarwanda">Kinyarwanda</SelectItem>
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
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="questions"
              render={() => (
                <FormItem>
                  <FormLabel>Questions</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
                    {filteredQuestions?.map((question) => (
                      <div
                        key={question._id}
                        className="flex items-start gap-2"
                      >
                        <Checkbox
                          checked={form
                            .watch("questions")
                            .includes(question._id)}
                          onCheckedChange={(checked) => {
                            const currentQuestions =
                              form.getValues("questions");
                            if (checked) {
                              form.setValue("questions", [
                                ...currentQuestions,
                                question._id,
                              ]);
                            } else {
                              form.setValue(
                                "questions",
                                currentQuestions.filter(
                                  (id) => id !== question._id
                                )
                              );
                            }
                          }}
                        />
                        <div className="space-y-1">
                          <p className="text-sm">{question.text}</p>
                          <div className="flex gap-2">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                question.difficulty === "Easy"
                                  ? "bg-green-100 text-green-700"
                                  : question.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {question.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-[#1045A1] hover:bg-[#0D3A8B]"
                isLoading={isPending}
              >
                Create Exam
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
