"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AddExamDialog } from "@/components/add-exam-dialog";
import { useExams, useDeleteExam } from "@/hooks/use-exams";
import type { ColumnDef } from "@tanstack/react-table";
import type { Exam } from "@/lib/validations/exam";
import Link from "next/link";

export default function ExamsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { data: exams, isLoading } = useExams();
  const { mutate: deleteExam, isPending: isDeleting } = useDeleteExam();

  const columns: ColumnDef<Exam>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category?.categoryName,
    },
    {
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => row.original.course?.title || "-",
    },
    {
      accessorKey: "questions",
      header: "Questions",
      cell: ({ row }) => row.original.questions?.length,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => `${row.original.duration} min`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "Published"
              ? "bg-green-100 text-green-700"
              : row.original.status === "Draft"
              ? "bg-yellow-100 text-yellow-700"
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
          <Link href={`/admin/exams/${row.original._id}`}>
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
            onClick={() => deleteExam(row.original._id)}
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
        <h1 className="text-2xl font-bold">Exam Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B]"
          onClick={() => setShowAddDialog(true)}
        >
          ADD EXAM
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Current Exams</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {exams?.length || 0} exams
            </span>
          </div>
        </div>

        <DataTable columns={columns} data={exams || []} isLoading={isLoading} />
      </div>

      <AddExamDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
