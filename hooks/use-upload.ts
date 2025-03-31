import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export function useUploadVideo() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("video", file);

      const response = await axios.post("/upload/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.videoUrl as string;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to upload video");
    },
  });
}

export function useUploadDocument() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("document", file);

      const response = await axios.post("/upload/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.documentUrl as string;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to upload document");
    },
  });
}

export function useUploadQuestionImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/upload/question-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.imageUrl as string;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to upload image");
    },
  });
}