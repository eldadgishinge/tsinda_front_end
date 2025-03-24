import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios"
import toast from "react-hot-toast"
import type { User } from "@/lib/validations/auth"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/auth/all")
      return response.data as User[]
    },
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      name: string
      email: string
      phoneNumber: string
      password: string
      role: "instructor" | "admin"
    }) => {
      const response = await axios.post("/auth/signup", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User created successfully")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create user")
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await axios.delete(`/auth/${userId}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete user")
    },
  })
}