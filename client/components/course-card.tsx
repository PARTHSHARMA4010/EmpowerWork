import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Star, Users } from "lucide-react"
import Link from "next/link"

export interface CourseProps {
  id: string
  title: string
  description: string
  image: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  enrolled: number
  rating: number
  progress?: number
  instructor: {
    name: string
    title: string
    image: string
  }
  accessibilityFeatures: string[]
  skillsGained: string[]
}

export function CourseCard({ course, featured = false }: { course: CourseProps; featured?: boolean }) {
  return (
    <Card className={`h-full overflow-hidden transition-all hover:shadow-md ${featured ? "border-primary/20" : ""}`}>
      <div className="relative">
        <img src={course.image || "/placeholder.svg"} alt="" className="h-48 w-full object-cover" aria-hidden="true" />
        <Badge
          className="absolute left-3 top-3"
          variant={course.level === "Beginner" ? "default" : course.level === "Intermediate" ? "secondary" : "outline"}
        >
          {course.level}
        </Badge>
        {featured && (
          <Badge className="absolute right-3 top-3 bg-yellow-500 text-white hover:bg-yellow-600">Featured</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-3.5 w-3.5" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3.5 w-3.5" />
            {course.enrolled.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            {course.rating.toFixed(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

        {course.progress !== undefined && (
          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={course.instructor.image || "/placeholder.svg"}
            alt={course.instructor.name}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-xs text-muted-foreground">{course.instructor.name}</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/training/${course.id}`}>
            {course.progress !== undefined && course.progress > 0 ? "Continue" : "Enroll"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

