'use client'

import { useState } from 'react'
import { Eye, EyeOff, Check, ChevronsUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { countries } from "@/lib/countries"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'subscription'>('account')
  const [showOldPin, setShowOldPin] = useState(false)
  const [showNewPin, setShowNewPin] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('781 960 827')
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Rwanda as default

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">
          Manage and update your Tsindacyane account info
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('account')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'account'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab('subscription')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'subscription'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Subscription
        </button>
      </div>

      {activeTab === 'account' && (
        <div className="space-y-8">
          {/* General Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">General</h2>
              <p className="text-gray-600">Update your account settings.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="min-w-[140px] justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedCountry.flag || "/placeholder.svg"}
                          alt={`${selectedCountry.name} flag`}
                          className="w-4 h-3"
                        />
                        <span>+{selectedCountry.phone}</span>
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.code}
                            value={country.name}
                            onSelect={() => {
                              setSelectedCountry(country)
                              setOpen(false)
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={country.flag || "/placeholder.svg"}
                                alt={`${country.name} flag`}
                                className="w-4 h-3"
                              />
                              <span>{country.name}</span>
                            </div>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedCountry.code === country.code
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Password</h2>
                <p className="text-gray-600">
                  Update your password to ensure your account remains private and secure.
                </p>
              </div>
              <Button className="w-24">Save</Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="old-pin">Old PIN</Label>
                <div className="relative">
                  <Input
                    id="old-pin"
                    type={showOldPin ? "text" : "password"}
                    maxLength={4}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPin(!showOldPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showOldPin ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-pin">New PIN</Label>
                <div className="relative">
                  <Input
                    id="new-pin"
                    type={showNewPin ? "text" : "password"}
                    maxLength={4}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showNewPin ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <span className="text-xs">●</span> Only 4 numbers
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'subscription' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold">Subscription</h2>
            <p className="text-gray-600">Your Subscription Details</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-medium">Subscription Type</h3>
              <p className="text-gray-600">16 Days</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium">Member since</h3>
              <p className="text-gray-600">May 17, 2024</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium">Subscription via</h3>
              <p className="text-gray-600">Mobile Money</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

