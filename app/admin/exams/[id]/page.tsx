"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExamSchema } from "@/lib/validations/exam";
import { useCategories } from "@/hooks/use-categories";
import { useCourses } from "@/hooks/use-courses";
import { useQuestions } from "@/hooks/use-questions";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  Loader2,
  Pencil,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useExamDetails } from "@/hooks/use-exams";

export default function ExamDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { data: exam, isLoading } = useExamDetails(params.id as string);

  const { data: categories } = useCategories();
  const { data: courses } = useCourses();
  const { data: allQuestions } = useQuestions();

  const form = useForm({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      title: exam?.title || "",
      description: exam?.description || "",
      duration: exam?.duration?.toString() || "30",
      passingScore: exam?.passingScore?.toString() || "70",
      questions: exam?.questions?.map((q: any) => q._id) || [],
      category: exam?.category?._id,
      course: exam?.course?._id,
      language: exam?.language || "English",
      status: exam?.status || "Draft",
    },
  });

  // Update form values when exam data is loaded
  useEffect(() => {
    if (exam) {
      form.reset({
        title: exam.title,
        description: exam.description,
        duration: exam.duration.toString(),
        passingScore: exam.passingScore.toString(),
        questions: exam.questions.map((q: any) => q._id),
        category: exam.category?._id,
        course: exam.course?._id,
        language: exam.language,
        status: exam.status,
      });
    }
  }, [exam, form]);

  const { mutate: updateExam, isPending: isUpdating } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.put(`/exams/${params.id}`, {
        ...data,
        duration: parseInt(data.duration),
        passingScore: parseInt(data.passingScore),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam", params.id] });
      toast.success("Exam updated successfully");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update exam");
    },
  });

  const { mutate: publishExam, isPending: isPublishing } = useMutation({
    mutationFn: async () => {
      const response = await axios.put(`/exams/${params.id}/publish`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam", params.id] });
      toast.success("Exam published successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to publish exam");
    },
  });

  // Filter questions by selected category
  const filteredQuestions = allQuestions?.filter(
    (question) => question.category?._id === form.watch("category")
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Exam not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/exams"
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{exam.title}</h1>
        </div>
        <div className="items-center flex gap-4">
          {exam.status === "Draft" && (
            <Button
              variant="outline"
              className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white hover:text-gray-100"
              onClick={() => publishExam()}
              disabled={isPublishing}
            >
              <ArrowUp className="h-4 w-4" />
              Publish Exam
            </Button>
          )}

          <Button
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "" : "bg-[#1045A1] hover:bg-[#0D3A8B]"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Exam
              </>
            )}
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => updateExam(data))}
            className="space-y-6"
          >
            <Card>
              <CardContent className="p-6 space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
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
                            {categories?.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
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
                            {courses?.map((course) => (
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

                <div className="grid grid-cols-2 gap-4">
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
                            <SelectItem value="Kinyarwanda">
                              Kinyarwanda
                            </SelectItem>
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
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <FormField
                  control={form.control}
                  name="questions"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Questions
                      </FormLabel>
                      <div className="mt-4 space-y-4">
                        {filteredQuestions?.length ? (
                          filteredQuestions.map((question) => (
                            <div
                              key={question._id}
                              className="flex items-start space-x-3 p-4 border rounded-lg"
                            >
                              <FormField
                                control={form.control}
                                name="questions"
                                render={({ field }) => {
                                  return (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            question._id
                                          )}
                                          onCheckedChange={(checked) => {
                                            const currentValue =
                                              field.value || [];
                                            const newValue = checked
                                              ? [...currentValue, question._id]
                                              : currentValue.filter(
                                                  (id) => id !== question._id
                                                );
                                            field.onChange(newValue);
                                          }}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <div className="flex items-center justify-between">
                                          <FormLabel className="font-medium">
                                            {question.text}
                                          </FormLabel>
                                          <span
                                            className={`px-2 py-1 text-xs rounded-full ${
                                              question.difficulty === "Easy"
                                                ? "bg-green-100 text-green-700"
                                                : question.difficulty ===
                                                  "Medium"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                          >
                                            {question.difficulty}
                                          </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          {question.answerOptions.map(
                                            (option, index) => (
                                              <span key={index}>
                                                {option.isCorrect && (
                                                  <span className="text-green-600">
                                                    ✓{" "}
                                                  </span>
                                                )}
                                                {option.text}
                                                {index <
                                                  question.answerOptions
                                                    .length -
                                                    1 && " | "}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </FormItem>
                                  );
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="text-center p-4 border rounded-lg bg-gray-50">
                            <p className="text-gray-500">
                              {form.watch("category")
                                ? "No questions found for this category"
                                : "Please select a category to view questions"}
                            </p>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="bg-[#1045A1] hover:bg-[#0D3A8B]"
              isLoading={isUpdating}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Details</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Description</dt>
                      <dd>{exam.description}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Category</dt>
                      <dd>{exam.category.categoryName}</dd>
                    </div>
                    {exam.course && (
                      <div>
                        <dt className="text-sm text-gray-500">Course</dt>
                        <dd>{exam.course.title}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-gray-500">Language</dt>
                      <dd>{exam.language}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Settings</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Duration</dt>
                      <dd>{exam.duration} minutes</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Passing Score</dt>
                      <dd>{exam.passingScore}%</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Questions</dt>
                      <dd>{exam.questions.length} questions</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Status</dt>
                      <dd>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            exam.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : exam.status === "Draft"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {exam.status}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Questions</h2>
            <div className="space-y-4">
              {exam.questions.map((question: any, index: number) => (
                <Card key={question._id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                          {index + 1}. {question.text}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
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

                      {question.imageUrl && (
                        <img
                          src={question.imageUrl}
                          alt="Question"
                          className="max-w-full h-auto rounded-lg"
                        />
                      )}

                      <div className="space-y-2">
                        {question.answerOptions.map(
                          (option: any, optionIndex: number) => (
                            <div
                              key={optionIndex}
                              className={`flex items-center space-x-3 p-4 rounded-lg border ${
                                option.isCorrect
                                  ? "bg-green-50 border-green-200"
                                  : "bg-white hover:bg-gray-50"
                              }`}
                            >
                              <div
                                className={`flex h-4 w-4 shrink-0 rounded-full border ${
                                  option.isCorrect
                                    ? "border-green-500 bg-green-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {option.isCorrect && (
                                  <Check className="h-3 w-3 text-white m-auto" />
                                )}
                              </div>
                              <span>{option.text}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
