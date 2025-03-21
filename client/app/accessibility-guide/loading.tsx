import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AccessibilityGuideLoading() {
  return (
    <div className="container mx-auto py-6 md:py-10">
      {/* Page Header */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-5 w-[350px]" />
      </div>

      <Skeleton className="h-[1px] w-full my-6" />

      {/* Main Content */}
      <div className="space-y-10">
        {/* Introduction */}
        <section className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <div className="flex gap-3 mt-6">
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[150px]" />
              </div>
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-[200px] mb-2" />
                <Skeleton className="h-4 w-[250px]" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-[250px] mb-4" />
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-[250px] mb-4" />
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Demo */}
        <section className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[350px]" />
          </div>

          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-[200px] mb-4" />
              <Skeleton className="h-4 w-[80%] mb-6" />

              <div className="space-y-6">
                <Skeleton className="h-10 w-full" />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>

                  <Skeleton className="h-[200px] w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-4 w-[400px]" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-[120px]" />
                    <Skeleton className="h-4 w-[150px] mt-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

