import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios"
import toast from "react-hot-toast"
import type { Category } from "@/lib/validations/category"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/categories")
      return response.data as Category[]
    },
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { categoryName: string; description: string }) => {
      const response = await axios.post("/categories", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category created successfully")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create category")
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await axios.delete(`/categories/${categoryId}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete category")
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, categoryName, description }: { categoryId: string; categoryName: string; description: string }) => {
      const response = await axios.put(`/categories/${categoryId}`, { categoryName, description });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update category");
    },
  });
}