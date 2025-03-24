"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifyCodeSchema } from "@/lib/validations/auth";
import type { z } from "zod";
import axios from "@/lib/axios";

type VerifyForm = z.infer<typeof verifyCodeSchema>;

export default function VerifyEmailPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const id = localStorage.getItem("verifyUserId");
    if (!id) {
      router.push("/signup");
      return;
    }
    setUserId(id);
  }, [router]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const form = useForm<VerifyForm>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyForm) => {
    try {
      const response = await axios.post("/auth/verify", {
        userId,
        verificationCode: data.code,
      });

      localStorage.removeItem("verifyUserId");
      localStorage.setItem("token", response.data.token);

      // Redirect based on role
      if (response.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Verification error:", error);
      // Handle error (show toast, etc)
    }
  };

  const resendCode = async () => {
    try {
      await axios.post("/api/auth/resend-verification", { userId });
      setTimeLeft(60);
    } catch (error) {
      console.error("Resend code error:", error);
      // Handle error (show toast, etc)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[480px] shadow-none border-none">
        <CardContent className="space-y-6 p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Verify your email</h1>
            <p className="text-gray-600">
              We've sent a verification code to your email. Please enter it
              below.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter verification code"
                        className="text-center text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="ghost"
                className="w-full text-center text-sm text-gray-500"
                disabled={timeLeft > 0}
                onClick={resendCode}
              >
                {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Resend code"}
              </Button>

              <Button
                type="submit"
                className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-6"
              >
                Verify Email
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600">
            Back to{" "}
            <Link href="/login" className="text-[#1045A1] hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
