import { Card } from "@/components/ui/card"
import { MoreVertical, Zap } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#1045A1]" />
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">2,000</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <span>100%</span>
              <span className="ml-1 text-gray-500">vs last month</span>
            </p>
          </div>
        </Card>

        {/* Active Courses */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#1045A1]" />
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Active Courses</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">2,000</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <span>100%</span>
              <span className="ml-1 text-gray-500">vs last month</span>
            </p>
          </div>
        </Card>

        {/* Total Users (Another Metric) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#1045A1]" />
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">2,000</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <span>100%</span>
              <span className="ml-1 text-gray-500">vs last month</span>
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Subscription via</h3>
              <p className="text-sm text-gray-500">Upload new course content</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

