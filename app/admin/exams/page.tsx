"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Pencil, Search, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { AddQuestionDialog } from "@/components/add-question-dialog"

// Sample exam questions data
const questions = [
  {
    id: "Q1234",
    text: "What is the main purpose of ABS...?",
    answer: "To prevent wheels from locking....",
    category: "Braking System",
    image: "IMG001",
    difficulty: "Medium",
    status: "Active",
  },
  {
    id: "Q1234",
    text: "How does a tire pressure gauge work?",
    answer: "Measures air pressure in PSI...",
    category: "Tire Mechanics",
    image: "IMG001",
    difficulty: "Easy",
    status: "Active",
  },
  {
    id: "Q1234",
    text: "How does a tire pressure gauge work?",
    answer: "Measures air pressure in PSI...",
    category: "Tire Mechanics",
    image: "IMG001",
    difficulty: "Easy",
    status: "Active",
  },
  {
    id: "Q1234",
    text: "How does a tire pressure gauge work?",
    answer: "Measures air pressure in PSI...",
    category: "Tire Mechanics",
    image: "IMG001",
    difficulty: "Easy",
    status: "Active",
  },
  {
    id: "Q1234",
    text: "How does a tire pressure gauge work?",
    answer: "Measures air pressure in PSI...",
    category: "Tire Mechanics",
    image: "IMG001",
    difficulty: "Easy",
    status: "Active",
  },
  {
    id: "Q1234",
    text: "How does a tire pressure gauge work?",
    answer: "Measures air pressure in PSI...",
    category: "Tire Mechanics",
    image: "IMG001",
    difficulty: "Easy",
    status: "Active",
  },
  {
    id: "Q1234",
    text: "How does a tire pressure gauge work?",
    answer: "Measures air pressure in PSI...",
    category: "Tire Mechanics",
    image: "IMG001",
    difficulty: "Easy",
    status: "Active",
  },
]

const difficultyStats = [
  { level: "Easy", count: 45, color: "bg-green-100 text-green-700" },
  { level: "Medium", count: 30, color: "bg-yellow-100 text-yellow-700" },
  { level: "Hard", count: 25, color: "bg-red-100 text-red-700" },
]

const categories = [
  "All Categories",
  "Braking System",
  "Tire Mechanics",
  "Road Signs",
  "Traffic Rules",
  "Vehicle Maintenance",
]

export default function ExamsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Exam Management</h1>
          <p className="text-gray-500 text-sm">Manage and organize your exam questions</p>
        </div>
        <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]" onClick={() => setShowAddDialog(true)}>
          Add New Question
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficultyStats.map((stat) => (
          <Card key={stat.level} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total {stat.level}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${stat.color}`}>{stat.level}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input className="pl-9" placeholder="Search questions..." />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">QUESTION ID</TableHead>
                <TableHead className="min-w-[200px]">Question Text</TableHead>
                <TableHead className="min-w-[200px]">Correct Answer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{question.id}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{question.text}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{question.answer}</TableCell>
                  <TableCell>{question.category}</TableCell>
                  <TableCell>{question.image}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        question.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : question.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {question.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Pencil className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t mt-auto">
          <Button variant="outline" size="sm" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
              <button
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm
                  ${currentPage === page ? "bg-gray-100" : "hover:bg-gray-50"}`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <AddQuestionDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}

