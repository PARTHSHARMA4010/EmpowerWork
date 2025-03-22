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
  LogOut, // Import the LogOut icon
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
import { supabase } from "@/lib/supabaseClient" // Adjust the import based on your project structure

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
  const router = useRouter();
  
  const [user, setUser] = useState(null)

  // Check user authentication state
  useEffect(() => {
    const session = supabase.auth.getSession()
    
    if (session) {
      setUser(session.user)
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Sign out function
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
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
              <Button size="sm" color="anger" variant="outline" onClick={handleSignOut} className="w-full">
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
