"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCourse, useUpdateCourse } from "@/hooks/use-courses";
import { useCategories } from "@/hooks/use-categories";
import { useUsers } from "@/hooks/use-users";
import Image from "next/image";

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const { data: course, isLoading } = useCourse(params?.id?.toString());
  const { data: categories } = useCategories();
  const { data: instructors } = useUsers();
  const { mutate: updateCourse, isPending } = useUpdateCourse();

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
  }, [course]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateCourse(
      {
        courseId: params.id,
        ...form,
      },
      {
        onSuccess: () => router.push(`/admin/content/${params.id}`),
      }
    );
  };

  if (isLoading || !course) {
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <div className="w-8 h-8 bg-transparent rounded-full border-2 border-neutral-600 border-b-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card className="shadow-lg border">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Title</label>
              <Input name="title" value={form.title} onChange={handleChange} required minLength={3} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Description</label>
              <Textarea name="description" value={form.description} onChange={handleChange} required minLength={10} />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                <div className="mt-2">
                  <Image
                    src={form.thumbnailUrl}
                    alt="Thumbnail preview"
                    width={320}
                    height={180}
                    className="rounded-lg border"
                  />
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
            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/admin/content/${params.id}`)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1045A1] hover:bg-[#0D3A8B]" isLoading={isPending}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 