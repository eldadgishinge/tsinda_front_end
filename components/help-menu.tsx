'use client'

import { ThumbsUp, HelpCircle, Phone, ArrowUpRight } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function HelpMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-gray-500 hover:text-gray-700">
          <HelpCircle className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end">
        <div className="text-lg font-semibold px-4 py-3 border-b">
          Help Center
        </div>
        <div className="divide-y">
          <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <ThumbsUp className="h-5 w-5" />
              <span>Leave feedback</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-500" />
          </button>
          
          <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5" />
              <span>Help Center</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-500" />
          </button>
          
          <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <svg 
                viewBox="0 0 24 24" 
                className="h-5 w-5 fill-current" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0a12 12 0 1 1 0 24 12 12 0 0 1 0-24zm.14 4.5a7.34 7.34 0 0 0-6.46 10.82l.15.26L4.5 19.5l4.08-1.3a7.38 7.38 0 0 0 10.92-6.4c0-4.03-3.26-7.3-7.36-7.3zm0 1.16c3.41 0 6.19 2.78 6.19 6.15a6.17 6.17 0 0 1-9.37 5.27l-.23-.15-2.38.76.77-2.28a6.08 6.08 0 0 1-1.17-3.6 6.17 6.17 0 0 1 6.19-6.15z"/>
              </svg>
              <span>Join our community</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-500" />
          </button>
          
          <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <span>Contact us</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

