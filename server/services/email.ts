import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "Petalique Flora <hello@petaliqueflora.com>";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://petaliqueflora.com";

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

export async function sendConsultationEmail(consultation: {
  name: string;
  email: string;
  type: string;
  weddingDate?: Date | null;
  venue?: string | null;
  budget?: string | null;
}) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = getResend();
  try {
    await resend.emails.send({
      from: FROM,
      to: consultation.email,
      subject: "Your Petalique Flora consultation request",
      html: consultationConfirmationHtml(consultation),
    });
    await resend.emails.send({
      from: FROM,
      to: "hello@petaliqueflora.com",
      subject: `New ${consultation.type} inquiry — ${consultation.name}`,
      html: `
        <h2>New consultation inquiry</h2>
        <p><strong>Name:</strong> ${consultation.name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        <p><strong>Type:</strong> ${consultation.type}</p>
        ${consultation.weddingDate ? `<p><strong>Date:</strong> ${consultation.weddingDate.toDateString()}</p>` : ""}
        ${consultation.venue ? `<p><strong>Venue:</strong> ${consultation.venue}</p>` : ""}
        ${consultation.budget ? `<p><strong>Budget:</strong> ${consultation.budget}</p>` : ""}
        <p><a href="${BASE_URL}/admin/consultations">View in admin →</a></p>
      `,
    });
  } catch (err) {
    console.error("Email send error:", err);
  }
}

function consultationConfirmationHtml(c: { name: string; type: string }) {
  return `<!DOCTYPE html><html>
    <head><meta charset="utf-8"><title>Consultation Received — Petalique Flora</title></head>
    <body style="margin:0;padding:0;background:#FAF7F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td align="center" style="padding:48px 24px;">
          <table width="100%" style="max-width:560px;">
            <tr><td style="padding-bottom:32px;border-bottom:1px solid #E8E0D4;">
              <p style="margin:0;font-size:22px;color:#2C2C2C;">Petalique Flora</p>
            </td></tr>
            <tr><td style="padding:40px 0;">
              <p style="font-size:28px;color:#2C2C2C;margin:0 0 16px;font-weight:300;line-height:1.2;">Your inquiry is received.</p>
              <p style="font-size:15px;color:#9A9490;line-height:1.7;margin:0 0 24px;">
                Dear ${c.name},<br><br>
                Thank you for reaching out about your ${c.type.toLowerCase()} florals.
                Our design team will be in touch within <strong style="color:#2C2C2C;">24 hours</strong>.
              </p>
              <table><tr><td style="background:#2C2C2C;padding:0;">
                <a href="${BASE_URL}/weddings" style="display:block;padding:14px 32px;font-size:12px;color:#F5F0E8;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;">
                  Explore Our Work →
                </a>
              </td></tr></table>
            </td></tr>
            <tr><td style="padding-top:32px;border-top:1px solid #E8E0D4;">
              <p style="font-size:11px;color:#9A9490;margin:0;letter-spacing:0.08em;text-transform:uppercase;">
                Petalique Flora · Mississauga, Ontario, Canada
              </p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>`;
}

export async function sendOrderConfirmationEmail(order: {
  orderNumber: string;
  guestEmail?: string | null;
  total: number | string;
  items: Array<{ name: string; quantity: number; price: number }>;
  customerName?: string;
}) {
  if (!order.guestEmail || !process.env.RESEND_API_KEY) return;
  const resend = getResend();
  try {
    await resend.emails.send({
      from: FROM,
      to: order.guestEmail,
      subject: `Order confirmed — ${order.orderNumber}`,
      html: `<!DOCTYPE html><html><body style="background:#FAF7F2;font-family:Helvetica,Arial,sans-serif;margin:0;padding:32px;">
        <div style="max-width:560px;margin:0 auto;">
          <p style="font-size:22px;color:#2C2C2C;margin-bottom:32px;">Petalique Flora</p>
          <p style="font-size:26px;color:#2C2C2C;font-weight:300;">Order Confirmed</p>
          <p style="color:#9A9490;">Order #${order.orderNumber}</p>
          <p style="text-align:right;font-size:16px;color:#2C2C2C;font-weight:500;border-top:1px solid #E8E0D4;padding-top:12px;">
            Total: $${Number(order.total).toFixed(2)} CAD
          </p>
        </div></body></html>`,
    });
  } catch (err) {
    console.error("Order email error:", err);
  }
}

export async function sendWholesaleApprovalEmail(email: string, businessName: string, tier: string) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = getResend();
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your Petalique Flora trade account is approved",
      html: `<!DOCTYPE html><html><body style="background:#FAF7F2;font-family:Helvetica,Arial,sans-serif;margin:0;padding:32px;">
        <div style="max-width:560px;margin:0 auto;">
          <p style="font-size:22px;color:#2C2C2C;margin-bottom:32px;">Petalique Flora</p>
          <p style="font-size:26px;color:#2C2C2C;font-weight:300;">Trade Account Approved</p>
          <p style="color:#2C2C2C;line-height:1.7;">
            Dear ${businessName}, your account has been approved as a <strong>${tier}</strong> tier partner.
          </p>
          <a href="${BASE_URL}/wholesale/dashboard" style="display:inline-block;background:#C9A96E;color:#F5F0E8;padding:14px 32px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;margin-top:24px;">
            Access Your Portal →
          </a>
        </div></body></html>`,
    });
  } catch (err) {
    console.error("Wholesale approval email error:", err);
  }
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = getResend();
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Reset your Petalique Flora password",
      html: `<!DOCTYPE html><html><body style="background:#FAF7F2;font-family:Helvetica,Arial,sans-serif;margin:0;padding:32px;">
        <div style="max-width:560px;margin:0 auto;">
          <p style="font-size:22px;color:#2C2C2C;margin-bottom:32px;">Petalique Flora</p>
          <p style="font-size:24px;color:#2C2C2C;font-weight:300;">Password Reset</p>
          <p style="color:#9A9490;line-height:1.7;">Click below to reset your password. Link expires in 1 hour.</p>
          <a href="${resetUrl}" style="display:inline-block;background:#2C2C2C;color:#F5F0E8;padding:14px 32px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;margin-top:24px;">
            Reset Password →
          </a>
        </div></body></html>`,
    });
  } catch (err) {
    console.error("Password reset email error:", err);
  }
}
