import nodemailer from 'nodemailer';
import { sendNotificationEmail, sendEmailViaGmailApi, getOAuth2Client, createOAuth2Transporter } from './gmail';

// Re-export OAuth2 helpers for convenient external usage
export { sendNotificationEmail, sendEmailViaGmailApi, getOAuth2Client, createOAuth2Transporter };

/**
 * Standard SMTP Transporter (Fallback)
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || process.env.NOTIFY_EMAIL_TO || 'infoderixio@gmail.com';
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;

  if (!pass) {
    return null;
  }

  const isSecure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Dispatches Admin Email Notification to NOTIFY_EMAIL_TO / infoderixio@gmail.com
 * and Client Confirmation Email.
 */
export async function sendLeadNotifications(lead) {
  const adminEmail = process.env.NOTIFY_EMAIL_TO || process.env.ADMIN_EMAIL || 'infoderixio@gmail.com';
  const senderUser = process.env.SMTP_USER || "usmangraphic25@gmail.com";
  const fromHeader = process.env.SMTP_FROM || `"Derixio" <${senderUser}>`;

  // 1. Admin Email Notification Body
  const adminSubject = `New Lead Received – Derixio`;
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #080b12; color: #ffffff; padding: 28px; border-radius: 16px; max-width: 650px; margin: 0 auto; border: 1px solid rgba(157, 38, 255, 0.3);">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(157, 38, 255, 0.2);">
        <h2 style="color: #C084FC; margin: 0 0 6px 0; font-size: 24px;">🚀 New Lead Received – Derixio</h2>
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">A new client lead has been submitted on the website.</p>
      </div>

      <div style="margin-top: 24px;">
        <table style="width: 100%; border-collapse: collapse; background-color: #0f172a; border-radius: 12px; overflow: hidden; border: 1px solid rgba(157, 38, 255, 0.2);">
          <tbody>
            <tr>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #9ca3af; font-weight: bold; width: 180px;">Client Name:</td>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold; font-size: 15px;">${lead.name || 'Anonymous Client'}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #9ca3af; font-weight: bold;">Email Address:</td>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #C084FC;">
                <a href="mailto:${lead.email}" style="color: #C084FC; text-decoration: none; font-weight: bold;">${lead.email || 'N/A'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #9ca3af; font-weight: bold;">WhatsApp Number:</td>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #22c55e;">
                <a href="https://wa.me/${(lead.whatsapp || '').replace(/[^0-9]/g, '')}" style="color: #22c55e; text-decoration: none; font-weight: bold;">${lead.whatsapp || 'N/A'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #9ca3af; font-weight: bold;">Company Name:</td>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #ffffff;">${lead.company || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #9ca3af; font-weight: bold;">Selected Service:</td>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold;">${lead.service || 'General Inquiry'}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #9ca3af; font-weight: bold;">Selected Package:</td>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #C084FC; font-weight: bold;">${lead.package || 'Custom'}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #9ca3af; font-weight: bold;">Project Details:</td>
              <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${lead.details || 'No details provided'}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; color: #9ca3af; font-weight: bold;">Submission Date & Time:</td>
              <td style="padding: 14px 18px; color: #94a3b8;">${new Date(lead.createdAt || Date.now()).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  // 2. Client Confirmation Email Body
  const clientSubject = `We've Received Your Request – Derixio`;
  const clientHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #080b12; color: #ffffff; padding: 28px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(157, 38, 255, 0.3);">
      <h2 style="color: #C084FC; margin-bottom: 16px;">We've Received Your Request</h2>
      <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
        Thank you for contacting <strong>Derixio</strong>.
      </p>
      <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
        We have successfully received your project inquiry and our team is currently reviewing your requirements.
      </p>
      <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
        A member of our team will contact you within <strong>24 business hours</strong> to discuss your project, answer any questions, and recommend the best solution for your goals.
      </p>
      <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
        We look forward to working with you.
      </p>
      <div style="border-top: 1px solid rgba(157, 38, 255, 0.3); padding-top: 16px;">
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">Best Regards,</p>
        <p style="color: #C084FC; font-size: 16px; font-weight: bold; margin: 4px 0 0 0;">Derixio Team</p>
      </div>
    </div>
  `;

  // Strategy 1: Google OAuth2 via Nodemailer / googleapis Gmail REST API (Primary Method)
  if (process.env.GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_CLIENT_ID) {
    const oauthRes = await sendNotificationEmail({
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml
    });

    if (oauthRes.success) {
      if (lead.email) {
        await sendNotificationEmail({
          to: lead.email,
          subject: clientSubject,
          html: clientHtml
        });
      }
      return oauthRes;
    }
  }

  // Strategy 2: Resend API Key
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Derixio <onboarding@resend.dev>',
          to: [adminEmail],
          subject: adminSubject,
          html: adminHtml
        })
      });

      const resendData = await resendRes.json();

      if (lead.email) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Derixio <onboarding@resend.dev>',
            to: [lead.email],
            subject: clientSubject,
            html: clientHtml
          })
        });
      }

      return { success: true, mode: 'resend_api', data: resendData };
    } catch (err) {
      console.error('Resend API Error:', err);
    }
  }

  // Strategy 3: Standard Nodemailer SMTP Fallback
  const transporter = createTransporter();

  if (!transporter) {
    const errorMsg = 'Google OAuth2 credentials (GOOGLE_REFRESH_TOKEN), RESEND_API_KEY, or SMTP_PASS are missing or unconfigured.';
    return {
      success: false,
      mode: 'unconfigured',
      error: errorMsg
    };
  }

  try {
    const adminInfo = await transporter.sendMail({
      from: fromHeader,
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml
    });

    let clientInfo = null;
    if (lead.email) {
      clientInfo = await transporter.sendMail({
        from: fromHeader,
        to: lead.email,
        subject: clientSubject,
        html: clientHtml
      });
    }

    return {
      success: true,
      mode: 'smtp',
      adminMessageId: adminInfo.messageId,
      clientMessageId: clientInfo ? clientInfo.messageId : null
    };
  } catch (error) {
    console.error('❌ SMTP Dispatch Error:', error);
    return {
      success: false,
      mode: 'smtp_error',
      error: error.message
    };
  }
}

