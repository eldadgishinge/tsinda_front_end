'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AssessmentPickerPage() {
  const router = useRouter()

  const handleStartAssessment = (questionCount: number) => {
    // Navigate to the assessment with the selected question count
    router.push(`/dashboard/assessments/1/questions?count=${questionCount}`)
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Close Button */}
        <div className="mb-12">
          <Link 
            href="/dashboard/assessments"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-600" />
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Pick your Assessment</h1>
            <p className="text-gray-600">
              Discover your skill level and receive customized learning recommendations.
            </p>
          </div>

          {/* Assessment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 10 Questions Option */}
            <Card 
              className="cursor-pointer hover:border-blue-600 transition-colors"
              onClick={() => handleStartAssessment(10)}
            >
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">10 Questions</h2>
                <p className="text-gray-600">
                  A qualified instructor assesses the learner's ability to perform fundamental.
                </p>
                <div className="text-sm text-gray-500">· 10 minutes</div>
              </CardContent>
            </Card>

            {/* 25 Questions Option */}
            <Card 
              className="cursor-pointer hover:border-blue-600 transition-colors"
              onClick={() => handleStartAssessment(25)}
            >
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">25 Questions</h2>
                <p className="text-gray-600">
                  A qualified instructor assesses the learner's ability to perform fundamental.
                </p>
                <div className="text-sm text-gray-500">· 25 minutes</div>
              </CardContent>
            </Card>
          </div>

          {/* Get Started Button */}
          <Button 
            className="w-full max-w-md h-12 bg-gray-300 hover:bg-gray-400 text-gray-700"
            onClick={() => handleStartAssessment(10)}
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  )
}

