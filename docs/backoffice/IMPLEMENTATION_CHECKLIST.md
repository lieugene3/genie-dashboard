# Genie Dashboard -> Genie API Integration Checklist

Source contracts:
- `/Users/eugene/Projects/genie-api/docs/openapi/v1/openapi.json`
- `/Users/eugene/Projects/genie-api/docs/backoffice/CONTRACT_FREEZE.md`
- `/Users/eugene/Projects/genie-api/docs/backoffice/WEBAPP_BUILD_BREAKDOWN.md`
- `/Users/eugene/Projects/genie-api/docs/backoffice/PILOT_RUNBOOK.md`

## Phase 1: Foundation

- [x] Add API base URL and proxy strategy (`next.config.mjs`, `.env.example`)
- [x] Create typed API client with envelope parsing (`src/lib/api/client.ts`, `src/lib/api/types.ts`)
- [x] Implement deterministic error behavior mapping (`src/lib/api/errors.ts`, `src/lib/ui/error-behavior.ts`)
- [x] Implement backoffice auth API module (`src/lib/api/auth.ts`)
- [x] Add session store/provider and dashboard auth guard (`src/lib/session/store.tsx`, `src/lib/session/guard.tsx`, `src/app/providers.tsx`)
- [x] Add `/login` and wire dashboard logout (`src/app/login/page.tsx`, `src/app/layout/DashboardLayout.tsx`)

## Phase 2: Shared Backoffice Editor Framework

- [x] Add backoffice domain/scope constants and DTOs
- [x] Build shared editor state machine (`load -> save -> validate -> publish`)
- [x] Build shared UI: validation summary, conflict banner, publish actions
- [x] Add scope picker for location-scoped domains

## Phase 3: Domain Wiring

- [x] Wire `organization` editor
- [ ] Wire `location` editor (location scope)
- [ ] Wire `menu` editor
- [ ] Wire `tax` editor
- [ ] Wire `payment` editor
- [ ] Wire `receipt` editor
- [ ] Wire `routing` editor (printers page)
- [ ] Wire `floor_plan` editor
- [ ] Add `pin_policy` page and wire editor

## Phase 4: Wizard + Runtime Verification

- [ ] Integrate wizard readiness endpoint
- [ ] Integrate wizard publish-required endpoint with expected revisions map
- [ ] Add runtime verification panel (`bootstrap` + per-domain runtime reads)

## Phase 5: Test + Pilot Readiness

- [ ] Add lifecycle E2E (`draft -> validate -> publish -> runtime`)
- [ ] Add stale revision conflict E2E (`409`)
- [ ] Add permission blocking E2E (`403`)
- [ ] Verify pilot runbook gates with no manual DB changes
