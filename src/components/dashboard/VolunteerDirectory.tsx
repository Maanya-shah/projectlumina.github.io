import { Search, Filter, User } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  hoursLogged: number;
}

const mockVolunteers: Volunteer[] = [
  { id: "1", name: "Tapas Udagani", email: "tapasudagani4@gmail.com", joinedDate: "2024-01-15", hoursLogged: 19.5 },
  { id: "2", name: "Erika Chiu", email: "erikapychiu@gmail.com", joinedDate: "2024-02-01", hoursLogged: 39.5 },
  { id: "3", name: "Christina To", email: "christina2to9@gmail.com", joinedDate: "2024-01-20", hoursLogged: 7 },
  { id: "4", name: "Evan Yousufzai", email: "evanyousufzai455@gmail.com", joinedDate: "2024-03-05", hoursLogged: 8.5 },
  { id: "5", name: "Eilin Aju", email: "eilinyahu07@gmail.com", joinedDate: "2024-02-15", hoursLogged: 26 },
  { id: "6", name: "Alanna Javellana", email: "alannarjav@gmail.com", joinedDate: "2024-01-28", hoursLogged: 2.5 },
  { id: "7", name: "Simone Quadros", email: "Sim1frames9@gmail.com", joinedDate: "2024-02-10", hoursLogged: 51 },
  { id: "8", name: "Ethan Pimenta", email: "ethanpimenta@hotmail.com", joinedDate: "2024-03-01", hoursLogged: 5.5 },
];

function getHoursBadgeClass(hours: number): string {
  if (hours >= 30) return "bg-success text-success-foreground";
  if (hours >= 10) return "bg-info text-info-foreground";
  if (hours >= 5) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
}

export function VolunteerDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVolunteers = mockVolunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="section-header">
        <h2 className="section-title">Volunteer Directory</h2>
        <Button variant="ghost" size="sm" className="text-info hover:text-info">
          <Filter className="mr-1.5 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search volunteers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="hidden pb-3 font-medium sm:table-cell">Joined</th>
                <th className="pb-3 text-right font-medium">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredVolunteers.map((volunteer, index) => (
                <tr
                  key={volunteer.id}
                  className="group transition-colors hover:bg-muted/50"
                  style={{ animationDelay: `${500 + index * 50}ms` }}
                >
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground">{volunteer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {volunteer.email}
                  </td>
                  <td className="hidden py-3 text-sm text-muted-foreground sm:table-cell">
                    {new Date(volunteer.joinedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${getHoursBadgeClass(
                        volunteer.hoursLogged
                      )}`}
                    >
                      {volunteer.hoursLogged} Hours
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVolunteers.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No volunteers found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
