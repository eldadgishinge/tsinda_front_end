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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  createQuestionSchema,
  type CreateQuestionForm,
} from "@/lib/validations/question";
import { useCreateQuestion } from "@/hooks/use-questions";
import { useCategories } from "@/hooks/use-categories";
import { Upload } from "@/components/ui/upload";

interface AddQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddQuestionDialog({
  open,
  onOpenChange,
}: AddQuestionDialogProps) {
  const { mutate: createQuestion, isPending: isCreating } = useCreateQuestion();
  const { data: categories } = useCategories();

  const form = useForm<CreateQuestionForm>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      text: "",
      imageUrl: "",
      answerOptions: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      difficulty: "Medium",
      status: "Active",
      category: undefined,
      rightAnswerDescription: "",
    },
  });

  const onSubmit = (data: CreateQuestionForm) => {
    createQuestion(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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

            <FormField
              control={form.control}
              name="rightAnswerDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Right Answer Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Explain why this answer is correct..."
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              isLoading={isCreating}
            >
              Create Question
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}