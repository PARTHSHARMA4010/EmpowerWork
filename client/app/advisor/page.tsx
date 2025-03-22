import type { Metadata } from "next";
import { AIAdvisorChat } from "@/components/ai-advisor/chat";
import { AIAdvisorHeader } from "@/components/ai-advisor/header";
import { AIAdvisorFeatures } from "@/components/ai-advisor/features";
import { AIAdvisorTestimonials } from "@/components/ai-advisor/testimonials";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AI Career Advisor | EmpowerWork",
  description: "Get personalized career guidance tailored to your unique abilities and goals.",
};

export default function AIAdvisorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/50">
      <AIAdvisorHeader />

      <main className="flex-1">
        {/* Main chat interface */}
        <section className="py-8 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <AIAdvisorChat />
          </div>
        </section>

        {/* Features section */}
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <AIAdvisorFeatures />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <AIAdvisorTestimonials />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}