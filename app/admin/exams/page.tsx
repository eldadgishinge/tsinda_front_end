"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AddExamDialog } from "@/components/add-exam-dialog";
import type { Exam } from "@/lib/validations/exam";
import type { Question } from "@/lib/validations/question";
import Link from "next/link";
import axios from "@/lib/axios";

interface Category {
  _id: string;
  categoryName: string;
}

interface Course {
  _id: string;
  title: string;
}

interface Filters {
  status: "All" | "Draft" | "Published" | "Archived";
  category: string;
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: "All",
    category: "All",
  });

  const fetchExams = async () => {
    try {
      const params: Record<string, string> = {};
      if (filters.status !== "All") params.status = filters.status;
      if (filters.category !== "All") params.category = filters.category;

      const response = await axios.get("/exams", { params });
      setExams(response.data);
    } catch (error) {
      console.error("Fetch exams error:", error);
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

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Fetch courses error:", error);
      // Handle error (show toast, etc)
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/questions", {
        params: { status: "Active" },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Fetch questions error:", error);
      // Handle error (show toast, etc)
    }
  };

  useEffect(() => {
    fetchExams();
    fetchCategories();
    fetchCourses();
    fetchQuestions();
  }, [filters]);

  const handleDeleteExam = async (examId: string) => {
    try {
      await axios.delete(`/exams/${examId}`);
      fetchExams();
    } catch (error) {
      console.error("Delete exam error:", error);
      // Handle error (show toast, etc)
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exam Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B]"
          onClick={() => setShowAddDialog(true)}
        >
          ADD EXAM
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          value={filters.status}
          onValueChange={(value: Filters["status"]) =>
            setFilters({ ...filters, status: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value) => setFilters({ ...filters, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell className="font-medium">{exam.title}</TableCell>
                <TableCell>{exam.category.categoryName}</TableCell>
                <TableCell>{exam.course?.title || "-"}</TableCell>
                <TableCell>{exam.questions.length}</TableCell>
                <TableCell>{exam.duration} min</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      exam.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : exam.status === "Draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {exam.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/exams/${exam._id}`}>
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
                      onClick={() => handleDeleteExam(exam._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddExamDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={fetchExams}
        categories={categories}
        courses={courses}
        questions={questions}
      />
    </div>
  );
}
