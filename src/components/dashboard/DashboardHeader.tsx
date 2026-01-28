import { Bell, HelpCircle, User, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type TabType = "overview" | "schedule" | "budget" | "reports";

const navItems: { label: string; id: TabType }[] = [
  { label: "Overview", id: "overview" },
  { label: "Volunteer Schedule", id: "schedule" },
  { label: "Budget Tracking", id: "budget" },
  { label: "Reports", id: "reports" },
];

interface DashboardHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function DashboardHeader({ activeTab, onTabChange }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="mx-auto max-w-7xl">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
              <span className="text-lg font-bold text-accent-foreground">P</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight">Project Lumina</h1>
              <p className="text-xs text-primary-foreground/70">Alzheimer's Awareness Initiative</p>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "nav-link rounded-md",
                  activeTab === item.id && "nav-link-active"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="rounded-full p-2 text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground">
              <HelpCircle className="h-5 w-5" />
            </button>
            <button className="relative rounded-full p-2 text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
            </button>
            <button className="flex items-center gap-2 rounded-full bg-white/10 p-1.5 pl-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/20">
              <span className="hidden sm:inline">Admin</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <User className="h-4 w-4" />
              </div>
            </button>
            <button
              className="rounded-md p-2 text-primary-foreground lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="border-t border-white/10 px-4 py-2 lg:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground",
                  activeTab === item.id && "bg-white/10 text-primary-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
