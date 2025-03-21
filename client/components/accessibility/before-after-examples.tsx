"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

export function BeforeAfterExamples() {
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium mb-4">Before & After: Accessibility Improvements</h3>
        <p className="text-muted-foreground mb-6">See how accessibility improvements transform the user experience.</p>

        <Tabs defaultValue="color-contrast">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="color-contrast">Color Contrast</TabsTrigger>
            <TabsTrigger value="form-labels">Form Labels</TabsTrigger>
            <TabsTrigger value="alt-text">Alt Text</TabsTrigger>
          </TabsList>

          <TabsContent value="color-contrast">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Drag the slider to compare low contrast text (inaccessible) with high contrast text (accessible).
              </p>

              <div className="relative h-[200px] overflow-hidden border rounded-md">
                {/* Before - Low Contrast */}
                <div className="absolute inset-0 p-6 bg-gray-100">
                  <h4 className="text-xl font-medium mb-3 text-gray-300">Welcome to EmpowerWork</h4>
                  <p className="text-gray-400 mb-4">
                    Our platform connects people with disabilities to meaningful employment opportunities and resources.
                  </p>
                  <button className="px-4 py-2 rounded-md bg-gray-300 text-gray-100">Learn More</button>
                </div>

                {/* After - High Contrast */}
                <div
                  className="absolute inset-0 p-6 bg-gray-100 clip-path-slider"
                  style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                >
                  <h4 className="text-xl font-medium mb-3 text-gray-900">Welcome to EmpowerWork</h4>
                  <p className="text-gray-700 mb-4">
                    Our platform connects people with disabilities to meaningful employment opportunities and resources.
                  </p>
                  <button className="px-4 py-2 rounded-md bg-blue-600 text-white">Learn More</button>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <Slider value={[sliderValue]} onValueChange={(value) => setSliderValue(value[0])} max={100} step={1} />

              <div className="flex justify-between text-sm">
                <span>Inaccessible</span>
                <span>Accessible</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="form-labels">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2 text-red-500">❌ Before: Missing Labels</h4>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select your disability</option>
                      <option value="visual">Visual</option>
                      <option value="hearing">Hearing</option>
                      <option value="mobility">Mobility</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
                  <p>
                    <strong>Issues:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    <li>No labels for screen readers</li>
                    <li>Relies only on placeholders</li>
                    <li>No focus indicators</li>
                    <li>No error states</li>
                  </ul>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2 text-green-500">✓ After: Proper Labels</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="disability" className="block text-sm font-medium text-gray-700 mb-1">
                      Disability Type
                    </label>
                    <select
                      id="disability"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select your disability</option>
                      <option value="visual">Visual</option>
                      <option value="hearing">Hearing</option>
                      <option value="mobility">Mobility</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md text-sm">
                  <p>
                    <strong>Improvements:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    <li>Clear, visible labels</li>
                    <li>Proper label-input association</li>
                    <li>Visible focus indicators</li>
                    <li>Semantic HTML structure</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alt-text">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2 text-red-500">❌ Before: Missing Alt Text</h4>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">[Image with no alt text]</p>
                  </div>
                  <div className="p-3 bg-red-50 text-red-800 rounded-md text-sm">
                    <p>
                      <strong>HTML Code:</strong>
                    </p>
                    <pre className="bg-gray-800 text-gray-200 p-2 rounded-md overflow-x-auto">
                      <code>{`<img src="job-fair.jpg">`}</code>
                    </pre>
                    <p className="mt-2">
                      <strong>Screen Reader Output:</strong>
                    </p>
                    <p className="italic">"Image"</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2 text-green-500">✓ After: Descriptive Alt Text</h4>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">[Same image with alt text]</p>
                  </div>
                  <div className="p-3 bg-green-50 text-green-800 rounded-md text-sm">
                    <p>
                      <strong>HTML Code:</strong>
                    </p>
                    <pre className="bg-gray-800 text-gray-200 p-2 rounded-md overflow-x-auto">
                      <code>{`<img 
  src="job-fair.jpg" 
  alt="EmpowerWork job fair with employers and job seekers with disabilities networking at booths"
>`}</code>
                    </pre>
                    <p className="mt-2">
                      <strong>Screen Reader Output:</strong>
                    </p>
                    <p className="italic">
                      "EmpowerWork job fair with employers and job seekers with disabilities networking at booths"
                    </p>
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

