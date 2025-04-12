import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@/lib/validations/auth";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { phoneNumber: string; password: string }) => {
      const response = await axios.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["user"], data.user);
      toast.success("Logged in successfully");

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: any) => {
      if (error.response?.data.userId) {
        localStorage.setItem("verifyUserId", error.response.data.userId);
        router.push("/verify-email");
        return;
      }
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
}

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phoneNumber: string;
      password: string;
    }) => {
      const response = await axios.post("/auth/signup", {
        ...data,
        role: "user",
      });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("verifyUserId", data.userId);
      toast.success("Account created successfully. Please verify your email.");
      router.push("/verify-email");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Signup failed");
    },
  });
}

export function useVerifyEmail() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { userId: string; verificationCode: string }) => {
      const response = await axios.post("/auth/verify", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.removeItem("verifyUserId");
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["user"], data.user);
      toast.success("Email verified successfully");

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Verification failed");
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await axios.post("/auth/forgot-password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Reset instructions sent to your email");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to send reset instructions"
      );
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }) => {
      const response = await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Password reset failed");
    },
  });
}
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/auth/me");
      return response.data as User;
    },
  });
}
