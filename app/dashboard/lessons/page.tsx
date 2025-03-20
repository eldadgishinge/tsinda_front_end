'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Lock } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const lessons = [
  {
    id: 1,
    title: "Practical Driving Lessons",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    duration: "1 hour",
    locked: false,
  },
  {
    id: 2,
    title: "Right-of-way rules",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    duration: "1 hour",
    locked: true,
  },
  {
    id: 3,
    title: "Practical Driving Lessons",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    duration: "1 hour",
    locked: true,
  },
  {
    id: 4,
    title: "Vehicle Maintenance Basics",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    duration: "1 hour",
    locked: true,
  },
  {
    id: 5,
    title: "Right-of-way rules",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    duration: "1 hour",
    locked: true,
  },
  {
    id: 6,
    title: "Vehicle Maintenance Basics",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    level: "Advanced",
    duration: "1 hour",
    locked: true,
  },
]

export default function LessonsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Lessons</h1>
        <p className="text-gray-600">
          Improve your driving skills through interactive, hands on professional courses.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#E6EDF7] text-[#1045A1] rounded-lg font-medium">
            English
          </button>
          <button className="px-4 py-2 hover:bg-gray-50 rounded-lg">
            Kinyarwanda
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">Status</span>
          <select className="border rounded-lg px-4 py-2 bg-white">
            <option>All</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Not Started</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden">
            <Link href={`/dashboard/lessons/${lesson.id}`}>
              <div className="relative aspect-[2/1] bg-gray-100">
                <Image
                  src={lesson.image || "/placeholder.svg"}
                  alt={lesson.title}
                  fill
                  className="object-cover"
                />
                {lesson.locked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {lesson.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{lesson.level}</span>
                  <span>{lesson.duration}</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

