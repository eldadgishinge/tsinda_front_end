"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Trash2 } from "lucide-react"
import { AddCategoryDialog } from "@/components/add-category-dialog"
import { useCategories, useDeleteCategory } from "@/hooks/use-categories"
import type { ColumnDef } from "@tanstack/react-table"
import type { Category } from "@/lib/validations/category"

export default function CategoriesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const { data: categories, isLoading } = useCategories()
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory()

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "categoryName",
      header: "Category Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteCategory(row.original._id)}
            isLoading={isDeleting}
          >
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B]"
          onClick={() => setShowAddDialog(true)}
        >
          ADD CATEGORY
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Current Categories</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {categories?.length || 0} categories
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={categories || []}
          isLoading={isLoading}
        />
      </div>

      <AddCategoryDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  )
}