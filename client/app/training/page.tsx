"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CourseCard, type CourseProps } from "@/components/course-card"
import { Brain, Briefcase, Clock, Code, GraduationCap, Search, Sparkles, Star, User } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import axios from "axios"

// Mock data for courses
const courses: CourseProps[] = [
  {
    id: "web-development-basics",
    title: "Web Development Fundamentals for Accessibility",
    description: "Learn the basics of web development with a focus on creating accessible websites and applications.",
    image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221222184908/web-development1.png?height=400&width=600",
    category: "Technology",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 1245,
    rating: 4.8,
    progress: 65,
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Web Developer",
      image: "https://d1lamhf6l6yk6d.cloudfront.net/uploads/2023/04/Sarah-Wang-v2.png?height=80&width=80?height=100&width=100",
    },
    accessibilityFeatures: ["Screen Reader Compatible", "Closed Captions", "Keyboard Navigable", "Self-Paced"],
    skillsGained: ["HTML5", "CSS3", "JavaScript", "ARIA", "Accessibility Testing"],
  },
  {
    id: "interview-skills",
    title: "Interview Skills for People with Disabilities",
    description: "Master the art of interviewing with strategies tailored for people with disabilities.",
    image: "https://www.wscubetech.com/blog/wp-content/uploads/2024/03/key-skills-for-interview.webp?height=400&width=600",
    category: "Career Development",
    level: "Intermediate",
    duration: "4 weeks",
    enrolled: 876,
    rating: 4.7,
    instructor: {
      name: "Michael Chen",
      title: "Career Coach",
      image: "https://files.idyllic.app/files/static/192012?width=256&optimizer=image?height=100&width=100",
    },
    accessibilityFeatures: ["Screen Reader Compatible", "Closed Captions", "Transcripts Available", "Self-Paced"],
    skillsGained: [
      "Interview Preparation",
      "Disability Disclosure Strategies",
      "Accommodation Requests",
      "Confidence Building",
      "Follow-up Techniques",
    ],
  },
  {
    id: "data-analysis",
    title: "Data Analysis with Python",
    description: "Learn data analysis techniques using Python with accessible tools and methods.",
    image: "https://schportalmedia.s3.amazonaws.com/courseimg/data-analysis-with-python-course.png?height=400&width=600",
    category: "Technology",
    level: "Intermediate",
    duration: "10 weeks",
    enrolled: 932,
    rating: 4.6,
    instructor: {
      name: "Aisha Patel",
      title: "Data Scientist",
      image: "https://d1lamhf6l6yk6d.cloudfront.net/uploads/2023/04/Sarah-Wang-v2.png?height=80&width=80?height=100&width=100"
    },
    accessibilityFeatures: [
      "Screen Reader Compatible",
      "Keyboard Navigable",
      "Alternative Navigation",
      "Cognitive Aids",
    ],
    skillsGained: ["Python Programming", "Data Visualization", "Statistical Analysis", "Pandas", "NumPy"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Essentials",
    description: "Master the fundamentals of digital marketing with accessible tools and techniques.",
    image: "https://digitallearning.eletsonline.com/wp-content/uploads/2019/04/Digital-Marketing.jpg?height=400&width=600",
    category: "Marketing",
    level: "Beginner",
    duration: "6 weeks",
    enrolled: 1087,
    rating: 4.5,
    progress: 25,
    instructor: {
      name: "James Wilson",
      title: "Marketing Director",
      image: "https://files.idyllic.app/files/static/192012?width=256&optimizer=image?height=100&width=100",
    },
    accessibilityFeatures: ["Closed Captions", "Transcripts Available", "Self-Paced", "Cognitive Aids"],
    skillsGained: ["SEO", "Social Media Marketing", "Content Creation", "Email Marketing", "Analytics"],
  },
  {
    id: "project-management",
    title: "Adaptive Project Management",
    description: "Learn project management methodologies with adaptations for various disabilities.",
    image: "https://i.pinimg.com/736x/bd/13/44/bd13444a2663030d7cf9789caee80c04.jpg?height=400&width=600",
    category: "Business",
    level: "Advanced",
    duration: "12 weeks",
    enrolled: 654,
    rating: 4.9,
    instructor: {
      name: "Elena Rodriguez",
      title: "PMP Certified Project Manager",
      image: "https://d1lamhf6l6yk6d.cloudfront.net/uploads/2023/04/Sarah-Wang-v2.png?height=80&width=80?height=100&width=100"
    },
    accessibilityFeatures: ["Screen Reader Compatible", "Closed Captions", "Keyboard Navigable", "Self-Paced"],
    skillsGained: [
      "Agile Methodologies",
      "Team Leadership",
      "Risk Management",
      "Adaptive Planning",
      "Accessible Documentation",
    ],
  },
  {
    id: "customer-service",
    title: "Customer Service Excellence",
    description: "Develop exceptional customer service skills with accommodations for different abilities.",
    image: "https://www.aim.com.au/sites/default/files/00960_AIM_Screens_CustomerServiceExcellence_640x360.png?height=400&width=600",
    category: "Business",
    level: "Beginner",
    duration: "5 weeks",
    enrolled: 789,
    rating: 4.7,
    instructor: {
      name: "David Kim",
      title: "Customer Experience Specialist",
      image: "https://files.idyllic.app/files/static/192012?width=256&optimizer=image?height=100&width=100",
    },
    accessibilityFeatures: ["Hearing Accessible", "Closed Captions", "Transcripts Available", "Self-Paced"],
    skillsGained: [
      "Communication Skills",
      "Problem Solving",
      "Empathy Development",
      "Conflict Resolution",
      "Adaptive Service Techniques",
    ],
  },
  {
    id: "graphic-design",
    title: "Accessible Graphic Design",
    description: "Learn graphic design principles with a focus on accessibility and universal design.",
    image: "https://learndigital.co/wp-content/uploads/2023/08/G.-Pic.png?height=400&width=600",
    category: "Design",
    level: "Intermediate",
    duration: "8 weeks",
    enrolled: 543,
    rating: 4.6,
    instructor: {
      name: "Olivia Martinez",
      title: "Senior Graphic Designer",
      image: "https://d1lamhf6l6yk6d.cloudfront.net/uploads/2023/04/Sarah-Wang-v2.png?height=80&width=80?height=100&width=100"
    },
    accessibilityFeatures: ["Screen Reader Compatible", "Alternative Navigation", "Cognitive Aids", "Self-Paced"],
    skillsGained: [
      "Color Theory for Accessibility",
      "Typography",
      "Layout Design",
      "Adobe Creative Suite",
      "Contrast and Readability",
    ],
  },
  {
    id: "public-speaking",
    title: "Confident Public Speaking",
    description: "Build public speaking skills with techniques adapted for various disabilities.",
    image: "https://shiminly.com/wp-content/uploads/2023/01/11.webp?height=400&width=600",
    category: "Communication",
    level: "Beginner",
    duration: "6 weeks",
    enrolled: 421,
    rating: 4.8,
    instructor: {
      name: "Thomas Wright",
      title: "Communication Coach",
      image: "https://files.idyllic.app/files/static/192012?width=256&optimizer=image?height=100&width=100",
    },
    accessibilityFeatures: ["Hearing Accessible", "Closed Captions", "Transcripts Available", "Self-Paced"],
    skillsGained: [
      "Speech Preparation",
      "Delivery Techniques",
      "Anxiety Management",
      "Visual Aid Design",
      "Audience Engagement",
    ],
  },
]

