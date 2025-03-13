"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Type, MousePointer, Volume2, Save } from "lucide-react"

export function AccessibilitySettingsPanel() {
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState("default")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [keyboardOnly, setKeyboardOnly] = useState(false)
  const [autoplay, setAutoplay] = useState(false)

  // This would actually apply the settings in a real implementation
  const saveSettings = () => {
    console.log("Saving settings:", {
      fontSize,
      contrast,
      reducedMotion,
      screenReader,
      keyboardOnly,
      autoplay,
    })
    // Show success message
    alert("Settings saved successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>Customize your experience to meet your accessibility needs</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visual">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visual">
              <Type className="mr-2 h-4 w-4" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="motor">
              <MousePointer className="mr-2 h-4 w-4" />
              Motor
            </TabsTrigger>
            <TabsTrigger value="audio">
              <Volume2 className="mr-2 h-4 w-4" />
              Audio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size">Font Size ({fontSize}%)</Label>
              </div>
              <Slider
                id="font-size"
                min={75}
                max={200}
                step={5}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contrast">Color Contrast</Label>
              <Select value={contrast} onValueChange={setContrast}>
                <SelectTrigger id="contrast">
                  <SelectValue placeholder="Select contrast mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="high-contrast">High Contrast</SelectItem>
                  <SelectItem value="dark-high-contrast">Dark High Contrast</SelectItem>
                  <SelectItem value="low-contrast">Low Contrast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="reduced-motion">Reduced Motion</Label>
                <span className="text-xs text-muted-foreground">Minimize animations and transitions</span>
              </div>
              <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
            </div>
          </TabsContent>

          <TabsContent value="motor" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="keyboard-only">Keyboard Navigation Mode</Label>
                <span className="text-xs text-muted-foreground">Optimize for keyboard-only navigation</span>
              </div>
              <Switch id="keyboard-only" checked={keyboardOnly} onCheckedChange={setKeyboardOnly} />
            </div>

            <div className="space-y-2">
              <Label>Keyboard Shortcuts</Label>
              <div className="rounded-md border">
                <div className="grid grid-cols-2 gap-2 p-4">
                  <div className="text-sm">Search</div>
                  <div className="text-sm font-mono">Ctrl + K</div>
                  <div className="text-sm">Navigation</div>
                  <div className="text-sm font-mono">Tab / Shift+Tab</div>
                  <div className="text-sm">Skip to content</div>
                  <div className="text-sm font-mono">Alt + S</div>
                  <div className="text-sm">Main menu</div>
                  <div className="text-sm font-mono">Alt + M</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
                <span className="text-xs text-muted-foreground">Enhance compatibility with screen readers</span>
              </div>
              <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="autoplay">Disable Autoplay Media</Label>
                <span className="text-xs text-muted-foreground">
                  Prevent videos and audio from playing automatically
                </span>
              </div>
              <Switch id="autoplay" checked={autoplay} onCheckedChange={setAutoplay} />
            </div>
          </TabsContent>
        </Tabs>

        <Button className="mt-6 w-full" onClick={saveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}

