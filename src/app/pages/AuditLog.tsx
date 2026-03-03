import { History, Filter, Download, Search, User, Settings, FileText, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const activityLog = [
  {
    id: 1,
    user: "Sarah Chen",
    initials: "SC",
    action: "Updated menu item",
    details: "Changed price of Margherita Pizza from $14.00 to $15.00",
    type: "menu",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    user: "Michael Rodriguez",
    initials: "MR",
    action: "Processed refund",
    details: "Order #4512 - $45.50 refunded to customer",
    type: "payment",
    timestamp: "15 minutes ago",
  },
  {
    id: 3,
    user: "Emily Watson",
    initials: "EW",
    action: "Added staff member",
    details: "Invited david@artisankitchen.com as Server",
    type: "staff",
    timestamp: "1 hour ago",
  },
  {
    id: 4,
    user: "Sarah Chen",
    initials: "SC",
    action: "Modified tax settings",
    details: "Updated sales tax rate from 8.25% to 8.5%",
    type: "settings",
    timestamp: "2 hours ago",
  },
  {
    id: 5,
    user: "Michael Rodriguez",
    initials: "MR",
    action: "Created promotion",
    details: "Happy Hour - 20% off drinks 4-6 PM",
    type: "menu",
    timestamp: "3 hours ago",
  },
  {
    id: 6,
    user: "James Kim",
    initials: "JK",
    action: "Updated menu availability",
    details: "Marked 'Seasonal Soup' as unavailable",
    type: "menu",
    timestamp: "4 hours ago",
  },
  {
    id: 7,
    user: "Sarah Chen",
    initials: "SC",
    action: "Changed location settings",
    details: "Updated operating hours for Downtown SF",
    type: "settings",
    timestamp: "5 hours ago",
  },
  {
    id: 8,
    user: "Emily Watson",
    initials: "EW",
    action: "Exported report",
    details: "Downloaded sales report for February 2026",
    type: "report",
    timestamp: "6 hours ago",
  },
];

const actionIcons: Record<string, any> = {
  menu: FileText,
  payment: DollarSign,
  staff: User,
  settings: Settings,
  report: Download,
};

const actionColors: Record<string, string> = {
  menu: "from-[var(--genie-info)] to-[var(--genie-info-light)]",
  payment: "from-[var(--genie-success)] to-[var(--genie-success-light)]",
  staff: "from-[var(--genie-primary)] to-[var(--genie-primary-light)]",
  settings: "from-[var(--genie-accent)] to-[var(--genie-accent-light)]",
  report: "from-purple-400 to-purple-200",
};

export function AuditLog() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Audit Log</h1>
            <History className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            Track all changes and activities across your organization.
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Log
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-6">
        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">1,247</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">28</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Menu Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">342</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Staff Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">156</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">89</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search activities..." className="pl-9 bg-white border" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter by Type
        </Button>
        <Button variant="outline">
          <User className="w-4 h-4 mr-2" />
          Filter by User
        </Button>
      </div>

      {/* Activity Timeline */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Chronological log of all system events
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLog.map((activity) => {
              const Icon = actionIcons[activity.type] || FileText;
              const colorClass = actionColors[activity.type] || actionColors.settings;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gradient-to-br from-[var(--genie-primary)] to-[var(--genie-primary-light)] text-white text-xs">
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{activity.user}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{activity.action}</span>
                      <Badge
                        variant="secondary"
                        className="ml-auto bg-white text-xs"
                      >
                        {activity.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{activity.details}</p>
                    <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
