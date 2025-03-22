"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { ImpactMap } from "@/components/charts/impact-map"
import { ImpactMetricCard } from "@/components/impact-metric-card"
import { SuccessStoryCard } from "@/components/success-story-card"
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Download,
  GraduationCap,
  HandHeart,
  LineChartIcon,
  Users,
  Quote,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for the dashboard
const impactMetrics = [
  {
    title: "Total Job Placements",
    value: "3,842",
    description: "People with disabilities placed in jobs",
    change: { value: 12, timeframe: "vs last year", positive: true },
    icon: Briefcase,
  },
  {
    title: "Training Completions",
    value: "12,567",
    description: "Courses completed by PwD learners",
    change: { value: 18, timeframe: "vs last year", positive: true },
    icon: GraduationCap,
  },
  {
    title: "Employer Partners",
    value: "876",
    description: "Companies committed to inclusive hiring",
    change: { value: 24, timeframe: "vs last year", positive: true },
    icon: Building2,
  },
  {
    title: "Average Salary Increase",
    value: "42%",
    description: "For PwDs after using our platform",
    change: { value: 5, timeframe: "vs last year", positive: true },
    icon: LineChartIcon,
  },
  {
    title: "Active Users",
    value: "28,945",
    description: "People with disabilities using our platform",
    change: { value: 15, timeframe: "vs last year", positive: true },
    icon: Users,
  },
  {
    title: "Economic Impact",
    value: "$47.2M",
    description: "Estimated annual economic contribution",
    change: { value: 22, timeframe: "vs last year", positive: true },
    icon: HandHeart,
  },
]

const placementsByIndustry = {
  labels: ["Technology", "Healthcare", "Finance", "Retail", "Education", "Manufacturing", "Government"],
  datasets: [
    {
      label: "Job Placements",
      data: [842, 654, 521, 478, 412, 356, 298],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(249, 115, 22, 0.8)",
        "rgba(139, 92, 246, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(99, 102, 241, 0.8)",
      ],
    },
  ],
}

const placementsByDisabilityType = {
  labels: ["Mobility", "Visual", "Hearing", "Cognitive", "Neurological", "Other"],
  datasets: [
    {
      label: "Job Placements",
      data: [1245, 876, 654, 542, 325, 200],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(249, 115, 22, 0.8)",
        "rgba(139, 92, 246, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(245, 158, 11, 0.8)",
      ],
    },
  ],
}

const placementTrend = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "This Year",
      data: [120, 145, 175, 190, 210, 250, 280, 310, 340, 360, 380, 400],
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Last Year",
      data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
      borderColor: "rgba(156, 163, 175, 1)",
      backgroundColor: "rgba(156, 163, 175, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
}

