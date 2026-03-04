import { apiGet, apiPost, apiPut } from "@/lib/api/client";
import type {
  ApiScopeType,
  ConfigDomain,
  ConfigDraft,
  ConfigPublished,
  RuntimeBootstrap,
  RuntimeConfig,
  ConfigValidationResult,
  WizardReadinessItem,
} from "@/lib/api/types";

export type ConfigScopeInput = {
  scopeType?: ApiScopeType;
  scopeId?: string | null;
};

type ScopeBody = {
  scope_type?: ApiScopeType;
  scope_id?: string;
};

function toScopeQuery(scope: ConfigScopeInput): Record<string, string> {
  if (scope.scopeType !== "location") {
    return {};
  }

  if (!scope.scopeId) {
    throw new Error("scopeId is required when scopeType is location");
  }

  return {
    scope_type: "location",
    scope_id: scope.scopeId,
  };
}

function toScopeBody(scope: ConfigScopeInput): ScopeBody {
  if (scope.scopeType !== "location") {
    return {};
  }

  if (!scope.scopeId) {
    throw new Error("scopeId is required when scopeType is location");
  }

  return {
    scope_type: "location",
    scope_id: scope.scopeId,
  };
}

export function getDraftConfig(
  domain: ConfigDomain,
  scope: ConfigScopeInput,
  token: string,
) {
  return apiGet<ConfigDraft>(`/backoffice/${domain}/draft`, {
    token,
    query: toScopeQuery(scope),
  });
}

export function upsertDraftConfig(
  domain: ConfigDomain,
  scope: ConfigScopeInput,
  payload: Record<string, unknown>,
  expectedRevision: number,
  token: string,
) {
  return apiPut<ConfigDraft>(`/backoffice/${domain}/draft`, {
    token,
    body: {
      ...toScopeBody(scope),
      payload,
      expected_revision: expectedRevision,
    },
  });
}

export function validateDraftConfig(
  domain: ConfigDomain,
  scope: ConfigScopeInput,
  token: string,
) {
  return apiPost<ConfigValidationResult>(`/backoffice/${domain}/validate`, {
    token,
    body: {
      ...toScopeBody(scope),
    },
  });
}

export function publishDraftConfig(
  domain: ConfigDomain,
  scope: ConfigScopeInput,
  expectedRevision: number,
  token: string,
) {
  return apiPost<ConfigPublished>(`/backoffice/${domain}/publish`, {
    token,
    body: {
      ...toScopeBody(scope),
      expected_revision: expectedRevision,
    },
  });
}

export function wizardReadiness(locationId: string, token: string) {
  return apiPost<WizardReadinessItem[]>("/backoffice/setup/wizard/readiness", {
    token,
    body: {
      location_id: locationId,
    },
  });
}

export function wizardPublishRequired(
  locationId: string,
  expectedRevisions: Record<string, number>,
  token: string,
) {
  return apiPost<ConfigPublished[]>("/backoffice/setup/wizard/publish-required", {
    token,
    body: {
      location_id: locationId,
      expected_revisions: expectedRevisions,
    },
  });
}

export function getRuntimeBootstrap(locationId: string, token: string) {
  return apiGet<RuntimeBootstrap>("/runtime/config/bootstrap", {
    token,
    query: {
      location_id: locationId,
    },
  });
}

export function getRuntimeConfig(
  domain: ConfigDomain,
  scope: ConfigScopeInput,
  token: string,
) {
  return apiGet<RuntimeConfig>(`/runtime/config/${domain}`, {
    token,
    query: toScopeQuery(scope),
  });
}
