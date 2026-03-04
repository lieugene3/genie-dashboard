"use client";

import { ConfigDomainEditor } from "@/app/components/backoffice/ConfigDomainEditor";

export function TaxesCharges() {
  return (
    <ConfigDomainEditor
      domain="tax"
      title="Taxes & Charges"
      description="Manage tenant-scoped tax configuration drafts."
    />
  );
}
