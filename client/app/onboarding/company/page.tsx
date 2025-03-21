"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { supabase } from "@/lib/supabaseClient"

export default function CompanyOnboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Form states
  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("")
  const [accessibilityFeatures, setAccessibilityFeatures] = useState("")
  const [inclusionInitiatives, setInclusionInitiatives] = useState("")
  const [accommodationSupport, setAccommodationSupport] = useState("")
  const [hiringTimeline, setHiringTimeline] = useState("")
  const [openPositions, setOpenPositions] = useState("")
  const [remotePolicy, setRemotePolicy] = useState("")

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsLoading(true)
      await saveCompanyProfile()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const saveCompanyProfile = async () => {
    try {
      const { data: user, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      const { error } = await supabase.from("profiles").update({
        company_name: companyName,
        industry,
        company_size: companySize,
        company_website: companyWebsite,
        accessibility_features: accessibilityFeatures,
        inclusion_initiatives: inclusionInitiatives,
        accommodation_support: accommodationSupport,
        hiring_timeline: hiringTimeline,
        open_positions: openPositions,
        remote_policy: remotePolicy,
      }).eq("email", user.user.email)

      if (error) throw error

      setIsLoading(false)
      router.push("/employers/dashboard")
    } catch (error) {
      console.error("Error saving company profile:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Complete Company Profile</CardTitle>
          <CardDescription>Tell us about your company to help connect with qualified candidates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <Label>Company Name</Label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Inc." required />
              <Label>Industry</Label>
              <Select onValueChange={setIndustry}>
                <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Label>Company Size</Label>
              <Select onValueChange={setCompanySize}>
                <SelectTrigger><SelectValue placeholder="Select company size" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                </SelectContent>
              </Select>
              <Label>Company Website</Label>
              <Input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} placeholder="https://example.com" />
            </>
          )}

          {step === 2 && (
            <>
              <Label>Current Accessibility Features</Label>
              <Textarea value={accessibilityFeatures} onChange={(e) => setAccessibilityFeatures(e.target.value)} />
              <Label>Inclusion Initiatives</Label>
              <Textarea value={inclusionInitiatives} onChange={(e) => setInclusionInitiatives(e.target.value)} />
              <Label>Accommodation Support Needed</Label>
              <Select onValueChange={setAccommodationSupport}>
                <SelectTrigger><SelectValue placeholder="Select support level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="extensive">We need extensive guidance</SelectItem>
                    <SelectItem value="some">We need some assistance</SelectItem>
                    <SelectItem value="minimal">We need minimal help</SelectItem>
                    <SelectItem value="none">We have established processes</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {step === 3 && (
            <>
              <Label>Hiring Timeline</Label>
              <Select onValueChange={setHiringTimeline}>
                <SelectTrigger><SelectValue placeholder="Select hiring timeline" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="immediate">Immediate (1-2 weeks)</SelectItem>
                    <SelectItem value="soon">Soon (1-2 months)</SelectItem>
                    <SelectItem value="future">Future (3+ months)</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                </SelectContent>
              </Select>
              <Label>Open Positions</Label>
              <Textarea value={openPositions} onChange={(e) => setOpenPositions(e.target.value)} />
              <Label>Remote Work Policy</Label>
              <Select onValueChange={setRemotePolicy}>
                <SelectTrigger><SelectValue placeholder="Select policy" /></SelectTrigger>
                <SelectContent>
                <SelectItem value="remote-only">Remote Only</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="on-site">On-site Only</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
          <Button onClick={handleNext} disabled={isLoading}>{isLoading ? "Saving..." : step === 3 ? "Complete" : "Next"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
