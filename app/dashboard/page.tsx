import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Continue Learning Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-green-500 font-medium">• CONTINUE LEARNING</div>
            <h1 className="text-2xl font-bold">You don't have any active Lessons</h1>
            <p className="text-gray-600">Select a Lessons and start improving your skills</p>
            
            <div className="flex items-center justify-between">
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
                Explore Courses
              </Button>

              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
                <span className="text-gray-600">1583 learning this week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Card */}
      <Card className="w-full">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Learning progress</h2>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray="10, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                10%
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Here, you'll see your learning progress to determine when you're ready for the exam.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Lessons</span>
              <span className="text-[#1045A1]">4/20</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Questions done</span>
              <span className="text-[#1045A1]">6/200</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Lessons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recommended Lessons for you.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4">
                <img
                  src="/placeholder.svg"
                  alt="Right-of-way rules"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold mb-2">Right-of-way rules</h3>
              <p className="text-gray-600 text-sm mb-4">
                Legal maximum and minimum speeds based on road type and conditions.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Advanced</span>
                <span>1 hour</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 relative">
              <div className="absolute top-4 right-4 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                NEW
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4">
                <img
                  src="/placeholder.svg"
                  alt="Practical Driving Lessons"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold mb-2">Practical Driving Lessons</h3>
              <p className="text-gray-600 text-sm mb-4">
                Legal maximum and minimum speeds based on road type and conditions.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Advanced</span>
                <span>1 hour</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quiz Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-gray-600">Not sure where to start?</h3>
              <h2 className="text-2xl font-bold">Take the tsindacyane Exam</h2>
              <p className="text-gray-600">Complete our short quiz and start your learning progress.</p>
            </div>
            <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]">
              Take our quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

