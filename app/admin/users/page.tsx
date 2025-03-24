"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Trash2 } from "lucide-react"
import { AddUserDialog } from "@/components/add-user-dialog"
import { useUsers, useDeleteUser } from "@/hooks/use-users"
import type { ColumnDef } from "@tanstack/react-table"
import type { User } from "@/lib/validations/auth"

export default function UsersPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const { data: users, isLoading } = useUsers()
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
          row.original.role === "admin" 
            ? "bg-blue-100 text-blue-700" 
            : row.original.role === "instructor"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}>
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "isVerified",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${
            row.original.isVerified ? "bg-green-500" : "bg-yellow-500"
          }`} />
          <span>{row.original.isVerified ? "Active" : "Pending"}</span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteUser(row.original._id)}
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
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B]"
          onClick={() => setShowAddDialog(true)}
        >
          ADD USER
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Current Users</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {users?.length || 0} users
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={users || []}
          isLoading={isLoading}
        />
      </div>

      <AddUserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  )
}