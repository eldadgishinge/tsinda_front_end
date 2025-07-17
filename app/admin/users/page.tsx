"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AddUserDialog } from "@/components/add-user-dialog";
import { UserActionsDialog } from "@/components/user-actions-dialog";
import { EditUserDialog } from "@/components/edit-user-dialog";
import { useUsers, useDeleteUser, useUpdateUser } from "@/hooks/use-users";
import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/lib/validations/auth";

export default function UsersPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: users, isLoading } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const handleDelete = () => {
    if (selectedUser?._id) {
      deleteUser(selectedUser._id);
    }
  };

  const handleUpdate = (data: any) => {
    if (selectedUser?._id) {
      updateUser({ userId: selectedUser._id, ...data });
    }
  };

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
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs ${
            row.original.role === "admin"
              ? "bg-blue-100 text-blue-700"
              : row.original.role === "instructor"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "isVerified",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              row.original.isVerified ? "bg-green-500" : "bg-yellow-500"
            }`}
          />
          <span>{row.original.isVerified ? "Active" : "Pending"}</span>
        </div>
      ),
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
              setSelectedUser(row.original);
              setShowViewDialog(true);
            }}
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => {
              setSelectedUser(row.original);
              setShowEditDialog(true);
            }}
          >
            <Pencil className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => {
              setSelectedUser(row.original);
              setShowDeleteDialog(true);
            }}
            disabled={isDeleting}
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">User Management</h1>
        <Button
          className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base"
          onClick={() => setShowAddDialog(true)}
        >
          ADD USER
        </Button>
      </div>

      <div className="border rounded-lg bg-white overflow-x-auto">
        <div className="p-3 sm:p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-sm sm:text-base">Current Users</h2>
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {users?.length || 0} users
            </span>
          </div>
        </div>

        <DataTable columns={columns} data={users || []} isLoading={isLoading} />
      </div>

      <AddUserDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      <UserActionsDialog
        type="view"
        user={selectedUser}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />

      <EditUserDialog
        user={selectedUser}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onConfirm={handleUpdate}
      />

      <UserActionsDialog
        type="delete"
        user={selectedUser}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </div>
  );
}
