# Pilot Gate Verification (API-Only)

This verification path follows the pilot runbook contract using API calls only.
No direct database writes are required.

## Required Environment

- `GENIE_E2E_BASE_URL` (default: `http://localhost:8080/api/v1`)
- `GENIE_E2E_TOKEN` (owner token with draft/edit/publish permissions)
- `GENIE_E2E_LOCATION_ID` (pilot location UUID)
- `GENIE_E2E_NO_PUBLISH_TOKEN` (optional token without `config.publish` for 403 test)

## Run

```bash
npm run test:e2e:backoffice
```

## Coverage

The suite verifies:

1. `draft -> validate -> publish -> runtime` lifecycle sync.
2. `409 config_draft_revision_conflict` stale revision handling.
3. `403 permission_denied` publish blocking path.
4. Wizard readiness domain coverage for pilot gate checks.
