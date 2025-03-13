import { Check, AlertCircle, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Status = "complete" | "incomplete" | "partial"

interface ChecklistItemProps {
  title: string
  description: string
  status: Status
  className?: string
}

export function ChecklistItem({ title, description, status, className }: ChecklistItemProps) {
  return (
    <div className={cn("flex items-start gap-4 rounded-lg border p-4", className)}>
      <div className="mt-0.5">
        {status === "complete" && (
          <div className="rounded-full bg-green-500/20 p-1">
            <Check className="h-4 w-4 text-green-600" />
          </div>
        )}
        {status === "incomplete" && (
          <div className="rounded-full bg-red-500/20 p-1">
            <AlertCircle className="h-4 w-4 text-red-600" />
          </div>
        )}
        {status === "partial" && (
          <div className="rounded-full bg-yellow-500/20 p-1">
            <HelpCircle className="h-4 w-4 text-yellow-600" />
          </div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

