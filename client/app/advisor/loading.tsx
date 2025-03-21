import { Skeleton } from "@/components/ui/skeleton"

export default function AdvisorLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-primary/90 to-primary py-12 px-4 md:px-6 lg:px-8 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <Skeleton className="h-10 w-64 bg-white/20 mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl bg-white/20" />
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar skeleton */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            </div>

            {/* Main chat area skeleton */}
            <div className="lg:col-span-9">
              <div className="bg-card rounded-xl shadow-sm border overflow-hidden p-6">
                <div className="space-y-6">
                  <Skeleton className="h-24 w-full" />
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-20 w-full max-w-[80%]" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-14 w-full mt-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

