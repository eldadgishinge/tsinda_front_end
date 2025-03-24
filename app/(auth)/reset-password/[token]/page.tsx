"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { resetPasswordSchema } from "@/lib/validations/auth";
import type { z } from "zod";
import { useResetPassword } from "@/hooks/use-auth";

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const { mutate: resetPassword, isPending } = useResetPassword();

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordForm) => {
    resetPassword({ token: params.token, password: data.password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[480px] shadow-none border-none">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="text-gray-600">Enter your new password below.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="password" className="pr-10" />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="password" className="pr-10" />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-6"
                isLoading={isPending}
              >
                Reset Password
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-[#1045A1] hover:underline">
              Back to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
