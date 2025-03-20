'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ExitAssessmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExitAssessmentDialog({ open, onOpenChange }: ExitAssessmentDialogProps) {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Hold it right there!</DialogTitle>
          <DialogDescription className="text-center text-base">
            If you exit the assessment you will automatically record the marks you have arleady obtained now
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => router.push('/dashboard/assessments')}
          >
            EXIT ASSESSMENT
          </Button>
          <Button 
            className="flex-1 h-12 bg-[#1045A1] hover:bg-[#0D3A8B]"
            onClick={() => onOpenChange(false)}
          >
            KEEP TESTING
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

