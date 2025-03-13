import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ImpactMetricCardProps {
  title: string
  value: string | number
  description?: string
  change?: {
    value: number
    timeframe: string
    positive?: boolean
  }
  icon?: LucideIcon
  iconColor?: string
  iconBgColor?: string
}

export function ImpactMetricCard({
  title,
  value,
  description,
  change,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}: ImpactMetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <div className={`rounded-full p-2 ${iconBgColor}`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {change && (
          <div className="mt-2 flex items-center text-xs">
            <span className={change.positive !== false ? "text-green-500" : "text-red-500"}>
              {change.positive !== false ? "+" : ""}
              {change.value}%
            </span>
            <span className="ml-1 text-muted-foreground">{change.timeframe}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

