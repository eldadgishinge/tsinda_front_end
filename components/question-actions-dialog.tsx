"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  createQuestionSchema,
  type CreateQuestionForm,
  type Question,
} from "@/lib/validations/question";
import { useUpdateQuestion } from "@/hooks/use-questions";
import { useCategories } from "@/hooks/use-categories";
import { Upload } from "@/components/ui/upload";
import { Check } from "lucide-react";
import { useEffect } from "react";

interface QuestionActionsDialogProps {
  type: "view" | "edit" | "delete";
  question?: Question;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data?: any) => void;
}

export function QuestionActionsDialog({
  type,
  question,
  open,
  onOpenChange,
  onConfirm,
}: QuestionActionsDialogProps) {
  const { mutate: updateQuestion, isPending: isUpdating } = useUpdateQuestion();
  const { data: categories } = useCategories();

  const form = useForm<CreateQuestionForm>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      text: question?.text || "",
      imageUrl: question?.imageUrl,
      answerOptions: question?.answerOptions || [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      difficulty: question?.difficulty || "Medium",
      status: question?.status || "Active",
      category: question?.category?._id,
    },
  });

  useEffect(() => {
    if (type === "edit" && question && open) {
      form.reset({
        text: question.text || "",
        imageUrl: question.imageUrl,
        answerOptions: question.answerOptions || [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        difficulty: question.difficulty || "Medium",
        status: question.status || "Active",
        category: question.category?._id,
      });
    }
  }, [question, open, type, form]);

  const handleConfirm = (data?: any) => {
    if (onConfirm) {
      onConfirm(data);
    }
    onOpenChange(false);
  };

  if (type === "delete") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleConfirm()}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const QuestionPreview = () => (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{question?.text}</h3>
        {question?.imageUrl && (
          <img
            src={question.imageUrl}
            alt="Question"
            className="max-w-full h-auto rounded-lg"
          />
        )}
        <div className="space-y-2">
          {question?.answerOptions.map((option, index) => (
            <div
              key={index}
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
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Category:</span>{" "}
          <span className="text-gray-600">
            {question?.category?.categoryName}
          </span>
        </div>
        <div>
          <span className="font-medium">Difficulty:</span>{" "}
          <span className="text-gray-600">{question?.difficulty}</span>
        </div>
        <div>
          <span className="font-medium">Status:</span>{" "}
          <span className="text-gray-600">{question?.status}</span>
        </div>
      </div>
    </div>
  );

  if (type === "view") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
          </DialogHeader>
          <QuestionPreview />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              if (question?._id) {
                updateQuestion(
                  { questionId: question._id, ...data },
                  {
                    onSuccess: () => {
                      onOpenChange(false);
                    },
                  }
                );
              }
            })}
            className="space-y-4"
          >
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
                  <FormLabel>Question Image (Optional)</FormLabel>
                  <FormControl>
                    <Upload
                      type="image"
                      onUploadComplete={field.onChange}
                      onRemove={() => field.onChange("")}
                      defaultValue={field.value}
                      error={form.formState.errors.imageUrl?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Answer Options</FormLabel>
              <RadioGroup
                value={String(form.watch("answerOptions").findIndex(opt => opt.isCorrect))}
                onValueChange={val => {
                  const idx = Number(val);
                  form.setValue(
                    "answerOptions",
                    form.getValues("answerOptions").map((option, i) => ({
                      ...option,
                      isCorrect: i === idx,
                    }))
                  );
                }}
                className="space-y-2"
              >
                {form.watch("answerOptions").map((_, index) => {
                  const isSelected = form.watch("answerOptions")[index].isCorrect;
                  return (
                    <div
                      key={index}
                      className={`flex gap-4 items-center rounded-lg px-2 py-1 transition-colors border ${
                        isSelected ? "border-green-500 bg-green-50" : "border-gray-200"
                      }`}
                    >
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
                      <RadioGroupItem
                        value={String(index)}
                        className={isSelected ? "border-green-500 text-green-600" : ""}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
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
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Difficult">Hard</SelectItem>
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
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
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
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] h-12"
              isLoading={isUpdating}
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
