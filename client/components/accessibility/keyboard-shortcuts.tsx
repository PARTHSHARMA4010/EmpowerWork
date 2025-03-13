import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function KeyboardShortcuts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyboard Shortcuts</CardTitle>
        <CardDescription>Use these keyboard shortcuts to navigate the platform efficiently</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="navigation">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>

          <TabsContent value="navigation" className="pt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="text-sm font-medium">Skip to main content</div>
                <div className="text-sm font-mono">Alt + 1</div>

                <div className="text-sm font-medium">Skip to navigation</div>
                <div className="text-sm font-mono">Alt + 2</div>

                <div className="text-sm font-medium">Skip to footer</div>
                <div className="text-sm font-mono">Alt + 3</div>

                <div className="text-sm font-medium">Go to home page</div>
                <div className="text-sm font-mono">Alt + H</div>

                <div className="text-sm font-medium">Go to job board</div>
                <div className="text-sm font-mono">Alt + J</div>

                <div className="text-sm font-medium">Go to training</div>
                <div className="text-sm font-mono">Alt + T</div>

                <div className="text-sm font-medium">Go to accessibility settings</div>
                <div className="text-sm font-mono">Alt + A</div>

                <div className="text-sm font-medium">Open search</div>
                <div className="text-sm font-mono">Ctrl + K</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="pt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="text-sm font-medium">Apply for job</div>
                <div className="text-sm font-mono">Alt + P</div>

                <div className="text-sm font-medium">Save job</div>
                <div className="text-sm font-mono">Alt + S</div>

                <div className="text-sm font-medium">Enroll in course</div>
                <div className="text-sm font-mono">Alt + E</div>

                <div className="text-sm font-medium">Submit form</div>
                <div className="text-sm font-mono">Alt + Enter</div>

                <div className="text-sm font-medium">Cancel/Close dialog</div>
                <div className="text-sm font-mono">Esc</div>

                <div className="text-sm font-medium">Print page</div>
                <div className="text-sm font-mono">Ctrl + P</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accessibility" className="pt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="text-sm font-medium">Increase text size</div>
                <div className="text-sm font-mono">Ctrl + Plus</div>

                <div className="text-sm font-medium">Decrease text size</div>
                <div className="text-sm font-mono">Ctrl + Minus</div>

                <div className="text-sm font-medium">Reset text size</div>
                <div className="text-sm font-mono">Ctrl + 0</div>

                <div className="text-sm font-medium">Toggle high contrast</div>
                <div className="text-sm font-mono">Alt + C</div>

                <div className="text-sm font-medium">Toggle screen reader mode</div>
                <div className="text-sm font-mono">Alt + R</div>

                <div className="text-sm font-medium">Open accessibility menu</div>
                <div className="text-sm font-mono">Alt + A</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

