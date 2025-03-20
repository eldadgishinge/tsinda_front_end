"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample payment data
const payments = [
  {
    id: "TRX001",
    amount: "15,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/31/2024",
  },
  {
    id: "TRX003",
    amount: "15,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/31/2024",
  },
  {
    id: "TRX003",
    amount: "15,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/31/2024",
  },
  {
    id: "TRX001",
    amount: "15,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/31/2024",
  },
  {
    id: "TRX001",
    amount: "15,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/31/2024",
  },
  {
    id: "TRX001",
    amount: "15,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/31/2024",
  },
  {
    id: "TRX001",
    amount: "15,000 RWF",
    status: "Active",
    method: "Mobile Money",
    date: "12/31/2024",
  },
]

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [timeFilter, setTimeFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payment Management</h1>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TRANSACTION ID</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead className="cursor-pointer hover:text-[#1045A1]">
                <div className="flex items-center gap-2">
                  Status
                  <ChevronDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>METHOD</TableHead>
              <TableHead>DATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    {payment.status}
                  </div>
                </TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t px-4 py-4">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
              <button
                key={i}
                className={`h-8 w-8 rounded-md text-sm ${currentPage === page ? "bg-gray-100" : "hover:bg-gray-50"}`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 text-sm font-medium text-gray-600">
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

