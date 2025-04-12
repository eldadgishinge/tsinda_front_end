import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import type { UpdateSettingsForm } from "@/lib/validations/settings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateSettingsForm) => {
      // Update phone number if provided
      if (data.phoneNumber) {
        await axios.put("/auth/phone", { phoneNumber: data.phoneNumber });
      }

      // Update password if provided
      if (data.currentPassword && data.newPassword) {
        await axios.put("/auth/password", {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Settings updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update settings");
    },
  });
}
