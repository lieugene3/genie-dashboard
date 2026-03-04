"use client";

import type { ConfigValidationError } from "@/lib/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

type ValidationSummaryCardProps = {
  errors: ConfigValidationError[];
};

export function ValidationSummaryCard({ errors }: ValidationSummaryCardProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Card className="border-destructive/40 shadow-sm">
      <CardHeader>
        <CardTitle className="text-destructive">Validation Errors</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-1 text-sm text-destructive">
          {errors.map((error, index) => (
            <li key={`${error.field}-${index}`}>
              {error.field}: {error.message}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
