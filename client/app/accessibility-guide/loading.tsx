import { Skeleton } from "@/components/ui/skeleton"

export default function AIAdvisorLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="flex flex-col space-y-6">
              <Skeleton className="h-8 w-32 bg-primary-foreground/20" />
              <Skeleton className="h-14 w-full max-w-md bg-primary-foreground/20" />
              <Skeleton className="h-10 w-full max-w-sm bg-primary-foreground/20" />
              <div className="flex space-x-3">
                <Skeleton className="h-12 w-32 bg-primary-foreground/20" />
                <Skeleton className="h-12 w-32 bg-primary-foreground/20" />
              </div>
            </div>
            <Skeleton className="aspect-square max-w-md rounded-2xl bg-primary-foreground/20" />
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Skeleton className="h-[600px] w-full rounded-xl" />
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section Skeleton */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-48 mx-auto" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

