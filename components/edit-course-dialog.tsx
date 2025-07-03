"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export function EditCourseDialog({
  open,
  onOpenChange,
  course,
  categories,
  instructors,
  isLoading,
  isSaving,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: any;
  categories: any[];
  instructors: any[];
  isLoading?: boolean;
  isSaving?: boolean;
  onSubmit: (data: any) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "English",
    category: "",
    instructor: "",
    thumbnailUrl: "",
    videoUrl: "",
    documentUrl: "",
    isPublished: false,
  });

  useEffect(() => {
    if (course) {
      setForm({
        title: course.title || "",
        description: course.description || "",
        language: course.language || "English",
        category: course.category?._id || "",
        instructor: course.instructor?._id || "",
        thumbnailUrl: course.thumbnailUrl || "",
        videoUrl: course.videoUrl || "",
        documentUrl: course.documentUrl || "",
        isPublished: course.isPublished || false,
      });
    }
  }, [course, open]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl p-2 sm:p-6">
        <div className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Title</label>
              <Input name="title" value={form.title} onChange={handleChange} required minLength={3} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Description</label>
              <Textarea name="description" value={form.description} onChange={handleChange} required minLength={10} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Language</label>
                <select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Kinyarwanda">Kinyarwanda</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Instructor</label>
              <select
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select instructor</option>
                {instructors?.map((inst) => (
                  <option key={inst._id} value={inst._id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Thumbnail URL</label>
              <Input name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} />
              {form.thumbnailUrl && (
                <div className="mt-2 w-full flex justify-center">
                  <div className="bg-gray-100 border rounded-xl shadow max-w-xs w-full flex items-center justify-center aspect-video overflow-hidden">
                    <Image
                      src={form.thumbnailUrl}
                      alt="Thumbnail preview"
                      width={320}
                      height={180}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.jpg";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Video URL</label>
              <Input name="videoUrl" value={form.videoUrl} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Document URL</label>
              <Input name="documentUrl" value={form.documentUrl} onChange={handleChange} />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                id="isPublished"
                className="h-4 w-4 border rounded"
              />
              <label htmlFor="isPublished" className="text-sm text-gray-700">
                Published
              </label>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1045A1] hover:bg-[#0D3A8B]" isLoading={isSaving}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
} 