"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, CreditCard, Plus, DollarSign, TrendingUp, Users, Calendar, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Sample payment data
const payments = [
  {
    id: "TRX001",
    amount: "15,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/31/2024",
    user: "John Doe",
    email: "john@example.com"
  },
  {
    id: "TRX002",
    amount: "25,000 RWF",
    status: "Pending",
    method: "Bank Transfer",
    date: "12/30/2024",
    user: "Jane Smith",
    email: "jane@example.com"
  },
  {
    id: "TRX003",
    amount: "10,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/29/2024",
    user: "Mike Johnson",
    email: "mike@example.com"
  },
  {
    id: "TRX004",
    amount: "30,000 RWF",
    status: "Failed",
    method: "Credit Card",
    date: "12/28/2024",
    user: "Sarah Wilson",
    email: "sarah@example.com"
  },
  {
    id: "TRX005",
    amount: "20,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/27/2024",
    user: "David Brown",
    email: "david@example.com"
  },
  {
    id: "TRX006",
    amount: "35,000 RWF",
    status: "Pending",
    method: "Bank Transfer",
    date: "12/26/2024",
    user: "Lisa Davis",
    email: "lisa@example.com"
  },
  {
    id: "TRX007",
    amount: "12,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/25/2024",
    user: "Tom Miller",
    email: "tom@example.com"
  },
]

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [timeFilter, setTimeFilter] = useState("all")

  // Calculate statistics
  const totalPayments = payments.length
  const activePayments = payments.filter(p => p.status === "Active").length
  const pendingPayments = payments.filter(p => p.status === "Pending").length
  const totalAmount = payments.reduce((sum, p) => {
    const amount = parseInt(p.amount.replace(/[^\d]/g, ''))
    return sum + amount
  }, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Mobile Money":
        return "📱"
      case "Bank Transfer":
        return "🏦"
      case "Credit Card":
        return "💳"
      default:
        return "💰"
    }
  }

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Enhanced Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Payment Management</h1>
                <p className="text-gray-600">Monitor and manage payment transactions</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px] rounded-xl border-gray-300">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Select time range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{totalPayments}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{totalAmount.toLocaleString()} RWF</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{activePayments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Data Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Payment Transactions</h2>
              <span className="bg-[#1045A1] text-white px-3 py-1 rounded-full text-sm font-medium">
                {totalPayments} transactions
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Transaction ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Method</TableHead>
                <TableHead className="font-semibold text-gray-700">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={index} className="hover:bg-blue-50 transition-colors">
                  <TableCell className="font-medium text-gray-900">{payment.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {payment.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{payment.user}</p>
                        <p className="text-xs text-gray-500">{payment.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">{payment.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusIcon(payment.status)}`} />
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getMethodIcon(payment.method)}</span>
                      <span className="text-sm font-medium text-gray-700">{payment.method}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Enhanced Pagination */}
        <div className="flex items-center justify-between border-t px-6 py-4 bg-gray-50">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 rounded-xl border-gray-300 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
              <button
                key={i}
                className={`h-8 w-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page 
                    ? "bg-[#1045A1] text-white" 
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="flex items-center gap-2 rounded-xl border-gray-300 hover:bg-gray-50"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

