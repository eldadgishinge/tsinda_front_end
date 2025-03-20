'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'

const assessments = [
  {
    id: 1,
    title: "Numbers",
    description: "Covers key topics like checking oil levels, tire pressure, recognizing.",
    image: "/placeholder.svg",
    level: "Advanced",
    questions: 25,
  },
  {
    id: 2,
    title: "Street signs",
    description: "Learners demonstrate specific maneuvers like parallel parking.",
    image: "/placeholder.svg",
    level: "Advanced",
    questions: 25,
  },
  {
    id: 3,
    title: "Road regulations",
    description: "A qualified instructor assesses the learner's ability to perform fundamental.",
    image: "/placeholder.svg",
    level: "Advanced",
    questions: 25,
  },
  {
    id: 4,
    title: "Lines",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    questions: 25,
  },
  {
    id: 5,
    title: "Vehicle Maintenance Basics",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    questions: 25,
  },
  {
    id: 6,
    title: "Practical Driving Lessons",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    questions: 25,
  },
]

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<'category' | 'general'>('category')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Assessments</h1>
        <p className="text-gray-600">
          Discover your skill level and receive customized learning recommendations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'category' ? 'default' : 'ghost'}
            className={activeTab === 'category' ? 'bg-[#E6EDF7] text-[#1045A1] hover:bg-blue-100' : ''}
            onClick={() => setActiveTab('category')}
          >
            By Category
          </Button>
          <Button
            variant={activeTab === 'general' ? 'default' : 'ghost'}
            className={activeTab === 'general' ? 'bg-[#E6EDF7] text-[#1045A1] hover:bg-blue-100' : ''}
            onClick={() => setActiveTab('general')}
          >
            General
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">Status</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <Link 
            key={assessment.id}
            href={`/dashboard/assessments/${assessment.id}`}
            className="block group"
          >
            <div className="border rounded-lg overflow-hidden hover:border-blue-600 transition-colors">
              <div className="aspect-[2/1] bg-[#FBF7F0] p-4">
                <img
                  src={assessment.image || "/placeholder.svg"}
                  alt={assessment.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                  {assessment.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {assessment.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{assessment.level}</span>
                  <span>{assessment.questions} Questions</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

