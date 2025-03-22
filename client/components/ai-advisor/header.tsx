import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function AIAdvisorHeader() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/30 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="flex flex-col space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              <span>AI-powered career guidance</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Your Personal{" "}
              <span className="relative">
                Career Advisor
                <span className="absolute -bottom-1 left-0 h-1 w-full bg-primary-foreground/30"></span>
              </span>
            </h1>

            <p className="text-xl text-primary-foreground/80 md:text-2xl">
              Get personalized career guidance tailored to your unique abilities and goals
            </p>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button size="lg" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <a href="#chat">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
  size="lg"
  variant="outline"
  asChild
  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
>
  <Link href="https://huggingface.co/spaces/shreyankisiri/AI-Resume-Analyzing-System" className="!text-black">
    Know your Resume
  </Link>
</Button>

            </div>
          </div>

          <div className="relative mx-auto aspect-square max-w-md rounded-2xl bg-gradient-to-br from-primary-foreground/10 to-transparent p-1 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-2xl border border-primary-foreground/10" />
            <div className="h-full w-full overflow-hidden rounded-xl bg-primary-foreground/5 p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary-foreground/10 p-1.5">
                    <Sparkles className="h-full w-full text-primary-foreground/70" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-primary-foreground/10 p-4 text-primary-foreground/90">
                    <p>Hi there! I'm your AI Career Advisor. How can I help with your career journey today?</p>
                  </div>
                </div>

                <div className="flex items-start justify-end gap-3">
                  <div className="rounded-2xl rounded-tr-none bg-primary-foreground/20 p-4 text-primary-foreground">
                    <p>I need help finding inclusive employers in the tech industry.</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary-foreground/20 p-1.5">
                    <div className="h-full w-full rounded-full bg-primary-foreground/70" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary-foreground/10 p-1.5">
                    <Sparkles className="h-full w-full text-primary-foreground/70" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-primary-foreground/10 p-4 text-primary-foreground/90">
                    <p>
                      I'd be happy to help you find inclusive employers in tech! Let me share some resources and
                      strategies...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

