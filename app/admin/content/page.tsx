"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddCourseDialog } from "@/components/add-course-dialog";
import { Eye, Pencil, Trash2, BookOpen, Plus, Play, Users, Globe, Calendar, User, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCourses, useDeleteCourse, useUpdateCourse } from "@/hooks/use-courses";
import { useCategories } from "@/hooks/use-categories";
import { useUsers } from "@/hooks/use-users";
import { EditCourseDialog } from "@/components/edit-course-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import type { Course } from "@/lib/validations/course";

export default function ContentManagementPage() {
  const router = useRouter();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { data: courses, isLoading } = useCourses();
  const { data: categories } = useCategories();
  const { data: instructors } = useUsers();
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();
  const { mutate: updateCourse, isPending: isSaving } = useUpdateCourse();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  // Calculate statistics
  const totalCourses = courses?.length || 0;
  const publishedCourses = courses?.filter(course => course.isPublished).length || 0;
  const draftCourses = courses?.filter(course => !course.isPublished).length || 0;
  const englishCourses = courses?.filter(course => course.language === "ENG").length || 0;

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Enhanced Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Content Management</h1>
                <p className="text-gray-600">Create and manage educational content</p>
              </div>
            </div>
          </div>
          <Button
            className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{publishedCourses}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{draftCourses}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">English Courses</p>
              <p className="text-2xl font-bold text-blue-600">{englishCourses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Course Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">All Courses</h2>
              <span className="bg-[#1045A1] text-white px-3 py-1 rounded-full text-sm font-medium">
                {totalCourses} courses
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="bg-white border-0 shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="space-y-4 animate-pulse">
                        <div className="aspect-video bg-gray-200" />
                        <div className="p-6 space-y-3">
                          <div className="h-6 bg-gray-200 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-full" />
                          <div className="flex items-center justify-between">
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : courses?.map((course) => (
                  <Card 
                    key={course._id} 
                    className="bg-white border-0 shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                    onClick={() => router.push(`/admin/content/${course._id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        <div className="relative aspect-video bg-gray-100 overflow-hidden">
                          <Image
                            src={course.thumbnailUrl}
                            alt={course.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                course.isPublished
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {course.isPublished ? "Published" : "Draft"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{course.title}</h3>
                            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                              <Link href={`/admin/content/${course._id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                                onClick={() => {
                                  setSelectedCourse(course);
                                  setShowEditDialog(true);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                                onClick={() => {
                                  setCourseToDelete(course);
                                  setShowDeleteDialog(true);
                                }}
                                isLoading={isDeleting}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-2">
                            {course.description}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700 font-medium">{course.language}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700 font-medium">{course.category?.categoryName}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700 font-medium">{course.instructor?.name}</span>
                              </div>
                                                             <div className="flex items-center gap-2">
                                 <Play className="w-4 h-4 text-gray-500" />
                                 <span className="text-gray-700 font-medium">Course</span>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>

      {/* Enhanced Dialogs */}
      <AddCourseDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      <EditCourseDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        course={selectedCourse}
        categories={categories || []}
        instructors={instructors || []}
        isSaving={isSaving}
        onSubmit={(data) => {
          if (!selectedCourse) return;
          updateCourse(
            { courseId: selectedCourse._id, ...data },
            {
              onSuccess: () => setShowEditDialog(false),
            }
          );
        }}
      />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-red-600">Delete Course</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-gray-700 text-sm">
                Are you sure you want to delete the course <span className="font-semibold text-red-700">{courseToDelete?.title}</span>?
              </p>
              <p className="text-red-600 text-xs mt-2">This action cannot be undone.</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteDialog(false)} 
                className="px-6 py-2 rounded-xl border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                isLoading={isDeleting}
                onClick={() => {
                  if (!courseToDelete) return;
                  deleteCourse(courseToDelete._id, {
                    onSuccess: () => setShowDeleteDialog(false),
                  });
                }}
                className="px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Delete Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}