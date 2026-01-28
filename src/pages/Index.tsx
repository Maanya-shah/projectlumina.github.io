import { useState } from "react";
import {
  DashboardHeader,
  MetricsCards,
  VolunteerDirectory,
  EventCoordination,
  TasksAlerts,
  Announcements,
  HoursLogging,
  VolunteerSchedule,
  BudgetTracking,
  Reports,
} from "@/components/dashboard";
import type { TabType } from "@/components/dashboard/DashboardHeader";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Page Title */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                Volunteer
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="text-info hover:underline cursor-pointer">
                  Alzheimer Society of Peel
                </span>
                {" / "}
                Volunteer Management
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <span className="font-semibold text-foreground">Workday</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        {activeTab === "overview" && (
          <>
            {/* Metrics Cards */}
            <section className="mb-6">
              <MetricsCards />
            </section>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column - Volunteer Directory */}
              <div className="lg:col-span-1">
                <VolunteerDirectory />
              </div>

              {/* Middle Column - Events & Hours */}
              <div className="space-y-6 lg:col-span-1">
                <EventCoordination />
                <HoursLogging />
              </div>

              {/* Right Column - Tasks, Alerts & Announcements */}
              <div className="space-y-6 lg:col-span-1">
                <TasksAlerts />
                <Announcements />
              </div>
            </div>
          </>
        )}

        {activeTab === "schedule" && <VolunteerSchedule />}

        {activeTab === "budget" && <BudgetTracking />}

        {activeTab === "reports" && <Reports />}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 Project Lumina. Alzheimer's Awareness Initiative.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
