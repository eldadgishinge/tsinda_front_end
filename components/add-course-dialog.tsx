"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface AddCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCourseDialog({ open, onOpenChange }: AddCourseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Course</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" placeholder="Enter course title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea id="description" placeholder="Enter course description" className="min-h-[120px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="kinyarwanda">Kinyarwanda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Course upload</Label>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-sm">Add course Video</h3>
                    <p className="text-xs text-gray-500">Click here to add your course</p>
                  </div>
                  <Button variant="secondary" size="sm" className="bg-[#7C3AED] text-white hover:bg-[#6D28D9]">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes Upload</Label>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-sm">Add Notes File</h3>
                    <p className="text-xs text-gray-500">Click here to add your Notes</p>
                  </div>
                  <Button variant="secondary" size="sm" className="bg-[#7C3AED] text-white hover:bg-[#6D28D9]">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1045A1] hover:bg-[#0D3A8B]">
              Register
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

