import { apiGet } from "./client";

export type LocationSummary = {
  id: string;
  name: string;
  short_code: string;
  is_active: boolean;
};

export function listLocations(token: string) {
  return apiGet<LocationSummary[]>("/locations", { token });
}
