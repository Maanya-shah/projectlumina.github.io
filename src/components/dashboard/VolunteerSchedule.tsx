import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  color: "blue" | "green" | "orange" | "red" | "purple" | "teal";
}

interface CalendarDay {
  date: number;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
}

const eventColors = {
  blue: "bg-info text-info-foreground",
  green: "bg-success text-success-foreground",
  orange: "bg-warning text-warning-foreground",
  red: "bg-destructive text-destructive-foreground",
  purple: "bg-primary text-primary-foreground",
  teal: "bg-accent text-accent-foreground",
};

// March 2026 calendar (Sun start)
const marchCalendar: CalendarDay[] = [
  // Week 1 (Mar 1 is Sunday)
  { date: 1, events: [], isCurrentMonth: true },
  { date: 2, events: [{ id: "m1", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 3, events: [{ id: "mp1", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 4, events: [], isCurrentMonth: true },
  { date: 5, events: [{ id: "m2", title: "Admin Meeting", color: "green" }, { id: "mp2", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 6, events: [], isCurrentMonth: true },
  { date: 7, events: [{ id: "m3", title: "COBS Bread Fundraiser", color: "orange" }], isCurrentMonth: true },
  // Week 2
  { date: 8, events: [], isCurrentMonth: true },
  { date: 9, events: [{ id: "m4", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 10, events: [{ id: "mp3", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 11, events: [], isCurrentMonth: true },
  { date: 12, events: [{ id: "m5", title: "Admin Meeting", color: "green" }, { id: "mp4", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 13, events: [], isCurrentMonth: true },
  { date: 14, events: [], isCurrentMonth: true },
  // Week 3
  { date: 15, events: [], isCurrentMonth: true },
  { date: 16, events: [{ id: "m6", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 17, events: [{ id: "mp5", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 18, events: [], isCurrentMonth: true },
  { date: 19, events: [{ id: "m7", title: "Admin Meeting", color: "green" }, { id: "mp6", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 20, events: [], isCurrentMonth: true },
  { date: 21, events: [], isCurrentMonth: true },
  // Week 4
  { date: 22, events: [], isCurrentMonth: true },
  { date: 23, events: [{ id: "m8", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 24, events: [{ id: "m9", title: "Color Run Fundraising Event", color: "orange" }, { id: "mp7", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 25, events: [], isCurrentMonth: true },
  { date: 26, events: [{ id: "m10", title: "Admin Meeting", color: "green" }, { id: "mp8", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 27, events: [], isCurrentMonth: true },
  { date: 28, events: [], isCurrentMonth: true },
  // Week 5
  { date: 29, events: [], isCurrentMonth: true },
  { date: 30, events: [{ id: "m11", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 31, events: [{ id: "mp9", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 1, events: [], isCurrentMonth: false },
  { date: 2, events: [], isCurrentMonth: false },
  { date: 3, events: [], isCurrentMonth: false },
  { date: 4, events: [], isCurrentMonth: false },
];

// April 2026 calendar (Wed start)
const aprilCalendar: CalendarDay[] = [
  // Week 1
  { date: 29, events: [], isCurrentMonth: false },
  { date: 30, events: [], isCurrentMonth: false },
  { date: 31, events: [], isCurrentMonth: false },
  { date: 1, events: [], isCurrentMonth: true },
  { date: 2, events: [{ id: "a1", title: "Admin Meeting", color: "green" }, { id: "ap1", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 3, events: [], isCurrentMonth: true },
  { date: 4, events: [], isCurrentMonth: true },
  // Week 2
  { date: 5, events: [], isCurrentMonth: true },
  { date: 6, events: [{ id: "a2", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 7, events: [{ id: "ap2", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 8, events: [], isCurrentMonth: true },
  { date: 9, events: [{ id: "a3", title: "Admin Meeting", color: "green" }, { id: "ap3", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 10, events: [], isCurrentMonth: true },
  { date: 11, events: [], isCurrentMonth: true },
  // Week 3
  { date: 12, events: [], isCurrentMonth: true },
  { date: 13, events: [{ id: "a4", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 14, events: [{ id: "ap4", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 15, events: [], isCurrentMonth: true },
  { date: 16, events: [{ id: "a5", title: "Admin Meeting", color: "green" }, { id: "ap5", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 17, events: [], isCurrentMonth: true },
  { date: 18, events: [], isCurrentMonth: true },
  // Week 4
  { date: 19, events: [], isCurrentMonth: true },
  { date: 20, events: [{ id: "a6", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 21, events: [{ id: "ap6", title: "Popcorn Sales", color: "orange" }, { id: "a11", title: "Assistive Tech Workshop", color: "purple" }], isCurrentMonth: true },
  { date: 22, events: [], isCurrentMonth: true },
  { date: 23, events: [{ id: "a7", title: "Admin Meeting", color: "green" }, { id: "ap7", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 24, events: [], isCurrentMonth: true },
  { date: 25, events: [], isCurrentMonth: true },
  // Week 5
  { date: 26, events: [], isCurrentMonth: true },
  { date: 27, events: [{ id: "a8", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 28, events: [{ id: "ap8", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 29, events: [], isCurrentMonth: true },
  { date: 30, events: [{ id: "a10", title: "Admin Meeting", color: "green" }, { id: "ap9", title: "Popcorn Sales", color: "orange" }], isCurrentMonth: true },
  { date: 1, events: [], isCurrentMonth: false },
  { date: 2, events: [], isCurrentMonth: false },
];

const months = [
  { label: "March 2026", calendar: marchCalendar },
  { label: "April 2026", calendar: aprilCalendar },
];

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function VolunteerSchedule() {
  const [monthIndex, setMonthIndex] = useState(0);
  const currentMonth = months[monthIndex];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Calendar Header */}
      <div className="dashboard-section">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground">{currentMonth.label}</h2>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
                disabled={monthIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
                disabled={monthIndex === months.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setMonthIndex(0)}>Today</Button>
            <Button variant="default" size="sm">+ Add Event</Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 border-b border-border">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {currentMonth.calendar.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] p-2 border-r border-b border-border last:border-r-0",
                  !day.isCurrentMonth ? "bg-muted/30" : "bg-background"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    !day.isCurrentMonth ? "text-muted-foreground/50" : "text-foreground"
                  )}
                >
                  {day.date}
                </span>
                <div className="mt-1 space-y-1">
                  {day.events.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity",
                        eventColors[event.color]
                      )}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dashboard-section p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Meetings</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-info/10 border border-info/20">
              <div className="w-2 h-2 rounded-full bg-info" />
              <div>
                <p className="font-medium text-foreground">Team Meeting</p>
                <p className="text-sm text-muted-foreground">Every Monday at 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success" />
              <div>
                <p className="font-medium text-foreground">Admin Meeting</p>
                <p className="text-sm text-muted-foreground">Every Thursday at 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Event</h3>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning text-warning-foreground font-bold">
                30
              </div>
              <div>
                <p className="font-semibold text-foreground">Walk for Alzheimer's</p>
                <p className="text-sm text-muted-foreground mt-1">Saturday, May 30, 2026</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 1:00 PM • Community Center</p>
                <div className="mt-2 flex gap-2">
                  <span className="badge-warning text-xs">Volunteers Needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="dashboard-section p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Event Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-info" />
            <span className="text-sm text-foreground">Team Meetings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success" />
            <span className="text-sm text-foreground">Admin Meetings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-warning" />
            <span className="text-sm text-foreground">Events & Fundraisers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span className="text-sm text-foreground">Training</span>
          </div>
        </div>
      </div>
    </div>
  );
}
