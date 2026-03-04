"use client";

import { ConfigDomainEditor } from "@/app/components/backoffice/ConfigDomainEditor";

export function PinPolicy() {
  return (
    <ConfigDomainEditor
      domain="pin_policy"
      title="PIN Policy"
      description="Manage tenant-scoped PIN policy configuration drafts."
    />
  );
}
