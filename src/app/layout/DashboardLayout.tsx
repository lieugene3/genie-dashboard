import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Users,
  UtensilsCrossed,
  Receipt,
  Printer,
  Grid3x3,
  CreditCard,
  FileText,
  Wand2,
  History,
  Sparkles,
  Bell,
  Settings,
  Search,
  HelpCircle,
  Lamp,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/organization", label: "Organization", icon: Building2 },
  { path: "/locations", label: "Locations", icon: MapPin },
  { path: "/staff", label: "Staff & Roles", icon: Users },
  { path: "/menu", label: "Menu", icon: UtensilsCrossed },
  { path: "/taxes", label: "Taxes & Charges", icon: Receipt },
  { path: "/printers", label: "Printers & KDS", icon: Printer },
  { path: "/floor-plan", label: "Floor Plan", icon: Grid3x3 },
  { path: "/payments", label: "Payments", icon: CreditCard },
  { path: "/receipts", label: "Receipts", icon: FileText },
  { path: "/setup", label: "Setup Wizard", icon: Wand2 },
  { path: "/audit", label: "Audit Log", icon: History },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[var(--sidebar-border)] flex flex-col">
        {/* Logo */}
        <div className="h-16 border-b border-[var(--sidebar-border)] flex items-center px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--genie-primary)] to-[var(--genie-primary-light)] flex items-center justify-center">
              <Lamp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-[var(--genie-primary)] to-[var(--genie-primary-light)] bg-clip-text text-transparent">
              Genie
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-[var(--genie-primary-lighter)] text-[var(--genie-primary)]"
                          : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--sidebar-border)]">
          <div className="px-3 py-2 rounded-lg bg-gradient-to-br from-[var(--genie-accent-light)] to-[var(--genie-primary-lighter)] border border-[var(--genie-accent)]">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[var(--genie-primary)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[var(--genie-primary)]">
                  Need help?
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Check our guides
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search anything..."
                className="pl-9 bg-[var(--input-background)] border-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--genie-primary)] rounded-full" />
            </Button>

            <Button variant="ghost" size="icon">
              <HelpCircle className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>

            <div className="h-6 w-px bg-border mx-2" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-3 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-[var(--genie-primary)] to-[var(--genie-primary-light)] text-white">
                      AC
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">Alex Chen</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}