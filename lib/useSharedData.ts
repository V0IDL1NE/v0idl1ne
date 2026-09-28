"use client";

import { useEffect, useRef, useState } from "react";
import { accessHeaders, reportAuthFailure } from "@/lib/accessKey";

export function useSharedData<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/crypt-data?key=${encodeURIComponent(key)}`, { headers: accessHeaders() })
      .then((r) => {
        if (r.status === 401) reportAuthFailure();
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setValue(d.value ?? defaultValue);
      })
      .catch(() => {
        if (!cancelled) setValue(defaultValue);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (value === null) return;
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    fetch("/api/crypt-data", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...accessHeaders() },
      body: JSON.stringify({ key, value }),
    })
      .then((r) => {
        if (r.status === 401) reportAuthFailure();
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, key]);

  return [value, setValue] as const;
}