// Featured courses (subset of all courses)
const featuredCourses = courses.slice(0, 3)

const ReCard: React.FC<CardProps> = ({
  id,
  title,
  duration,
  rating,
  description,
  instructor,
  url
}) => {
  return (
    <div className="w-80 bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
      <div className="flex justify-between items-center">
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
        Recommended
        </span>
       
      </div>

      <div className="h-24 flex items-center justify-center bg-gray-100 rounded-lg mt-4">
        
      </div>

      <h3 className="text-lg font-semibold mt-4">{title}</h3>

      <div className="flex items-center text-gray-600 text-sm mt-2">
        <Clock size={14} className="mr-1" /> {duration}
        <span className="mx-2">•</span>
        <Star size={14} className="mr-1 text-yellow-500" /> {rating}
      </div>

      <p className="text-gray-500 text-sm mt-2">{description}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">{instructor}</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          <a href={`${url}`} >Continue</a>
        </button>
      </div>
    </div>
  );
};


// Categories with icons
const categories = [
  { name: "Technology", icon: <Code className="h-5 w-5" /> },
  { name: "Business", icon: <Briefcase className="h-5 w-5" /> },
  { name: "Career Development", icon: <GraduationCap className="h-5 w-5" /> },
  { name: "Design", icon: <Sparkles className="h-5 w-5" /> },
  { name: "Communication", icon: <Brain className="h-5 w-5" /> },
]

