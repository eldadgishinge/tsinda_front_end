"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddCourseDialog } from "@/components/add-course-dialog";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCourses, useDeleteCourse, useUpdateCourse } from "@/hooks/use-courses";
import { useCategories } from "@/hooks/use-categories";
import { useUsers } from "@/hooks/use-users";
import { EditCourseDialog } from "@/components/edit-course-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ContentManagementPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { data: courses, isLoading } = useCourses();
  const { data: categories } = useCategories();
  const { data: instructors } = useUsers();
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();
  const { mutate: updateCourse, isPending: isSaving } = useUpdateCourse();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B]"
          onClick={() => setShowAddDialog(true)}
        >
          ADD COURSE
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-4 animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-lg" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          : courses?.map((course) => (
              <Card key={course._id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={course.thumbnailUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{course.title}</h3>
                      <div className="flex gap-2">
                        <Link href={`/admin/content/${course._id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
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

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{course.language}</span>
                      <span>{course.category?.categoryName}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {course.instructor?.name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

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
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-red-600">Delete Course</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete the course <span className="font-semibold">{courseToDelete?.title}</span>?<br/>
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
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
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}