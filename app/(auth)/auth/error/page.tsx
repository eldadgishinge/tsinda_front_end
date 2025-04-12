"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Authentication failed");
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Authentication failed. Redirecting...</p>
      </div>
    </div>
  );
}
