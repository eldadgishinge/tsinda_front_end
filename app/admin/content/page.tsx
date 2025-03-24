"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddCourseDialog } from "@/components/add-course-dialog";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCourses, useDeleteCourse } from "@/hooks/use-courses";
import { useCategories } from "@/hooks/use-categories";
import { useUsers } from "@/hooks/use-users";

export default function ContentManagementPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { data: courses, isLoading } = useCourses();
  const { data: categories } = useCategories();
  const { data: instructors } = useUsers();
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();

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
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{course.title}</h3>
                      <div className="flex gap-2">
                        <Link href={`/admin/content/${course._id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCourse(course._id)}
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
                      <span>{course.category.categoryName}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {course.instructor.name}
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
        categories={categories || []}
        instructors={instructors || []}
      />
    </div>
  );
}
