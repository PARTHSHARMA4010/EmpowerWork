"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

interface MapDataPoint {
  state: string
  value: number
}

interface ImpactMapProps {
  title: string
  description?: string
  data: MapDataPoint[]
  height?: number
  className?: string
}

export function ImpactMap({ title, description, data, height = 400, className }: ImpactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // This is a simplified version - in a real app, you would use a proper mapping library
    // like Leaflet, MapBox, or Google Maps

    // For now, we'll just create a simple visualization
    const container = mapRef.current
    container.innerHTML = ""

    // Create a simple US map visualization
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.setAttribute("viewBox", "0 0 960 600")

    // Add a background rect
    const background = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    background.setAttribute("width", "960")
    background.setAttribute("height", "600")
    background.setAttribute("fill", "#f8fafc")
    svg.appendChild(background)

    // Add a title
    const titleElement = document.createElementNS("http://www.w3.org/2000/svg", "text")
    titleElement.setAttribute("x", "480")
    titleElement.setAttribute("y", "30")
    titleElement.setAttribute("text-anchor", "middle")
    titleElement.setAttribute("font-size", "16")
    titleElement.setAttribute("font-weight", "bold")
    titleElement.textContent = "Impact Across the United States"
    svg.appendChild(titleElement)

    // Add a legend
    const legend = document.createElementNS("http://www.w3.org/2000/svg", "g")
    legend.setAttribute("transform", "translate(50, 550)")

    const legendTitle = document.createElementNS("http://www.w3.org/2000/svg", "text")
    legendTitle.setAttribute("font-size", "12")
    legendTitle.setAttribute("font-weight", "bold")
    legendTitle.textContent = "Number of Placements"
    legend.appendChild(legendTitle)

    const colors = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"]

    colors.forEach((color, i) => {
      const rect = document.createElementNS("https://img.freepik.com/free-vector/clean-black-world-map-silhouette-style-template-design_1017-46154.jpg", "rect")
      rect.setAttribute("x", `${i * 30}`)
      rect.setAttribute("y", "15")
      rect.setAttribute("width", "30")
      rect.setAttribute("height", "15")
      rect.setAttribute("fill", color)
      legend.appendChild(rect)

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
      text.setAttribute("x", `${i * 30 + 15}`)
      text.setAttribute("y", "40")
      text.setAttribute("text-anchor", "middle")
      text.setAttribute("font-size", "10")
      text.textContent = `${i * 50}`
      legend.appendChild(text)
    })

    svg.appendChild(legend)

    // Simplified state outlines (in a real app, you would use GeoJSON)
    const states = [
      { name: "California", path: "M 100 200 L 150 200 L 150 300 L 100 300 Z", center: [125, 250] },
      { name: "New York", path: "M 700 150 L 750 150 L 750 200 L 700 200 Z", center: [725, 175] },
      { name: "Texas", path: "M 300 350 L 400 350 L 400 450 L 300 450 Z", center: [350, 400] },
      { name: "Florida", path: "M 650 400 L 700 400 L 700 450 L 650 450 Z", center: [675, 425] },
      { name: "Illinois", path: "M 500 200 L 550 200 L 550 250 L 500 250 Z", center: [525, 225] },
      { name: "Washington", path: "M 150 100 L 200 100 L 200 150 L 150 150 Z", center: [175, 125] },
      { name: "Massachusetts", path: "M 750 150 L 775 150 L 775 175 L 750 175 Z", center: [762, 162] },
      { name: "Georgia", path: "M 600 350 L 650 350 L 650 400 L 600 400 Z", center: [625, 375] },
      { name: "Colorado", path: "M 300 200 L 350 200 L 350 250 L 300 250 Z", center: [325, 225] },
      { name: "Michigan", path: "M 550 150 L 600 150 L 600 200 L 550 200 Z", center: [575, 175] },
    ]

    // Create a group for the states
    const statesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Draw each state
    states.forEach((state) => {
      const stateData = data.find((d) => d.state === state.name)
      const value = stateData ? stateData.value : 0

      // Determine color based on value
      const colorIndex = Math.min(Math.floor(value / 50), colors.length - 1)
      const color = colors[colorIndex]

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("d", state.path)
      path.setAttribute("fill", color)
      path.setAttribute("stroke", "#ccc")
      path.setAttribute("stroke-width", "1")

      // Add a title for tooltip
      const title = document.createElementNS("http://www.w3.org/2000/svg", "title")
      title.textContent = `${state.name}: ${value} placements`
      path.appendChild(title)

      statesGroup.appendChild(path)

      // Add state label
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
      text.setAttribute("x", `${state.center[0]}`)
      text.setAttribute("y", `${state.center[1]}`)
      text.setAttribute("text-anchor", "middle")
      text.setAttribute("font-size", "10")
      text.setAttribute("fill", "#333")
      text.textContent = state.name
      statesGroup.appendChild(text)

      // Add value label
      const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text")
      valueText.setAttribute("x", `${state.center[0]}`)
      valueText.setAttribute("y", `${state.center[1] + 15}`)
      valueText.setAttribute("text-anchor", "middle")
      valueText.setAttribute("font-size", "12")
      valueText.setAttribute("font-weight", "bold")
      valueText.textContent = value.toString()
      statesGroup.appendChild(valueText)
    })

    svg.appendChild(statesGroup)

    container.appendChild(svg)
  }, [data])

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div ref={mapRef} style={{ height: `${height}px` }} />
      </CardContent>
    </Card>
  )
}

