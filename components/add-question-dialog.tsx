"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface AddQuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddQuestionDialog({ open, onOpenChange }: AddQuestionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-h-[900px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-2xl font-bold">Add New Question</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-6 py-4">
          <form className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Question Details */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="question">Question text</Label>
                  <Textarea id="question" placeholder="Enter your question" className="min-h-[120px]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Correct Answers</Label>
                  <Textarea id="answer" placeholder="Enter the correct answer" className="min-h-[120px]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="inactive">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Right Column - Image Upload and Category */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Image upload</Label>
                  <div className="border-2 border-dashed rounded-lg p-8">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold">Add question image</h3>
                        <p className="text-sm text-gray-500">Click here to upload an image</p>
                      </div>
                      <Button variant="secondary" size="sm" className="bg-[#7C3AED] text-white hover:bg-[#6D28D9]">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="braking">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="braking">Braking System</SelectItem>
                      <SelectItem value="tire">Tire Mechanics</SelectItem>
                      <SelectItem value="signs">Road Signs</SelectItem>
                      <SelectItem value="rules">Traffic Rules</SelectItem>
                      <SelectItem value="maintenance">Vehicle Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionId">Question ID</Label>
                  <Input id="questionId" placeholder="Enter question ID" defaultValue="Q1235" disabled />
                  <p className="text-xs text-gray-500">Auto-generated question ID</p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-end gap-4 px-6 py-4 border-t">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#1045A1] hover:bg-[#0D3A8B]">
            Register
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

