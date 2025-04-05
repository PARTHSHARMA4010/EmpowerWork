'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Users, Briefcase, FileText, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebaseClient"


export default function EmployerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Set up auth state listener
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userEmail = user.email;
            if (!userEmail) return;

            // Get user profile from Firestore
            const profileRef = doc(db, "profiles", user.uid);
            const profileSnap = await getDoc(profileRef);

            if (profileSnap.exists()) {
              const profileData = profileSnap.data();
              
              // If company name is not set, redirect to onboarding
              if (!profileData.company_name || profileData.company_name.length === 0) {
                router.push("/onboarding/company");
              }
            } else {
              // Profile doesn't exist, redirect to onboarding
              router.push("/onboarding/company");
            }
            console.log("No Error");
          } else {
            // User is not signed in, redirect to login
            router.push("/login");
          }
        });

        // Clean up the listener
        return () => unsubscribe();
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <Button asChild>
            <Link href="/employers/post-job">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Job Listings</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">27</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidates Interviewed</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positions Filled</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList>
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Job Listings</CardTitle>
                <CardDescription>Manage your current job postings and create new listings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">Senior Software Engineer</h3>
                        <p className="text-sm text-muted-foreground">Posted 2 weeks ago • 8 applications</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">Marketing Specialist</h3>
                        <p className="text-sm text-muted-foreground">Posted 1 week ago • 12 applications</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">Customer Support Representative</h3>
                        <p className="text-sm text-muted-foreground">Posted 3 days ago • 5 applications</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">UX/UI Designer</h3>
                        <p className="text-sm text-muted-foreground">Posted 5 days ago • 2 applications</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Review and manage applications from candidates.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Applications will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Pipeline</CardTitle>
                <CardDescription>Track candidates through your hiring process.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Candidates will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="accessibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Resources</CardTitle>
                <CardDescription>Tools and guides to help make your workplace more accessible.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-semibold">Workplace Accommodation Guide</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn about common workplace accommodations for different disabilities.
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      Download Guide
                    </Button>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-semibold">Inclusive Interview Techniques</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Best practices for conducting accessible and inclusive interviews.
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      View Resource
                    </Button>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-semibold">Accessibility Consultation</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Schedule a consultation with our accessibility experts.
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}