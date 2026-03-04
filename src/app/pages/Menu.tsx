"use client";

import { ConfigDomainEditor } from "@/app/components/backoffice/ConfigDomainEditor";

export function Menu() {
  return (
    <ConfigDomainEditor
      domain="menu"
      title="Menu"
      description="Manage tenant-scoped menu configuration drafts."
    />
  );
}
