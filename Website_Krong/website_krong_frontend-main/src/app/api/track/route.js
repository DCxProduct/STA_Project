// app/api/track/route.js
function getClientIP(req) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "0.0.0.0";
}

function parseUA(ua = "") {
  let os = "Unknown OS";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iOS/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "Unknown Browser";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = "Safari";
  else if (/Firefox\//.test(ua)) browser = "Firefox";

  return { os, browser };
}

export async function POST(req) {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.API_KEY;
    const options = {};
    if (!base)
      return new Response("ANALYTICS_BASE_URL not set", { status: 500 });

    const body = await req.json();
    const device_id = body?.device_id || "unknown-device"; // REQUIRED upstream
    const ip = getClientIP(req); // REQUIRED upstream
    const ua = req.headers.get("user-agent") || "";
    const { os, browser } = parseUA(ua); // optional upstream

    // Only send what your endpoint requires/allows
    const payload = {
      device_id,
      ip,
      os, // optional: remove if not needed
      browser, // optional: remove if not needed
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: API_KEY,
      ...options.headers,
    };
    const res = await fetch(`${base}/track`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    return new Response(text, { status: res.status });
  } catch {
    return new Response("Bad request", { status: 400 });
  }
}
