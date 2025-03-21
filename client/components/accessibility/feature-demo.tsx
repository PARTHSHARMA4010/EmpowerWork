"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Eye, Volume2, MousePointer, Brain } from "lucide-react"

export function AccessibilityFeatureDemo() {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  const demoTextStyle = {
    fontSize: `${largeText ? fontSize * 1.5 : fontSize}px`,
    lineHeight: largeText ? "1.8" : "1.5",
    transition: reducedMotion ? "none" : "all 0.3s ease",
    color: highContrast ? "#ffffff" : "#333333",
    backgroundColor: highContrast ? "#000000" : "#f8f9fa",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    border: highContrast ? "1px solid #ffffff" : "1px solid #e2e8f0",
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium mb-4">Interactive Accessibility Demo</h3>
        <p className="text-muted-foreground mb-6">
          Adjust the settings below to see how different accessibility features affect content display.
        </p>

        <Tabs defaultValue="visual">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Visual</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger value="motor" className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              <span>Motor</span>
            </TabsTrigger>
            <TabsTrigger value="cognitive" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Cognitive</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="cursor-pointer">
                    High Contrast Mode
                  </Label>
                  <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="large-text" className="cursor-pointer">
                    Large Text Mode
                  </Label>
                  <Switch id="large-text" checked={largeText} onCheckedChange={setLargeText} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                  </div>
                  <Slider
                    id="font-size"
                    min={12}
                    max={24}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reduced-motion" className="cursor-pointer">
                    Reduced Motion
                  </Label>
                  <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
                </div>
              </div>

              <div>
                <div style={demoTextStyle}>
                  <h4 className="text-lg font-medium mb-2" style={{ color: highContrast ? "#ffffff" : "#111827" }}>
                    Sample Content
                  </h4>
                  <p className="mb-4" style={{ color: highContrast ? "#ffffff" : "#4b5563" }}>
                    This text demonstrates how accessibility settings can change the appearance of content to make it
                    more readable for different users.
                  </p>
                  <Button className={highContrast ? "bg-white text-black hover:bg-gray-200" : ""}>Sample Button</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Audio accessibility features help users who are deaf or hard of hearing access content through visual
                alternatives.
              </p>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Video with Captions Demo</h4>
                <div className="aspect-video bg-muted flex items-center justify-center rounded-md mb-2">
                  <p className="text-muted-foreground">Video Player Placeholder</p>
                </div>
                <div className="bg-muted-foreground/10 p-2 rounded-md">
                  <p className="text-sm">[Narrator]: Welcome to EmpowerWork's accessibility features demonstration.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Transcript Example</h4>
                  <div className="h-[200px] overflow-y-auto bg-muted/30 p-3 rounded-md text-sm">
                    <p className="mb-2">
                      <strong>0:00</strong> - Welcome to EmpowerWork's accessibility features.
                    </p>
                    <p className="mb-2">
                      <strong>0:05</strong> - Our platform is designed to be accessible to all users.
                    </p>
                    <p className="mb-2">
                      <strong>0:10</strong> - Let's explore how these features can help you navigate the site.
                    </p>
                    <p className="mb-2">
                      <strong>0:15</strong> - First, we'll look at screen reader compatibility.
                    </p>
                    <p className="mb-2">
                      <strong>0:20</strong> - Then we'll explore keyboard navigation options.
                    </p>
                    <p className="mb-2">
                      <strong>0:25</strong> - Finally, we'll demonstrate color contrast settings.
                    </p>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Visual Notifications</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-blue-100 text-blue-800 rounded-md">
                      <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </span>
                      New message notification (visual indicator)
                    </div>
                    <div className="flex items-center p-2 bg-red-100 text-red-800 rounded-md">
                      <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      Alert notification (visual indicator)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="motor">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Motor accessibility features help users with limited mobility navigate and interact with content using
                alternative input methods.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Home",
                      "Tab",
                      "End",
                      "Enter",
                      "Space",
                      "Esc",
                      "Arrow Up",
                      "Arrow Down",
                      "Arrow Left",
                      "Arrow Right",
                    ].map((key) => (
                      <div
                        key={key}
                        className="border rounded-md p-2 text-center bg-muted/30 hover:bg-primary/20 focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        {key}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Press Tab to navigate through interactive elements, Enter to activate.
                  </p>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Voice Commands</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-muted/30 rounded-md">
                      <p className="text-sm font-medium">Try saying:</p>
                      <ul className="text-sm list-disc list-inside">
                        <li>"Click search"</li>
                        <li>"Scroll down"</li>
                        <li>"Open menu"</li>
                        <li>"Go to jobs"</li>
                      </ul>
                    </div>
                    <Button className="w-full">
                      <Volume2 className="h-4 w-4 mr-2" />
                      Activate Voice Commands
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Alternative Input Methods</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-3 bg-muted/30 rounded-md text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                      <MousePointer className="h-6 w-6 text-primary" />
                    </div>
                    <h5 className="text-sm font-medium">Switch Controls</h5>
                    <p className="text-xs text-muted-foreground">Navigate with adaptive switches</p>
                  </div>

                  <div className="p-3 bg-muted/30 rounded-md text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" x2="12" y1="19" y2="22"></line>
                      </svg>
                    </div>
                    <h5 className="text-sm font-medium">Eye Tracking</h5>
                    <p className="text-xs text-muted-foreground">Control with eye movements</p>
                  </div>

                  <div className="p-3 bg-muted/30 rounded-md text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M9 6v12"></path>
                        <path d="M15 6v12"></path>
                        <path d="M9 6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3"></path>
                        <path d="M15 6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3"></path>
                      </svg>
                    </div>
                    <h5 className="text-sm font-medium">Sip & Puff</h5>
                    <p className="text-xs text-muted-foreground">Control via breath input</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cognitive">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Cognitive accessibility features help users with learning disabilities, ADHD, or autism process
                information more effectively.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Simplified Interface</h4>
                  <div className="relative">
                    <div className="p-4 bg-muted/30 rounded-md">
                      <div className="h-8 w-full bg-muted mb-4 rounded"></div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="h-24 bg-muted rounded"></div>
                        <div className="h-24 bg-muted rounded"></div>
                      </div>
                      <div className="h-8 w-3/4 bg-muted mb-2 rounded"></div>
                      <div className="h-4 w-full bg-muted mb-1 rounded"></div>
                      <div className="h-4 w-full bg-muted mb-1 rounded"></div>
                      <div className="h-4 w-2/3 bg-muted rounded"></div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button variant="outline" size="sm">
                        Simplify
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Reading Assistance</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-md">
                      <p className="text-sm leading-relaxed">
                        <span className="bg-primary/20 px-1 rounded">This</span> text demonstrates how a{" "}
                        <span className="bg-primary/20 px-1 rounded">reading</span> assistance tool can{" "}
                        <span className="bg-primary/20 px-1 rounded">highlight</span> individual words to help with{" "}
                        <span className="bg-primary/20 px-1 rounded">focus</span> and{" "}
                        <span className="bg-primary/20 px-1 rounded">comprehension</span>.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Read Aloud
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        </svg>
                        Dictionary
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Task Breakdown</h4>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Complex tasks are broken down into manageable steps:</p>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-green-100 text-green-800 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      Step 1: Create an account
                    </div>
                    <div className="flex items-center p-2 bg-green-100 text-green-800 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      Step 2: Complete your profile
                    </div>
                    <div className="flex items-center p-2 bg-blue-100 text-blue-800 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Step 3: Search for jobs (in progress)
                    </div>
                    <div className="flex items-center p-2 bg-muted/30 text-muted-foreground rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                      Step 4: Apply for positions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

