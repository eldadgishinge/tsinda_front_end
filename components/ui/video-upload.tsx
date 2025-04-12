"use client";

import * as React from "react";
import { FileUpload } from "@/components/ui/file-upload";

interface VideoUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  selectedFile?: File | null;
  maxSize?: number; // in MB
  className?: string;
  uploading?: boolean;
  uploadProgress?: number;
}

export function VideoUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  maxSize = 100, // 100MB default
  className,
  uploading = false,
  uploadProgress = 0,
  ...props
}: VideoUploadProps) {
  return (
    <FileUpload
      accept="video/mp4,video/webm,video/ogg,video/mov"
      maxSize={maxSize}
      onFileSelect={onFileSelect}
      onFileRemove={onFileRemove}
      selectedFile={selectedFile}
      className={className}
      uploading={uploading}
      uploadProgress={uploadProgress}
      {...props}
    />
  );
}
