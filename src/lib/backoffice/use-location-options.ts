"use client";

import { useCallback, useEffect, useState } from "react";

import { isApiRequestError, type ApiRequestError } from "@/lib/api/errors";
import { listLocations, type LocationSummary } from "@/lib/api/locations";
import { useSession } from "@/lib/session/store";

type UseLocationOptionsResult = {
  locations: LocationSummary[];
  isLoading: boolean;
  error: ApiRequestError | null;
  reload: () => Promise<void>;
};

export function useLocationOptions(): UseLocationOptionsResult {
  const { session } = useSession();
  const token = session?.token ?? null;

  const [locations, setLocations] = useState<LocationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiRequestError | null>(null);

  const reload = useCallback(async () => {
    if (!token) {
      setLocations([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nextLocations = await listLocations(token);
      setLocations(nextLocations);
    } catch (loadError) {
      setLocations([]);
      if (isApiRequestError(loadError)) {
        setError(loadError);
      } else {
        setError(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    reload().catch(() => {
      // Hook state already tracks the failure.
    });
  }, [reload]);

  return {
    locations,
    isLoading,
    error,
    reload,
  };
}
