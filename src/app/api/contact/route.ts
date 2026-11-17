import { NextResponse } from "next/server";
import { buildEnquiryEmail } from "@/lib/enquiryEmail";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
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
        .filter((t): t is string => typeof t === "string")
        .slice(0, 10)
        .map((t) => t.slice(0, 60))
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@stackethic.com";
  const from =
    process.env.CONTACT_FROM_EMAIL || "StackEthic <website@stackethic.com>";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stackethic.com";
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

  // e.g. "18 Nov 2026, 3:42 pm GMT+6"
  const receivedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
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
  if (company) lines.push(`Company: ${company}`);
  if (types.length) lines.push(`Needs: ${types.join(", ")}`);
  lines.push("", message);

  try {
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

    if (!res.ok) {
      console.error(
        "Contact form: email provider error",
        res.status,
        await res.text(),
      );
      return NextResponse.json(
        {
          error:
            "We could not send your message. Please try again or email us directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: request failed", error);
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 502 },
    );
  }
}
