"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckSquare } from "lucide-react"

import { useAuth } from "@/components/AuthProvider"

export function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-primary p-1 rounded group-hover:scale-110 transition-transform">
            <CheckSquare className="h-6 w-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            Task<span className="text-primary">Flow</span>
          </span>
        </Link>
        <div className="flex items-center space-x-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/chatbot">AI Chatbot</Link>
          </Button>
          {user ? (
            <Button variant="yellow" size="sm" asChild>
              <Link href="/tasks">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-medium text-white/70 hover:text-primary transition-colors">
                Sign In
              </Link>
              <Button variant="yellow" size="sm" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
