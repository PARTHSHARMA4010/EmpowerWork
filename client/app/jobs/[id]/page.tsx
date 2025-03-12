"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Building2, DollarSign, Mail, Phone } from "lucide-react"

// Mock data for a single job
const jobData = {
  id: "1",
  title: "Software Developer",
  company: "TechCorp",
  location: "New York, NY",
  salary: "$80,000 - $120,000",
  postDate: "2 days ago",
  isRemote: true,
  category: "Technology",
  description: "We are seeking a talented Software Developer to join our innovative team...",
  accessibilityFeatures: [
    "Screen Reader Compatible",
    "Flexible Hours",
    "Ergonomic Workstations",
    "Sign Language Interpreters Available",
  ],
  employerContact: {
    name: "Jane Smith",
    email: "jane.smith@techcorp.com",
    phone: "(555) 123-4567",
  },
}

export default function JobDetails() {
  const params = useParams()
  const [job, setJob] = useState(jobData)

  useEffect(() => {
    // In a real application, you would fetch the job data here based on the ID
    // For now, we're using mock data
    console.log("Job ID:", params.id)
  }, [params.id])

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
              <p className="text-xl text-muted-foreground">{job.company}</p>
            </div>
            <Badge variant={job.isRemote ? "default" : "secondary"} className="text-lg py-1 px-3">
              {job.isRemote ? "Remote" : "In-Person"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {job.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              {job.salary}
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              Posted {job.postDate}
            </div>
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
              {job.category}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Job Description</h3>
            <p>{job.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Accessibility Accommodations</h3>
            <ul className="list-disc list-inside">
              {job.accessibilityFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Employer Contact Information</h3>
            <p>{job.employerContact.name}</p>
            <div className="flex items-center mt-1">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              {job.employerContact.email}
            </div>
            <div className="flex items-center mt-1">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              {job.employerContact.phone}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save Job</Button>
          <Button>Apply Now</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

