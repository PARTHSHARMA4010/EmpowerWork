"use client"

import {
  Home,
  Briefcase,
  GraduationCap,
  MessageSquareText,
  Building2,
  FileText,
  BarChart3,
  LogIn,
  UserPlus,
  Menu,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebaseClient" // Adjust this import based on your Firebase setup

const mainNavItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Job Board",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Training",
    href: "/training",
    icon: GraduationCap,
  },
  {
    title: "AI Career Advisor",
    href: "/advisor",
    icon: MessageSquareText,
  },
  {
    title: "For Employers",
    href: "/employers/dashboard",
    icon: Building2,
  },
  {
    title: "Accessibility Guide",
    href: "/accessibility-guide",
    icon: FileText,
  },
  {
    title: "Impact Dashboard",
    href: "/impact",
    icon: BarChart3,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const router = useRouter()
  
  const [user, setUser] = useState(null)

  // Check user authentication state using Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Sign out function using Firebase
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <>
      {/* Mobile header with menu trigger */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 border-b bg-background z-50 flex items-center px-4">
          <SidebarTrigger>
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div className="ml-3 font-semibold">EmpowerWork</div>
        </div>
      )}

      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader className="flex items-center p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">EmpowerWork</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {user ? (
              // Show Sign Out button if user is logged in
              <Button size="sm" variant="outline" onClick={handleSignOut} className="w-full bg-red-500 border">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <>
                {/* Show Login and Sign Up buttons if user is not logged in */}
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Log In</span>
                  </Link>
                </Button>
                <Button size="sm" asChild className="w-full">
                  <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}