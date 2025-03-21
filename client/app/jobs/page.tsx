"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JobCard } from "@/components/job-card"
import { supabase } from "@/lib/supabaseClient"

// Mock data for jobs and companies 
const jobs = [
  {
    id: "1",
    title: "Software Developer",
    company: "TechCorp",
    location: "New York, NY",
    salary: "$80,000 - $120,000",
    postDate: "2 days ago",
    isRemote: true,
    category: "Technology",
    accessibilityFeatures: ["Screen Reader Compatible", "Flexible Hours"],
  },
  {
    id: "2",
    title: "Customer Service Representative",
    company: "ServicePro",
    location: "Chicago, IL",
    salary: "$40,000 - $55,000",
    postDate: "1 week ago",
    isRemote: false,
    category: "Customer Service",
    accessibilityFeatures: ["Hearing Aid Compatible Phones", "Ergonomic Workstations"],
  },
  {
    id: "3",
    title: "Marketing Manager",
    company: "BrandBoost",
    location: "Los Angeles, CA",
    salary: "$70,000 - $100,000",
    postDate: "3 days ago",
    isRemote: true,
    category: "Management",
    accessibilityFeatures: ["Flexible Work Schedule", "Remote Work Option"],
  },
  {
    id: "4",
    title: "Data Analyst",
    company: "DataWave",
    location: "San Francisco, CA",
    salary: "$75,000 - $110,000",
    postDate: "5 days ago",
    isRemote: false,
    category: "Technology",
    accessibilityFeatures: ["Screen Magnifier Support", "Quiet Workspace"],
  },
  {
    id: "5",
    title: "Graphic Designer",
    company: "Creative Minds",
    location: "Austin, TX",
    salary: "$50,000 - $70,000",
    postDate: "4 days ago",
    isRemote: true,
    category: "Technology",
    accessibilityFeatures: ["Assistive Technology Support", "Flexible Deadlines"],
  },
  {
    id: "6",
    title: "Project Manager",
    company: "BuildIt Inc.",
    location: "Seattle, WA",
    salary: "$90,000 - $130,000",
    postDate: "1 week ago",
    isRemote: false,
    category: "Management",
    accessibilityFeatures: ["On-Site Accessibility Ramps", "Workplace Accommodations"],
  },
];

// images should be added locally only... remember parth 

const featuredCompanies = [
  { name: "InclusiveTech", logo: "https://img.freepik.com/free-photo/side-view-people-working-office_23-2149759020.jpg?t=st=1741763528~exp=1741767128~hmac=074b9485cf9769bcd2f7ad26dc843706dee5279accf0170bf5d1baf2c7be552d&w=2000" },
  { name: "AccessibleCorp", logo: "https://as1.ftcdn.net/v2/jpg/06/60/44/86/1000_F_660448655_oZwqc5gXCJlkkvH5jZdw3Ncr4Oo9Av9t.jpg" },
  { name: "EqualOpportunities", logo: "https://t3.ftcdn.net/jpg/05/38/99/44/240_F_538994402_BpMxvLfnoirHhRJ6lJWbWNwwuzQnpcKv.jpg" },
]

export default function JobBoard() {
  // const[jobs,setJobs] = useState()
    const router = useRouter()
      useEffect(() => {
        const onBoardingDone = async () => {
          try {
            const { data: userData, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;
      
            const userEmail = userData?.user?.email;
            if (!userEmail) return;
      
            const { data: profilesData, error: profileError } = await supabase
              .from("profiles")
              .select("education")
              .eq("email", userEmail);
      
            if (profileError) throw profileError;
    
            console.log(profilesData)
            // If no profile exists, redirect
            if (!profilesData[0].education || profilesData[0].education.length === 0) {
              router.push("/onboarding/job-seeker");
            }
            console.log("No Error")
          } catch (error) {
            console.error("Error checking onboarding status:", error);
          }
        };
      
        onBoardingDone();
      }, [router]);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || selectedCategory === "all" || job.category === selectedCategory) &&
      (selectedLocation === "" || selectedLocation === "all" || job.location.includes(selectedLocation))
    );
  });
  

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Accessible Job Board for PwD Job Seekers</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Inclusive Companies</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {featuredCompanies.map((company) => (
            <div key={company.name} className="flex flex-col items-center">
              <img
                src={company.logo || "/placeholder.svg"}
                alt={company.name}
                className="w-24 h-24 object-cover rounded-full"
              />
              <span className="mt-2 text-sm font-medium">{company.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 mb-8 md:grid-cols-3">
        <Input placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Customer Service">Customer Service</SelectItem>
            <SelectItem value="Management">Management</SelectItem>
            {/* Add more categories */}
          </SelectContent>
        </Select>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          {/* this might work fine */}
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="Chicago">Chicago</SelectItem>
            {/* Add more locations */}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">No jobs found matching your criteria.</p>
      )}
    </div>
  )
}

