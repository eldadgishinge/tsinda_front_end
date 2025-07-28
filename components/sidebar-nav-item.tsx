"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function SidebarNavItem({ href, icon, children }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive =
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
        isActive
          ? `text-[#1045A1] bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm`
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm"
      }`}
    >
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-[#1045A1] text-white shadow-md"
          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
      }`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );
}
