/**
 * HTML email for new contact-form enquiries.
 * StackEthic brand: deep olive, lime and ivory.
 * Logo: /public/email/logo-mark.png
 */

export type EnquiryEmailInput = {
  name: string;
  email: string;
  company: string;
  types: string[];
  message: string;
  siteUrl: string;
  receivedAt: string;
};

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

const C = {
  olive: "#2d3300",
  deep: "#1c2108",
  lime: "#dcf55a",
  limeSoft: "#ecf7b8",
  ivory: "#f4f6ea",
  paper: "#fbfcf8",
  page: "#e9ecd9",
  ink: "#1c220a",
  muted: "#5c6152",
  label: "#8e967e",
  border: "#e0e4d0",
  sage: "#b8c27d",
};

const label = (text: string) =>
  `<div style="font-family:${FONT};font-size:11px;line-height:14px;letter-spacing:1.8px;text-transform:uppercase;color:${C.label};font-weight:700;margin:0 0 12px;">${text}</div>`;

export function buildEnquiryEmail(i: EnquiryEmailInput): string {
  const name = escapeHtml(i.name);
  const email = escapeHtml(i.email);
  const company = escapeHtml(i.company);
  const message = escapeHtml(i.message).replace(/\r?\n/g, "<br>");
  const receivedAt = escapeHtml(i.receivedAt);
  const site = i.siteUrl.replace(/\/$/, "");
  const siteHost = escapeHtml(site.replace(/^https?:\/\//, ""));

  const words = i.name.split(/\s+/).filter(Boolean);
  const firstName = escapeHtml(words[0] ?? "there");
  const initials = escapeHtml(
    words
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?",
  );

  const replyHref = `mailto:${encodeURIComponent(i.email)}?subject=${encodeURIComponent("Re: your project enquiry")}`;
  const year = new Date().getFullYear();

  const chips = i.types
    .map(
      (t) =>
        `<span style="display:inline-block;margin:0 8px 8px 0;padding:8px 14px;border-radius:999px;background:${C.limeSoft};color:${C.olive};font-family:${FONT};font-size:13px;line-height:16px;font-weight:700;">${escapeHtml(t)}</span>`,
    )
    .join("");

  const companyLine = company
    ? `<div style="font-family:${FONT};font-size:13px;line-height:20px;color:${C.muted};margin-top:2px;">${company}</div>`
    : "";

  const needsBlock = chips
    ? `<tr><td class="px" style="padding:30px 36px 0;">${label("Project needs")}<div>${chips}</div></td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="only light" />
<meta name="supported-color-schemes" content="only light" />
<title>New project enquiry from ${name}</title>
<style>
  @media only screen and (max-width:520px){
    .wrap{padding:16px 8px !important}
    .px{padding-left:22px !important;padding-right:22px !important}
    .h1{font-size:28px !important;line-height:34px !important}
    .hide-sm{display:none !important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};" bgcolor="${C.page}">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
  ${name} sent a new project enquiry through your website.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page};">
<tr><td class="wrap" align="center" style="padding:40px 16px;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.paper}" style="max-width:600px;background:${C.paper};border-radius:26px;overflow:hidden;">

    <tr><td height="5" bgcolor="${C.lime}" style="height:5px;line-height:5px;font-size:0;background:${C.lime};">&nbsp;</td></tr>

    <tr>
      <td class="px" bgcolor="${C.olive}" style="background:${C.olive};padding:30px 36px 38px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle" style="font-family:${FONT};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" style="padding-right:10px;">
                    <img src="${site}/email/logo-mark.png" width="36" height="24" alt="" style="display:block;border:0;outline:none;width:36px;height:24px;" />
                  </td>
                  <td valign="middle" style="font-family:${FONT};font-size:22px;line-height:24px;font-weight:700;letter-spacing:-1px;color:#ffffff;">StackEthic</td>
                </tr>
              </table>
            </td>
            <td class="hide-sm" align="right" valign="middle">
              <span style="display:inline-block;padding:7px 14px;border:1px solid ${C.lime};border-radius:999px;font-family:${FONT};font-size:10px;line-height:12px;letter-spacing:1.8px;font-weight:700;color:${C.lime};text-transform:uppercase;">New enquiry</span>
            </td>
          </tr>
        </table>

        <div style="height:44px;line-height:44px;font-size:0;">&nbsp;</div>

        <div style="font-family:${FONT};font-size:11px;line-height:14px;letter-spacing:2px;font-weight:700;color:${C.lime};text-transform:uppercase;">New project enquiry</div>
        <h1 class="h1" style="margin:14px 0 0;font-family:${FONT};font-size:36px;line-height:42px;letter-spacing:-1.4px;font-weight:700;color:#ffffff;">
          ${name}<br /><span style="color:${C.sage};">has reached out.</span>
        </h1>
        <div style="margin-top:18px;font-family:${FONT};font-size:13px;line-height:20px;color:${C.sage};">
          Received ${receivedAt}
        </div>
      </td>
    </tr>

    <tr>
      <td class="px" style="padding:34px 36px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ivory}" style="background:${C.ivory};border:1px solid ${C.border};border-radius:20px;">
          <tr>
            <td style="padding:20px;" width="52" valign="middle">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="52" height="52" align="center" valign="middle" bgcolor="${C.lime}" style="width:52px;height:52px;border-radius:26px;background:${C.lime};font-family:${FONT};font-size:17px;line-height:52px;font-weight:700;color:${C.olive};">${initials}</td></tr>
              </table>
            </td>
            <td style="padding:20px 20px 20px 0;" valign="middle">
              <div style="font-family:${FONT};font-size:19px;line-height:24px;font-weight:700;letter-spacing:-0.4px;color:${C.ink};">${name}</div>
              <div style="margin-top:3px;"><a href="mailto:${email}" style="font-family:${FONT};font-size:14px;line-height:20px;color:${C.olive};text-decoration:underline;">${email}</a></div>
              ${companyLine}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    ${needsBlock}

    <tr>
      <td class="px" style="padding:30px 36px 0;">
        ${label("Message")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="4" bgcolor="${C.lime}" style="width:4px;background:${C.lime};border-radius:4px;">&nbsp;</td>
            <td bgcolor="${C.ivory}" style="background:${C.ivory};padding:22px 24px;border-radius:0 16px 16px 0;font-family:${FONT};font-size:15px;line-height:26px;color:${C.ink};word-break:break-word;">
              ${message}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td class="px" style="padding:34px 36px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" bgcolor="${C.olive}" style="border-radius:999px;background:${C.olive};">
              <a href="${replyHref}" style="display:inline-block;padding:16px 30px;font-family:${FONT};font-size:14px;line-height:16px;font-weight:700;color:${C.lime};text-decoration:none;border-radius:999px;">Reply to ${firstName} &rarr;</a>
            </td>
          </tr>
        </table>
        <div style="margin-top:16px;font-family:${FONT};font-size:12px;line-height:18px;color:${C.label};">
          You can also reply to this email. Your answer goes straight to ${firstName}.
        </div>
      </td>
    </tr>

    <tr><td height="40" style="height:40px;line-height:40px;font-size:0;">&nbsp;</td></tr>

    <tr>
      <td class="px" bgcolor="${C.deep}" style="background:${C.deep};padding:30px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="top" style="font-family:${FONT};">
              <div style="font-size:16px;line-height:20px;font-weight:700;letter-spacing:-0.6px;color:#ffffff;">StackEthic</div>
              <div style="margin-top:6px;font-size:10px;line-height:14px;letter-spacing:2px;font-weight:700;color:${C.lime};text-transform:uppercase;">Digital engineering studio</div>
              <div style="margin-top:14px;font-size:12px;line-height:18px;color:${C.sage};">Thoughtful engineering. Intelligent technology.</div>
            </td>
            <td class="hide-sm" align="right" valign="top" style="font-family:${FONT};font-size:12px;line-height:22px;">
              <a href="${site}/services" style="color:#ffffff;text-decoration:none;">Services</a><br />
              <a href="${site}/work" style="color:#ffffff;text-decoration:none;">Work</a><br />
              <a href="${site}/contact" style="color:#ffffff;text-decoration:none;">Contact</a>
            </td>
          </tr>
        </table>
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid #3a4318;font-family:${FONT};font-size:11px;line-height:18px;color:#8e967e;">
          Sent from the contact form on <a href="${site}" style="color:${C.sage};text-decoration:none;font-weight:700;">${siteHost}</a><br />
          &copy; ${year} StackEthic
        </div>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}