export default function TrainingPage() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [selectedAccessibility, setSelectedAccessibility] = useState("")

  // All accessibility features from courses
  const allAccessibilityFeatures = Array.from(new Set(courses.flatMap((course) => course.accessibilityFeatures)))

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    return (
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || course.category === selectedCategory) &&
      (selectedLevel === "" || course.level === selectedLevel) &&
      (selectedAccessibility === "" || course.accessibilityFeatures.includes(selectedAccessibility))
    )
  })

  // Courses in progress (those with progress property)
  const coursesInProgress = courses.filter((course) => course.progress !== undefined)

  const fetchRecommendations = async () => {
    const { data: user, error: userError } = await supabase.auth.getUser()
    const email  = user.user?.email;
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('https://empowerwork-production.up.railway.app/api/users/getCourses', {
        email
      })
      console.log(response)
      setData(response.data.recommendedCourses)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.")
      setLoading(false)
      console.error("API error:", err)
    }
  }




  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Training Programs</h1>
        <p className="text-muted-foreground">
          Develop skills for the modern workplace with our accessible, self-paced courses designed for people with
          disabilities.
        </p>
      </div>

      {/* AI Recommendation Banner */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">Personalized Learning Path</h2>
              <p className="text-muted-foreground">
                Our AI can analyze your skills, goals, and accessibility needs to create a customized learning path.
              </p>
            </div>
            <Button onClick={fetchRecommendations} disabled={loading}>
            {loading ? "Loading..." : "Get Recommendations"}
          </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommended */}
{Array.isArray(data) && data.length > 0 && (
  <div className="mb-12 ">
    <div className="flex items-center justify-between mb-6">
    {data.map((course, idx) => {
      const description = course.abstract.substring(0, 150) + "...";
      return(
      <ReCard 
        key={idx} 
        title={course?.course_name} 
        duration={"<2hrs"} 
        rating={4} 
        description={description} 
        instructor={course?.instructor} 
        url={course?.course_url} 
      />)}
    )}
    </div>
  </div>
)}

      {/* Featured Courses */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Courses</h2>
          <Button variant="link">View All</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} featured={true} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setSelectedCategory(category.name)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {courses.filter((c) => c.category === category.name).length} courses
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Course Listing */}
      <div>
        <Tabs defaultValue="all-courses">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <TabsList>
              <TabsTrigger value="all-courses">All Courses</TabsTrigger>
              <TabsTrigger value="my-courses">My Courses</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAccessibility} onValueChange={setSelectedAccessibility}>
              <SelectTrigger>
                <SelectValue placeholder="Accessibility Features" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Features</SelectItem>
                {allAccessibilityFeatures.map((feature) => (
                  <SelectItem key={feature} value={feature}>
                    {feature}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="all-courses" className="mt-0">
            {filteredCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-courses" className="mt-0">
            {coursesInProgress.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {coursesInProgress.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No courses in progress</h3>
                <p className="text-muted-foreground">Enroll in a course to start learning and track your progress.</p>
                <Button className="mt-4">Browse Courses</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No saved courses</h3>
              <p className="text-muted-foreground">Save courses to your wishlist to view them later.</p>
              <Button className="mt-4">Browse Courses</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

