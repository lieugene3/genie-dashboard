import assert from "node:assert/strict";
import test from "node:test";

const BASE_URL = (process.env.GENIE_E2E_BASE_URL ?? "http://localhost:8080/api/v1").replace(
  /\/+$/,
  "",
);
const ADMIN_TOKEN = process.env.GENIE_E2E_TOKEN ?? "";
const LOCATION_ID = process.env.GENIE_E2E_LOCATION_ID ?? "";
const NO_PUBLISH_TOKEN = process.env.GENIE_E2E_NO_PUBLISH_TOKEN ?? "";

const REQUIRED_DOMAINS = [
  "organization",
  "pin_policy",
  "location",
  "tax",
  "payment",
  "receipt",
  "menu",
  "routing",
  "floor_plan",
];

const coreE2EEnabled = Boolean(ADMIN_TOKEN && LOCATION_ID);

function buildUrl(path, query) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${BASE_URL}${normalizedPath}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") {
        continue;
      }
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

async function apiRequest(path, options = {}) {
  const headers = new Headers({ Accept: "application/json" });
  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(buildUrl(path, options.query), {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const json = await response.json();
  assert.equal(typeof json, "object");
  assert.ok("data" in json);
  assert.ok("error" in json);

  return {
    status: response.status,
    json,
  };
}

test(
  "E2E lifecycle: draft -> validate -> publish -> runtime sync",
  { skip: !coreE2EEnabled },
  async () => {
    const draftResponse = await apiRequest("/backoffice/organization/draft", {
      token: ADMIN_TOKEN,
      query: { scope_type: "tenant" },
    });

    let expectedRevision = 0;
    if (draftResponse.status === 200) {
      expectedRevision = draftResponse.json.data.revision;
    } else {
      assert.equal(draftResponse.status, 404);
    }

    const marker = `E2E-${Date.now()}`;
    const payload = {
      organization_name: marker,
      currency: "CAD",
      timezone: "America/Toronto",
    };

    const upsertResponse = await apiRequest("/backoffice/organization/draft", {
      method: "PUT",
      token: ADMIN_TOKEN,
      body: {
        scope_type: "tenant",
        payload,
        expected_revision: expectedRevision,
      },
    });

    assert.equal(upsertResponse.status, 200);
    const revision = upsertResponse.json.data.revision;

    const validateResponse = await apiRequest("/backoffice/organization/validate", {
      method: "POST",
      token: ADMIN_TOKEN,
      body: { scope_type: "tenant" },
    });
    assert.equal(validateResponse.status, 200);
    assert.deepEqual(validateResponse.json.data.errors, []);

    const publishResponse = await apiRequest("/backoffice/organization/publish", {
      method: "POST",
      token: ADMIN_TOKEN,
      body: {
        scope_type: "tenant",
        expected_revision: revision,
      },
    });
    assert.equal(publishResponse.status, 200);

    const runtimeResponse = await apiRequest("/runtime/config/organization", {
      token: ADMIN_TOKEN,
      query: { scope_type: "tenant" },
    });
    assert.equal(runtimeResponse.status, 200);
    assert.equal(runtimeResponse.json.data.payload.organization_name, marker);
  },
);

test(
  "E2E stale revision path returns config_draft_revision_conflict (409)",
  { skip: !coreE2EEnabled },
  async () => {
    const initialDraft = await apiRequest("/backoffice/organization/draft", {
      token: ADMIN_TOKEN,
      query: { scope_type: "tenant" },
    });

    let staleRevision = 0;
    if (initialDraft.status === 200) {
      staleRevision = initialDraft.json.data.revision;
    } else {
      assert.equal(initialDraft.status, 404);
    }

    const payload = {
      organization_name: `Conflict-${Date.now()}`,
      currency: "CAD",
      timezone: "America/Toronto",
    };

    const firstWrite = await apiRequest("/backoffice/organization/draft", {
      method: "PUT",
      token: ADMIN_TOKEN,
      body: {
        scope_type: "tenant",
        payload,
        expected_revision: staleRevision,
      },
    });
    assert.equal(firstWrite.status, 200);

    const staleWrite = await apiRequest("/backoffice/organization/draft", {
      method: "PUT",
      token: ADMIN_TOKEN,
      body: {
        scope_type: "tenant",
        payload: {
          ...payload,
          organization_name: `${payload.organization_name}-stale`,
        },
        expected_revision: staleRevision,
      },
    });

    assert.equal(staleWrite.status, 409);
    assert.equal(staleWrite.json.error.code, "config_draft_revision_conflict");
  },
);

test(
  "E2E permission blocking path returns permission_denied (403)",
  { skip: !NO_PUBLISH_TOKEN },
  async () => {
    const response = await apiRequest("/backoffice/organization/publish", {
      method: "POST",
      token: NO_PUBLISH_TOKEN,
      body: {
        scope_type: "tenant",
        expected_revision: 1,
      },
    });

    assert.equal(response.status, 403);
    assert.equal(response.json.error.code, "permission_denied");
  },
);

test(
  "Pilot runbook gate contract can be verified through API only (no DB writes)",
  { skip: !coreE2EEnabled },
  async () => {
    const readinessResponse = await apiRequest("/backoffice/setup/wizard/readiness", {
      method: "POST",
      token: ADMIN_TOKEN,
      body: { location_id: LOCATION_ID },
    });

    assert.equal(readinessResponse.status, 200);
    assert.ok(Array.isArray(readinessResponse.json.data));

    const seenDomains = new Set(readinessResponse.json.data.map((item) => item.domain));
    for (const domain of REQUIRED_DOMAINS) {
      assert.ok(seenDomains.has(domain), `missing readiness domain: ${domain}`);
    }
  },
);
