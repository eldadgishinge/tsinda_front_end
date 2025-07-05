"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AddQuestionDialog } from "@/components/add-question-dialog";
import { QuestionActionsDialog } from "@/components/question-actions-dialog";
import { useQuestions, useDeleteQuestion } from "@/hooks/use-questions";
import type { ColumnDef } from "@tanstack/react-table";
import type { Question } from "@/lib/validations/question";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function QuestionsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: questions, isLoading } = useQuestions();
  const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteQuestion();

  const handleDelete = () => {
    if (selectedQuestion?._id) {
      deleteQuestion(selectedQuestion._id);
    }
  };

  const columns: ColumnDef<Question>[] = [
    {
      accessorKey: "text",
      header: "Question Text",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category?.categoryName,
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
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
          className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
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
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-blue-100"
                  onClick={() => {
                    setSelectedQuestion(row.original);
                    setShowViewDialog(true);
                  }}
                >
                  <Eye className="h-4 w-4 text-blue-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-100"
                  onClick={() => {
                    setSelectedQuestion(row.original);
                    setShowEditDialog(true);
                  }}
                >
                  <Pencil className="h-4 w-4 text-green-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-100"
                  onClick={() => {
                    setSelectedQuestion(row.original);
                    setShowDeleteDialog(true);
                  }}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      ),
    },
  ];

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen pb-10">
      <div className="flex justify-between items-center sticky top-0 z-10 bg-gray-50/80 py-4 px-2 md:px-0">
        <h1 className="text-2xl font-bold">Question Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B] shadow-lg px-6 py-2 text-base font-semibold"
          onClick={() => setShowAddDialog(true)}
        >
          ADD QUESTION
        </Button>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl shadow-lg border bg-white overflow-x-auto">
          <div className="p-4 flex items-center justify-between border-b bg-gray-50 rounded-t-2xl sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg">Current Questions</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {questions?.length || 0} questions
              </span>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={questions || []}
            isLoading={isLoading}
            rowClassName="hover:bg-blue-50 transition-colors"
            cellClassName="align-middle"
            headerClassName="bg-gray-100 text-gray-700 font-semibold text-sm"
            zebraStripe
          />
        </div>
      </div>

      <AddQuestionDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      <QuestionActionsDialog
        type="view"
        question={selectedQuestion}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />

      <QuestionActionsDialog
        type="edit"
        question={selectedQuestion}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />

      <QuestionActionsDialog
        type="delete"
        question={selectedQuestion}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </div>
  );
}