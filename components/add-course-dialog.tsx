"use client";

import { useState } from "react";
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
import {
  createCourseSchema,
  type CreateCourseForm,
} from "@/lib/validations/course";
import { useCreateCourse } from "@/hooks/use-courses";
import { useCategories } from "@/hooks/use-categories";
import { useUploadVideo, useUploadDocument } from "@/hooks/use-upload";
import { VideoUpload } from "@/components/ui/video-upload";
import { DocumentUpload } from "@/components/ui/document-upload";
import { useUsers } from "@/hooks/use-users";

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const languages = ["English", "French", "Kinyarwanda"] as const;

export function AddCourseDialog({ open, onOpenChange }: AddCourseDialogProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
  const { mutateAsync: uploadVideo, isPending: isUploadingVideo } =
    useUploadVideo();
  const { mutateAsync: uploadDocument, isPending: isUploadingDocument } =
    useUploadDocument();
  const { data: categories } = useCategories();
  const { data: instructors } = useUsers();

  const form = useForm<CreateCourseForm>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      language: "English",
      category: undefined,
      instructor: undefined,
    },
  });

  const onSubmit = async (data: CreateCourseForm) => {
    try {
      let videoUrl: string | undefined;
      let documentUrl: string | undefined;

      if (videoFile) {
        videoUrl = await uploadVideo(videoFile);
      }

      if (documentFile) {
        documentUrl = await uploadDocument(documentFile);
      }

      createCourse(
        {
          ...data,
          videoUrl,
          documentUrl,
        },
        {
          onSuccess: () => {
            form.reset();
            setVideoFile(null);
            setDocumentFile(null);
            onOpenChange(false);
          },
        }
      );
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Course
          </DialogTitle>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        {languages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
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
                name="instructor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select instructor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {instructors?.map((instructor) => (
                          <SelectItem
                            key={instructor._id}
                            value={instructor._id}
                          >
                            {instructor.name}
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
              <FormItem>
                <FormLabel>Video</FormLabel>
                <VideoUpload
                  onFileSelect={setVideoFile}
                  onFileRemove={() => setVideoFile(null)}
                  selectedFile={videoFile}
                  uploading={isUploadingVideo}
                />
              </FormItem>

              <FormItem>
                <FormLabel>Notes (Document)</FormLabel>
                <DocumentUpload
                  onFileSelect={setDocumentFile}
                  onFileRemove={() => setDocumentFile(null)}
                  selectedFile={documentFile}
                  uploading={isUploadingDocument}
                />
              </FormItem>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] h-12"
              isLoading={isCreating || isUploadingVideo || isUploadingDocument}
            >
              Create Course
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
