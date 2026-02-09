"use client"

import { useAuth } from "@/components/AuthProvider"
import { Bell, Search, User, Menu } from "lucide-react"

interface TopBarProps {
  onMenuClick?: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user } = useAuth()

  return (
    <header className="h-16 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 text-white/60 hover:text-primary transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Search - responsive width */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
        />
      </div>

      <div className="flex items-center space-x-3 sm:space-x-6 flex-shrink-0">
        <button className="relative text-white/60 hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full ring-2 ring-black"></span>
        </button>

        <div className="flex items-center space-x-3 sm:pl-6 sm:border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{user?.name || "Developer"}</p>
            <p className="text-xs text-white/40">{user?.email || "dev@taskflow.com"}</p>
          </div>
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center text-black font-bold">
            <User className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </div>
    </header>
  )
}
