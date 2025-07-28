"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Eye, Pencil, Trash2, HelpCircle, Plus, Brain, Target, CheckCircle, Clock, AlertCircle } from "lucide-react";
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

  // Calculate statistics
  const totalQuestions = questions?.length || 0;
  const activeQuestions = questions?.filter(q => q.status === "Active").length || 0;
  const easyQuestions = questions?.filter(q => q.difficulty === "Easy").length || 0;
  const mediumQuestions = questions?.filter(q => q.difficulty === "Medium").length || 0;
  const hardQuestions = questions?.filter(q => q.difficulty === "Hard").length || 0;

  const handleDelete = () => {
    if (selectedQuestion?._id) {
      deleteQuestion(selectedQuestion._id);
    }
  };

  const columns: ColumnDef<Question>[] = [
    {
      accessorKey: "text",
      header: "Question Text",
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 line-clamp-2">{row.original.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {row.original.options?.length || 0} options
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            {row.original.category?.categoryName || "Uncategorized"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-gray-500" />
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              row.original.difficulty === "Easy"
                ? "bg-green-100 text-green-700"
                : row.original.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {row.original.difficulty}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === "Active" ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Clock className="w-4 h-4 text-gray-500" />
          )}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              row.original.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {row.original.status}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <TooltipProvider>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() => {
                    setSelectedQuestion(row.original);
                    setShowViewDialog(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Question</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                  onClick={() => {
                    setSelectedQuestion(row.original);
                    setShowEditDialog(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Question</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                  onClick={() => {
                    setSelectedQuestion(row.original);
                    setShowDeleteDialog(true);
                  }}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Question</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      ),
    },
  ];

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Enhanced Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center shadow-lg">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Question Management</h1>
                <p className="text-gray-600">Create and manage assessment questions</p>
              </div>
            </div>
          </div>
          <Button
            className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeQuestions}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Easy</p>
              <p className="text-2xl font-bold text-green-600">{easyQuestions}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medium</p>
              <p className="text-2xl font-bold text-yellow-600">{mediumQuestions}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hard</p>
              <p className="text-2xl font-bold text-red-600">{hardQuestions}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Data Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">All Questions</h2>
              <span className="bg-[#1045A1] text-white px-3 py-1 rounded-full text-sm font-medium">
                {totalQuestions} questions
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
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

      {/* Enhanced Dialogs */}
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