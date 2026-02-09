"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckSquare, Menu, X } from "lucide-react"

import { useAuth } from "@/components/AuthProvider"

export function Navbar() {
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-primary p-1 rounded group-hover:scale-110 transition-transform">
            <CheckSquare className="h-6 w-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            Task<span className="text-primary">Flow</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden sm:flex items-center space-x-4 md:space-x-6">
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

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
          <div className="container px-4 py-4 flex flex-col space-y-3">
            <Button variant="outline" size="sm" asChild className="w-full justify-center">
              <Link href="/chatbot" onClick={() => setMobileMenuOpen(false)}>AI Chatbot</Link>
            </Button>
            {user ? (
              <Button variant="yellow" size="sm" asChild className="w-full justify-center">
                <Link href="/tasks" onClick={() => setMobileMenuOpen(false)}>Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-white/70 hover:text-primary transition-colors text-center py-2"
                >
                  Sign In
                </Link>
                <Button variant="yellow" size="sm" asChild className="w-full justify-center">
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
