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
      className={`text-sm lg:text-base flex items-center space-x-2 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors ${
        isActive
          ? `text-[#1045A1] bg-[#E6EDF7]`
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="text-xs lg:text-sm">{children}</span>
    </Link>
  );
}
