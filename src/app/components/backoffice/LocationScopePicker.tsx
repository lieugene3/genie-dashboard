"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useLocationOptions } from "@/lib/backoffice/use-location-options";

type LocationScopePickerProps = {
  value: string | null;
  onChange: (locationId: string) => void;
  title?: string;
};

export function LocationScopePicker({
  value,
  onChange,
  title = "Location Scope",
}: LocationScopePickerProps) {
  const { locations, isLoading, error } = useLocationOptions();

  return (
    <Card className="border-[var(--border)] shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="location-scope">Location</Label>
        <Select value={value ?? undefined} onValueChange={onChange}>
          <SelectTrigger id="location-scope">
            <SelectValue placeholder={isLoading ? "Loading locations..." : "Select location"} />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.short_code} - {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error ? (
          <p className="text-xs text-destructive">
            Unable to load locations: {error.message}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
