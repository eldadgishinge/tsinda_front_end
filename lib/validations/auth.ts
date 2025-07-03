import * as z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const verifyCodeSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
});

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["instructor", "admin"]),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"),
  password: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => val === undefined || val.length >= 6, {
      message: "Password must be at least 6 characters",
    }),
  role: z.enum(["instructor", "admin"]),
});

export interface User {
  _id: string
  name: string
  email: string
  phoneNumber: string
  role: "user" | "admin" | "instructor"
  isVerified: boolean
  createdAt: string
}