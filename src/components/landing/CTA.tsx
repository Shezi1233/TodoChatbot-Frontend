"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-primary/20 -z-10" />

      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-primary/20 bg-black/80 p-8 md:p-16 text-center shadow-[0_0_50px_rgba(255,215,0,0.1)]">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Ready to get organized?
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of users who have simplified their task management with TaskFlow.
          </p>
          <Button variant="yellow" size="xl" className="rounded-full px-12" asChild>
            <Link href="/signup">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
