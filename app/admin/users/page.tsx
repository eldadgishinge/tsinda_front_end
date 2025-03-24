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
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, MoreVertical, User } from "lucide-react";
import Image from "next/image";
import { AddUserDialog } from "@/components/add-user-dialog";
import axios from "@/lib/axios";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("/auth/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch users error:", error);
      // Handle error (show toast, etc)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAll = () => {
    setSelectedUsers((prev) =>
      prev.length === users.length ? [] : users.map((user) => user._id)
    );
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Refresh users list
      fetchUsers();
    } catch (error) {
      console.error("Delete user error:", error);
      // Handle error (show toast, etc)
    }
  };

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
              {users.length} users
            </span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email address</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user._id)}
                    onCheckedChange={() => toggleUser(user._id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src="/placeholder.svg"
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        user.isVerified ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <span>{user.isVerified ? "Active" : "Pending"}</span>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => handleDeleteUser(user._id)}
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

      <AddUserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={fetchUsers}
      />
    </div>
  );
}
