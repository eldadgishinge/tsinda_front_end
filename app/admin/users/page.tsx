"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2, MoreVertical } from "lucide-react"
import Image from "next/image"
import { AddUserDialog } from "@/components/add-user-dialog"

// Sample user data
const users = [
  {
    id: 1,
    name: "Olivia Rhye",
    status: "Active",
    role: "Product Designer",
    email: "olivia@untitledui.com",
    phone: "+250 781 953 428",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Phoenix Baker",
    status: "Active",
    role: "Product Manager",
    email: "phoenix@untitledui.com",
    phone: "+250 781 953 428",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Lana Steiner",
    status: "Active",
    role: "Frontend Developer",
    email: "lana@untitledui.com",
    phone: "+250 781 953 428",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Demi Wilkinson",
    status: "Active",
    role: "Backend Developer",
    email: "demi@untitledui.com",
    phone: "+250 781 953 428",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Candice Wu",
    status: "Active",
    role: "Fullstack Developer",
    email: "candice@untitledui.com",
    phone: "+250 781 953 428",
    avatar: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Natali Craig",
    status: "Active",
    role: "UX Designer",
    email: "natali@untitledui.com",
    phone: "+250 781 953 428",
    avatar: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Drew Cano",
    status: "Active",
    role: "UX Copywriter",
    email: "drew@untitledui.com",
    phone: "+250 781 953 428",
    avatar: "/placeholder.svg",
  },
]

export default function UsersPage() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)

  const toggleUser = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const toggleAll = () => {
    setSelectedUsers((prev) => (prev.length === users.length ? [] : users.map((user) => user.id)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button className="bg-[#1045A1] hover:bg-[#0D3A8B]" onClick={() => setShowAddDialog(true)}>
          ADD USER
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Current Users</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">100 users</span>
          </div>
          <button className="text-gray-400 hover:text-gray-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedUsers.length === users.length} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email address</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox checked={selectedUsers.includes(user.id)} onCheckedChange={() => toggleUser(user.id)} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>{user.status}</span>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
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

        <div className="p-4 border-t flex items-center justify-between">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm
                    ${page === 1 ? "bg-gray-100" : "hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
      <AddUserDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}

