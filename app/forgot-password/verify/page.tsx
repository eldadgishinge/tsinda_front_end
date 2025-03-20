'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function VerifyCodePage() {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/forgot-password/verify/success')
  }

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      
      // Auto-focus next input
      if (value.length === 1 && index < 4) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[480px] shadow-none border-none">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Enter code</h1>
            <p className="text-gray-600">
              We've sent an SMS with an activation code to your phone +250 781 960 827
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl"
                  />
                ))}
              </div>

              <button 
                type="button"
                className="w-full text-center text-sm text-gray-500 bg-gray-50 py-2 rounded-lg"
                onClick={() => setTimeLeft(60)}
              >
                I haven't received a code ({formatTime(timeLeft)})
              </button>

              <Button type="submit" className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-white py-6">
                Continue
              </Button>
            </div>
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

