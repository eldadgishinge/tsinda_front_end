"use client"

import { Card } from "@/components/ui/card"
import { 
  Users, 
  FolderOpen, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Globe,
  Brain,
  Target,
  DollarSign,
  Calendar,
  Sparkles,
  BarChart3,
  Activity
} from "lucide-react"
import { useUsers } from "@/hooks/use-users"
import { useCategories } from "@/hooks/use-categories"
import { useCourses } from "@/hooks/use-courses"
import { useQuestions } from "@/hooks/use-questions"
import { useExams } from "@/hooks/use-exams"
import Link from "next/link"

export default function AdminDashboardPage() {
  const { data: users, isLoading: usersLoading } = useUsers()
  const { data: categories, isLoading: categoriesLoading } = useCategories()
  const { data: courses, isLoading: coursesLoading } = useCourses()
  const { data: questions, isLoading: questionsLoading } = useQuestions()
  const { data: exams, isLoading: examsLoading } = useExams()

  // Calculate statistics
  const totalUsers = users?.length || 0
  const activeUsers = users?.filter(user => user.isVerified).length || 0
  const adminUsers = users?.filter(user => user.role === "admin").length || 0

  const totalCategories = categories?.length || 0
  const englishCategories = categories?.filter(cat => cat.language === "ENG").length || 0
  const kinyarwandaCategories = categories?.filter(cat => cat.language === "KIN").length || 0

  const totalCourses = courses?.length || 0
  const publishedCourses = courses?.filter(course => course.isPublished).length || 0
  const draftCourses = courses?.filter(course => !course.isPublished).length || 0

  const totalQuestions = questions?.length || 0
  const activeQuestions = questions?.filter(q => q.status === "Active").length || 0
  const easyQuestions = questions?.filter(q => q.difficulty === "Easy").length || 0
  const mediumQuestions = questions?.filter(q => q.difficulty === "Medium").length || 0
  const hardQuestions = questions?.filter(q => q.difficulty === "Hard").length || 0

  const totalExams = exams?.length || 0
  const publishedExams = exams?.filter(exam => exam.status === "Published").length || 0
  const archivedExams = exams?.filter(exam => exam.status === "Archived").length || 0
  const draftExams = exams?.filter(exam => exam.status === "Draft").length || 0

  // Sample payment data (since we don't have a payments hook)
  const totalPayments = 147
  const totalAmount = 2150000
  const activePayments = 89
  const pendingPayments = 23

  return (
    <div className="space-y-8 overflow-x-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen p-6">
      {/* Enhanced Header with Gradient */}
      <div className="bg-gradient-to-r from-[#1045A1] via-[#0D3A8B] to-[#1E40AF] rounded-3xl shadow-2xl border-0 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/90 text-lg">Monitor users, content, assessments, and payments in real-time</p>
          </div>

        </div>
      </div>

      {/* User Management Statistics */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{totalUsers}</p>
                <p className="text-xs text-gray-500 mt-1">Registered users</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{activeUsers}</p>
                <p className="text-xs text-gray-500 mt-1">Verified accounts</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Admin Users</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">{adminUsers}</p>
                <p className="text-xs text-gray-500 mt-1">Administrators</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Categories Statistics */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Categories</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{totalCategories}</p>
                <p className="text-xs text-gray-500 mt-1">Content categories</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FolderOpen className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">English Categories</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{englishCategories}</p>
                <p className="text-xs text-gray-500 mt-1">English content</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Kinyarwanda Categories</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">{kinyarwandaCategories}</p>
                <p className="text-xs text-gray-500 mt-1">Kinyarwanda content</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Content Management Statistics */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Courses</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{totalCourses}</p>
                <p className="text-xs text-gray-500 mt-1">Available courses</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Published</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{publishedCourses}</p>
                <p className="text-xs text-gray-500 mt-1">Live courses</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Drafts</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">{draftCourses}</p>
                <p className="text-xs text-gray-500 mt-1">In development</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Questions Statistics */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Question Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Questions</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{totalQuestions}</p>
                <p className="text-xs text-gray-500 mt-1">Assessment questions</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{activeQuestions}</p>
                <p className="text-xs text-gray-500 mt-1">Live questions</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Easy</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{easyQuestions}</p>
                <p className="text-xs text-gray-500 mt-1">Beginner level</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Medium</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">{mediumQuestions}</p>
                <p className="text-xs text-gray-500 mt-1">Intermediate level</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Exams Statistics */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Exams</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{totalExams}</p>
                <p className="text-xs text-gray-500 mt-1">Available exams</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Published</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{publishedExams}</p>
                <p className="text-xs text-gray-500 mt-1">Live exams</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Archived</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">{archivedExams}</p>
                <p className="text-xs text-gray-500 mt-1">Archived exams</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Drafts</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">{draftExams}</p>
                <p className="text-xs text-gray-500 mt-1">In development</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Payments Statistics */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Payments</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{totalPayments}</p>
                <p className="text-xs text-gray-500 mt-1">Transactions</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">RWF collected</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{activePayments}</p>
                <p className="text-xs text-gray-500 mt-1">Successful payments</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">{pendingPayments}</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting confirmation</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/users">
            <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Manage Users</h3>
                  <p className="text-sm text-gray-600">Add, edit, or remove users</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/categories">
            <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Manage Categories</h3>
                  <p className="text-sm text-gray-600">Organize content categories</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/content">
            <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Manage Content</h3>
                  <p className="text-sm text-gray-600">Create and edit courses</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/questions">
            <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Manage Questions</h3>
                  <p className="text-sm text-gray-600">Create assessment questions</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/exams">
            <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Manage Exams</h3>
                  <p className="text-sm text-gray-600">Create and manage exams</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/payments">
            <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">View Payments</h3>
                  <p className="text-sm text-gray-600">Monitor transactions</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

