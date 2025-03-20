"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3 } from "lucide-react"

// Sample data for charts
const sampleData = {
  withData: [
    { month: "Jan", users: 14, engagement: 14 },
    { month: "Feb", users: 41, engagement: 41 },
    { month: "Mar", users: 21, engagement: 21 },
    { month: "Apr", users: 30, engagement: 30 },
    { month: "May", users: 15, engagement: 15 },
    { month: "Jun", users: 23, engagement: 23 },
  ],
  empty: [],
}

interface ChartProps {
  title: string
  data: Array<{ month: string; users: number; engagement: number }>
  valueKey: "users" | "engagement"
}

function Chart({ title, data, valueKey }: ChartProps) {
  if (data.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">{title}</h2>
        <div className="h-[300px] flex items-end justify-between gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 group flex-1">
              <div className="w-full h-full relative flex flex-col items-center justify-end">
                <div className="absolute -top-8 text-sm text-[#05060E]">{item[valueKey]}</div>
                <div
                  className="w-full bg-[#1045A1] transition-all duration-500 ease-in-out"
                  style={{
                    height: `${(item[valueKey] / maxValue) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-[#05060E]">{item.month}</span>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  const maxValue = Math.max(...data.map((d) => d[valueKey]))
  const getBarHeight = (value: number) => `${(value / maxValue) * 80}%`

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">{title}</h2>
      <div className="h-[300px] flex items-end justify-between gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full h-full relative flex flex-col items-center justify-end">
              <div className="absolute top-0 left-0 right-0 text-center -translate-y-6 text-sm text-[#05060E]">
                {item[valueKey]}
              </div>
              <div className="relative w-full">
                <div
                  className="w-full bg-[#1045A1] rounded-t-full transition-all duration-500 ease-in-out"
                  style={{
                    height: getBarHeight(item[valueKey]),
                  }}
                />
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1045A1] rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    transform: `scale(${(item[valueKey] / maxValue) * 1.5 + 0.5})`,
                  }}
                />
              </div>
            </div>
            <span className="text-sm text-[#05060E]">{item.month}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState("all")
  const [hasData, setHasData] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setHasData(!hasData)} className="text-sm">
            Toggle Data
          </Button>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart title="User Growth" data={hasData ? sampleData.withData : sampleData.empty} valueKey="users" />
        <Chart
          title="Course Engagement"
          data={hasData ? sampleData.withData : sampleData.empty}
          valueKey="engagement"
        />
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-semibold">2,420</p>
              <p className="ml-2 text-sm text-green-600">+20%</p>
            </div>
            <p className="text-sm text-gray-500">Compared to last month</p>
          </div>
        </Card>

        {/* Active Courses Card */}
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Active Courses</h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-semibold">18</p>
              <p className="ml-2 text-sm text-green-600">+5</p>
            </div>
            <p className="text-sm text-gray-500">New courses this month</p>
          </div>
        </Card>

        {/* Completion Rate Card */}
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-semibold">85%</p>
              <p className="ml-2 text-sm text-green-600">+12%</p>
            </div>
            <p className="text-sm text-gray-500">Average course completion</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

