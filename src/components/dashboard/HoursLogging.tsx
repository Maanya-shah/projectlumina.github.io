import { Clock, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HourEntry {
  id: string;
  volunteerName: string;
  hours: number;
  status: "pending" | "approved" | "rejected";
}

const mockHourEntries: HourEntry[] = [
  { id: "1", volunteerName: "Tapas Udagani", hours: 1.5, status: "pending" },
  { id: "2", volunteerName: "Erika Chiu", hours: 5, status: "pending" },
  { id: "3", volunteerName: "Christina To", hours: 7, status: "pending" },
  { id: "4", volunteerName: "Evan Yousufzai", hours: 8.5, status: "pending" },
];

export function HoursLogging() {
  const totalPendingHours = mockHourEntries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: "550ms" }}>
      <div className="section-header">
        <h2 className="section-title">Hour Assignment</h2>
        <Button size="sm" className="action-button-accent text-xs">
          Assign Hours
        </Button>
      </div>

      {/* Summary */}
      <div className="border-b border-border bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalPendingHours}</p>
            <p className="text-sm text-muted-foreground">Hours Pending Approval</p>
          </div>
        </div>
      </div>

      {/* Entries */}
      <div className="divide-y divide-border">
        {mockHourEntries.map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-muted/30"
            style={{ animationDelay: `${650 + index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
              <span className="font-medium text-foreground">{entry.volunteerName}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">{entry.hours} hrs</span>
              <Button size="sm" className="action-button text-xs">
                Assign
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <Button variant="ghost" className="w-full text-info hover:text-info">
          View All Hour Submissions
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
