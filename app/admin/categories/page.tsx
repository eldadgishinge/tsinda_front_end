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
import { Trash2 } from "lucide-react";
import { AddCategoryDialog } from "@/components/add-category-dialog";
import axios from "@/lib/axios";

interface Category {
  _id: string;
  categoryName: string;
  description: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

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
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Delete category error:", error);
      // Handle error (show toast, etc)
    }
  };

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
              {categories.length} categories
            </span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell className="font-medium">
                  {category.categoryName}
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  {new Date(category.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddCategoryDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={fetchCategories}
      />
    </div>
  );
}
