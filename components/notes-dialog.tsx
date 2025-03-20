'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download } from 'lucide-react'

interface NotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotesDialog({ open, onOpenChange }: NotesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Notes</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={() => window.open('/preview-notes.pdf', '_blank')}
          >
            Preview Notes
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            className="w-full justify-between bg-[#1045A1] hover:bg-[#0D3A8B]"
            onClick={() => window.open('/download-notes.pdf', '_blank')}
          >
            Download Notes
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

