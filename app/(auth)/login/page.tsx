"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
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
import { loginSchema } from "@/lib/validations/auth";
import type { z } from "zod";
import { useLogin } from "@/hooks/use-auth";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    login(data);
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50 overflow-x-hidden">
      <Card className="w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[480px] shadow-lg border-0">
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
          <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
              alt="Tsindacyane Logo"
              width={300}
              height={60}
              className="w-[200px] sm:w-[250px] lg:w-[300px] h-auto"
              priority
            />
          </div>

          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-center">
            Welcome back to Tsindacyane
          </h1>

          <Button
            variant="outline"
            className="w-full h-10 sm:h-11 lg:h-12 flex items-center justify-center gap-2 sm:gap-3 text-sm lg:text-base"
            onClick={handleGoogleSignIn}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
            <span className="hidden sm:inline">Continue with Google</span>
            <span className="sm:hidden">Google</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
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

              <Link
                href="/forgot-password"
                className="text-xs lg:text-sm text-[#1045A1] hover:underline block text-right"
              >
                Forgot password?
              </Link>

              <Button
                type="submit"
                className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-2 sm:py-3 lg:py-6 text-sm lg:text-base"
                isLoading={isPending}
              >
                Sign In
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs lg:text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#1045A1] hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
