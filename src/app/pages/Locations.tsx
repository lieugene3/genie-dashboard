import { MapPin, Plus, Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const locations = [
  {
    id: 1,
    name: "Downtown SF",
    address: "425 Market Street, San Francisco, CA 94105",
    phone: "(415) 555-0123",
    status: "active",
    revenue: "$142,500",
    orders: 2847,
  },
  {
    id: 2,
    name: "North Beach",
    address: "812 Columbus Ave, San Francisco, CA 94133",
    phone: "(415) 555-0124",
    status: "active",
    revenue: "$98,200",
    orders: 1923,
  },
  {
    id: 3,
    name: "Mission District",
    address: "2567 Mission Street, San Francisco, CA 94110",
    phone: "(415) 555-0125",
    status: "active",
    revenue: "$115,800",
    orders: 2341,
  },
  {
    id: 4,
    name: "Oakland - Coming Soon",
    address: "1234 Broadway, Oakland, CA 94612",
    phone: "(510) 555-0126",
    status: "inactive",
    revenue: "$0",
    orders: 0,
  },
];

export function Locations() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Locations</h1>
            <MapPin className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            Manage all your restaurant locations and their settings.
          </p>
        </div>
        <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">4</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">3</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">$356.5K</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">7,111</div>
          </CardContent>
        </Card>
      </div>

      {/* Locations List */}
      <div className="space-y-4">
        {locations.map((location) => (
          <Card
            key={location.id}
            className="border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--genie-primary-lighter)] to-[var(--genie-accent-light)] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[var(--genie-primary)]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{location.name}</h3>
                      <Badge
                        variant={location.status === "active" ? "default" : "secondary"}
                        className={
                          location.status === "active"
                            ? "bg-[var(--genie-success-light)] text-[var(--genie-success)] hover:bg-[var(--genie-success-light)]"
                            : ""
                        }
                      >
                        {location.status === "active" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {location.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 flex items-center justify-center">📞</span>
                        {location.phone}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 pt-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                        <div className="text-lg font-semibold">{location.revenue}</div>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <div>
                        <div className="text-xs text-muted-foreground">Total Orders</div>
                        <div className="text-lg font-semibold">{location.orders.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
