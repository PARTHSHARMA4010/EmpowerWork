import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "The AI Career Advisor helped me highlight my unique skills on my resume, which led to more interview opportunities.",
    name: "Alex Johnson",
    role: "Software Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "I was struggling with interview anxiety, but the practice sessions with the AI Advisor really boosted my confidence.",
    name: "Samantha Lee",
    role: "Marketing Specialist",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "The career path suggestions were spot-on for my interests and abilities. I found a new direction I hadn't considered before.",
    name: "Marcus Chen",
    role: "Data Analyst",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AIAdvisorTestimonials() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Success Stories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how our AI Career Advisor has helped people advance their careers
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6 relative">
              <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/10" />
              <div className="relative z-10">
                <p className="text-sm italic text-muted-foreground mb-4 pl-6">"{testimonial.quote}"</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 pb-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

    