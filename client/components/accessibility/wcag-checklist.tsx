"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChecklistItem } from "./checklist-item"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Sample WCAG checklist data
const wcagChecklist = {
  perceivable: [
    {
      id: "1.1.1",
      title: "Non-text Content",
      description: "All non-text content has a text alternative that serves the equivalent purpose.",
      status: "complete" as const,
    },
    {
      id: "1.2.1",
      title: "Audio-only and Video-only",
      description: "Provide alternatives for time-based media.",
      status: "complete" as const,
    },
    {
      id: "1.2.2",
      title: "Captions",
      description: "Captions are provided for all prerecorded audio content in synchronized media.",
      status: "complete" as const,
    },
    {
      id: "1.3.1",
      title: "Info and Relationships",
      description:
        "Information, structure, and relationships conveyed through presentation can be programmatically determined.",
      status: "complete" as const,
    },
    {
      id: "1.3.2",
      title: "Meaningful Sequence",
      description:
        "When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",
      status: "complete" as const,
    },
    {
      id: "1.3.3",
      title: "Sensory Characteristics",
      description:
        "Instructions provided for understanding and operating content do not rely solely on sensory characteristics.",
      status: "complete" as const,
    },
    {
      id: "1.4.1",
      title: "Use of Color",
      description: "Color is not used as the only visual means of conveying information.",
      status: "complete" as const,
    },
    {
      id: "1.4.2",
      title: "Audio Control",
      description:
        "If any audio plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume.",
      status: "complete" as const,
    },
  ],
  operable: [
    {
      id: "2.1.1",
      title: "Keyboard",
      description: "All functionality is available from a keyboard.",
      status: "complete" as const,
    },
    {
      id: "2.1.2",
      title: "No Keyboard Trap",
      description: "Keyboard focus can be moved away from a component using only a keyboard.",
      status: "complete" as const,
    },
    {
      id: "2.2.1",
      title: "Timing Adjustable",
      description: "Users are warned of time limits and given options to extend them.",
      status: "partial" as const,
    },
    {
      id: "2.2.2",
      title: "Pause, Stop, Hide",
      description:
        "For moving, blinking, scrolling, or auto-updating information, there is a mechanism for the user to pause, stop, or hide it.",
      status: "complete" as const,
    },
    {
      id: "2.3.1",
      title: "Three Flashes or Below",
      description: "Web pages do not contain anything that flashes more than three times in any one second period.",
      status: "complete" as const,
    },
    {
      id: "2.4.1",
      title: "Bypass Blocks",
      description: "A mechanism is available to bypass blocks of content that are repeated on multiple web pages.",
      status: "complete" as const,
    },
    {
      id: "2.4.2",
      title: "Page Titled",
      description: "Web pages have titles that describe topic or purpose.",
      status: "complete" as const,
    },
    {
      id: "2.4.3",
      title: "Focus Order",
      description: "Components receive focus in an order that preserves meaning and operability.",
      status: "complete" as const,
    },
  ],
  understandable: [
    {
      id: "3.1.1",
      title: "Language of Page",
      description: "The default human language of each web page can be programmatically determined.",
      status: "complete" as const,
    },
    {
      id: "3.1.2",
      title: "Language of Parts",
      description: "The human language of each passage or phrase can be programmatically determined.",
      status: "partial" as const,
    },
    {
      id: "3.2.1",
      title: "On Focus",
      description: "When any component receives focus, it does not initiate a change of context.",
      status: "complete" as const,
    },
    {
      id: "3.2.2",
      title: "On Input",
      description:
        "Changing the setting of any user interface component does not automatically cause a change of context.",
      status: "complete" as const,
    },
    {
      id: "3.3.1",
      title: "Error Identification",
      description:
        "If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.",
      status: "complete" as const,
    },
    {
      id: "3.3.2",
      title: "Labels or Instructions",
      description: "Labels or instructions are provided when content requires user input.",
      status: "complete" as const,
    },
  ],
  robust: [
    {
      id: "4.1.1",
      title: "Parsing",
      description:
        "In content implemented using markup languages, elements have complete start and end tags, are nested according to their specifications, and do not contain duplicate attributes.",
      status: "complete" as const,
    },
    {
      id: "4.1.2",
      title: "Name, Role, Value",
      description:
        "For all user interface components, the name and role can be programmatically determined; states, properties, and values can be programmatically set; and notification of changes to these items is available to user agents.",
      status: "partial" as const,
    },
  ],
}

export function WCAGChecklist() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter checklist items based on search query
  const filterItems = (items: Array<{ id: string; title: string; description: string; status: "complete" | "partial" }>) => {
    if (!searchQuery) return items

    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search WCAG criteria..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="perceivable">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="perceivable">Perceivable</TabsTrigger>
          <TabsTrigger value="operable">Operable</TabsTrigger>
          <TabsTrigger value="understandable">Understandable</TabsTrigger>
          <TabsTrigger value="robust">Robust</TabsTrigger>
        </TabsList>

        <TabsContent value="perceivable" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Information and user interface components must be presentable to users in ways they can perceive.
          </p>
          {filterItems(wcagChecklist.perceivable).map((item) => (
            <ChecklistItem
              key={item.id}
              title={`${item.id}: ${item.title}`}
              description={item.description}
              status={item.status}
            />
          ))}
        </TabsContent>

        <TabsContent value="operable" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            User interface components and navigation must be operable.
          </p>
          {filterItems(wcagChecklist.operable).map((item) => (
            <ChecklistItem
              key={item.id}
              title={`${item.id}: ${item.title}`}
              description={item.description}
              status={item.status}
            />
          ))}
        </TabsContent>

        <TabsContent value="understandable" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Information and the operation of user interface must be understandable.
          </p>
          {filterItems(wcagChecklist.understandable).map((item) => (
            <ChecklistItem
              key={item.id}
              title={`${item.id}: ${item.title}`}
              description={item.description}
              status={item.status}
            />
          ))}
        </TabsContent>

        <TabsContent value="robust" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Content must be robust enough that it can be interpreted by a wide variety of user agents, including
            assistive technologies.
          </p>
          {filterItems(wcagChecklist.robust).map((item) => (
            <ChecklistItem
              key={item.id}
              title={`${item.id}: ${item.title}`}
              description={item.description}
              status={item.status}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

