import { Download, TrendingUp, Users, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const hoursOverTime = [
  { month: "Sep", hours: 45 },
  { month: "Oct", hours: 78 },
  { month: "Nov", hours: 70 },
  { month: "Dec", hours: 120 },
  { month: "Jan", hours: 156 },
  { month: "Feb", hours: 40 },
];

const volunteerEngagement = [
  { name: "Active (30+ hrs)", value: 8, color: "hsl(142, 76%, 36%)" },
  { name: "Moderate (10-30 hrs)", value: 5, color: "hsl(199, 89%, 48%)" },
  { name: "New (<10 hrs)", value: 5, color: "hsl(45, 93%, 47%)" },
];

const eventPerformance = [
  { event: "Support Groups", volunteers: 12, hours: 48 },
  { event: "Bake Sale", volunteers: 8, hours: 32 },
  { event: "Workshop", volunteers: 15, hours: 60 },
  { event: "Outreach", volunteers: 6, hours: 24 },
  { event: "Gala", volunteers: 20, hours: 80 },
];

const impactMetrics = [
  { label: "Total Volunteer Hours", value: "683", change: "+21%", icon: Clock },
  { label: "Active Volunteers", value: "18", change: "+3", icon: Users },
  { label: "Events Completed", value: "12", change: "+4", icon: Calendar },
  { label: "People Reached", value: "3,500+", change: "+45%", icon: TrendingUp },
];

const retentionData = [
  { category: "Returning Volunteers", percentage: 72 },
  { category: "First-Time Volunteers", percentage: 28 },
];

export function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Impact Analytics</h2>
          <p className="text-sm text-muted-foreground">Comprehensive reports for upper management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Impact Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactMetrics.map((metric) => (
          <div key={metric.label} className="dashboard-section p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <metric.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-success">{metric.change}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours Over Time */}
        <div className="dashboard-section p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Volunteer Hours Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={hoursOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volunteer Engagement Distribution */}
        <div className="dashboard-section p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Volunteer Engagement Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={volunteerEngagement}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {volunteerEngagement.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Performance */}
        <div className="lg:col-span-2 dashboard-section p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Event Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={eventPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="event" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="volunteers" fill="hsl(var(--primary))" name="Volunteers" radius={[0, 4, 4, 0]} />
              <Bar dataKey="hours" fill="hsl(var(--info))" name="Hours" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Retention Rate */}
        <div className="dashboard-section p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Volunteer Retention</h3>
          <div className="space-y-4 mt-8">
            {retentionData.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">{item.category}</span>
                  <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.category === "Returning Volunteers" ? "bg-success" : "bg-info"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
            <p className="text-sm text-foreground">
              <span className="font-semibold">72% retention rate</span> indicates strong volunteer satisfaction and engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="dashboard-section p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Summary Report</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="pb-3 font-medium">Month</th>
                <th className="pb-3 font-medium text-right">Hours Logged</th>
                <th className="pb-3 font-medium text-right">Events</th>
                <th className="pb-3 font-medium text-right">Volunteers</th>
                <th className="pb-3 font-medium text-right">People Reached</th>
                <th className="pb-3 font-medium text-right">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 font-medium text-foreground">February 2026</td>
                <td className="py-3 text-right text-foreground">189</td>
                <td className="py-3 text-right text-foreground">4</td>
                <td className="py-3 text-right text-foreground">18</td>
                <td className="py-3 text-right text-foreground">850</td>
                <td className="py-3 text-right text-success font-medium">+21%</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 font-medium text-foreground">January 2026</td>
                <td className="py-3 text-right text-foreground">156</td>
                <td className="py-3 text-right text-foreground">3</td>
                <td className="py-3 text-right text-foreground">15</td>
                <td className="py-3 text-right text-foreground">720</td>
                <td className="py-3 text-right text-success font-medium">+18%</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 font-medium text-foreground">December 2025</td>
                <td className="py-3 text-right text-foreground">95</td>
                <td className="py-3 text-right text-foreground">2</td>
                <td className="py-3 text-right text-foreground">12</td>
                <td className="py-3 text-right text-foreground">450</td>
                <td className="py-3 text-right text-muted-foreground">-21%</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-3 font-medium text-foreground">November 2025</td>
                <td className="py-3 text-right text-foreground">120</td>
                <td className="py-3 text-right text-foreground">3</td>
                <td className="py-3 text-right text-foreground">14</td>
                <td className="py-3 text-right text-foreground">580</td>
                <td className="py-3 text-right text-success font-medium">+54%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}