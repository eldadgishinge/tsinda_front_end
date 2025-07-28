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
import { useLogout, useUser } from "@/hooks/use-auth"

export function UserNav() {
  const logout = useLogout();
  const { data: user } = useUser();

  const handleLogout = () => {
    logout.mutate();
  };

  // Generate initials from user's name
  const getInitials = () => {
    if (!user?.name) {
      return user?.email?.slice(0, 2).toUpperCase() || "U";
    }
    const nameParts = user.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
    }
    return user.name.slice(0, 2).toUpperCase();
  };

  // Use primary color for avatar background
  const getAvatarColor = () => {
    return "bg-[#1045A1]";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden hover:opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1045A1] focus:ring-offset-2">
          <div className={`w-full h-full ${getAvatarColor()} flex items-center justify-center text-white font-semibold text-sm lg:text-base`}>
            {getInitials()}
          </div>
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

