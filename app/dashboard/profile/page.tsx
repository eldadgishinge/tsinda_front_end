"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-600">Manage and update your Tsindacyane account info</p>
      </div>

      {/* Learning Progress Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Learning progress</h2>
          <p className="text-gray-600">After the bar is full you will be ready for your exams</p>
        </div>

        <div className="relative my-6">
          {/* Progress Bar */}
          <div className="h-4 bg-[#1045A1]/20 rounded-full">
            <div className="h-full w-[33%] bg-[#1045A1] rounded-full" />
          </div>

          {/* Progress Steps */}
          <div className="mt-4 flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <span>Ibyapa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-3 h-5 bg-[#1045A1] rounded-full" />
              </div>
              <span>Imihanda</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-5 h-3 bg-[#1045A1] rounded-full" />
              </div>
              <span>Ibimenyetso</span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Remaining Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Questions Remaining</h2>
          <p className="text-gray-600">These are the Questions you have done so far.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Ibyapa</div>
            <div className="text-2xl font-bold">120</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Imihanda</div>
            <div className="text-2xl font-bold">80</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Ibimenyetso</div>
            <div className="text-2xl font-bold">60</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Ibyapa</div>
            <div className="text-2xl font-bold">100</div>
          </div>
        </div>
      </div>

      {/* Past Tests Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Past tests</h2>
          <p className="text-gray-600">Here are the past tests you did.</p>
        </div>

        <div className="space-y-4">
          {[
            { name: "Ibyapa 01", date: "01 . 01 . 2024" },
            { name: "Imihanda 03", date: "01 . 01 . 2024" },
            { name: "Ibimenyetso 02", date: "01 . 01 . 2024" },
          ].map((test, index) => (
            <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="space-y-1">
                <div className="font-medium">{test.name}</div>
                <div className="text-sm text-gray-600">{test.date}</div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Try Again</Button>
                <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">View</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

