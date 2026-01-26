import { Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  volunteersAssigned: number;
  volunteersNeeded: number;
  status: "upcoming" | "ongoing" | "completed";
}

const mockEvents: Event[] = [
  {
    id: "1",
    name: "Memory Care Support Group",
    date: "2025-02-15",
    time: "1:00 PM - 3:00 PM",
    location: "Mississauga",
    volunteersAssigned: 10,
    volunteersNeeded: 10,
    status: "upcoming",
  },
  {
    id: "2",
    name: "Bake Sale Fundraiser",
    date: "2025-03-15",
    time: "9:00 AM - 1:00 PM",
    location: "City Hall",
    volunteersAssigned: 5,
    volunteersNeeded: 10,
    status: "upcoming",
  },
  {
    id: "3",
    name: "Seniors Gala Helper",
    date: "2025-03-22",
    time: "5:00 PM - 9:00 PM",
    location: "Brampton",
    volunteersAssigned: 4,
    volunteersNeeded: 25,
    status: "upcoming",
  },
];

function getStatusBadge(status: Event["status"], assigned: number, needed: number) {
  if (status === "completed") {
    return <span className="badge-success">Completed</span>;
  }
  if (assigned >= needed) {
    return <span className="badge-success">Full</span>;
  }
  return (
    <span className="badge-warning">
      {assigned}/{needed} Slots
    </span>
  );
}

export function EventCoordination() {
  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: "500ms" }}>
      <div className="section-header">
        <h2 className="section-title">Event Coordination</h2>
        <Button variant="ghost" size="sm" className="text-info hover:text-info">
          <Filter className="mr-1.5 h-4 w-4" />
          All Events
        </Button>
      </div>

      <div className="divide-y divide-border">
        {mockEvents.map((event, index) => (
          <div
            key={event.id}
            className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/30"
            style={{ animationDelay: `${600 + index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{event.name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  • {event.time}
                </p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {getStatusBadge(event.status, event.volunteersAssigned, event.volunteersNeeded)}
              <Button size="sm" variant="default" className="action-button text-xs">
                {event.volunteersAssigned >= event.volunteersNeeded ? "View Details" : "Sign Up"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <Button variant="outline" className="w-full">
          View All Events
        </Button>
      </div>
    </div>
  );
}
