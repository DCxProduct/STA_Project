// components/TrackingProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getDeviceId() {
  try {
    const k = "__device_id";
    let id = localStorage.getItem(k);
    if (!id) {
      id =
        crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(k, id);
    }
    return id;
  } catch {
    return "unknown-device";
  }
}

async function sendToProxy(payload) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {}
}

export function track(name, params = {}) {
  // This sends a custom event; server will attach IP/UA
  sendToProxy({
    device_id: getDeviceId(),
    name,
    params,
    kind: "event",
    ts: Date.now(),
  });
}

export default function TrackingProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastRef = useRef("");

  useEffect(() => {
    const path =
      pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    if (lastRef.current === path) return;
    lastRef.current = path;

    // Pageview
    sendToProxy({ device_id: getDeviceId(), kind: "pageview", ts: Date.now() });
  }, [pathname, searchParams]);

  return null;
}
