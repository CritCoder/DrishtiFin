"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Filter } from "lucide-react"
import { format, subDays, subMonths } from "date-fns"

export type DateRange = {
  from: Date
  to: Date
  label: string
}

const quickRanges: DateRange[] = [
  {
    from: subDays(new Date(), 30),
    to: new Date(),
    label: "Last 30 days"
  },
  {
    from: subMonths(new Date(), 3),
    to: new Date(),
    label: "Last 3 months"
  },
  {
    from: subMonths(new Date(), 6),
    to: new Date(),
    label: "Last 6 months"
  },
  {
    from: subMonths(new Date(), 12),
    to: new Date(),
    label: "Last 12 months"
  }
]

interface DashboardDateFilterProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

export function DashboardDateFilter({ dateRange, onDateRangeChange }: DashboardDateFilterProps) {
  const [showCalendar, setShowCalendar] = useState(false)

  const handleQuickRange = (range: DateRange) => {
    onDateRangeChange(range)
    setShowCalendar(false)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
          </div>
          
          {/* Quick Range Buttons */}
          <div className="flex flex-wrap gap-2">
            {quickRanges.map((range) => (
              <Button
                key={range.label}
                variant={dateRange.label === range.label ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickRange(range)}
                className="text-xs"
              >
                {range.label}
              </Button>
            ))}
          </div>

          {/* Custom Date Picker */}
          <Popover open={showCalendar} onOpenChange={setShowCalendar}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <CalendarIcon className="w-3 h-3 mr-2" />
                Custom Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-3 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div className="text-sm font-medium">Custom Date Range</div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium mb-2 block">From Date</Label>
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => date && onDateRangeChange({...dateRange, from: date, label: 'Custom'})}
                      className="rounded-md border w-full"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-2 block">To Date</Label>
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => date && onDateRangeChange({...dateRange, to: date, label: 'Custom'})}
                      className="rounded-md border w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2 border-t">
                  <Button size="sm" onClick={() => setShowCalendar(false)}>
                    Apply Range
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Current Range Display */}
          <Badge variant="secondary" className="ml-auto">
            {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd, yyyy')}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export { quickRanges }