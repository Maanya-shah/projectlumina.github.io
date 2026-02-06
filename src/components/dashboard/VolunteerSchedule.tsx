import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// February 2025 calendar with Monday meetings and workshop on 23rd
const februaryCalendar: CalendarDay[] = [
  // Week 1 (Jan 26 - Feb 1)
  { date: 25, events: [], isCurrentMonth: false },
  { date: 26, events: [], isCurrentMonth: false },
  { date: 27, events: [], isCurrentMonth: false },
  { date: 28, events: [], isCurrentMonth: false },
  { date: 29, events: [], isCurrentMonth: false },
  { date: 30, events: [], isCurrentMonth: false },
  { date: 31, events: [], isCurrentMonth: true },
  // Week 2 (Feb 2 - Feb 8)
  { date: 1, events: [], isCurrentMonth: true },
  { date: 2, events: [{ id: "1", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 3, events: [], isCurrentMonth: true },
  { date: 4, events: [], isCurrentMonth: true },
  { date: 5, events: [{ id: "2", title: "Admin Meeting", color: "green" }], isCurrentMonth: true },
  { date: 6, events: [], isCurrentMonth: true },
  { date: 7, events: [], isCurrentMonth: true },
  // Week 3 (Feb 9 - Feb 15)
  { date: 8, events: [], isCurrentMonth: true },
  { date: 9, events: [{ id: "3", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 10, events: [], isCurrentMonth: true },
  { date: 11, events: [], isCurrentMonth: true },
  { date: 12, events: [{ id: "4", title: "Admin Meeting", color: "green" }], isCurrentMonth: true },
  { date: 13, events: [{ id: "5", title: "Volunteer Training", color: "purple" }], isCurrentMonth: true },
  { date: 14, events: [], isCurrentMonth: true },
  // Week 4 (Feb 16 - Feb 22)
  { date: 15, events: [], isCurrentMonth: true },
  { date: 16, events: [{ id: "6", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 17, events: [], isCurrentMonth: true },
  { date: 18, events: [], isCurrentMonth: true },
  { date: 19, events: [{ id: "7", title: "Admin Meeting", color: "green" }], isCurrentMonth: true },
  { date: 20, events: [], isCurrentMonth: true },
  { date: 21, events: [], isCurrentMonth: true },
  // Week 5 (Feb 23 - Mar 1)
  { date: 22, events: [{ id: "8", title: "Alzheimer's Awareness Workshop", color: "orange" }], isCurrentMonth: true },
  { date: 23, events: [{ id: "9", title: "Weekly Team Meeting", color: "blue" }], isCurrentMonth: true },
  { date: 24, events: [], isCurrentMonth: true },
  { date: 25, events: [], isCurrentMonth: true },
  { date: 26, events: [{ id: "10", title: "Admin Meeting", color: "green" }], isCurrentMonth: true },
  { date: 27, events: [], isCurrentMonth: true },
  { date: 28, events: [], isCurrentMonth: false },
];

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function VolunteerSchedule() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Calendar Header */}
      <div className="dashboard-section">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground">February 2026</h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="default" size="sm">+ Add Event</Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          {/* Week Days Header */}
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

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {februaryCalendar.map((day, index) => (
              <div
                key={index}
                className={`min-h-[100px] p-2 border-r border-b border-border last:border-r-0 ${
                  !day.isCurrentMonth ? "bg-muted/30" : "bg-background"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    !day.isCurrentMonth ? "text-muted-foreground/50" : "text-foreground"
                  }`}
                >
                  {day.date}
                </span>
                <div className="mt-1 space-y-1">
                  {day.events.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${eventColors[event.color]}`}
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
          <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Workshop</h3>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning text-warning-foreground font-bold">
                23
              </div>
              <div>
                <p className="font-semibold text-foreground">Alzheimer's Awareness Workshop</p>
                <p className="text-sm text-muted-foreground mt-1">Sunday, February 22, 2025</p>
                <p className="text-sm text-muted-foreground">10:00 AM - 2:00 PM • Community Center</p>
                <div className="mt-2 flex gap-2">
                  <span className="badge-warning text-xs">12 Volunteers Needed</span>
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
            <span className="text-sm text-foreground">Workshops</span>
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