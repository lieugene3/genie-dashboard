"use client";

import { ConfigDomainEditor } from "@/app/components/backoffice/ConfigDomainEditor";

export function PrintersKDS() {
  return (
    <ConfigDomainEditor
      domain="routing"
      title="Printers & KDS Routing"
      description="Manage location-scoped routing configuration drafts."
      scopeMode="location"
    />
  );
}
