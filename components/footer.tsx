import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">EmpowerWork</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering people with disabilities to find meaningful careers through AI-powered training and job
              matching.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Job Board
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/advisor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Career Advisor
                </Link>
              </li>
              <li>
                <Link
                  href="/employers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  For Employers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EmpowerWork. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">Made with ❤️ for accessibility and inclusion</p>
        </div>
      </div>
    </footer>
  )
}

