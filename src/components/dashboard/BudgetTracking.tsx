import { useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

type BudgetTab = "summary" | "expenses" | "funding" | "sponsorships";

const budgetTabs: { id: BudgetTab; label: string }[] = [
  { id: "summary", label: "Budget Summary" },
  { id: "expenses", label: "Expense Log" },
  { id: "funding", label: "Funding Sources" },
  { id: "sponsorships", label: "Sponsorships" },
];

const financialAccounts = [
  { label: "Event Budget Balance", amount: 1120.0, color: "text-info" },
  { label: "Grants Received", amount: 3000.0, color: "text-info" },
  { label: "Donations & Sponsorships", amount: 772.0, color: "text-info" },
  { label: "Total Funds Available", amount: 2723.0, color: "text-info font-bold" },
];

const budgetAllocation = [
  { category: "Event Supplies", projected: 720.0, actual: 162.0, variance: 558.0 },
  { category: "Marketing Materials", projected: 100.0, actual: 45.50, variance: 55.0 },
  { category: "Dashboard Costs", projected: 400.0, actual: 0.0, variance: 400.0 },
];

const recentSponsors = [
  "Level Up Math Academy",
  "Makers Making Change",
  "Kernels Popcorn",
  "New India Sweets & Restaurant",
  "Workday",
];

const inKindDonations = [
  "Event Supplies",
  "Sound Equipment",
  "Gift Baskets",
  "Printing Services",
];

const expenses = [
  { date: "2025-11-03", description: "Workshop Materials", category: "Event Supplies", amount: 115.50 },
  { date: "2025-10-01", description: "Poster Printing", category: "Marketing", amount: 47.00 },
  { date: "2025-08-29", description: "Food and Drinks", category: "Event Supplies", amount: 220.00 },
  { date: "", description: "Miscellaneous", category: "Marketing", amount: 75.00 },
];

const fundingSources = [
  { source: "Makers Making Change Grant", amount: 3000.0, status: "Received", date: "2025-08-30" },
  { source: "Workday", amount: 400.0, status: "Received", date: "2025-09-20" },
  { source: "Youth Creativity Fund", amount: 1000.0, status: "Pending", date: "2026-01-29" },
  { source: "Online Donations", amount: 336.0, status: "Ongoing", date: "" },
];

export function BudgetTracking() {
  const [activeTab, setActiveTab] = useState<BudgetTab>("summary");

  const fundingGoal = 3000;
  const amountRaised = 2500;
  const progressPercent = (amountRaised / fundingGoal) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sub-navigation tabs */}
      <div className="dashboard-section">
        <div className="border-b border-border">
          <div className="flex gap-0 overflow-x-auto">
            {budgetTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
                  activeTab === tab.id
                    ? "border-info text-info"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Financial Accounts */}
          <div className="lg:col-span-2 dashboard-section p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Financial Accounts</h3>
            <div className="space-y-4">
              {financialAccounts.map((account, index) => (
                <div
                  key={account.label}
                  className={cn(
                    "flex justify-between items-center pb-3",
                    index < financialAccounts.length - 1 && "border-b border-border"
                  )}
                >
                  <span className={cn("text-foreground", account.color)}>{account.label}:</span>
                  <span className="font-semibold text-foreground">
                    ${account.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fundraising Progress */}
          <div className="dashboard-section p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Fundraising Progress</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Funding Goal: ${fundingGoal.toLocaleString()}
            </p>
            <Progress value={progressPercent} className="h-3 mb-3" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                ${amountRaised.toLocaleString()} <span className="text-base font-normal text-muted-foreground">Raised</span>
              </p>
              <p className="text-sm text-muted-foreground">{Math.round(progressPercent)}% of Goal</p>
            </div>
          </div>

          {/* Budget Allocation */}
          <div className="lg:col-span-2 dashboard-section p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Budget Allocation</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium text-right">Projected Budget</th>
                    <th className="pb-3 font-medium text-right">Actual Spent</th>
                    <th className="pb-3 font-medium text-right">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {budgetAllocation.map((item) => (
                    <tr key={item.category} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 text-foreground">{item.category}</td>
                      <td className="py-3 text-right text-foreground">
                        ${item.projected.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 text-right text-foreground">
                        ${item.actual.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 text-right text-success font-medium">
                        ${item.variance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sponsorship Tracking */}
          <div className="dashboard-section p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sponsorship Tracking</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-info mb-2">Recent Sponsors</h4>
                <ul className="space-y-1">
                  {recentSponsors.map((sponsor) => (
                    <li key={sponsor} className="text-sm text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      {sponsor}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-info mb-2">In-Kind Donations</h4>
                <ul className="space-y-1">
                  {inKindDonations.map((donation) => (
                    <li key={donation} className="text-sm text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      {donation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "expenses" && (
        <div className="dashboard-section p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Expense Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expenses.map((expense, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 text-muted-foreground text-sm">
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 text-foreground">{expense.description}</td>
                    <td className="py-3">
                      <span className="badge-info text-xs">{expense.category}</span>
                    </td>
                    <td className="py-3 text-right text-foreground font-medium">
                      ${expense.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "funding" && (
        <div className="dashboard-section p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Funding Sources</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {fundingSources.map((source, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 text-foreground font-medium">{source.source}</td>
                    <td className="py-3 text-right text-foreground">
                      ${source.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-md",
                          source.status === "Received" && "bg-success/10 text-success",
                          source.status === "Pending" && "bg-warning/10 text-warning",
                          source.status === "Ongoing" && "bg-info/10 text-info"
                        )}
                      >
                        {source.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground text-sm">
                      {source.date
                        ? new Date(source.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "sponsorships" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="dashboard-section p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Current Sponsors</h3>
            <div className="space-y-3">
              {recentSponsors.map((sponsor) => (
                <div key={sponsor} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                  <span className="font-medium text-foreground">{sponsor}</span>
                  <span className="badge-success text-xs">Active</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dashboard-section p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">In-Kind Contributions</h3>
            <div className="space-y-3">
              {inKindDonations.map((donation) => (
                <div key={donation} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                  <span className="font-medium text-foreground">{donation}</span>
                  <span className="text-sm text-muted-foreground">Donated</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}