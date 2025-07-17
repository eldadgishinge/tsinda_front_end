"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@/hooks/use-auth";
import { useUpdateSettings } from "@/hooks/use-settings";
import { updateSettingsSchema } from "@/lib/validations/settings";
import type { z } from "zod";

type SettingsForm = z.infer<typeof updateSettingsSchema>;

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { data: user } = useUser();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const form = useForm<SettingsForm>({
    resolver: zodResolver(updateSettingsSchema),
    defaultValues: {
      phoneNumber: user?.phoneNumber || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: SettingsForm) => {
    updateSettings(data);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 text-sm lg:text-base">Update your account settings</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          <Card className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Phone Number</h2>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm lg:text-base">Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-10 sm:h-11 lg:h-12 text-sm lg:text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Change Password</h2>
            <div className="space-y-3 sm:space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm lg:text-base">Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrentPassword ? "text" : "password"}
                          className="pr-10 h-10 sm:h-11 lg:h-12 text-sm lg:text-base"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm lg:text-base">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          className="pr-10 h-10 sm:h-11 lg:h-12 text-sm lg:text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base h-10 sm:h-11 lg:h-12"
            isLoading={isPending}
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
