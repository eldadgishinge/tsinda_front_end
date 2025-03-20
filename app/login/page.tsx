"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[480px] shadow-none border-none">
        <CardContent className="space-y-6 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
              alt="Tsindacyane Logo"
              width={300}
              height={60}
              className="w-[300px] h-auto"
              priority
            />
          </div>

          {/* Welcome Text */}
          <h1 className="text-2xl font-bold text-center">Welcome back to Tsindacyane</h1>

          {/* Google Sign In */}
          <button className="w-full flex items-center justify-center gap-2 border rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <Image src="/google.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="phone">
                Phone number
              </label>
              <Input id="phone" type="tel" placeholder="0781960827" className="w-full" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} className="w-full pr-10" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#1045A1] hover:underline block text-right">
                Forgot my password
              </Link>
            </div>

            <Button type="submit" className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-6">
              Continue
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#1045A1] hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            <Link href="/admin" className="text-[#1045A1] hover:underline">
              Go to Admin
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

