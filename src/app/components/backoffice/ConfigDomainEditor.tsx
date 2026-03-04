"use client";

import { useEffect, useMemo, useState } from "react";

import type { ConfigDomain } from "@/lib/api/types";
import type { ConfigScopeInput } from "@/lib/backoffice/api";
import { useConfigEditor } from "@/lib/backoffice/use-config-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { EditorStatusCard } from "@/app/components/backoffice/EditorStatusCard";
import { ValidationSummaryCard } from "@/app/components/backoffice/ValidationSummaryCard";
import { EditorErrorCard } from "@/app/components/backoffice/EditorErrorCard";
import { PublishActions } from "@/app/components/backoffice/PublishActions";
import { LocationScopePicker } from "@/app/components/backoffice/LocationScopePicker";

type ConfigDomainEditorProps = {
  domain: ConfigDomain;
  title: string;
  description: string;
  scopeMode?: "tenant" | "location";
};

type ParsedPayload =
  | { ok: true; payload: Record<string, unknown> }
  | { ok: false; error: string };

function parsePayload(value: string): ParsedPayload {
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, error: "Payload must be a JSON object." };
    }
    return { ok: true, payload: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, error: "Invalid JSON." };
  }
}

export function ConfigDomainEditor({
  domain,
  title,
  description,
  scopeMode = "tenant",
}: ConfigDomainEditorProps) {
  const [locationId, setLocationId] = useState<string | null>(null);
  const [payloadInput, setPayloadInput] = useState("{}");
  const [payloadError, setPayloadError] = useState<string | null>(null);

  const hasLocationScope = scopeMode === "location";
  const scope = useMemo<ConfigScopeInput>(() => {
    if (!hasLocationScope || !locationId) {
      return {};
    }

    return {
      scopeType: "location",
      scopeId: locationId,
    };
  }, [hasLocationScope, locationId]);

  const shouldAutoLoad = !hasLocationScope || Boolean(locationId);
  const editor = useConfigEditor({
    domain,
    scope,
    autoLoad: shouldAutoLoad,
  });

  useEffect(() => {
    const nextValue = JSON.stringify(editor.payload, null, 2);
    setPayloadInput(nextValue);
  }, [editor.payload]);

  const onPayloadChange = (nextValue: string) => {
    setPayloadInput(nextValue);

    const parsed = parsePayload(nextValue);
    if (!parsed.ok) {
      setPayloadError(parsed.error);
      return;
    }

    setPayloadError(null);
    editor.setPayload(parsed.payload);
  };

  const canSubmit = !payloadError && shouldAutoLoad;
  const canPublish = canSubmit && editor.revision > 0 && !editor.hasUnsavedChanges;

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {hasLocationScope ? (
        <LocationScopePicker value={locationId} onChange={setLocationId} />
      ) : null}

      {!shouldAutoLoad ? (
        <Card className="border-[var(--border)] shadow-sm">
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Select a location to load and edit this domain.
          </CardContent>
        </Card>
      ) : (
        <>
          <EditorStatusCard
            revision={editor.revision}
            isLoading={editor.isLoading}
            hasUnsavedChanges={editor.hasUnsavedChanges}
            lastPublishedAt={editor.lastPublished?.published_at ?? null}
          />
          <ValidationSummaryCard errors={editor.validationErrors} />
          <EditorErrorCard error={editor.lastError} />

          <Card className="border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle>Draft Payload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor={`${domain}-payload`}>JSON payload</Label>
              <Textarea
                id={`${domain}-payload`}
                value={payloadInput}
                onChange={(event) => onPayloadChange(event.target.value)}
                className="min-h-96 font-mono text-xs bg-[var(--input-background)] border-0"
              />
              {payloadError ? (
                <p className="text-xs text-destructive">{payloadError}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Edits are saved to draft. Publish is a separate action.
                </p>
              )}
            </CardContent>
          </Card>

          <PublishActions
            canPublish={canPublish}
            isLoading={editor.isLoading}
            isSaving={editor.isSaving}
            isValidating={editor.isValidating}
            isPublishing={editor.isPublishing}
            onRevert={() => editor.reload()}
            onValidate={() => {
              if (!canSubmit) {
                return;
              }
              editor.validateDraft().catch(() => {
                // Hook surfaces error state.
              });
            }}
            onSaveDraft={() => {
              if (!canSubmit) {
                return;
              }
              editor.saveDraft().catch(() => {
                // Hook surfaces error state.
              });
            }}
            onPublish={() => {
              if (!canSubmit) {
                return;
              }
              editor.publishDraft().catch(() => {
                // Hook surfaces error state.
              });
            }}
          />
        </>
      )}
    </div>
  );
}
