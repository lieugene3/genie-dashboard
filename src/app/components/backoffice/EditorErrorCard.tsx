"use client";

import type { ApiRequestError } from "@/lib/api/errors";
import { getErrorBehavior } from "@/lib/ui/error-behavior";
import { Card, CardContent } from "@/app/components/ui/card";

type EditorErrorCardProps = {
  error: ApiRequestError | null;
};

function messageFor(error: ApiRequestError): string {
  const behavior = getErrorBehavior(error);

  if (behavior.kind === "refresh_draft_and_retry") {
    return "Draft conflict detected. The latest draft was reloaded. Review changes and retry.";
  }

  if (behavior.kind === "show_access_denied") {
    return "You do not have permission to perform this action.";
  }

  if (behavior.kind === "show_location_access_denied") {
    return "You do not have access to the selected location scope.";
  }

  return error.message;
}

export function EditorErrorCard({ error }: EditorErrorCardProps) {
  if (!error) {
    return null;
  }

  return (
    <Card className="border-destructive/40 shadow-sm">
      <CardContent className="pt-6 text-sm text-destructive">
        {error.code}: {messageFor(error)}
      </CardContent>
    </Card>
  );
}
