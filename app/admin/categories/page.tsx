"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Trash2, Eye, Pencil, FolderOpen, Plus, Globe, Calendar, FileText } from "lucide-react"
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

  // Calculate statistics
  const totalCategories = categories?.length || 0
  const englishCategories = categories?.filter(cat => cat.language === "ENG").length || 0
  const kinyarwandaCategories = categories?.filter(cat => cat.language === "KIN").length || 0

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "categoryName",
      header: "Category Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center text-white shadow-lg">
            <FolderOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.original.categoryName}</div>
            <div className="text-sm text-gray-500">{row.original.description}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-500" />
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            row.original.language === "ENG" 
              ? "bg-blue-100 text-blue-700" 
              : "bg-purple-100 text-purple-700"
          }`}>
            {row.original.language === "ENG" ? "English" : "Kinyarwanda"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 font-medium">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            onClick={() => {
              setSelectedCategory(row.original)
              setShowViewDialog(true)
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
            onClick={() => {
              setSelectedCategory(row.original)
              setShowEditDialog(true)
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            onClick={() => {
              setSelectedCategory(row.original)
              setShowDeleteDialog(true)
            }}
            isLoading={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
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
    <div className="space-y-6 overflow-x-hidden">
      {/* Enhanced Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center shadow-lg">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Category Management</h1>
                <p className="text-gray-600">Organize and manage content categories</p>
              </div>
            </div>
          </div>
          <Button
            className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">English Categories</p>
              <p className="text-2xl font-bold text-blue-600">{englishCategories}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kinyarwanda Categories</p>
              <p className="text-2xl font-bold text-purple-600">{kinyarwandaCategories}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Data Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Current Categories</h2>
              <span className="bg-[#1045A1] text-white px-3 py-1 rounded-full text-sm font-medium">
                {totalCategories} categories
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <DataTable
            columns={columns}
            data={categories || []}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Enhanced Dialogs */}
      <AddCategoryDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      {selectedCategory && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] flex items-center justify-center shadow-lg">
                  <FolderOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold text-gray-900">{selectedCategory.categoryName}</span>
                  <p className="text-sm text-gray-500 mt-1">Category Details</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4 border mt-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <span className="text-xs text-gray-500 font-medium">Description</span>
                  <p className="text-gray-800 text-sm mt-1">{selectedCategory.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <span className="text-xs text-gray-500 font-medium">Language</span>
                  <div className="mt-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedCategory.language === "ENG" 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      {selectedCategory.language === "ENG" ? "English" : "Kinyarwanda"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <span className="text-xs text-gray-500 font-medium">Created At</span>
                  <p className="text-gray-800 text-sm mt-1">
                    {new Date(selectedCategory.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {selectedCategory && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Edit Category</span>
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1045A1] focus:border-[#1045A1] transition-all duration-200"
                  value={editForm.categoryName}
                  onChange={e => setEditForm(f => ({ ...f, categoryName: e.target.value }))}
                  required
                  minLength={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1045A1] focus:border-[#1045A1] transition-all duration-200 resize-none"
                  rows={3}
                  value={editForm.description}
                  onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                  required
                  minLength={10}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <Select
                  value={editForm.language}
                  onValueChange={(value: "ENG" | "KIN") => setEditForm(f => ({ ...f, language: value }))}
                >
                  <SelectTrigger className="w-full text-sm rounded-xl border-gray-300 focus:ring-2 focus:ring-[#1045A1] focus:border-[#1045A1]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENG">English</SelectItem>
                    <SelectItem value="KIN">Kinyarwanda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setShowEditDialog(false)} 
                  className="px-6 py-2 rounded-xl border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#1045A1] hover:bg-[#0D3A8B] px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                  isLoading={isUpdating}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {selectedCategory && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-red-600">Delete Category</span>
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-gray-700 text-sm">
                  Are you sure you want to delete the category <span className="font-semibold text-red-700">{selectedCategory.categoryName}</span>?
                </p>
                <p className="text-red-600 text-xs mt-2">This action cannot be undone.</p>
              </div>
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteDialog(false)} 
                  className="px-6 py-2 rounded-xl border-gray-300 hover:bg-gray-50"
                >
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
                  className="px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Delete Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}