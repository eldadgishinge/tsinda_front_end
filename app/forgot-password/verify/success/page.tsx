import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from 'lucide-react'
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[480px] shadow-none border-none">
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-[#1045A1] p-3">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-center">All set!</h1>
            <p className="text-gray-600 text-center">
              You'll be signed in to your account momentarily. If nothing happens, click continue.
            </p>
          </div>

          <Link href="/" className="block">
            <Button className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-6">
              Continue
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

