import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingBag,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { date: "Mar 1", revenue: 4200, orders: 45 },
  { date: "Mar 2", revenue: 3800, orders: 42 },
  { date: "Mar 3", revenue: 5100, orders: 58 },
  { date: "Mar 4", revenue: 4600, orders: 51 },
  { date: "Mar 5", revenue: 5400, orders: 62 },
  { date: "Mar 6", revenue: 6200, orders: 71 },
  { date: "Mar 7", revenue: 5800, orders: 65 },
];

const topItems = [
  { name: "Margherita Pizza", sales: 124, revenue: 1860 },
  { name: "Caesar Salad", sales: 98, revenue: 1176 },
  { name: "Truffle Pasta", sales: 87, revenue: 2088 },
  { name: "Burrata Appetizer", sales: 76, revenue: 1140 },
  { name: "Tiramisu", sales: 65, revenue: 585 },
];

const recentOrders = [
  { id: "#4521", customer: "Table 12", amount: 87.5, time: "2 min ago", status: "preparing" },
  { id: "#4520", customer: "Table 8", amount: 124.0, time: "5 min ago", status: "served" },
  { id: "#4519", customer: "Takeout", amount: 45.5, time: "8 min ago", status: "ready" },
  { id: "#4518", customer: "Table 5", amount: 156.75, time: "12 min ago", status: "paid" },
  { id: "#4517", customer: "Table 15", amount: 92.25, time: "15 min ago", status: "paid" },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <Sparkles className="w-5 h-5 text-[var(--genie-primary)]" />
        </div>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Revenue
            </CardTitle>
            <div className="w-10 h-10 rounded-full bg-[var(--genie-success-light)] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[var(--genie-success)]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">$5,847</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-[var(--genie-success)]">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <div className="w-10 h-10 rounded-full bg-[var(--genie-info-light)] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[var(--genie-info)]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">142</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-[var(--genie-success)]">
              <TrendingUp className="w-4 h-4" />
              <span>+8.2% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Check
            </CardTitle>
            <div className="w-10 h-10 rounded-full bg-[var(--genie-primary-lighter)] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[var(--genie-primary)]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">$41.18</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-[var(--genie-success)]">
              <TrendingUp className="w-4 h-4" />
              <span>+3.1% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Tables
            </CardTitle>
            <div className="w-10 h-10 rounded-full bg-[var(--genie-accent-light)] flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--genie-primary)]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">12/24</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>50% capacity</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <p className="text-sm text-muted-foreground">Last 7 days performance</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--genie-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--genie-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#999" fontSize={12} />
                <YAxis stroke="#999" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--genie-primary)"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <p className="text-sm text-muted-foreground">This week's best performers</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topItems} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#999" fontSize={12} />
                <YAxis dataKey="name" type="category" width={120} stroke="#999" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="sales" fill="var(--genie-info)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Live order updates</p>
          </div>
          <button className="text-sm text-[var(--genie-primary)] hover:underline flex items-center gap-1">
            View all
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="font-semibold text-sm">{order.id}</div>
                  <div className="text-sm">{order.customer}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm text-muted-foreground">{order.time}</div>
                  <div className="font-semibold">${order.amount.toFixed(2)}</div>
                  <div
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === "preparing" ? "bg-[var(--genie-accent-light)] text-[var(--genie-primary)]" : ""}
                      ${order.status === "ready" ? "bg-[var(--genie-info-light)] text-[var(--genie-info)]" : ""}
                      ${order.status === "served" ? "bg-[var(--genie-primary-lighter)] text-[var(--genie-primary)]" : ""}
                      ${order.status === "paid" ? "bg-[var(--genie-success-light)] text-[var(--genie-success)]" : ""}
                    `}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
