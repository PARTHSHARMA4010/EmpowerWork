import type { Metadata } from "next"
import { AdvisorChat } from "@/components/advisor/advisor-chat"
import { AdvisorSidebar } from "@/components/advisor/advisor-sidebar"
import { AdvisorWelcome } from "@/components/advisor/advisor-welcome"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "AI Career Advisor | EmpowerWork",
  description:
    "Get personalized career guidance, resume feedback, and interview preparation from our AI Career Advisor.",
}

export default function AdvisorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary py-12 px-4 md:px-6 lg:px-8 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">AI Career Advisor</h1>
            <p className="text-lg md:text-xl max-w-3xl text-white/90">
              Get personalized career guidance, resume feedback, and interview preparation tailored to your unique
              abilities and career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar with guidance topics */}
            <div className="lg:col-span-3">
              <AdvisorSidebar />
            </div>

            {/* Main chat area */}
            <div className="lg:col-span-9">
              <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
                <AdvisorWelcome />
                <AdvisorChat />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

