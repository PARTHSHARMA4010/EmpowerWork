"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"

export function AccessibilityStats() {
  // Data for disability prevalence chart
  const disabilityData = {
    labels: ["Visual", "Hearing", "Cognitive", "Motor", "Multiple"],
    datasets: [{
      label: "Prevalence",
      data: [2.3, 3.6, 4.8, 6.8, 5.2],
      backgroundColor: ["#8884d8"],
      borderWidth: 1
    }]
  }

  // Data for employment gap chart
  const employmentData = {
    labels: ["Without Disabilities", "With Disabilities"],
    datasets: [{
      label: "Employment Rate",
      data: [76, 36],
      backgroundColor: ["#0088FE", "#FF8042"],
      borderWidth: 1
    }]
  }

  // Data for accessibility compliance progress
  const complianceData = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "WCAG A",
        data: [65, 78, 89, 97, 100],
        backgroundColor: ["#8884d8"],
        borderWidth: 1
      },
      {
        label: "WCAG AA",
        data: [42, 56, 72, 88, 96],
        backgroundColor: ["#82ca9d"],
        borderWidth: 1
      },
      {
        label: "WCAG AAA",
        data: [18, 24, 35, 52, 68],
        backgroundColor: ["#ffc658"],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Disability Prevalence in the U.S. Workforce (%)</h3>
            <div className="h-[300px]">
              <BarChart
                title="Disability Prevalence"
                data={disabilityData}
                height={300}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Employment Rate Comparison (%)</h3>
            <div className="h-[300px]">
              <PieChart
                title="Employment Rate Comparison"
                data={employmentData}
                height={300}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">EmpowerWork Accessibility Compliance Progress (%)</h3>
          <div className="h-[300px]">
            <BarChart
              title="Accessibility Compliance Progress"
              data={complianceData}
              height={300}
              horizontal={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

