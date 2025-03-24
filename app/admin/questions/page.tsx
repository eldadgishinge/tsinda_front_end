"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2 } from "lucide-react";
import { AddQuestionDialog } from "@/components/add-question-dialog";
import { useQuestions, useDeleteQuestion } from "@/hooks/use-questions";
import type { ColumnDef } from "@tanstack/react-table";
import type { Question } from "@/lib/validations/question";

export default function QuestionsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { data: questions, isLoading } = useQuestions();
  const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteQuestion();

  const columns: ColumnDef<Question>[] = [
    {
      accessorKey: "text",
      header: "Question Text",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category.categoryName,
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.difficulty === "Easy"
              ? "bg-green-100 text-green-700"
              : row.original.difficulty === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.original.difficulty}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteQuestion(row.original._id)}
            isLoading={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

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

      <div className="border rounded-lg bg-white">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Current Questions</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {questions?.length || 0} questions
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={questions || []}
          isLoading={isLoading}
        />
      </div>

      <AddQuestionDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
