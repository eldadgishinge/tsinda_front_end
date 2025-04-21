"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Successfully signed in with Google");
      router.push("/dashboard");
    } else {
      toast.error("Authentication failed");
      router.push("/login");
    }
  }, [searchParams, router, queryClient]);

  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#1045A1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Completing sign in...</p>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense fallback={
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1045A1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      }>
        <AuthSuccessContent />
      </Suspense>
    </div>
  );
}