"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Eye, Pencil, Trash2, Users, Plus, UserCheck, UserX, Crown, Shield } from "lucide-react";
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

  // Calculate statistics
  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter(user => user.isVerified).length || 0;
  const pendingUsers = users?.filter(user => !user.isVerified).length || 0;
  const adminUsers = users?.filter(user => user.role === 'admin').length || 0;

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {row.original.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.original.name}</div>
            <div className="text-sm text-gray-500">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      cell: ({ row }) => (
        <span className="text-gray-700 font-medium">{row.original.phoneNumber}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.role === "admin" ? (
            <Crown className="w-4 h-4 text-yellow-500" />
          ) : row.original.role === "instructor" ? (
            <Shield className="w-4 h-4 text-blue-500" />
          ) : (
            <Users className="w-4 h-4 text-gray-500" />
          )}
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              row.original.role === "admin"
                ? "bg-yellow-100 text-yellow-700"
                : row.original.role === "instructor"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {row.original.role}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "isVerified",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              row.original.isVerified ? "bg-green-500" : "bg-yellow-500"
            }`}
          />
          <span className={`text-sm font-medium ${
            row.original.isVerified ? "text-green-700" : "text-yellow-700"
          }`}>
            {row.original.isVerified ? "Active" : "Pending"}
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
              setSelectedUser(row.original);
              setShowViewDialog(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
            onClick={() => {
              setSelectedUser(row.original);
              setShowEditDialog(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            onClick={() => {
              setSelectedUser(row.original);
              setShowDeleteDialog(true);
            }}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Enhanced Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage all users and their permissions</p>
              </div>
            </div>
          </div>
          <Button
            className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Users</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingUsers}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <UserX className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-yellow-600">{adminUsers}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Data Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Current Users</h2>
              <span className="bg-[#1045A1] text-white px-3 py-1 rounded-full text-sm font-medium">
                {totalUsers} users
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <DataTable columns={columns} data={users || []} isLoading={isLoading} />
        </div>
      </div>

      {/* Dialogs */}
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
