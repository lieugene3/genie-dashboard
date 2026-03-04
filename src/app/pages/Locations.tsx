"use client";

import { ConfigDomainEditor } from "@/app/components/backoffice/ConfigDomainEditor";

export function Locations() {
  return (
    <ConfigDomainEditor
      domain="location"
      title="Locations"
      description="Manage location-scoped back-office configuration drafts."
      scopeMode="location"
    />
  );
}
