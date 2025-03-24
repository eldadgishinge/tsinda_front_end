"use client"

import * as React from "react"
import { UploadCloud, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect: (file: File) => void
  onFileRemove?: () => void
  selectedFile?: File | null
  accept?: string
  maxSize?: number // in MB
  className?: string
  uploading?: boolean
  uploadProgress?: number
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  accept = "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  maxSize = 100, // 100MB default
  className,
  uploading = false,
  uploadProgress = 0,
  ...props
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    // Check file type
    if (!accept.split(",").some(type => file.type === type.trim())) {
      alert("Invalid file type")
      return
    }

    onFileSelect(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const file = event.dataTransfer.files?.[0]
    if (!file) return

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    // Check file type
    if (!accept.split(",").some(type => file.type === type.trim())) {
      alert("Invalid file type")
      return
    }

    onFileSelect(file)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-6",
        selectedFile ? "border-gray-300" : "border-gray-400",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept={accept}
        {...props}
      />

      <div className="flex flex-col items-center justify-center gap-2">
        {selectedFile ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium truncate max-w-[200px]">
                {selectedFile.name}
              </span>
              {onFileRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onFileRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {uploading && (
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <UploadCloud className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => inputRef.current?.click()}
              >
                Click to upload
              </Button>
              <span className="text-gray-500"> or drag and drop</span>
            </div>
            <p className="text-xs text-gray-500">
              {accept === "video/*"
                ? "MP4, WebM, or OGG video files"
                : "PDF or Word documents"} (max {maxSize}MB)
            </p>
          </>
        )}
      </div>
    </div>
  )
}