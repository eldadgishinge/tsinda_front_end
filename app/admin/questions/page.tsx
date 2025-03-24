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
import { Pencil, Trash2 } from "lucide-react";
import { AddQuestionDialog } from "@/components/add-question-dialog";
import type { Question } from "@/lib/validations/question";
import axios from "@/lib/axios";

interface Category {
  _id: string;
  categoryName: string;
}

interface Filters {
  status: "All" | "Active" | "Inactive";
  category: string;
  difficulty: "All" | "Easy" | "Medium" | "Hard";
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: "All",
    category: "All",
    difficulty: "All",
  });

  const fetchQuestions = async () => {
    try {
      const params: Record<string, string> = {};
      if (filters.status !== "All") params.status = filters.status;
      if (filters.category !== "All") params.category = filters.category;
      if (filters.difficulty !== "All") params.difficulty = filters.difficulty;

      const response = await axios.get("/questions", { params });
      setQuestions(response.data);
    } catch (error) {
      console.error("Fetch questions error:", error);
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

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, [filters]);

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await axios.delete(`/questions/${questionId}`);
      fetchQuestions();
    } catch (error) {
      console.error("Delete question error:", error);
      // Handle error (show toast, etc)
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Question Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B]"
          onClick={() => setShowAddDialog(true)}
        >
          ADD QUESTION
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
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

        <Select
          value={filters.difficulty}
          onValueChange={(value: Filters["difficulty"]) =>
            setFilters({ ...filters, difficulty: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question Text</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question._id}>
                <TableCell className="font-medium">{question.text}</TableCell>
                <TableCell>{question.category.categoryName}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      question.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : question.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {question.difficulty}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      question.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {question.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteQuestion(question._id)}
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

      <AddQuestionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={fetchQuestions}
        categories={categories}
      />
    </div>
  );
}
