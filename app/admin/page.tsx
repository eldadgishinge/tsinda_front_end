import { Card } from "@/components/ui/card"
import { MoreVertical, Zap } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 overflow-x-hidden">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#1045A1]" />
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
          <h3 className="text-xs lg:text-sm font-medium text-gray-500">Total Users</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">2,000</p>
            <p className="ml-2 flex items-baseline text-xs lg:text-sm font-semibold text-green-600">
              <span>100%</span>
              <span className="ml-1 text-gray-500">vs last month</span>
            </p>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#1045A1]" />
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
          <h3 className="text-xs lg:text-sm font-medium text-gray-500">Active Courses</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">2,000</p>
            <p className="ml-2 flex items-baseline text-xs lg:text-sm font-semibold text-green-600">
              <span>100%</span>
              <span className="ml-1 text-gray-500">vs last month</span>
            </p>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#1045A1]" />
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
          <h3 className="text-xs lg:text-sm font-medium text-gray-500">Total Users</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">2,000</p>
            <p className="ml-2 flex items-baseline text-xs lg:text-sm font-semibold text-green-600">
              <span>100%</span>
              <span className="ml-1 text-gray-500">vs last month</span>
            </p>
          </div>
        </Card>
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold">Quick Actions</h2>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <div>
              <h3 className="text-xs lg:text-sm font-medium">Subscription via</h3>
              <p className="text-xs lg:text-sm text-gray-500">Upload new course content</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

