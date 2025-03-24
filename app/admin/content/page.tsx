"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddCourseDialog } from "@/components/add-course-dialog";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Course } from "@/lib/validations/course";
import axios from "@/lib/axios";

interface Category {
  _id: string;
  categoryName: string;
}

interface Instructor {
  _id: string;
  name: string;
  email: string;
}

export default function ContentManagementPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Fetch courses error:", error);
      // Handle error (show toast, etc)
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Fetch categories error:", error);
      // Handle error (show toast, etc)
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("/auth/all", {
        params: { role: "instructor" },
      });
      setInstructors(response.data);
    } catch (error) {
      console.error("Fetch instructors error:", error);
      // Handle error (show toast, etc)
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
    fetchInstructors();
  }, []);

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await axios.delete(`/courses/${courseId}`);
      fetchCourses();
    } catch (error) {
      console.error("Delete course error:", error);
      // Handle error (show toast, etc)
    }
  };

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
        {courses.map((course) => (
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
                      onClick={() => handleDeleteCourse(course._id)}
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
        onSuccess={fetchCourses}
        categories={categories}
        instructors={instructors}
      />
    </div>
  );
}