const salaryComparison = {
  labels: ["Technology", "Healthcare", "Finance", "Retail", "Education", "Manufacturing"],
  datasets: [
    {
      label: "Before EmpowerWork",
      data: [45000, 42000, 48000, 32000, 38000, 40000],
      backgroundColor: "rgba(156, 163, 175, 0.8)",
    },
    {
      label: "After EmpowerWork",
      data: [72000, 65000, 78000, 48000, 55000, 62000],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
  ],
}

const geographicImpact = [
  { state: "California", value: 580 },
  { state: "New York", value: 420 },
  { state: "Texas", value: 350 },
  { state: "Florida", value: 280 },
  { state: "Illinois", value: 210 },
  { state: "Washington", value: 180 },
  { state: "Massachusetts", value: 150 },
  { state: "Georgia", value: 130 },
  { state: "Colorado", value: 110 },
  { state: "Michigan", value: 90 },
]

const successStories = [
  {
    id: "1",
    name: "Michael Chen",
    image: "https://youngleaderssummit.org/wp-content/uploads/2024/01/Michael-Chen-Headshot-Michael-Chen-e1705425786691.jpg?height=300&width=400",
    disability: "Mobility Disorder",
    previousRole: "Customer Service Representative",
    currentRole: "Software Developer",
    company: "TechCorp",
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqzXb0frYPXslo6raQm6Jaw5Nhp46A94orw&s?height=50&width=50",
    quote:
      "EmpowerWork's training program helped me transition into tech. Their job board connected me with an employer who values my skills and provides the accommodations I need.",
    featured: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    image: "https://as2.ftcdn.net/v2/jpg/06/49/16/63/1000_F_649166337_zROME09I9EAqBg4GhCcsA0cvXUUswf9r.jpg?height=300&width=400",
    disability:  "Visual Impairment",
    previousRole: "Administrative Assistant",
    currentRole: "Digital Marketing Specialist",
    company: "CreativeAgency",
    companyLogo: "https://img.freepik.com/premium-vector/free-vector-blue-green-gradient-modern-letter-d-digital-marketing-logo-design_883906-876.jpg?semt=ais_hybrid?height=50&width=50",
    quote:
      "The AI career advisor helped me identify my strengths and find a career path that works with my disability. I'm now thriving in a role I love.",
  },
  {
    id: "3",
    name: "Aisha Patel",
    image: "https://en-media.thebetterindia.com/uploads/2019/08/Saumya-123-WP.jpg?height=300&width=400",
    disability: "Hearing Impairment",
    previousRole: "Retail Associate",
    currentRole: "Customer Success Manager",
    company: "CloudServices",
    companyLogo: "https://img.freepik.com/premium-vector/cloud-hosting-logo_617280-420.jpg?height=50&width=50",
    quote:
      "From resume building to interview prep, EmpowerWork supported me every step of the way. Their platform truly understands the unique challenges PwDs face in the job market.",
  },
]
export default function ImpactDashboard() {
  const [timeframe, setTimeframe] = useState("year")
  const [region, setRegion] = useState("all")

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Impact Dashboard</h1>
        <p className="text-muted-foreground">
          Tracking our mission to create economic opportunities for people with disabilities through employment and
          training.
        </p>
      </div>

      {/* Filters and Export */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="northeast">Northeast</SelectItem>
              <SelectItem value="southeast">Southeast</SelectItem>
              <SelectItem value="midwest">Midwest</SelectItem>
              <SelectItem value="southwest">Southwest</SelectItem>
              <SelectItem value="west">West</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {impactMetrics.map((metric, index) => (
          <ImpactMetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="employers">Employers</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Economic Impact Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Economic Impact Highlights</CardTitle>
              <CardDescription>
                Our platform's contribution to economic opportunities for people with disabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold mb-2">$47.2M</div>
                  <p className="text-sm text-muted-foreground">Annual income generated for PwDs</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold mb-2">68%</div>
                  <p className="text-sm text-muted-foreground">Employment rate increase for participants</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold mb-2">$12.4M</div>
                  <p className="text-sm text-muted-foreground">Estimated savings in public assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid gap-6 md:grid-cols-2">
            <LineChart
              title="Job Placements Trend"
              description="Monthly job placements over time"
              data={placementTrend}
            />
            <BarChart
              title="Placements by Industry"
              description="Distribution across different sectors"
              data={placementsByIndustry}
            />
          </div>

          {/* Geographic Impact */}
          <ImpactMap
            title="Geographic Impact"
            description="Job placements across the United States"
            data={geographicImpact}
            height={400}
          />

          {/* Success Stories Preview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Featured Success Stories</h2>
              <Button variant="outline" asChild>
                <a href="#stories">
                  View All Stories <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {successStories.map((story) => (
                <SuccessStoryCard key={story.id} {...story} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Employment Tab */}
        <TabsContent value="employment" className="space-y-8">
          {/* Employment Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Employment Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">vs. 28% national average for PwDs</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+40%</span>
                  <span className="ml-1 text-muted-foreground">above national average</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Job Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">1-year retention rate</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+12%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Time to Hire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42 days</div>
                <p className="text-xs text-muted-foreground">From application to job offer</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">-15 days</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Interview Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">62%</div>
                <p className="text-xs text-muted-foreground">Interviews resulting in job offers</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+8%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employment Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <BarChart
              title="Salary Comparison"
              description="Before and after using EmpowerWork"
              data={{
                labels: salaryComparison.labels,
                datasets: salaryComparison.datasets.map(dataset => ({
                  ...dataset,
                  backgroundColor: [dataset.backgroundColor] // Convert string to array
                }))
              }}
            />
            <PieChart
              title="Placements by Disability Type"
              description="Distribution across different disability categories"
              data={placementsByDisabilityType}
            />
          </div>

          {/* Employment Journey */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Journey</CardTitle>
              <CardDescription>Average time spent at each stage of the employment process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-muted" />

                  <div className="relative flex items-center mb-8">
                    <div className="absolute left-0 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      1
                    </div>
                    <div className="pl-20">
                      <h3 className="font-semibold">Profile Creation & Assessment</h3>
                      <p className="text-sm text-muted-foreground">Average time: 3 days</p>
                      <p className="text-sm mt-1">
                        Users create profiles, complete skills assessments, and identify career goals.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center mb-8">
                    <div className="absolute left-0 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      2
                    </div>
                    <div className="pl-20">
                      <h3 className="font-semibold">Training & Skill Development</h3>
                      <p className="text-sm text-muted-foreground">Average time: 28 days</p>
                      <p className="text-sm mt-1">
                        Users complete targeted training programs to develop job-specific skills.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center mb-8">
                    <div className="absolute left-0 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      3
                    </div>
                    <div className="pl-20">
                      <h3 className="font-semibold">Job Application & Interview Prep</h3>
                      <p className="text-sm text-muted-foreground">Average time: 14 days</p>
                      <p className="text-sm mt-1">
                        Users apply to jobs and receive interview coaching and preparation.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <div className="absolute left-0 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      4
                    </div>
                    <div className="pl-20">
                      <h3 className="font-semibold">Job Placement & Onboarding Support</h3>
                      <p className="text-sm text-muted-foreground">Average time: 21 days</p>
                      <p className="text-sm mt-1">
                        Users receive job offers and get support during the onboarding process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-8">
          {/* Training Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,567</div>
                <p className="text-xs text-muted-foreground">Total courses completed</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+18%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Of enrolled courses completed</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+5%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skills Gained</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42,890</div>
                <p className="text-xs text-muted-foreground">Total skills verified through assessments</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+22%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Certification Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">Users earning industry certifications</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+12%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
              <CardDescription>Courses with highest completion rates and job placement outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">Web Development Fundamentals for Accessibility</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">Technology</Badge>
                        <Badge variant="outline">Beginner</Badge>
                        <Badge variant="outline">8 weeks</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        1,245 completions • 82% completion rate • 68% job placement rate
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">Data Analysis with Python</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">Technology</Badge>
                        <Badge variant="outline">Intermediate</Badge>
                        <Badge variant="outline">10 weeks</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        932 completions • 76% completion rate • 72% job placement rate
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">Customer Service Excellence</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">Business</Badge>
                        <Badge variant="outline">Beginner</Badge>
                        <Badge variant="outline">5 weeks</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        789 completions • 85% completion rate • 64% job placement rate
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">Digital Marketing Essentials</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">Marketing</Badge>
                        <Badge variant="outline">Beginner</Badge>
                        <Badge variant="outline">6 weeks</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        1,087 completions • 79% completion rate • 61% job placement rate
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Gap Analysis</CardTitle>
              <CardDescription>Comparing in-demand skills with current training offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Web Development</span>
                    <span className="font-medium">92% coverage</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "92%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Analysis</span>
                    <span className="font-medium">85% coverage</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "85%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Digital Marketing</span>
                    <span className="font-medium">78% coverage</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "78%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cloud Computing</span>
                    <span className="font-medium">65% coverage</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-yellow-500" style={{ width: "65%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Artificial Intelligence</span>
                    <span className="font-medium">42% coverage</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-red-500" style={{ width: "42%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cybersecurity</span>
                    <span className="font-medium">38% coverage</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-red-500" style={{ width: "38%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employers Tab */}
        <TabsContent value="employers" className="space-y-8">
          {/* Employer Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Partner Employers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">876</div>
                <p className="text-xs text-muted-foreground">Companies committed to inclusive hiring</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+24%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">Currently available jobs</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+18%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Accessibility Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82/100</div>
                <p className="text-xs text-muted-foreground">Average employer accessibility rating</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+8 points</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Repeat Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">Employers who hired multiple PwDs</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-500">+12%</span>
                  <span className="ml-1 text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Employers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Inclusive Employers</CardTitle>
              <CardDescription>Companies with the highest number of PwD hires and accessibility scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <img src="/placeholder.svg?height=50&width=50" alt="TechCorp Logo" className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">TechCorp</h3>
                      <p className="text-sm text-muted-foreground">
                        Technology • 120 PwD hires • 94/100 accessibility score
                      </p>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">Platinum Partner</Badge>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <img src="/placeholder.svg?height=50&width=50" alt="HealthPlus Logo" className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">HealthPlus</h3>
                      <p className="text-sm text-muted-foreground">
                        Healthcare • 95 PwD hires • 92/100 accessibility score
                      </p>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">Platinum Partner</Badge>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <img src="/placeholder.svg?height=50&width=50" alt="FinanceOne Logo" className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">FinanceOne</h3>
                      <p className="text-sm text-muted-foreground">
                        Finance • 82 PwD hires • 88/100 accessibility score
                      </p>
                    </div>
                    <Badge className="bg-blue-500 hover:bg-blue-600">Gold Partner</Badge>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <img src="/placeholder.svg?height=50&width=50" alt="RetailGiant Logo" className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">RetailGiant</h3>
                      <p className="text-sm text-muted-foreground">
                        Retail • 78 PwD hires • 85/100 accessibility score
                      </p>
                    </div>
                    <Badge className="bg-blue-500 hover:bg-blue-600">Gold Partner</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employer Satisfaction */}
          <Card>
            <CardHeader>
              <CardTitle>Employer Satisfaction</CardTitle>
              <CardDescription>Feedback from partner employers on PwD hires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Satisfaction</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "92%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Job Performance</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "88%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Retention Rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "85%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Workplace Integration</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "82%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Would Hire Again</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "94%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Success Stories Tab */}
        <TabsContent value="stories" id="stories" className="space-y-8">
          {/* Featured Story */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Featured Success Story</CardTitle>
              <CardDescription>Highlighting exceptional career transformations through our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Michael Chen"
                    className="w-full rounded-lg object-cover h-[300px]"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
                    <p className="text-muted-foreground mb-2">
                      From Customer Service Representative to Software Developer
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src="/placeholder.svg?height=30&width=30"
                        alt="TechCorp Logo"
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm">TechCorp</span>
                    </div>
                    <div className="space-y-4">
                      <p>
                        "Before EmpowerWork, I was stuck in a customer service role that didn't utilize my
                        problem-solving skills or accommodate my visual impairment. I always had an interest in coding
                        but didn't know where to start, especially with my disability."
                      </p>
                      <p>
                        "EmpowerWork's accessible training program taught me web development with tools that worked with
                        my screen reader. Their career advisors helped me showcase my new skills to employers who value
                        diversity. Now I'm a software developer earning twice my previous salary, working remotely with
                        the accommodations I need."
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button>Read Full Story</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Stories Grid */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">More Success Stories</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...successStories, ...successStories].slice(0, 6).map((story, index) => (
                <SuccessStoryCard key={`${story.id}-${index}`} {...story} featured={index === 0} />
              ))}
            </div>
          </div>

          {/* Impact Testimonials */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Testimonials</CardTitle>
              <CardDescription>What our users and partners say about our impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-primary/40" />
                    <div>
                      <p className="italic mb-4">
                        "EmpowerWork has transformed how we approach disability inclusion in our hiring. The quality of
                        candidates and the support provided has made it seamless to build a more diverse workforce."
                      </p>
                      <div className="flex items-center gap-2">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Jennifer Williams"
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">Jennifer Williams</p>
                          <p className="text-xs text-muted-foreground">Chief HR Officer, TechCorp</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-primary/40" />
                    <div>
                      <p className="italic mb-4">
                        "As a policymaker, I've seen firsthand how EmpowerWork's approach to employment for people with
                        disabilities creates economic benefits for the entire community while reducing dependence on
                        public assistance."
                      </p>
                      <div className="flex items-center gap-2">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Robert Johnson"
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">Robert Johnson</p>
                          <p className="text-xs text-muted-foreground">Director, Department of Labor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-primary/40" />
                    <div>
                      <p className="italic mb-4">
                        "The accessibility features in EmpowerWork's training platform are exceptional. For the first
                        time, I was able to complete professional development courses without barriers related to my
                        hearing impairment."
                      </p>
                      <div className="flex items-center gap-2">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Maria Garcia"
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">Maria Garcia</p>
                          <p className="text-xs text-muted-foreground">Digital Marketing Specialist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-primary/40" />
                    <div>
                      <p className="italic mb-4">
                        "EmpowerWork doesn't just find jobs for people with disabilities—they create career paths. Their
                        holistic approach to training, job matching, and ongoing support has created lasting change in
                        our community."
                      </p>
                      <div className="flex items-center gap-2">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="David Kim"
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">David Kim</p>
                          <p className="text-xs text-muted-foreground">
                            Executive Director, Disability Rights Coalition
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

