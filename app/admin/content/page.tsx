"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AddCourseDialog } from "@/components/add-course-dialog"
import Image from "next/image"

// Sample course data
const courses = [
  {
    id: 1,
    title: "Right-of-way rules",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    language: "english",
  },
  {
    id: 2,
    title: "Right-of-way rules",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    language: "english",
  },
  {
    id: 3,
    title: "Right-of-way rules",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    language: "kinyarwanda",
  },
  {
    id: 4,
    title: "Right-of-way rules",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    language: "english",
  },
  {
    id: 5,
    title: "Right-of-way rules",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    language: "kinyarwanda",
  },
  {
    id: 6,
    title: "Right-of-way rules",
    description: "Legal maximum and minimum speeds based on road type and conditions.",
    image: "/placeholder.svg",
    language: "english",
  },
]

export default function ContentManagementPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "english" | "kinyarwanda">("all")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === "all") return true
    return course.language === activeFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]" onClick={() => setShowAddDialog(true)}>
          Add New Course
        </Button>
      </div>

      {/* Language Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeFilter === "all" ? "bg-[#E6EDF7] text-[#1045A1]" : "hover:bg-gray-50"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("english")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeFilter === "english" ? "bg-[#E6EDF7] text-[#1045A1]" : "hover:bg-gray-50"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setActiveFilter("kinyarwanda")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeFilter === "kinyarwanda" ? "bg-[#E6EDF7] text-[#1045A1]" : "hover:bg-gray-50"
          }`}
        >
          Kinyarwanda
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="aspect-video bg-[#FBF7F0] rounded-lg overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-gray-600">
                  View
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AddCourseDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}

