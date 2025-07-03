"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Trash2, Eye, Pencil } from "lucide-react"
import { AddCategoryDialog } from "@/components/add-category-dialog"
import { useCategories, useDeleteCategory, useUpdateCategory } from "@/hooks/use-categories"
import type { ColumnDef } from "@tanstack/react-table"
import type { Category } from "@/lib/validations/category"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function CategoriesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { data: categories, isLoading } = useCategories()
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory()
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory()

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
            onClick={() => {
              setSelectedCategory(row.original)
              setShowViewDialog(true)
            }}
          >
            <Eye className="h-4 w-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedCategory(row.original)
              setShowEditDialog(true)
            }}
          >
            <Pencil className="h-4 w-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedCategory(row.original)
              setShowDeleteDialog(true)
            }}
            isLoading={isDeleting}
          >
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      ),
    },
  ]

  // Edit form state
  const [editForm, setEditForm] = useState({ categoryName: "", description: "" })
  useEffect(() => {
    if (selectedCategory && showEditDialog) {
      setEditForm({
        categoryName: selectedCategory.categoryName,
        description: selectedCategory.description,
      })
    }
  }, [selectedCategory, showEditDialog])

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory) return
    updateCategory({
      categoryId: selectedCategory._id,
      categoryName: editForm.categoryName,
      description: editForm.description,
    }, {
      onSuccess: () => setShowEditDialog(false),
    })
  }

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

      {/* View Category Modal */}
      {selectedCategory && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <span className="text-lg font-bold">{selectedCategory.categoryName}</span>
                <span className="text-xs text-gray-500">Category Details</span>
              </DialogTitle>
            </DialogHeader>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4 border mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium">Description</span>
                <span className="text-gray-800">{selectedCategory.description}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium">Created At</span>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {new Date(selectedCategory.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Category Modal */}
      {selectedCategory && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Edit Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category Name</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={editForm.categoryName}
                  onChange={e => setEditForm(f => ({ ...f, categoryName: e.target.value }))}
                  required
                  minLength={3}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={editForm.description}
                  onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                  required
                  minLength={10}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#1045A1] hover:bg-[#0D3A8B]" isLoading={isUpdating}>
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Category Confirmation Modal */}
      {selectedCategory && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-red-600">Delete Category</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete the category <span className="font-semibold">{selectedCategory.categoryName}</span>?<br/>
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  isLoading={isDeleting}
                  onClick={() => {
                    deleteCategory(selectedCategory._id, {
                      onSuccess: () => setShowDeleteDialog(false),
                    })
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}