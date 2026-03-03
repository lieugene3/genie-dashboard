import { Building2, Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";

export function Organization() {
  return (
    <div className="p-8 max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-semibold">Organization</h1>
          <Building2 className="w-6 h-6 text-[var(--genie-primary)]" />
        </div>
        <p className="text-muted-foreground">
          Manage your restaurant's business information and settings.
        </p>
      </div>

      {/* Business Information */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                defaultValue="The Artisan Kitchen"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legal-name">Legal Business Name</Label>
              <Input
                id="legal-name"
                defaultValue="Artisan Kitchen LLC"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tax-id">Tax ID / EIN</Label>
              <Input
                id="tax-id"
                defaultValue="XX-XXXXXXX"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-type">Business Type</Label>
              <Input
                id="business-type"
                defaultValue="Restaurant & Bar"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input
              id="address"
              defaultValue="425 Market Street"
              className="bg-[var(--input-background)] border-0"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                defaultValue="San Francisco"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                defaultValue="CA"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                defaultValue="94105"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone Number
              </Label>
              <Input
                id="phone"
                defaultValue="(415) 555-0123"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="hello@artisankitchen.com"
                className="bg-[var(--input-background)] border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              Website
            </Label>
            <Input
              id="website"
              defaultValue="https://artisankitchen.com"
              className="bg-[var(--input-background)] border-0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Operating Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { day: "Monday", hours: "11:00 AM - 10:00 PM" },
            { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
            { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
            { day: "Thursday", hours: "11:00 AM - 11:00 PM" },
            { day: "Friday", hours: "11:00 AM - 11:30 PM" },
            { day: "Saturday", hours: "10:00 AM - 11:30 PM" },
            { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
          ].map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)]"
            >
              <span className="font-medium">{item.day}</span>
              <span className="text-muted-foreground">{item.hours}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
