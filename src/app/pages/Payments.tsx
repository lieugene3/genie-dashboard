import { CreditCard, Plus, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const paymentData = [
  { date: "Feb 26", amount: 4200 },
  { date: "Feb 27", amount: 3800 },
  { date: "Feb 28", amount: 5100 },
  { date: "Feb 29", amount: 4600 },
  { date: "Mar 1", amount: 5400 },
  { date: "Mar 2", amount: 6200 },
  { date: "Mar 3", amount: 5800 },
];

const paymentMethods = [
  { method: "Credit Card", percentage: 68, amount: "$142,350" },
  { method: "Cash", percentage: 18, amount: "$37,680" },
  { method: "Mobile Payment", percentage: 12, amount: "$25,120" },
  { method: "Gift Card", percentage: 2, amount: "$4,185" },
];

const recentTransactions = [
  { id: "#TXN-8921", time: "2 min ago", amount: 87.5, method: "Visa ****4242", status: "completed" },
  { id: "#TXN-8920", time: "5 min ago", amount: 124.0, method: "Cash", status: "completed" },
  { id: "#TXN-8919", time: "8 min ago", amount: 45.5, method: "Apple Pay", status: "completed" },
  { id: "#TXN-8918", time: "12 min ago", amount: 156.75, method: "Mastercard ****8765", status: "completed" },
  { id: "#TXN-8917", time: "15 min ago", amount: 92.25, method: "Visa ****1234", status: "pending" },
];

export function Payments() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Payments</h1>
            <CreditCard className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            Track transactions and manage payment settings.
          </p>
        </div>
        <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
          <Plus className="w-4 h-4 mr-2" />
          Payment Method
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">$5,847</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-[var(--genie-success)]">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">142</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-[var(--genie-success)]">
              <TrendingUp className="w-4 h-4" />
              <span>+8.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">$41.18</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processing Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">$175.41</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle>Payment Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Last 7 days</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={paymentData}>
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
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--genie-primary)"
                  strokeWidth={3}
                  dot={{ fill: "var(--genie-primary)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <p className="text-sm text-muted-foreground">Distribution by type</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.method}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{method.method}</span>
                  <span className="text-sm text-muted-foreground">{method.percentage}% • {method.amount}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--genie-primary)] to-[var(--genie-primary-light)]"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Live payment activity</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="font-semibold text-sm font-mono">{txn.id}</div>
                  <div className="text-sm text-muted-foreground">{txn.method}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm text-muted-foreground">{txn.time}</div>
                  <div className="font-semibold text-lg">${txn.amount.toFixed(2)}</div>
                  {txn.status === "completed" ? (
                    <Badge className="bg-[var(--genie-success-light)] text-[var(--genie-success)] hover:bg-[var(--genie-success-light)]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-[var(--genie-accent-light)]">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
