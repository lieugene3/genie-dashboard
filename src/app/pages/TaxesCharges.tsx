import { Receipt, Plus, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";

const taxes = [
  { name: "Sales Tax", rate: 8.5, type: "Percentage", status: true, applied: "All items" },
  { name: "City Tax", rate: 1.5, type: "Percentage", status: true, applied: "All items" },
  { name: "Delivery Fee", rate: 3.99, type: "Fixed", status: true, applied: "Delivery orders" },
];

const serviceCharges = [
  { name: "Gratuity (Large Parties)", rate: 18, type: "Percentage", status: true, applied: "Tables 6+" },
  { name: "Corkage Fee", rate: 25.0, type: "Fixed", status: true, applied: "Wine bottles" },
  { name: "Service Charge", rate: 5, type: "Percentage", status: false, applied: "All orders" },
];

export function TaxesCharges() {
  return (
    <div className="p-8 max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Taxes & Charges</h1>
            <Receipt className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            Configure taxes and service charges for your locations.
          </p>
        </div>
        <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      {/* Taxes */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Taxes</CardTitle>
          <p className="text-sm text-muted-foreground">Manage tax rates applied to orders</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {taxes.map((tax, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{tax.name}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="bg-white">
                    {tax.applied}
                  </Badge>
                  <span>{tax.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-2xl font-semibold text-[var(--genie-primary)]">
                    {tax.type === "Percentage" ? `${tax.rate}%` : `$${tax.rate.toFixed(2)}`}
                  </div>
                </div>
                <Switch checked={tax.status} />
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Service Charges */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Service Charges</CardTitle>
          <p className="text-sm text-muted-foreground">Additional fees and gratuities</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {serviceCharges.map((charge, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{charge.name}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="bg-white">
                    {charge.applied}
                  </Badge>
                  <span>{charge.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-2xl font-semibold text-[var(--genie-primary)]">
                    {charge.type === "Percentage" ? `${charge.rate}%` : `$${charge.rate.toFixed(2)}`}
                  </div>
                </div>
                <Switch checked={charge.status} />
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-[var(--border)] shadow-sm bg-gradient-to-br from-[var(--genie-info-light)] to-white">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Example Calculation</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">$100.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sales Tax (8.5%)</span>
              <span className="font-medium">$8.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">City Tax (1.5%)</span>
              <span className="font-medium">$1.50</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-[var(--genie-primary)]">$110.00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
