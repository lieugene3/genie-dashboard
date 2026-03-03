import { Users, UserPlus, Shield, Mail, Phone, MoreVertical, Crown, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const staff = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@artisankitchen.com",
    phone: "(415) 555-0201",
    role: "Owner",
    location: "All Locations",
    status: "active",
    initials: "SC",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    email: "michael@artisankitchen.com",
    phone: "(415) 555-0202",
    role: "Manager",
    location: "Downtown SF",
    status: "active",
    initials: "MR",
  },
  {
    id: 3,
    name: "Emily Watson",
    email: "emily@artisankitchen.com",
    phone: "(415) 555-0203",
    role: "Manager",
    location: "North Beach",
    status: "active",
    initials: "EW",
  },
  {
    id: 4,
    name: "James Kim",
    email: "james@artisankitchen.com",
    phone: "(415) 555-0204",
    role: "Chef",
    location: "Downtown SF",
    status: "active",
    initials: "JK",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa@artisankitchen.com",
    phone: "(415) 555-0205",
    role: "Server",
    location: "Downtown SF",
    status: "active",
    initials: "LA",
  },
  {
    id: 6,
    name: "David Park",
    email: "david@artisankitchen.com",
    phone: "(415) 555-0206",
    role: "Server",
    location: "North Beach",
    status: "active",
    initials: "DP",
  },
];

const roles = [
  {
    name: "Owner",
    count: 1,
    description: "Full access to all features and settings",
    color: "from-[var(--genie-primary)] to-[var(--genie-primary-light)]",
  },
  {
    name: "Manager",
    count: 2,
    description: "Manage location operations and staff",
    color: "from-[var(--genie-info)] to-[var(--genie-info-light)]",
  },
  {
    name: "Chef",
    count: 3,
    description: "Access to kitchen display and menu management",
    color: "from-[var(--genie-accent)] to-[var(--genie-accent-light)]",
  },
  {
    name: "Server",
    count: 8,
    description: "Take orders and process payments",
    color: "from-[var(--genie-success)] to-[var(--genie-success-light)]",
  },
];

export function StaffRoles() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Staff & Roles</h1>
            <Users className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            Manage your team members and their permissions.
          </p>
        </div>
        <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList>
          <TabsTrigger value="staff">Staff Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6">
            <Card className="border-[var(--border)] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Staff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">14</div>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">11</div>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Managers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">2</div>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Servers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">8</div>
              </CardContent>
            </Card>
          </div>

          {/* Staff List */}
          <Card className="border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle>All Staff Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-[var(--genie-primary)] to-[var(--genie-primary-light)] text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{member.name}</h4>
                          {member.role === "Owner" && (
                            <Crown className="w-4 h-4 text-[var(--genie-primary)]" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            {member.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge
                          variant="secondary"
                          className="bg-[var(--genie-primary-lighter)] text-[var(--genie-primary)] hover:bg-[var(--genie-primary-lighter)]"
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          {member.role}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">{member.location}</div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem>View Activity</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove Access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.name} className="border-[var(--border)] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary">{role.count} members</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{role.name}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <Button variant="outline" className="w-full mt-4">
                    Edit Permissions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-[var(--border)] shadow-sm bg-gradient-to-br from-[var(--genie-primary-lighter)] to-[var(--genie-accent-light)]">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[var(--genie-primary)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[var(--genie-primary)] mb-1">
                    Pro Tip: Custom Roles
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Create custom roles with specific permissions to match your restaurant's unique
                    workflow. Perfect for specialized positions like sommelier, host, or expediter.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
