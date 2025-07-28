"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Eye, Trash2, FileText, Plus, Clock, Users, CheckCircle, AlertCircle, Target, BookOpen } from "lucide-react";
import { AddExamDialog } from "@/components/add-exam-dialog";
import { useExams, useDeleteExam } from "@/hooks/use-exams";
import type { ColumnDef } from "@tanstack/react-table";
import type { Exam } from "@/lib/validations/exam";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ExamsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [examToDelete, setExamToDelete] = useState<Exam | null>(null);
  const { data: exams, isLoading } = useExams();
  const { mutate: deleteExam, isPending: isDeleting } = useDeleteExam();

  // Calculate statistics
  const totalExams = exams?.length || 0;
  const publishedExams = exams?.filter(exam => exam.status === "Published").length || 0;
  const draftExams = exams?.filter(exam => exam.status === "Draft").length || 0;
  const archivedExams = exams?.filter(exam => exam.status === "Archived").length || 0;

  const handleDelete = () => {
    if (examToDelete?._id) {
      deleteExam(examToDelete._id);
      setExamToDelete(null);
    }
  };

  const columns: ColumnDef<Exam>[] = [
    {
      accessorKey: "title",
      header: "Exam Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 line-clamp-2">{row.original.title}</p>
            <p className="text-xs text-gray-500 mt-1">
              {row.original.description || "No description"}
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
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">
            {row.original.course?.title || "No course"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "questions",
      header: "Questions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600">{row.original.questions?.length || 0}</span>
          </div>
          <span className="text-sm text-gray-600">questions</span>
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {row.original.duration} min
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === "Published" ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : row.original.status === "Archived" ? (
            <AlertCircle className="w-4 h-4 text-gray-500" />
          ) : (
            <Clock className="w-4 h-4 text-yellow-500" />
          )}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              row.original.status === "Published"
                ? "bg-green-100 text-green-700"
                : row.original.status === "Archived"
                ? "bg-gray-100 text-gray-700"
                : row.original.status === "Draft"
                ? "bg-yellow-100 text-yellow-700"
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
        <div className="flex items-center gap-1">
          <Link href={`/admin/exams/${row.original._id}`}>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            onClick={() => setExamToDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
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
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Exam Management</h1>
                <p className="text-gray-600">Create and manage assessment exams</p>
              </div>
            </div>
          </div>
          <Button
            className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Exam
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900">{totalExams}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{publishedExams}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Archived</p>
              <p className="text-2xl font-bold text-gray-600">{archivedExams}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{draftExams}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Data Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">All Exams</h2>
              <span className="bg-[#1045A1] text-white px-3 py-1 rounded-full text-sm font-medium">
                {totalExams} exams
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <DataTable 
            columns={columns} 
            data={exams || []} 
            isLoading={isLoading}
            rowClassName="hover:bg-blue-50 transition-colors"
            cellClassName="align-middle"
            headerClassName="bg-gray-100 text-gray-700 font-semibold text-sm"
            zebraStripe
          />
        </div>
      </div>

      {/* Enhanced Dialogs */}
      <AddExamDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      <Dialog open={!!examToDelete} onOpenChange={() => setExamToDelete(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-red-600">Delete Exam</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-gray-700 text-sm">
                Are you sure you want to delete the exam <span className="font-semibold text-red-700">"{examToDelete?.title}"</span>?
              </p>
              <p className="text-red-600 text-xs mt-2">This action cannot be undone.</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setExamToDelete(null)} 
                className="px-6 py-2 rounded-xl border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                isLoading={isDeleting}
                className="px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Delete Exam
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
