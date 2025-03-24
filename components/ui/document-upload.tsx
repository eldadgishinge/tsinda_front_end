"use client"

import * as React from "react"
import { FileUpload } from "@/components/ui/file-upload"

interface DocumentUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect: (file: File) => void
  onFileRemove?: () => void
  selectedFile?: File | null
  maxSize?: number // in MB
  className?: string
  uploading?: boolean
  uploadProgress?: number
}

export function DocumentUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  maxSize = 10, // 10MB default
  className,
  uploading = false,
  uploadProgress = 0,
  ...props
}: DocumentUploadProps) {
  return (
    <FileUpload
      accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      maxSize={maxSize}
      onFileSelect={onFileSelect}
      onFileRemove={onFileRemove}
      selectedFile={selectedFile}
      className={className}
      uploading={uploading}
      uploadProgress={uploadProgress}
      {...props}
    />
  )
}