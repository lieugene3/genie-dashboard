import { Grid3x3, Plus, Users, Clock, DollarSign, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const tables = [
  { number: 1, seats: 2, status: "occupied", time: "45 min", check: 87.5 },
  { number: 2, seats: 4, status: "available", time: null, check: null },
  { number: 3, seats: 4, status: "occupied", time: "22 min", check: 124.0 },
  { number: 4, seats: 2, status: "available", time: null, check: null },
  { number: 5, seats: 6, status: "occupied", time: "1h 15m", check: 256.75 },
  { number: 6, seats: 4, status: "available", time: null, check: null },
  { number: 7, seats: 2, status: "reserved", time: "6:30 PM", check: null },
  { number: 8, seats: 4, status: "occupied", time: "33 min", check: 145.25 },
  { number: 9, seats: 2, status: "available", time: null, check: null },
  { number: 10, seats: 6, status: "reserved", time: "7:00 PM", check: null },
  { number: 11, seats: 4, status: "available", time: null, check: null },
  { number: 12, seats: 8, status: "occupied", time: "52 min", check: 312.0 },
];

export function FloorPlan() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Floor Plan</h1>
            <Grid3x3 className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            View and manage your table layout and reservations.
          </p>
        </div>
        <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
          <Plus className="w-4 h-4 mr-2" />
          Add Table
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">12</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Occupied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[var(--genie-primary)]">5</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reserved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[var(--genie-info)]">2</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[var(--genie-success)]">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Floor Plan Grid */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Main Dining Area</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--genie-success)]" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--genie-primary)]" />
                <span>Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--genie-info)]" />
                <span>Reserved</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {tables.map((table) => (
              <Card
                key={table.number}
                className={`
                  relative overflow-hidden border-2 cursor-pointer transition-all hover:scale-105
                  ${table.status === "available" ? "border-[var(--genie-success)] bg-[var(--genie-success-light)]" : ""}
                  ${table.status === "occupied" ? "border-[var(--genie-primary)] bg-[var(--genie-primary-lighter)]" : ""}
                  ${table.status === "reserved" ? "border-[var(--genie-info)] bg-[var(--genie-info-light)]" : ""}
                `}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-2xl font-semibold mb-1">
                        {table.number}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        {table.seats} seats
                      </div>
                    </div>
                    {table.status === "occupied" && (
                      <Sparkles className="w-4 h-4 text-[var(--genie-primary)]" />
                    )}
                  </div>

                  {table.status === "occupied" && (
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {table.time}
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-[var(--genie-primary)]">
                        <DollarSign className="w-3.5 h-3.5" />
                        ${table.check?.toFixed(2)}
                      </div>
                    </div>
                  )}

                  {table.status === "reserved" && (
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {table.time}
                      </div>
                    </div>
                  )}

                  {table.status === "available" && (
                    <div className="text-sm text-[var(--genie-success)] font-medium">
                      Ready to seat
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-[var(--border)] shadow-sm bg-gradient-to-br from-[var(--genie-primary-lighter)] to-[var(--genie-accent-light)]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[var(--genie-primary)] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[var(--genie-primary)] mb-1">
                  Smart Seating Suggestions
                </h4>
                <p className="text-sm text-muted-foreground">
                  Genie can suggest optimal table assignments based on party size and current occupancy.
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-[var(--genie-primary)] text-[var(--genie-primary)]">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
