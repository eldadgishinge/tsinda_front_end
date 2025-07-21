"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, updateUserSchema } from "@/lib/validations/auth";
import type { User } from "@/lib/validations/auth";

interface UserActionsDialogProps {
  type: "view" | "edit" | "delete";
  user?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data?: any) => void;
}

export function UserActionsDialog({
  type,
  user,
  open,
  onOpenChange,
  onConfirm,
}: UserActionsDialogProps) {
  const form = useForm({
    resolver: zodResolver(type === "edit" ? updateUserSchema : createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "instructor",
    },
  });

  // Reset form when user changes or dialog opens
  useEffect(() => {
    if (user && open) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        password: "",
        role: user.role || "instructor",
      });
    }
  }, [user, open, form]);

  const handleConfirm = (data?: any) => {
    if (onConfirm) {
      onConfirm(data);
    }
    onOpenChange(false);
  };

  if (type === "view") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold">{user?.name}</span>
              <span className="text-xs text-gray-500">User Details</span>
            </DialogTitle>
          </DialogHeader>
          <div className="bg-gray-50 rounded-lg p-4 space-y-4 border">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 font-medium">Email</span>
              <span className="font-medium text-gray-800">{user?.email}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 font-medium">Phone</span>
              <span className="font-medium text-gray-800">{user?.phoneNumber}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 font-medium">Role</span>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                user?.role === "admin"
                  ? "bg-blue-100 text-blue-700"
                  : user?.role === "instructor"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {user?.role}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 font-medium">Status</span>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                user?.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {user?.isVerified ? "Verified" : "Pending"}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (type === "delete") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleConfirm()}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleConfirm)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password {type === "edit" && "(Leave blank to keep current password)"}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder={type === "edit" ? "Leave blank to keep current password" : "Enter password"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1045A1] hover:bg-[#0D3A8B]">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
