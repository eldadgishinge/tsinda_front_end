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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => {
        const language = row.original.language
        return language === "ENG" ? "English" : "Kinyarwanda"
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => {
              setSelectedCategory(row.original)
              setShowViewDialog(true)
            }}
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => {
              setSelectedCategory(row.original)
              setShowEditDialog(true)
            }}
          >
            <Pencil className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => {
              setSelectedCategory(row.original)
              setShowDeleteDialog(true)
            }}
            isLoading={isDeleting}
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          </Button>
        </div>
      ),
    },
  ]

  const [editForm, setEditForm] = useState({ categoryName: "", description: "", language: "ENG" as "ENG" | "KIN" })
  useEffect(() => {
    if (selectedCategory && showEditDialog) {
      setEditForm({
        categoryName: selectedCategory.categoryName,
        description: selectedCategory.description,
        language: selectedCategory.language,
      })
    }
  }, [selectedCategory, showEditDialog])

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory?._id) return
    updateCategory({
      categoryId: selectedCategory._id,
      categoryName: editForm.categoryName,
      description: editForm.description,
      language: editForm.language,
    }, {
      onSuccess: () => setShowEditDialog(false),
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Category Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base"
          onClick={() => setShowAddDialog(true)}
        >
          ADD CATEGORY
        </Button>
      </div>

      <div className="border rounded-lg bg-white overflow-x-auto">
        <div className="p-3 sm:p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-sm sm:text-base">Current Categories</h2>
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
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

      {selectedCategory && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-bold">{selectedCategory.categoryName}</span>
                <span className="text-xs text-gray-500">Category Details</span>
              </DialogTitle>
            </DialogHeader>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4 border mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium">Description</span>
                <span className="text-gray-800 text-sm lg:text-base">{selectedCategory.description}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium">Language</span>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                  {selectedCategory.language === "ENG" ? "English" : "Kinyarwanda"}
                </span>
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

      {selectedCategory && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg font-bold">Edit Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-3 sm:space-y-4 mt-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category Name</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm lg:text-base"
                  value={editForm.categoryName}
                  onChange={e => setEditForm(f => ({ ...f, categoryName: e.target.value }))}
                  required
                  minLength={3}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm lg:text-base"
                  value={editForm.description}
                  onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                  required
                  minLength={10}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Language</label>
                <Select
                  value={editForm.language}
                  onValueChange={(value: "ENG" | "KIN") => setEditForm(f => ({ ...f, language: value }))}
                >
                  <SelectTrigger className="w-full text-sm lg:text-base">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENG">English</SelectItem>
                    <SelectItem value="KIN">Kinyarwanda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setShowEditDialog(false)} className="text-sm lg:text-base">
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base" isLoading={isUpdating}>
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {selectedCategory && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg font-bold text-red-600">Delete Category</DialogTitle>
            </DialogHeader>
            <div className="py-3 sm:py-4">
              <p className="text-gray-700 mb-4 text-sm lg:text-base">
                Are you sure you want to delete the category <span className="font-semibold">{selectedCategory.categoryName}</span>?<br/>
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="text-sm lg:text-base">
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
                  className="text-sm lg:text-base"
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