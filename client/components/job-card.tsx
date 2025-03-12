import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Building2, DollarSign } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  salary: string
  postDate: string
  isRemote: boolean
  category: string
}

export function JobCard({ id, title, company, location, salary, postDate, isRemote, category }: JobCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-grow pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge variant={isRemote ? "default" : "secondary"}>{isRemote ? "Remote" : "In-Person"}</Badge>
        </div>
        <p className="text-muted-foreground mb-4">{company}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            {location}
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            {salary}
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            Posted {postDate}
          </div>
          <div className="flex items-center">
            <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
            {category}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Save Job</Button>
        <Button asChild>
          <Link href={`/jobs/${id}`}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

