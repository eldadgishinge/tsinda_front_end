"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { forgotPasswordSchema } from "@/lib/validations/auth";
import type { z } from "zod";
import { useForgotPassword } from "@/hooks/use-auth";
import { ArrowLeft, Mail, Lock } from "lucide-react";

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    forgotPassword(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-6 lg:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input 
                            {...field} 
                            type="email" 
                            placeholder="Enter your email address"
                            className="pl-10 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#1045A1] hover:bg-[#0D3A8B] text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                  isLoading={isPending}
                >
                  {isPending ? "Sending..." : "Send Reset Instructions"}
                </Button>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/login" 
                className="inline-flex items-center text-[#1045A1] hover:text-[#0D3A8B] font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#1045A1] hover:text-[#0D3A8B] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
