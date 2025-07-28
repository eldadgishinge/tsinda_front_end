"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "@/components/ui/upload";
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

  const [newThumbnailUrl, setNewThumbnailUrl] = useState<string>("");
  const [newDocumentUrl, setNewDocumentUrl] = useState<string>("");

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
      setNewThumbnailUrl("");
      setNewDocumentUrl("");
    }
  }, [course, open]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnailUpload = (url: string) => {
    setNewThumbnailUrl(url);
  };

  const handleDocumentUpload = (url: string) => {
    setNewDocumentUrl(url);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    // Use new uploaded URLs if available, otherwise keep existing ones
    const submitData = {
      ...form,
      thumbnailUrl: newThumbnailUrl || form.thumbnailUrl,
      documentUrl: newDocumentUrl || form.documentUrl,
    };
    
    onSubmit(submitData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl p-2 sm:p-6 max-h-[90vh] overflow-y-auto">
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
            
            {/* Thumbnail Upload Section */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Thumbnail</label>
              <div className="space-y-3">
                {/* Current thumbnail preview */}
                {form.thumbnailUrl && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-2">Current Thumbnail:</p>
                    <div className="w-full flex justify-center">
                      <div className="bg-gray-100 border rounded-xl shadow max-w-xs w-full flex items-center justify-center aspect-video overflow-hidden">
                        <Image
                          src={form.thumbnailUrl}
                          alt="Current thumbnail"
                          width={320}
                          height={180}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.jpg";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Upload new thumbnail */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">Upload New Thumbnail (optional):</p>
                  <Upload
                    type="image"
                    onUploadComplete={handleThumbnailUpload}
                    onRemove={() => setNewThumbnailUrl("")}
                    defaultValue={newThumbnailUrl}
                    maxSize={5}
                  />
                </div>
                
                {/* Manual URL input as fallback */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">Or enter thumbnail URL manually:</p>
                  <Input 
                    name="thumbnailUrl" 
                    value={form.thumbnailUrl} 
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">Video URL</label>
              <Input name="videoUrl" value={form.videoUrl} onChange={handleChange} />
            </div>
            
            {/* Document Upload Section */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Course Notes</label>
              <div className="space-y-3">
                {/* Current document info */}
                {form.documentUrl && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-2">Current Document:</p>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-700 truncate">
                        {form.documentUrl.split('/').pop() || 'Course Document'}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Upload new document */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">Upload New Document (optional):</p>
                  <Upload
                    type="document"
                    onUploadComplete={handleDocumentUpload}
                    onRemove={() => setNewDocumentUrl("")}
                    defaultValue={newDocumentUrl}
                    maxSize={10}
                  />
                </div>
                
                {/* Manual URL input as fallback */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">Or enter document URL manually:</p>
                  <Input 
                    name="documentUrl" 
                    value={form.documentUrl} 
                    onChange={handleChange}
                    placeholder="https://example.com/document.pdf"
                  />
                </div>
              </div>
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