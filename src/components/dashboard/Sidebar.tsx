"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CheckCircle2,
  Settings,
  LogOut,
  CheckSquare,
  ListTodo
} from "lucide-react"

const sidebarItems = [
  { name: "Home", href: "/tasks", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks/all", icon: ListTodo },
  { name: "Completed", href: "/tasks/completed", icon: CheckCircle2 },
  { name: "Settings", href: "/settings", icon: Settings },
]

import { useAuth } from "@/components/AuthProvider"

export function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  return (
    <aside className="w-64 bg-black border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-primary p-1 rounded group-hover:scale-110 transition-transform">
            <CheckSquare className="h-6 w-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            Task<span className="text-primary">Flow</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary text-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                isActive ? "text-black" : "text-primary group-hover:scale-110 transition-transform"
              )} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-destructive hover:bg-destructive/10 w-full transition-all group"
        >
          <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
