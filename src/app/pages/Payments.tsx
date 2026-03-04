"use client";

import { ConfigDomainEditor } from "@/app/components/backoffice/ConfigDomainEditor";

export function Payments() {
  return (
    <ConfigDomainEditor
      domain="payment"
      title="Payments"
      description="Manage tenant-scoped payment configuration drafts."
    />
  );
}
