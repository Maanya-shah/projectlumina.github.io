import { CheckCircle2, AlertCircle, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  deadline: string;
  priority: "high" | "medium" | "low";
}

interface Alert {
  id: string;
  title: string;
  description: string;
  type: "action" | "reminder" | "info";
  count?: number;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Prepare welcome kits for Memory Walk",
    status: "in-progress",
    deadline: "2025-04-29",
    priority: "high",
  },
  {
    id: "2",
    title: "Confirm RSVPs for Seniors Gala",
    status: "pending",
    deadline: "2025-04-25",
    priority: "medium",
  },
  {
    id: "3",
    title: "Design awareness posters",
    status: "completed",
    deadline: "2025-04-20",
    priority: "low",
  },
];

const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Confirm new volunteer signups",
    description: "11 new volunteers awaiting approval",
    type: "action",
    count: 11,
  },
  {
    id: "2",
    title: "Assistive Tech Workshop reminder",
    description: "9 volunteers need to be reminded",
    type: "reminder",
    count: 9,
  },
];

function getStatusIcon(status: Task["status"]) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case "in-progress":
      return <div className="h-5 w-5 rounded-full border-2 border-info bg-info/20" />;
    default:
      return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />;
  }
}

function getPriorityBadge(priority: Task["priority"]) {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function TasksAlerts() {
  return (
    <div className="space-y-4">
      {/* Tasks Section */}
      <div className="dashboard-section animate-fade-in" style={{ animationDelay: "600ms" }}>
        <div className="section-header">
          <h2 className="section-title">My Tasks</h2>
          <Button variant="ghost" size="sm" className="text-info hover:text-info">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="divide-y divide-border">
          {mockTasks.map((task, index) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/30"
              style={{ animationDelay: `${700 + index * 50}ms` }}
            >
              {getStatusIcon(task.status)}
              <div className="flex-1">
                <p className={`font-medium ${task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Deadline: {new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <span className={`rounded-md px-2 py-1 text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                {new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="dashboard-section animate-fade-in" style={{ animationDelay: "700ms" }}>
        <div className="section-header">
          <h2 className="section-title">Tasks & Alerts</h2>
        </div>

        <div className="divide-y divide-border">
          {mockAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/30"
              style={{ animationDelay: `${800 + index * 50}ms` }}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {alert.type === "action" ? <AlertCircle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{alert.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <Button size="sm" className="action-button flex-shrink-0 text-xs">
                {alert.type === "action" ? "Review" : "Send Reminder"}
                {alert.count && (
                  <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                    {alert.count}
                  </span>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
