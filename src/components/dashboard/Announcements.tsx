import { ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  isNew: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Assistive Tech Workshop Date Change",
    content: "The Assistive Tech Workshop has been rescheduled to May 10th at 10:00 AM. Please update your calendars accordingly.",
    timestamp: "2 hours ago",
    isNew: true,
  },
  {
    id: "2",
    title: "Reminder: Bake Sale Volunteers Needed",
    content: "We still need volunteers for the upcoming bake sale. Please sign up if you are available!",
    timestamp: "5 hours ago",
    isNew: true,
  },
  {
    id: "3",
    title: "Monthly Newsletter Published",
    content: "Check out our March newsletter featuring highlights from the Memory Walk event.",
    timestamp: "1 day ago",
    isNew: false,
  },
];

export function Announcements() {
  return (
    <div className="dashboard-section animate-slide-in-right" style={{ animationDelay: "500ms" }}>
      <div className="section-header">
        <h2 className="section-title">Announcements</h2>
        <span className="badge-info flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Posted 2h
        </span>
      </div>

      <div className="divide-y divide-border">
        {mockAnnouncements.map((announcement, index) => (
          <div
            key={announcement.id}
            className="p-4 transition-colors hover:bg-muted/30"
            style={{ animationDelay: `${600 + index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-foreground">
                {announcement.isNew && (
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent"></span>
                )}
                {announcement.title}
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {announcement.content}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{announcement.timestamp}</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-info hover:text-info">
                Read More
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <Button variant="outline" className="w-full">
          View All Announcements
        </Button>
      </div>
    </div>
  );
}
