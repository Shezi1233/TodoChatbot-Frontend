"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, CheckCircle, ShieldAlert } from "lucide-react"

const features = [
  {
    title: "Quick Task Creation",
    description: "Add tasks in seconds with our intuitive interface. Just type and save.",
    icon: PlusCircle,
  },
  {
    title: "Track Progress",
    description: "Mark tasks complete and see your productivity at a glance.",
    icon: CheckCircle,
  },
  {
    title: "Secure & Private",
    description: "Your data is encrypted and secure. Access from any device.",
    icon: ShieldAlert,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Everything you need to stay organized
          </h2>
          <p className="max-w-[700px] text-white/50 md:text-lg">
            Simple features that help you focus on what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black border-white/5 hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="mb-4 bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-primary transition-colors">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-black" />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
