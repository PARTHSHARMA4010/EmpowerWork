"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Developer",
    company: "TechCorp",
    image: "https://as2.ftcdn.net/v2/jpg/06/49/16/63/1000_F_649166337_zROME09I9EAqBg4GhCcsA0cvXUUswf9r.jpg?height=80&width=80",
    quote:
      "EmpowerWork's AI training helped me transition into tech. Their job board connected me with an employer who values my skills and provides the accommodations I need.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Digital Marketing Specialist",
    company: "CreativeAgency",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqzXb0frYPXslo6raQm6Jaw5Nhp46A94orw&s?height=80&width=80",
    quote:
      "The AI career advisor helped me identify my strengths and find a career path that works with my disability. I'm now thriving in a role I love.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Customer Success Manager",
    company: "CloudServices",
    image: "https://en-media.thebetterindia.com/uploads/2019/08/Saumya-123-WP.jpg?height=80&width=80",
    quote:
      "From resume building to interview prep, EmpowerWork supported me every step of the way. Their platform truly understands the unique challenges PwDs face in the job market.",
  },
]

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-md">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col items-center text-center">
                    <Quote className="h-10 w-10 text-primary/20 mb-4" />
                    <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div className="text-left">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Previous testimonial">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-8 h-8 p-0 ${index === activeIndex ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => {
              setAutoplay(false)
              setActiveIndex(index)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={index === activeIndex ? "true" : "false"}
          >
            {index + 1}
          </Button>
        ))}
        <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next testimonial">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

