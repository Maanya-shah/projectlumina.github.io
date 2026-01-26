import { Users, Clock, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  subtext?: string;
  delay?: number;
}

function MetricCard({ icon, label, value, suffix = "", subtext, delay = 0 }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1000;
      const steps = 30;
      const increment = value / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="metric-card group animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        {subtext && (
          <span className="badge-info text-xs">{subtext}</span>
        )}
      </div>
      <div className="mt-4">
        <p className="metric-label">{label}</p>
        <p className="metric-value">
          {displayValue.toLocaleString()}{suffix}
        </p>
      </div>
    </div>
  );
}

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        icon={<Users className="h-6 w-6" />}
        label="Total Volunteers"
        value={104}
        delay={0}
      />
      <MetricCard
        icon={<Clock className="h-6 w-6" />}
        label="Total Hours Logged"
        value={639}
        delay={100}
      />
      <MetricCard
        icon={<TrendingUp className="h-6 w-6" />}
        label="New Signups This Month"
        value={21}
        subtext="14 Pending"
        delay={200}
      />
      <MetricCard
        icon={<Calendar className="h-6 w-6" />}
        label="Upcoming Events"
        value={3}
        delay={300}
      />
    </div>
  );
}
