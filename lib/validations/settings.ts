import * as z from "zod";

export const updateSettingsSchema = z
  .object({
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
  })
  .refine(
    (data) => {
      // If one password field is provided, both must be provided
      if (data.currentPassword || data.newPassword) {
        return data.currentPassword && data.newPassword;
      }
      return true;
    },
    {
      message: "Both current and new password are required to change password",
      path: ["newPassword"],
    }
  );

export type UpdateSettingsForm = z.infer<typeof updateSettingsSchema>;
