'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[480px] shadow-none border-none">
        <CardContent className="space-y-6 p-8">
          <h1 className="text-2xl font-bold text-center">
            Create your free account
          </h1>

          {/* Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="phone">
                Phone number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="0781960827"
                className="w-full"
              />
            </div>

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

            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="confirm-password">
                Repeat Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-6">
              Continue
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            You have an account?{" "}
            <Link href="/login" className="text-[#1045A1] hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

