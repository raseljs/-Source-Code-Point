import { NextRequest, NextResponse } from "next/server";

type MetaEventPayload = {
  eventName?: string;
  eventId?: string;
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
  contentName?: string;
  sourceUrl?: string;
  fbp?: string;
  fbc?: string;
};

const allowedEvents = new Set([
  "PageView",
  "ViewContent",
  "InitiateCheckout",
  "Lead",
  "Purchase",
]);

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: NextRequest) {
  let payload: MetaEventPayload;

  try {
    payload = (await request.json()) as MetaEventPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const eventName = payload.eventName ?? "Lead";
  if (!allowedEvents.has(eventName)) {
    return NextResponse.json({ ok: false, message: "Unsupported event" }, { status: 400 });
  }

  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const apiVersion = process.env.META_GRAPH_API_VERSION ?? "v26.0";

  if (!pixelId || !accessToken) {
    return NextResponse.json({ ok: true, configured: false });
  }

  const userData: Record<string, string | string[]> = {
    client_user_agent: request.headers.get("user-agent") ?? "",
  };

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwardedFor) userData.client_ip_address = forwardedFor;
  if (payload.email) userData.em = [await sha256(payload.email)];
  if (payload.phone) userData.ph = [await sha256(payload.phone.replace(/\D/g, ""))];
  if (payload.fbp) userData.fbp = payload.fbp;
  if (payload.fbc) userData.fbc = payload.fbc;

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: payload.eventId,
    action_source: "website",
    event_source_url: payload.sourceUrl,
    user_data: userData,
    custom_data: {
      currency: payload.currency ?? "BDT",
      value: Number(payload.value ?? 0),
      content_name: payload.contentName ?? "Source Code Order",
    },
  };

  const body: Record<string, unknown> = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, configured: true, message: "Meta event was rejected" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json(
      { ok: false, configured: true, message: "Meta event could not be delivered" },
      { status: 502 },
    );
  }
}
