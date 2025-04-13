import * as React from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

interface UploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  defaultValue?: string;
  error?: string;
  type: "image" | "video" | "document";
  maxSize?: number; // in MB
  className?: string;
}

const ACCEPT_TYPES = {
  image: "image/*",
  video: "video/mp4,video/webm,video/ogg,video/mov",
  document:
    "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const DEFAULT_MAX_SIZES = {
  image: 5, // 5MB
  video: 100, // 100MB
  document: 10, // 10MB
};

const UPLOAD_ENDPOINTS = {
  image: "/upload/question-image",
  video: "/upload/video",
  document: "/upload/document",
};

export function Upload({
  onUploadComplete,
  onRemove,
  defaultValue,
  error,
  type,
  maxSize = DEFAULT_MAX_SIZES[type],
  className,
  ...props
}: UploadProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    setSelectedFile(file);
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    console.log("Uploading file:", file);
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append(type, file);

      console.log("Form data:", formData);

      const response = await axios.post(UPLOAD_ENDPOINTS[type], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // Check if we have total size information
          if (progressEvent.total) {
            // Calculate actual progress percentage based on loaded/total
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          } else {
            // Handle case where total size is unknown
            // Option 1: Show indeterminate progress (e.g., increment slowly)
            const currentProgress = uploadProgress || 0;
            // Increase by small amounts but cap at 90% (reserving 100% for completion)
            const estimatedProgress = Math.min(90, currentProgress + 2);
            setUploadProgress(estimatedProgress);
          }
        },
      });
      console.log("Upload response:", response.data);

      const url = response.data[`${type}Url`];
      onUploadComplete(url);
    } catch (error: any) {
      console.log("Upload error:", error);
      toast.error(error.response?.data?.message || `Failed to upload ${type}`);
      setSelectedFile(null);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    if (!ACCEPT_TYPES[type].split(",").some((t) => file.type === t.trim())) {
      toast.error("Invalid file type");
      return;
    }

    setSelectedFile(file);
    await uploadFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (onRemove) {
      onRemove();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6",
          selectedFile || defaultValue ? "border-gray-300" : "border-gray-400",
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
          accept={ACCEPT_TYPES[type]}
          {...props}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {selectedFile || defaultValue ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate max-w-[200px]">
                  {selectedFile?.name || defaultValue}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
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
                {type === "video"
                  ? "MP4, WebM, or OGG video files"
                  : type === "document"
                  ? "PDF or Word documents"
                  : "PNG, JPG, GIF, or WebP images"}{" "}
                (max {maxSize}MB)
              </p>
            </>
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
