"use client";

import { Building2, Mail, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { useConfigEditor } from "@/lib/backoffice/use-config-editor";
import { EditorStatusCard } from "@/app/components/backoffice/EditorStatusCard";
import { ValidationSummaryCard } from "@/app/components/backoffice/ValidationSummaryCard";
import { EditorErrorCard } from "@/app/components/backoffice/EditorErrorCard";
import { PublishActions } from "@/app/components/backoffice/PublishActions";

const DEFAULT_ORGANIZATION_PAYLOAD = {
  business_name: "The Artisan Kitchen",
  legal_business_name: "Artisan Kitchen LLC",
  tax_id: "XX-XXXXXXX",
  business_type: "Restaurant & Bar",
  address_line_1: "425 Market Street",
  city: "San Francisco",
  state: "CA",
  postal_code: "94105",
  phone: "(415) 555-0123",
  email: "hello@artisankitchen.com",
  website: "https://artisankitchen.com",
};

const OPERATING_HOURS = [
  { day: "Monday", hours: "11:00 AM - 10:00 PM" },
  { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
  { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
  { day: "Thursday", hours: "11:00 AM - 11:00 PM" },
  { day: "Friday", hours: "11:00 AM - 11:30 PM" },
  { day: "Saturday", hours: "10:00 AM - 11:30 PM" },
  { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
];

export function Organization() {
  const {
    payload,
    revision,
    validationErrors,
    lastPublished,
    lastError,
    isLoading,
    isSaving,
    isValidating,
    isPublishing,
    hasUnsavedChanges,
    setPayloadField,
    reload,
    saveDraft,
    validateDraft,
    publishDraft,
  } = useConfigEditor({
    domain: "organization",
  });

  const valueFor = (key: keyof typeof DEFAULT_ORGANIZATION_PAYLOAD) => {
    const value = payload[key];
    return typeof value === "string" ? value : DEFAULT_ORGANIZATION_PAYLOAD[key];
  };

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-semibold">Organization</h1>
          <Building2 className="w-6 h-6 text-[var(--genie-primary)]" />
        </div>
        <p className="text-muted-foreground">
          Manage your restaurant's business information and settings.
        </p>
      </div>

      <EditorStatusCard
        revision={revision}
        isLoading={isLoading}
        hasUnsavedChanges={hasUnsavedChanges}
        lastPublishedAt={lastPublished?.published_at ?? null}
      />
      <ValidationSummaryCard errors={validationErrors} />
      <EditorErrorCard error={lastError} />

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
                value={valueFor("business_name")}
                onChange={(event) => setPayloadField("business_name", event.target.value)}
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legal-name">Legal Business Name</Label>
              <Input
                id="legal-name"
                value={valueFor("legal_business_name")}
                onChange={(event) =>
                  setPayloadField("legal_business_name", event.target.value)
                }
                className="bg-[var(--input-background)] border-0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tax-id">Tax ID / EIN</Label>
              <Input
                id="tax-id"
                value={valueFor("tax_id")}
                onChange={(event) => setPayloadField("tax_id", event.target.value)}
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-type">Business Type</Label>
              <Input
                id="business-type"
                value={valueFor("business_type")}
                onChange={(event) => setPayloadField("business_type", event.target.value)}
                className="bg-[var(--input-background)] border-0"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input
              id="address"
              value={valueFor("address_line_1")}
              onChange={(event) => setPayloadField("address_line_1", event.target.value)}
              className="bg-[var(--input-background)] border-0"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={valueFor("city")}
                onChange={(event) => setPayloadField("city", event.target.value)}
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={valueFor("state")}
                onChange={(event) => setPayloadField("state", event.target.value)}
                className="bg-[var(--input-background)] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                value={valueFor("postal_code")}
                onChange={(event) => setPayloadField("postal_code", event.target.value)}
                className="bg-[var(--input-background)] border-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
                value={valueFor("phone")}
                onChange={(event) => setPayloadField("phone", event.target.value)}
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
                value={valueFor("email")}
                onChange={(event) => setPayloadField("email", event.target.value)}
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
              value={valueFor("website")}
              onChange={(event) => setPayloadField("website", event.target.value)}
              className="bg-[var(--input-background)] border-0"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Operating Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {OPERATING_HOURS.map((item) => (
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

      <PublishActions
        canPublish={revision > 0 && !hasUnsavedChanges}
        isLoading={isLoading}
        isSaving={isSaving}
        isValidating={isValidating}
        isPublishing={isPublishing}
        onRevert={() => reload()}
        onValidate={() => validateDraft()}
        onSaveDraft={() => saveDraft()}
        onPublish={() => publishDraft()}
      />
    </div>
  );
}
