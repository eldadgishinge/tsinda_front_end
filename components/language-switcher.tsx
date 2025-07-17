"use client"

import { useLanguage } from "@/contexts/language-context"
import { Switch } from "@/components/ui/switch"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "rw" : "en")
  }

  return (
    <div className="flex items-center space-x-1 lg:space-x-2">
      <span className={`text-xs lg:text-sm ${language === "en" ? "text-[#1045A1] font-medium" : "text-gray-500"}`}>EN</span>
      <Switch
        checked={language === "rw"}
        onCheckedChange={toggleLanguage}
        className="data-[state=checked]:bg-[#1045A1] scale-75 lg:scale-100"
      />
      <span className={`text-xs lg:text-sm ${language === "rw" ? "text-[#1045A1] font-medium" : "text-gray-500"}`}>
        RW
      </span>
    </div>
  )
}

