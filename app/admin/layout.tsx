"use client";

import { Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/user-nav";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type React from "react";
import { useUser } from "@/hooks/use-auth";
import { useEffect, useState } from "react";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  {
    href: "/admin",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Dashboard",
  },
  {
    href: "/admin/users",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4.354a4 4 0 110 5.292V4.354zM15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197L15 21zM13 7a4 4 0 11-8 0 4 4 0 018 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "User Management",
  },
  {
    href: "/admin/categories",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Categories",
  },
  {
    href: "/admin/content",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Content Management",
  },
  {
    href: "/admin/questions",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Questions",
  },
  {
    href: "/admin/exams",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Exams",
  },
  {
    href: "/admin/payments",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 9V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V13C3 14.1046 3.89543 15 5 15H7M9 19H19C20.1046 19 21 18.1046 21 17V11C21 9.89543 20.1046 9 19 9H9C7.89543 9 7 9.89543 7 11V17C7 18.1046 7.89543 19 9 19ZM16 14C16 15.1046 15.1046 16 14 16C12.8954 16 12 15.1046 12 14C12 12.8954 12.8954 12 14 12C15.1046 12 16 12.8954 16 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Payment",
  },
  {
    href: "/admin/analytics",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Analytics",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role !== "admin") {
        router.replace("/dashboard");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-gray-500">Checking permissions...</span>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-md border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:z-auto w-64 flex-shrink-0 flex flex-col`}>
          {/* Logo Section */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-white to-gray-50">
            <Image
              src="/logo.svg"
              alt="Tsinda Logo"
              width={150}
              height={30}
              className="w-[140px] lg:w-[160px] h-auto"
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              <div className="px-3 mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Navigation</h3>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                    isActive(item.href)
                      ? "text-[#1045A1] bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm"
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-[#1045A1] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                  }`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-white border-b px-4 lg:px-8 py-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>



              <div className="flex items-center space-x-2 lg:space-x-4 ml-auto">
                <button className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                </button>

                <UserNav />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 w-full max-w-full">
            <div className="w-full max-w-full overflow-x-hidden">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
