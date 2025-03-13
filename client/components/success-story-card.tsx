import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote } from "lucide-react"
import Link from "next/link"

interface SuccessStoryProps {
  id: string
  name: string
  image: string
  disability?: string
  previousRole?: string
  currentRole: string
  company: string
  companyLogo?: string
  quote: string
  featured?: boolean
}

export function SuccessStoryCard({
  id,
  name,
  image,
  disability,
  previousRole,
  currentRole,
  company,
  companyLogo,
  quote,
  featured = false,
}: SuccessStoryProps) {
  return (
    <Card className={`overflow-hidden h-full ${featured ? "border-primary/20" : ""}`}>
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={name} className="h-48 w-full object-cover" />
        {featured && (
          <Badge className="absolute right-3 top-3 bg-yellow-500 text-white hover:bg-yellow-600">Featured Story</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="flex flex-col">
          <span className="font-medium text-foreground">{currentRole}</span>
          <span className="flex items-center gap-2">
            {companyLogo && (
              <img
                src={companyLogo || "/placeholder.svg"}
                alt={company}
                className="h-4 w-4 rounded-full object-cover"
              />
            )}
            {company}
          </span>
          {previousRole && <span className="text-xs mt-1">Previously: {previousRole}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-start gap-2">
          <Quote className="h-5 w-5 text-primary/40 shrink-0 mt-1" />
          <p className="text-sm text-muted-foreground line-clamp-4">{quote}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="p-0 h-auto" asChild>
          <Link href={`/impact/stories/${id}`}>
            Read full story <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

    