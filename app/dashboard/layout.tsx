"use client";

import { Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/user-nav";
import { LanguageProvider } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SidebarNavItem } from "@/components/sidebar-nav-item";
import { HelpMenu } from "@/components/help-menu";
import { useUser } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role !== "user") {
        router.replace("/admin");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "user") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-gray-500">Checking permissions...</span>
      </div>
    );
  }

  return (
    <LanguageProvider>
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
          <aside className={`fixed left-0 top-0 h-full bg-white border-r z-50 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:relative lg:z-auto w-60 flex-shrink-0 flex flex-col`}>
            {/* Logo Section */}
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
                alt="Tsindacyane Logo"
                width={150}
                height={30}
                className="w-[120px] lg:w-[150px] h-auto"
              />
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <SidebarNavItem
                href="/dashboard"
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Home
              </SidebarNavItem>

              <SidebarNavItem
                href="/dashboard/lessons"
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Lessons
              </SidebarNavItem>

              <SidebarNavItem
                href="/dashboard/assessments"
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              >
                Assessments
              </SidebarNavItem>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t flex-shrink-0">
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="text-gray-500">Current plan:</div>
                  <div className="font-medium">Basic</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="flex-1 bg-[#1045A1] hover:bg-[#0D3A8B] text-xs lg:text-sm">
                    Upgrade
                  </Button>
                  <HelpMenu />
                </div>
              </div>
            </div>
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

                {/* Search Bar */}
                <div className="flex-1 max-w-sm lg:max-w-xs mx-4 lg:mx-0">
                  <div className="relative">
                    <Input type="search" placeholder="Search" className="pl-10 text-sm" />
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center space-x-2 lg:space-x-4">
                  <LanguageSwitcher />

                  <button className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                  </button>

                  <UserNav />
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto bg-white px-4 lg:px-8 py-4 w-full max-w-full">
              <div className="w-full max-w-full overflow-x-hidden">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
