"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/app/components/ui/button";

type PublishActionsProps = {
  canPublish: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isValidating: boolean;
  isPublishing: boolean;
  onRevert: () => void;
  onValidate: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
};

export function PublishActions({
  canPublish,
  isLoading,
  isSaving,
  isValidating,
  isPublishing,
  onRevert,
  onValidate,
  onSaveDraft,
  onPublish,
}: PublishActionsProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5" />
        Save draft before publishing.
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onRevert} disabled={isLoading || isSaving}>
          Revert
        </Button>
        <Button variant="outline" onClick={onValidate} disabled={isValidating || isSaving}>
          {isValidating ? "Validating..." : "Validate"}
        </Button>
        <Button variant="outline" onClick={onSaveDraft} disabled={isSaving || isLoading}>
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>
        <Button
          className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]"
          onClick={onPublish}
          disabled={isPublishing || !canPublish}
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}
