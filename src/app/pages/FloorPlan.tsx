"use client";

import { ConfigDomainEditor } from "@/app/components/backoffice/ConfigDomainEditor";

export function FloorPlan() {
  return (
    <ConfigDomainEditor
      domain="floor_plan"
      title="Floor Plan"
      description="Manage location-scoped floor plan configuration drafts."
      scopeMode="location"
    />
  );
}
