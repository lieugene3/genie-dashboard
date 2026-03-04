"use client";

import { Card, CardContent } from "@/app/components/ui/card";

type EditorStatusCardProps = {
  revision: number;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
  lastPublishedAt?: string | null;
};

export function EditorStatusCard({
  revision,
  isLoading,
  hasUnsavedChanges,
  lastPublishedAt,
}: EditorStatusCardProps) {
  return (
    <Card className="border-[var(--border)] shadow-sm bg-[var(--genie-primary-lighter)]">
      <CardContent className="pt-6 flex items-center justify-between gap-4 text-sm">
        <div className="space-y-1">
          <div className="font-medium">Draft Revision: {revision}</div>
          <div className="text-muted-foreground">
            {isLoading ? "Loading draft..." : hasUnsavedChanges ? "Unsaved changes" : "Draft synced"}
          </div>
        </div>
        <div className="space-y-1 text-right">
          <div className="font-medium">Last Publish</div>
          <div className="text-muted-foreground">
            {lastPublishedAt ? new Date(lastPublishedAt).toLocaleString() : "Not published"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
