export type ApiScopeType = "tenant" | "location";

export type ConfigDomain =
  | "organization"
  | "location"
  | "pin_policy"
  | "tax"
  | "payment"
  | "receipt"
  | "menu"
  | "routing"
  | "floor_plan";

export type ApiErrorPayload = {
  code: string;
  message: string;
};

export type ApiEnvelope<T> = {
  data: T | null;
  error: ApiErrorPayload | null;
};

export type ConfigValidationError = {
  field: string;
  message: string;
};

export type ConfigDraft = {
  id: string;
  domain: ConfigDomain;
  scope_type: ApiScopeType;
  scope_id: string;
  payload: Record<string, unknown>;
  revision: number;
  updated_by: string;
  updated_at: string;
};

export type ConfigPublished = {
  id: string;
  domain: ConfigDomain;
  scope_type: ApiScopeType;
  scope_id: string;
  payload: Record<string, unknown>;
  source_draft_revision: number;
  published_by: string;
  published_at: string;
};

export type ConfigValidationResult = {
  errors: ConfigValidationError[];
};

export type WizardReadinessItem = {
  domain: ConfigDomain;
  scope_type: ApiScopeType;
  scope_id: string;
  draft_revision: number;
  ready: boolean;
  errors: ConfigValidationError[];
};

export type RuntimeConfig = {
  domain: ConfigDomain;
  scope_type: ApiScopeType;
  scope_id: string;
  payload: Record<string, unknown>;
  published_at: string;
  etag: string;
};

export type RuntimeBootstrap = {
  configs: RuntimeConfig[];
};

export type BackofficePinLoginRequest = {
  tenant_id: string;
  employee_id: string;
  pin: string;
};

export type BackofficeRefreshRequest = {
  token: string;
};

export type TokenResponse = {
  token: string;
  expires_in: number;
};
