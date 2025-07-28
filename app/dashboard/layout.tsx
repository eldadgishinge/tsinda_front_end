"use client";

import { Bell, Menu, X, Home, BookOpen, Target, Settings, User, Crown, HelpCircle, Search } from "lucide-react";
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <span className="text-lg text-gray-500">Checking permissions...</span>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex h-screen">
          {/* Enhanced Sidebar */}
          <aside className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-xl z-50 transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:relative lg:z-auto w-64 flex-shrink-0 flex flex-col`}>
            
            {/* Enhanced Logo Section */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <Image
                  src="/logo.svg"
                  alt="Tsindacyane Logo"
                  width={120}
                  height={35}
                  className="h-8 w-auto"
                />
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Enhanced Navigation Section */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Main Navigation
                </div>
                
                <SidebarNavItem
                  href="/dashboard"
                  icon={<Home className="w-5 h-5" />}
                >
                  Dashboard
                </SidebarNavItem>

                <SidebarNavItem
                  href="/dashboard/lessons"
                  icon={<BookOpen className="w-5 h-5" />}
                >
                  Lessons
                </SidebarNavItem>

                <SidebarNavItem
                  href="/dashboard/assessments"
                  icon={<Target className="w-5 h-5" />}
                >
                  Assessments
                </SidebarNavItem>
              </div>

              <div className="space-y-1 pt-4">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Account
                </div>
                
                <SidebarNavItem
                  href="/dashboard/profile"
                  icon={<User className="w-5 h-5" />}
                >
                  Profile
                </SidebarNavItem>

                <SidebarNavItem
                  href="/dashboard/settings"
                  icon={<Settings className="w-5 h-5" />}
                >
                  Settings
                </SidebarNavItem>
              </div>
            </nav>

            {/* Enhanced Bottom Section */}
            <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
              <div className="space-y-4">
                {/* Plan Status */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Crown className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-semibold">Current Plan</div>
                      <div className="text-sm font-bold text-gray-900">Basic</div>
                    </div>
                  </div>
                  <Button className="w-full bg-[#1045A1] hover:bg-[#0D3A8B] text-xs font-semibold py-2">
                    Upgrade Plan
                  </Button>
                </div>

                {/* Help Section */}
                <div className="flex items-center gap-2">
                  <HelpMenu />
                  <div className="flex-1 text-xs text-gray-500">
                    Need help? We're here for you
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Enhanced Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Enhanced Header */}
            <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-30 shadow-lg">
              <div className="flex items-center justify-end">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md mr-auto"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex items-center space-x-4 lg:space-x-6">
                  {/* Enhanced Language Switcher */}
                  <div className="hidden sm:block">
                    <LanguageSwitcher />
                  </div>

                  {/* Enhanced Notification Button */}
                  <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md group">
                    <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#1045A1] transition-colors duration-200" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse shadow-sm" />
                  </button>

                  {/* User Profile Section */}
                  <div className="flex items-center gap-3">
                    <div className="hidden lg:block text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user?.email}
                      </div>
                    </div>
                    <UserNav />
                  </div>
                </div>
              </div>
            </header>

            {/* Enhanced Page Content */}
            <main className="flex-1 overflow-y-auto bg-transparent px-6 py-6 w-full max-w-full">
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
