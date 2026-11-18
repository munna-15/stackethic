import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { buildEnquiryEmail } from "@/lib/enquiryEmail";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

async function hashIdentifier(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Spam trap
    if (str(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = str(body.name, 100);
    const email = str(body.email, 200);
    const company = str(body.company, 120);
    const message = str(body.message, 3000);

    const types = Array.isArray(body.types)
      ? body.types
          .filter((type): type is string => typeof type === "string")
          .slice(0, 10)
          .map((type) => type.trim().slice(0, 60))
          .filter(Boolean)
      : [];

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Please add a few more details about your project." },
        { status: 400 },
      );
    }

    // Cloudflare environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || "hello@stackethic.com";
    const from =
      process.env.CONTACT_FROM_EMAIL || "StackEthic <website@stackethic.com>";

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://stackethic.com";

    const timeZone = process.env.CONTACT_TIMEZONE || "Asia/Dhaka";

    if (!apiKey) {
      console.error("Contact form: RESEND_API_KEY is not set.");

      return NextResponse.json(
        {
          error:
            "The contact form is temporarily unavailable. Please email us directly.",
        },
        { status: 500 },
      );
    }

    // Rate limiting: maximum 2 valid submissions per IP in 24 hours
    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      (process.env.NODE_ENV !== "production" ? "local-development" : null);

    if (!clientIp) {
      console.error("Contact form: Client IP is unavailable.");

      return NextResponse.json(
        {
          error:
            "The contact form is temporarily unavailable. Please try again later.",
        },
        { status: 503 },
      );
    }

    const { env } = getCloudflareContext();

    const identifier = await hashIdentifier(clientIp);
    const id = env.CONTACT_RATE_LIMITER.idFromName(identifier);
    const limiter = env.CONTACT_RATE_LIMITER.get(id);

    const limitResponse = await limiter.fetch(
      "https://contact-rate-limiter/check",
      {
        method: "POST",
      },
    );

    if (!limitResponse.ok) {
      console.error("Contact form: Rate limiter error", limitResponse.status);

      return NextResponse.json(
        {
          error:
            "The contact form is temporarily unavailable. Please try again later.",
        },
        { status: 503 },
      );
    }

    const limitData: unknown = await limitResponse.json();

    if (
      typeof limitData !== "object" ||
      limitData === null ||
      !("allowed" in limitData) ||
      typeof limitData.allowed !== "boolean"
    ) {
      console.error("Contact form: Invalid rate limiter response.");

      return NextResponse.json(
        {
          error:
            "The contact form is temporarily unavailable. Please try again later.",
        },
        { status: 503 },
      );
    }

    if (!limitData.allowed) {
      const retryAfter =
        "retryAfter" in limitData && typeof limitData.retryAfter === "number"
          ? Math.max(1, limitData.retryAfter)
          : 86400;

      return NextResponse.json(
        {
          error:
            "You have reached the daily message limit. Please try again after 24 hours.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
          },
        },
      );
    }

    const receivedAt = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone,
      timeZoneName: "short",
    }).format(new Date());

    const html = buildEnquiryEmail({
      name,
      email,
      company,
      types,
      message,
      siteUrl,
      receivedAt,
    });

    const lines = [`Name: ${name}`, `Email: ${email}`];

    if (company) {
      lines.push(`Company: ${company}`);
    }

    if (types.length) {
      lines.push(`Needs: ${types.join(", ")}`);
    }

    lines.push("", message);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New project enquiry from ${name}`,
        html,
        text: lines.join("\n"),
      }),
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error("Contact form: Resend API error", res.status, responseText);

      return NextResponse.json(
        {
          error:
            "We could not send your message. Please try again or email us directly.",
        },
        { status: 502 },
      );
    }

    console.log("Contact form: email sent successfully", responseText);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: unexpected error", error);

    return NextResponse.json(
      {
        error: "We could not send your message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
