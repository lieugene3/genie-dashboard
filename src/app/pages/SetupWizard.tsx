"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleX, Wand2 } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { isApiRequestError } from "@/lib/api/errors";
import type { ConfigDomain, RuntimeBootstrap, RuntimeConfig, WizardReadinessItem } from "@/lib/api/types";
import {
  getRuntimeBootstrap,
  getRuntimeConfig,
  wizardPublishRequired,
  wizardReadiness,
} from "@/lib/backoffice/api";
import { LOCATION_SCOPED_DOMAINS, WIZARD_REQUIRED_DOMAINS } from "@/lib/backoffice/domains";
import { useLocationOptions } from "@/lib/backoffice/use-location-options";
import { useSession } from "@/lib/session/store";

function errorMessage(error: unknown): string {
  if (isApiRequestError(error)) {
    return `${error.code}: ${error.message}`;
  }
  return "Request failed";
}

export function SetupWizard() {
  const { session } = useSession();
  const token = session?.token ?? null;
  const { locations, isLoading: isLoadingLocations, error: locationError } = useLocationOptions();

  const [locationId, setLocationId] = useState<string>("");
  const [readiness, setReadiness] = useState<WizardReadinessItem[]>([]);
  const [runtimeBootstrap, setRuntimeBootstrap] = useState<RuntimeBootstrap | null>(null);
  const [runtimeDomain, setRuntimeDomain] = useState<ConfigDomain>("organization");
  const [runtimeConfig, setRuntimeConfig] = useState<RuntimeConfig | null>(null);

  const [wizardError, setWizardError] = useState<string | null>(null);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [lastPublishSummary, setLastPublishSummary] = useState<string | null>(null);

  const [isRunningReadiness, setIsRunningReadiness] = useState(false);
  const [isPublishingRequired, setIsPublishingRequired] = useState(false);
  const [isLoadingBootstrap, setIsLoadingBootstrap] = useState(false);
  const [isLoadingRuntimeConfig, setIsLoadingRuntimeConfig] = useState(false);

  const expectedRevisions = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const domain of WIZARD_REQUIRED_DOMAINS) {
      const item = readiness.find((entry) => entry.domain === domain);
      if (!item) {
        continue;
      }
      map[domain] = item.draft_revision;
    }
    return map;
  }, [readiness]);

  const allRequiredDomainsReady = useMemo(() => {
    if (readiness.length === 0) {
      return false;
    }

    return WIZARD_REQUIRED_DOMAINS.every((domain) => {
      const item = readiness.find((entry) => entry.domain === domain);
      return Boolean(item?.ready);
    });
  }, [readiness]);

  const runReadiness = async () => {
    if (!token || !locationId) {
      return;
    }

    setIsRunningReadiness(true);
    setWizardError(null);
    setLastPublishSummary(null);

    try {
      const result = await wizardReadiness(locationId, token);
      setReadiness(result);
    } catch (error) {
      setWizardError(errorMessage(error));
    } finally {
      setIsRunningReadiness(false);
    }
  };

  const publishRequired = async () => {
    if (!token || !locationId) {
      return;
    }

    setIsPublishingRequired(true);
    setWizardError(null);

    try {
      const published = await wizardPublishRequired(locationId, expectedRevisions, token);
      setLastPublishSummary(
        `Published ${published.length} domain configs at ${new Date().toLocaleString()}.`,
      );
      const result = await wizardReadiness(locationId, token);
      setReadiness(result);
    } catch (error) {
      setWizardError(errorMessage(error));
    } finally {
      setIsPublishingRequired(false);
    }
  };

  const loadBootstrap = async () => {
    if (!token || !locationId) {
      return;
    }

    setIsLoadingBootstrap(true);
    setRuntimeError(null);

    try {
      const bootstrap = await getRuntimeBootstrap(locationId, token);
      setRuntimeBootstrap(bootstrap);
    } catch (error) {
      setRuntimeError(errorMessage(error));
    } finally {
      setIsLoadingBootstrap(false);
    }
  };

  const loadRuntimeDomain = async () => {
    if (!token || !locationId) {
      return;
    }

    setIsLoadingRuntimeConfig(true);
    setRuntimeError(null);

    try {
      const scope = LOCATION_SCOPED_DOMAINS.has(runtimeDomain)
        ? { scopeType: "location" as const, scopeId: locationId }
        : {};
      const config = await getRuntimeConfig(runtimeDomain, scope, token);
      setRuntimeConfig(config);
    } catch (error) {
      setRuntimeError(errorMessage(error));
    } finally {
      setIsLoadingRuntimeConfig(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Wand2 className="w-7 h-7 text-[var(--genie-primary)]" />
          <h1 className="text-3xl font-semibold">Setup Wizard</h1>
        </div>
        <p className="text-muted-foreground">
          Run readiness checks, publish required domains, and verify runtime payloads.
        </p>
      </div>

      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Pilot Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="setup-location">Location</Label>
          <Select value={locationId || undefined} onValueChange={setLocationId}>
            <SelectTrigger id="setup-location">
              <SelectValue placeholder={isLoadingLocations ? "Loading locations..." : "Select location"} />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.short_code} - {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {locationError ? (
            <p className="text-xs text-destructive">{locationError.message}</p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Wizard Readiness</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={runReadiness} disabled={!locationId || !token || isRunningReadiness}>
              {isRunningReadiness ? "Checking..." : "Run Readiness"}
            </Button>
            <Button
              variant="outline"
              onClick={publishRequired}
              disabled={
                !locationId ||
                !token ||
                isPublishingRequired ||
                !allRequiredDomainsReady ||
                Object.keys(expectedRevisions).length !== WIZARD_REQUIRED_DOMAINS.length
              }
            >
              {isPublishingRequired ? "Publishing..." : "Publish Required Domains"}
            </Button>
          </div>

          {lastPublishSummary ? (
            <p className="text-sm text-[var(--genie-success)]">{lastPublishSummary}</p>
          ) : null}
          {wizardError ? <p className="text-sm text-destructive">{wizardError}</p> : null}

          <div className="space-y-2">
            {readiness.length === 0 ? (
              <p className="text-sm text-muted-foreground">Run readiness to view per-domain status.</p>
            ) : (
              readiness.map((item) => (
                <div
                  key={`${item.domain}-${item.scope_type}-${item.scope_id}`}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3"
                >
                  <div className="space-y-1">
                    <div className="font-medium">
                      {item.domain} ({item.scope_type})
                    </div>
                    <div className="text-xs text-muted-foreground">Revision: {item.draft_revision}</div>
                    {item.errors.length > 0 ? (
                      <p className="text-xs text-destructive">
                        {item.errors[0].field}: {item.errors[0].message}
                      </p>
                    ) : null}
                  </div>
                  <Badge
                    variant={item.ready ? "default" : "secondary"}
                    className={item.ready ? "bg-[var(--genie-success)]" : ""}
                  >
                    {item.ready ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <CircleX className="w-3 h-3 mr-1" />}
                    {item.ready ? "Ready" : "Blocked"}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Runtime Verification Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={loadBootstrap} disabled={!locationId || !token || isLoadingBootstrap}>
              {isLoadingBootstrap ? "Loading..." : "Load Bootstrap Runtime"}
            </Button>
            <Select value={runtimeDomain} onValueChange={(value) => setRuntimeDomain(value as ConfigDomain)}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WIZARD_REQUIRED_DOMAINS.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={loadRuntimeDomain}
              disabled={!locationId || !token || isLoadingRuntimeConfig}
            >
              {isLoadingRuntimeConfig ? "Loading..." : "Load Runtime Domain"}
            </Button>
          </div>

          {runtimeError ? <p className="text-sm text-destructive">{runtimeError}</p> : null}

          <div className="space-y-2">
            <p className="text-sm font-medium">Bootstrap Snapshot</p>
            {runtimeBootstrap?.configs?.length ? (
              <div className="space-y-2">
                {runtimeBootstrap.configs.map((config) => (
                  <div
                    key={`${config.domain}-${config.scope_type}-${config.scope_id}`}
                    className="rounded-lg border border-[var(--border)] px-4 py-3 text-sm"
                  >
                    <div className="font-medium">
                      {config.domain} ({config.scope_type})
                    </div>
                    <div className="text-xs text-muted-foreground">
                      published_at: {new Date(config.published_at).toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">etag: {config.etag}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No runtime bootstrap data loaded.</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Runtime Domain Payload</p>
            {runtimeConfig ? (
              <Card className="border-[var(--border)]">
                <CardContent className="pt-6 space-y-3">
                  <div className="text-xs text-muted-foreground">
                    {runtimeConfig.domain} ({runtimeConfig.scope_type}) - {runtimeConfig.scope_id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    published_at: {new Date(runtimeConfig.published_at).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">etag: {runtimeConfig.etag}</div>
                  <Textarea
                    readOnly
                    value={JSON.stringify(runtimeConfig.payload ?? {}, null, 2)}
                    className="min-h-64 font-mono text-xs bg-[var(--input-background)] border-0"
                  />
                </CardContent>
              </Card>
            ) : (
              <p className="text-sm text-muted-foreground">No runtime domain payload loaded.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
