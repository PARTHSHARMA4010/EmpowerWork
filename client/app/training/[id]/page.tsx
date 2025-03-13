"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AccessibilityFeatures } from "@/components/accessibility-features"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Play,
  Star,
  Users,
} from "lucide-react"

// Mock data for a single course (expanded from the courses array in the main page)
const courseData = {
  id: "web-development-basics",
  title: "Web Development Fundamentals for Accessibility",
  description:
    "Learn the basics of web development with a focus on creating accessible websites and applications. This comprehensive course covers HTML, CSS, JavaScript, and ARIA, with a strong emphasis on building websites that work for everyone, regardless of ability.",
  image: "/placeholder.svg?height=400&width=800",
  category: "Technology",
  level: "Beginner",
  duration: "8 weeks",
  enrolled: 1245,
  rating: 4.8,
  progress: 65,
  lastAccessed: "2 days ago",
  instructor: {
    name: "Sarah Johnson",
    title: "Senior Web Developer",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Sarah has over 10 years of experience in web development with a focus on accessibility. She has worked with major tech companies to improve their web accessibility and has helped hundreds of students learn accessible web development practices.",
  },
  accessibilityFeatures: ["Screen Reader Compatible", "Closed Captions", "Keyboard Navigable", "Self-Paced"],
  skillsGained: ["HTML5", "CSS3", "JavaScript", "ARIA", "Accessibility Testing"],
  prerequisites: ["Basic computer skills", "No prior coding experience required"],
  modules: [
    {
      title: "Introduction to Web Accessibility",
      lessons: [
        { title: "Why Accessibility Matters", duration: "15 min", completed: true },
        { title: "Understanding Different Disabilities", duration: "20 min", completed: true },
        { title: "Web Content Accessibility Guidelines (WCAG)", duration: "25 min", completed: true },
        { title: "Setting Up Your Development Environment", duration: "30 min", completed: false },
      ],
    },
    {
      title: "HTML Fundamentals",
      lessons: [
        { title: "Semantic HTML Elements", duration: "30 min", completed: true },
        { title: "Document Structure", duration: "25 min", completed: true },
        { title: "Forms and Input Elements", duration: "35 min", completed: false },
        { title: "Tables and Lists", duration: "20 min", completed: false },
      ],
    },
    {
      title: "CSS for Accessible Design",
      lessons: [
        { title: "CSS Basics", duration: "25 min", completed: true },
        { title: "Color and Contrast", duration: "20 min", completed: true },
        { title: "Responsive Design", duration: "30 min", completed: false },
        { title: "Focus Styles", duration: "15 min", completed: false },
      ],
    },
    {
      title: "JavaScript and ARIA",
      lessons: [
        { title: "JavaScript Fundamentals", duration: "40 min", completed: false },
        { title: "Introduction to ARIA", duration: "30 min", completed: false },
        { title: "Building Accessible Components", duration: "45 min", completed: false },
        { title: "Testing with Screen Readers", duration: "35 min", completed: false },
      ],
    },
    {
      title: "Final Project",
      lessons: [
        { title: "Project Planning", duration: "20 min", completed: false },
        { title: "Implementation", duration: "120 min", completed: false },
        { title: "Testing and Refinement", duration: "60 min", completed: false },
        { title: "Presentation and Review", duration: "30 min", completed: false },
      ],
    },
  ],
  resources: [
    { title: "HTML Cheat Sheet", type: "PDF", size: "1.2 MB" },
    { title: "CSS Reference Guide", type: "PDF", size: "2.5 MB" },
    { title: "ARIA Best Practices", type: "PDF", size: "3.1 MB" },
    { title: "Screen Reader Shortcuts", type: "PDF", size: "0.8 MB" },
  ],
  reviews: [
    {
      user: "Michael P.",
      rating: 5,
      date: "2 months ago",
      comment:
        "This course was incredibly helpful for me as a developer with a visual impairment. The instructor's clear explanations and the accessible course materials made learning web development much easier.",
    },
    {
      user: "Jennifer L.",
      rating: 5,
      date: "3 months ago",
      comment:
        "I've taken several web development courses, but this is the first one that thoroughly addresses accessibility. The practical examples and exercises were excellent.",
    },
    {
      user: "David K.",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great content and very well structured. I would have liked more advanced examples, but overall it's an excellent introduction to accessible web development.",
    },
  ],
}

export default function CourseDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate total lessons and completed lessons
  const totalLessons = courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0)

  const completedLessons = courseData.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Course Header */}
          <div>
            <div className="relative mb-6">
              <img
                src={courseData.image || "/placeholder.svg"}
                alt=""
                className="w-full rounded-lg object-cover h-[300px]"
              />
              <Badge
                className="absolute left-4 top-4"
                variant={
                  courseData.level === "Beginner"
                    ? "default"
                    : courseData.level === "Intermediate"
                      ? "secondary"
                      : "outline"
                }
              >
                {courseData.level}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
            <p className="text-muted-foreground mb-4">{courseData.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                {courseData.duration}
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                {courseData.enrolled.toLocaleString()} enrolled
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                {courseData.rating.toFixed(1)} ({courseData.reviews.length} reviews)
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                Last accessed {courseData.lastAccessed}
              </div>
            </div>
          </div>

          {/* Course Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="instructor"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Instructor
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="pt-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseData.skillsGained.map((skill) => (
                      <li key={skill} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
                  <ul className="space-y-2">
                    {courseData.prerequisites.map((prerequisite) => (
                      <li key={prerequisite} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
                  <AccessibilityFeatures features={courseData.accessibilityFeatures} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Course Resources</h2>
                  <div className="space-y-3">
                    {courseData.resources.map((resource) => (
                      <div key={resource.title} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {resource.type} • {resource.size}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Course Content</h2>
                  <div className="text-sm text-muted-foreground">
                    {completedLessons} of {totalLessons} lessons completed
                  </div>
                </div>

                {courseData.modules.map((module, moduleIndex) => (
                  <Card key={moduleIndex}>
                    <CardHeader className="py-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{module.title}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {module.lessons.filter((l) => l.completed).length} / {module.lessons.length} lessons
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li
                            key={lessonIndex}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-primary mr-3" />
                              ) : (
                                <Play className="h-5 w-5 text-muted-foreground mr-3" />
                              )}
                              <span className={lesson.completed ? "text-muted-foreground" : ""}>{lesson.title}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Instructor Tab */}
            <TabsContent value="instructor" className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={courseData.instructor.image || "/placeholder.svg"}
                  alt={courseData.instructor.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-1">{courseData.instructor.name}</h2>
                  <p className="text-muted-foreground mb-4">{courseData.instructor.title}</p>
                  <p>{courseData.instructor.bio}</p>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{courseData.rating.toFixed(1)}</div>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(courseData.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{courseData.reviews.length} reviews</div>
                  </div>
                  <div className="flex-1">
                    <Button className="w-full">Write a Review</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  {courseData.reviews.map((review, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      {index < courseData.reviews.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Your progress</span>
                    <span className="font-medium">{courseData.progress}%</span>
                  </div>
                  <Progress value={courseData.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {completedLessons} of {totalLessons} lessons completed
                  </p>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Play className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Notes
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Discussion
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Course Info */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span>{courseData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span>{courseData.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lessons</span>
                    <span>{totalLessons}</span>
                  </div>
                </div>

                <Separator />

                {/* Need Help */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Need Assistance?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our accessibility team is here to help with any accommodations you may need.
                  </p>
                  <Button variant="outline" className="w-full">
                    Request Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

