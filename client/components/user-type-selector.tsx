"use client"
import { Briefcase, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserTypeSelectorProps {
  value: "job-seeker" | "company"
  onChange: (value: "job-seeker" | "company") => void
  className?: string
}

export function UserTypeSelector({ value, onChange, className }: UserTypeSelectorProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <button
        type="button"
        onClick={() => onChange("job-seeker")}
        className={cn(
          "flex flex-col items-center justify-center rounded-md border-2 p-4 transition-all",
          value === "job-seeker"
            ? "border-primary bg-primary/10 text-primary"
            : "border-muted bg-transparent hover:bg-muted/50",
        )}
      >
        <User className="mb-2 h-6 w-6" />
        <span className="text-sm font-medium">Job Seeker</span>
        <span className="mt-1 text-xs text-muted-foreground">I'm looking for work</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("company")}
        className={cn(
          "flex flex-col items-center justify-center rounded-md border-2 p-4 transition-all",
          value === "company"
            ? "border-primary bg-primary/10 text-primary"
            : "border-muted bg-transparent hover:bg-muted/50",
        )}
      >
        <Briefcase className="mb-2 h-6 w-6" />
        <span className="text-sm font-medium">Company</span>
        <span className="mt-1 text-xs text-muted-foreground">I'm hiring talent</span>
      </button>
    </div>
  )
}

