"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Phone, Mail, ArrowRight, Sparkles, Shield, BookOpen } from "lucide-react";
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
import { useState } from "react";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Enhanced Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-12">
          <div className="text-center space-y-8 max-w-md">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-4">Welcome to Tsinda</h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Your gateway to comprehensive learning and skill development. 
                Join thousands of learners advancing their careers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Interactive Learning Experience</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span>Secure & Reliable Platform</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Comprehensive Course Library</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Image
              src="/logo.svg"
              alt="Tsindacyane Logo"
              width={200}
              height={60}
              className="w-48 h-auto mx-auto"
              priority
            />
          </div>

          {/* Enhanced Login Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-8 space-y-6">
              {/* Logo in Form */}
              <div className="flex justify-center mb-6">
                <Image
                  src="/logo.svg"
                  alt="Tsindacyane Logo"
                  width={180}
                  height={60}
                  className="w-36 h-auto"
                  priority
                />
              </div>
              
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                <p className="text-gray-600">Sign in to your account to continue learning</p>
              </div>



              {/* Enhanced Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input 
                              {...field} 
                              className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#1045A1] focus:ring-2 focus:ring-[#1045A1]/20 transition-all duration-200 rounded-xl" 
                              placeholder="Enter your phone number"
                            />
                          </div>
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
                        <FormLabel className="text-sm font-semibold text-gray-700">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input 
                              {...field} 
                              type={showPassword ? "text" : "password"}
                              className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#1045A1] focus:ring-2 focus:ring-[#1045A1]/20 transition-all duration-200 rounded-xl" 
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-[#1045A1] hover:text-[#0D3A8B] font-medium transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white h-12 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    isLoading={isPending}
                  >
                    {isPending ? "Signing in..." : "Sign In"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>

              {/* Enhanced Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link 
                    href="/signup" 
                    className="text-[#1045A1] hover:text-[#0D3A8B] font-semibold transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
