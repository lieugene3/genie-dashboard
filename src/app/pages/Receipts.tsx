"use client";

import { ConfigDomainEditor } from "@/app/components/backoffice/ConfigDomainEditor";

export function Receipts() {
  return (
    <ConfigDomainEditor
      domain="receipt"
      title="Receipts"
      description="Manage tenant-scoped receipt configuration drafts."
    />
  );
}
