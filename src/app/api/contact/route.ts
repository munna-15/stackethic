import { NextResponse } from "next/server";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

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
      {
        error: "Please add a few more details about your project.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@stackethic.com";

  const from =
    process.env.CONTACT_FROM_EMAIL || "StackEthic <website@stackethic.com>";

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

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const safeTypes = types
    .map((type) => escapeHtml(type))
    .map(
      (type) => `
        <span style="
          display:inline-block;
          padding:7px 12px;
          margin:0 6px 6px 0;
          border-radius:30px;
          background:#E5EBCB;
          color:#252B0B;
          font-size:12px;
          font-weight:600;
        ">${type}</span>
      `,
    )
    .join("");

  const companyHtml = company
    ? `
      <tr>
        <td style="padding:18px 0;border-bottom:1px solid #E5E7DC;">
          <div style="font-size:10px;letter-spacing:1.5px;color:#858873;font-weight:700;margin-bottom:8px;">
            COMPANY
          </div>
          <div style="font-size:14px;color:#252B0B;">
            ${safeCompany}
          </div>
        </td>
      </tr>
    `
    : "";

  const needsHtml = safeTypes
    ? `
      <tr>
        <td style="padding:18px 0;border-bottom:1px solid #E5E7DC;">
          <div style="font-size:10px;letter-spacing:1.5px;color:#858873;font-weight:700;margin-bottom:12px;">
            PROJECT NEEDS
          </div>
          ${safeTypes}
        </td>
      </tr>
    `
    : "";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Project Enquiry - StackEthic</title>
      </head>

      <body style="
        margin:0;
        padding:0;
        background-color:#F1F2EB;
        font-family:Arial,Helvetica,sans-serif;
        color:#252B0B;
      ">

        <div style="
          display:none;
          max-height:0;
          overflow:hidden;
          opacity:0;
        ">
          A new project enquiry has arrived through StackEthic.
        </div>

        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background:#F1F2EB;padding:36px 14px;"
        >
          <tr>
            <td align="center">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width:600px;
                  background:#F7F7F0;
                  border-radius:12px;
                  overflow:hidden;
                "
              >

                <!-- Brand header -->
                <tr>
                  <td style="
                    background:#252B0B;
                    padding:30px 32px;
                  ">
                    <table role="presentation" width="100%">
                      <tr>
                        <td>
                          <div style="
                            font-size:23px;
                            font-weight:700;
                            letter-spacing:-1px;
                            color:#F7F7F0;
                          ">
                            <span style="
                              display:inline-block;
                              background:#DDF46A;
                              color:#252B0B;
                              padding:5px 9px;
                              border-radius:5px;
                              margin-right:8px;
                            ">S</span>
                            StackEthic
                          </div>

                          <div style="
                            margin-top:10px;
                            font-size:10px;
                            letter-spacing:2px;
                            color:#DDF46A;
                            font-weight:600;
                          ">
                            DIGITAL ENGINEERING STUDIO
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="
                      margin-top:34px;
                      font-size:10px;
                      letter-spacing:1.8px;
                      color:#DDF46A;
                      font-weight:700;
                    ">
                      NEW PROJECT ENQUIRY
                    </div>

                    <h1 style="
                      margin:12px 0 8px;
                      color:#F7F7F0;
                      font-size:29px;
                      line-height:1.25;
                      letter-spacing:-1px;
                      font-weight:600;
                    ">
                      A new conversation<br />starts here.
                    </h1>

                    <p style="
                      margin:0;
                      color:#D4D8C5;
                      font-size:13px;
                      line-height:1.7;
                    ">
                      Someone has reached out through your website.
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:30px 32px;">

                    <table
                      role="presentation"
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >

                      <tr>
                        <td style="padding:0 0 18px;border-bottom:1px solid #E5E7DC;">
                          <div style="font-size:10px;letter-spacing:1.5px;color:#858873;font-weight:700;margin-bottom:8px;">
                            NAME
                          </div>
                          <div style="font-size:16px;font-weight:700;color:#252B0B;">
                            ${safeName}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:18px 0;border-bottom:1px solid #E5E7DC;">
                          <div style="font-size:10px;letter-spacing:1.5px;color:#858873;font-weight:700;margin-bottom:8px;">
                            EMAIL ADDRESS
                          </div>
                          <a
                            href="mailto:${safeEmail}"
                            style="font-size:14px;color:#252B0B;text-decoration:underline;"
                          >
                            ${safeEmail}
                          </a>
                        </td>
                      </tr>

                      ${companyHtml}
                      ${needsHtml}

                      <tr>
                        <td style="padding:22px 0 0;">
                          <div style="
                            font-size:10px;
                            letter-spacing:1.5px;
                            color:#858873;
                            font-weight:700;
                            margin-bottom:12px;
                          ">
                            PROJECT MESSAGE
                          </div>

                          <div style="
                            background:#E5EBCB;
                            padding:20px;
                            border-radius:8px;
                            font-size:14px;
                            line-height:1.8;
                            color:#252B0B;
                            overflow-wrap:anywhere;
                          ">
                            ${safeMessage}
                          </div>
                        </td>
                      </tr>

                    </table>

                    <div style="
                      margin-top:30px;
                      padding:17px 20px;
                      background:#252B0B;
                      border-radius:8px;
                      text-align:center;
                    ">
                      <div style="
                        color:#DDF46A;
                        font-size:11px;
                        font-weight:700;
                        letter-spacing:1.5px;
                      ">
                        THOUGHTFUL ENGINEERING.
                      </div>
                      <div style="
                        color:#F7F7F0;
                        font-size:11px;
                        margin-top:6px;
                        letter-spacing:1px;
                      ">
                        INTELLIGENT TECHNOLOGY.
                      </div>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="
                    padding:20px 30px;
                    border-top:1px solid #E5E7DC;
                    text-align:center;
                  ">
                    <p style="
                      margin:0;
                      font-size:11px;
                      line-height:1.7;
                      color:#858873;
                    ">
                      This enquiry was submitted through
                      <a
                        href="https://stackethic.com"
                        style="color:#252B0B;font-weight:700;text-decoration:none;"
                      >
                        stackethic.com
                      </a>
                    </p>
                    <p style="
                      margin:8px 0 0;
                      font-size:10px;
                      color:#A0A38F;
                    ">
                      © StackEthic · Digital Engineering Studio
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;

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
      {
        error: "We could not send your message. Please try again later.",
      },
      { status: 502 },
    );
  }
}
