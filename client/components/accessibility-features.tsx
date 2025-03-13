import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Eye, Ear, Brain, Clock, MousePointer, Keyboard, MessageSquare, FileText, Volume2 } from "lucide-react"

interface AccessibilityFeatureProps {
  features: string[]
  className?: string
}

// Map of feature names to their respective icons
const featureIcons: Record<string, React.ReactNode> = {
  "Screen Reader Compatible": <Eye className="h-3.5 w-3.5" />,
  "Closed Captions": <FileText className="h-3.5 w-3.5" />,
  "Audio Descriptions": <Volume2 className="h-3.5 w-3.5" />,
  "Keyboard Navigable": <Keyboard className="h-3.5 w-3.5" />,
  "Alternative Navigation": <MousePointer className="h-3.5 w-3.5" />,
  "Transcripts Available": <MessageSquare className="h-3.5 w-3.5" />,
  "Self-Paced": <Clock className="h-3.5 w-3.5" />,
  "Cognitive Aids": <Brain className="h-3.5 w-3.5" />,
  "Hearing Accessible": <Ear className="h-3.5 w-3.5" />,
}

export function AccessibilityFeatures({ features, className }: AccessibilityFeatureProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {features.map((feature) => (
        <Badge key={feature} variant="outline" className="flex items-center gap-1 bg-muted/50">
          {featureIcons[feature] || null}
          {feature}
        </Badge>
      ))}
    </div>
  )
}

