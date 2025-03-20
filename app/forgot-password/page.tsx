'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/forgot-password/verify')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[480px] shadow-none border-none">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Forgot your password?</h1>
            <p className="text-gray-600">
              Enter your Tsindacyane email below and we'll send you a link to reset it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="email">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="gishingeeldad@gmail.com"
                className="w-full"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="phone">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 border rounded-md px-3 py-2 bg-gray-50">
                  <img
                    src="https://flagcdn.com/rw.svg"
                    alt="Rwanda"
                    className="w-4 h-3"
                  />
                  <span className="text-sm">+250</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="781 960 827"
                  className="w-full"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-6">
              Continue
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/" className="text-[#1045A1] hover:underline">
              Back to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

