"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChartIcon } from "lucide-react"

interface BarChartProps {
  title: string
  description?: string
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string[]
      borderColor?: string[]
      borderWidth?: number
    }[]
  }
  height?: number
  horizontal?: boolean
  className?: string
}

export function BarChart({ title, description, data, height = 300, horizontal = false, className }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<any>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Dynamically import Chart.js to avoid SSR issues
    const initChart = async () => {
      const { Chart, registerables } = await import("chart.js")
      Chart.register(...registerables)

      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current!.getContext("2d")
      if (!ctx) return

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: horizontal ? 'y' : 'x',
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                boxWidth: 6,
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                
              },
            },
          },
        },
      })
    }

    initChart()

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, horizontal])

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <BarChartIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}

