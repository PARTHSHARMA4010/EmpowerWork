"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, Users, Building2 } from "lucide-react"

const metrics = [
  {
    id: 1,
    label: "Jobs Posted",
    value: 5000,
    icon: Briefcase,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    label: "PwDs Trained",
    value: 12000,
    icon: GraduationCap,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    label: "Successful Placements",
    value: 3500,
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    id: 4,
    label: "Partner Employers",
    value: 750,
    icon: Building2,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
  },
]

export function ImpactMetrics() {
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0))

  useEffect(() => {
    const duration = 2000 // Animation duration in ms
    const frameRate = 30 // Frames per second
    const totalFrames = duration / (1000 / frameRate)

    let frame = 0
    const interval = setInterval(() => {
      if (frame >= totalFrames) {
        clearInterval(interval)
        setCounts(metrics.map((metric) => metric.value))
        return
      }

      setCounts(
        metrics.map((metric, i) => {
          const progress = frame / totalFrames
          // Easing function for smoother animation
          const easeOutQuad = 1 - (1 - progress) * (1 - progress)
          return Math.floor(metric.value * easeOutQuad)
        }),
      )

      frame++
    }, 1000 / frameRate)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={metric.id} className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                <h3 className="text-3xl font-bold">{counts[index].toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

