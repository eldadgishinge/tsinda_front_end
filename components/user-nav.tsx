"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from 'lucide-react'
import Link from "next/link"
import { useLogout } from "@/hooks/use-auth"

export function UserNav() {
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 overflow-hidden hover:bg-gray-300 transition-colors">
          <img
            src="/placeholder.svg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] lg:w-[200px]">
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="flex items-center text-sm lg:text-base">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="flex items-center text-sm lg:text-base">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center text-[#1045A1] focus:text-[#1045A1] cursor-pointer text-sm lg:text-base"
          onClick={handleLogout}
          disabled={logout.isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{logout.isPending ? "Signing out..." : "Sign Out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

