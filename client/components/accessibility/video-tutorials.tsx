"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Play, Volume2, Subtitles, Settings } from "lucide-react"

export function VideoTutorials() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium mb-4">Video Tutorials</h3>
        <p className="text-muted-foreground mb-6">
          Watch these tutorials to learn how to use accessibility features effectively.
        </p>

        <Tabs defaultValue="screen-reader">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="screen-reader">Screen Readers</TabsTrigger>
            <TabsTrigger value="keyboard">Keyboard Navigation</TabsTrigger>
            <TabsTrigger value="settings">Accessibility Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="screen-reader">
            <div className="space-y-4">
              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 flex items-center justify-center">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-white">
                      <Play className="h-5 w-5" />
                    </Button>
                    <div className="text-sm">0:00 / 5:32</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white">
                      <Volume2 className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Subtitles className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium">Using Screen Readers with EmpowerWork</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  This tutorial demonstrates how to navigate the EmpowerWork platform using popular screen readers like
                  JAWS, NVDA, and VoiceOver.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 1: Getting Started</h5>
                    <p className="text-xs text-muted-foreground">Basic navigation and commands</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 0:00
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 2: Job Search</h5>
                    <p className="text-xs text-muted-foreground">Finding and filtering job listings</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 1:45
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 3: Applications</h5>
                    <p className="text-xs text-muted-foreground">Completing job applications</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 3:20
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keyboard">
            <div className="space-y-4">
              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 flex items-center justify-center">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-white">
                      <Play className="h-5 w-5" />
                    </Button>
                    <div className="text-sm">0:00 / 4:15</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white">
                      <Volume2 className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Subtitles className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium">Keyboard Navigation Techniques</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn how to navigate the entire EmpowerWork platform without using a mouse.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 1: Basic Navigation</h5>
                    <p className="text-xs text-muted-foreground">Tab, Enter, and arrow keys</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 0:00
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 2: Shortcuts</h5>
                    <p className="text-xs text-muted-foreground">Keyboard shortcuts for efficiency</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 1:30
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 3: Forms</h5>
                    <p className="text-xs text-muted-foreground">Completing forms with keyboard</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 2:45
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 flex items-center justify-center">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-white">
                      <Play className="h-5 w-5" />
                    </Button>
                    <div className="text-sm">0:00 / 3:48</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white">
                      <Volume2 className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Subtitles className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium">Customizing Accessibility Settings</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn how to personalize your EmpowerWork experience with accessibility settings.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 1: Display Settings</h5>
                    <p className="text-xs text-muted-foreground">Contrast, text size, and themes</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 0:00
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 2: Input Methods</h5>
                    <p className="text-xs text-muted-foreground">Voice, keyboard, and switch controls</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 1:15
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-sm mb-1">Chapter 3: Notifications</h5>
                    <p className="text-xs text-muted-foreground">Customizing alerts and reminders</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                      Jump to 2:30
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

