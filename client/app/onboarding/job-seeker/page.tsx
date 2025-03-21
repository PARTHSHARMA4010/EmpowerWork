"use client"

import {  useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabaseClient"

export default function JobSeekerOnboarding() {

  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    disabilityType: "",
    education: "",
    experience: "",
    skills: "",
    certifications: "",
    jobType: "",
    workPreference: "",
    accommodations: ""
  })

  const handleChange = (field:any, value:any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsLoading(true)
      try {
        const { data: user, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError
        console.log(user);
      
      const { error } = await supabase.from("profiles").update({
        disabilityType: formData.disabilityType,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        certifications: formData.certifications,
        jobtype: formData.jobType,
        workpreference: formData.workPreference,
        accommodations: formData.accommodations
      }).eq("email", user.user.email)
      
      if (error) throw error
      setIsLoading(false)
      router.push("/jobs")
    } catch (error) {
      console.error("Error updating profile:", error)
      setIsLoading(false)
    }
  }
}

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>Tell us more about yourself to help find the right opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <Label>Type of Disability (Optional)</Label>
              <Select onValueChange={(value) => handleChange("disabilityType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select disability type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="mobility">Mobility Disability</SelectItem>
                    <SelectItem value="visual">Visual Impairment</SelectItem>
                    <SelectItem value="hearing">Hearing Impairment</SelectItem>
                    <SelectItem value="cognitive">Cognitive Disability</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>

              <Label>Highest Education Level</Label>
              <Select onValueChange={(value) => handleChange("education", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Label>Years of Experience</Label>
              <Select onValueChange={(value) => handleChange("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {step === 2 && (
            <>
              <Label>Skills</Label>
              <Textarea
                placeholder="Enter your skills"
                onChange={(e) => handleChange("skills", e.target.value)}
              />
              
              <Label>Certifications (Optional)</Label>
              <Textarea
                placeholder="List any relevant certifications"
                onChange={(e) => handleChange("certifications", e.target.value)}
              />
            </>
          )}

          {step === 3 && (
            <>
              <Label>Preferred Job Type</Label>
              <Select onValueChange={(value) => handleChange("jobType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              
              <Label>Work Preference</Label>
              <Select onValueChange={(value) => handleChange("workPreference", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work preference" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="remote">Remote Only</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              
              <Label>Required Accommodations (Optional)</Label>
              <Textarea
                placeholder="Describe any accommodations you may need"
                onChange={(e) => handleChange("accommodations", e.target.value)}
              />
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
          <Button onClick={handleNext} disabled={isLoading}>{isLoading ? "Completing..." : step === 3 ? "Complete" : "Next"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}


