"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye } from "lucide-react";
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
import { signupSchema } from "@/lib/validations/auth";
import type { z } from "zod";
import { useSignup } from "@/hooks/use-auth";

type SignupForm = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const { mutate: signup, isPending } = useSignup();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupForm) => {
    signup(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50 overflow-x-hidden">
      <Card className="w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[480px] shadow-lg border-0">
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-center">
            Create your free account
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm lg:text-base">Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10 sm:h-11 lg:h-12 text-sm lg:text-base" />
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
                    <FormLabel className="text-sm lg:text-base">Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10 sm:h-11 lg:h-12 text-sm lg:text-base" />
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
                    <FormLabel className="text-sm lg:text-base">Email address</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="h-10 sm:h-11 lg:h-12 text-sm lg:text-base" />
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
                    <FormLabel className="text-sm lg:text-base">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="password" className="pr-10 h-10 sm:h-11 lg:h-12 text-sm lg:text-base" />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          <Eye className="h-4 w-4 lg:h-5 lg:w-5" />
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
                    <FormLabel className="text-sm lg:text-base">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="password" className="pr-10 h-10 sm:h-11 lg:h-12 text-sm lg:text-base" />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          <Eye className="h-4 w-4 lg:h-5 lg:w-5" />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-2 sm:py-3 lg:py-6 text-sm lg:text-base"
                isLoading={isPending}
              >
                Create Account
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs lg:text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1045A1] hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
