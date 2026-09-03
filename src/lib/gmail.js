import { google } from 'googleapis';
import nodemailer from 'nodemailer';

/**
 * Creates and returns an initialized Google OAuth2 Client from environment variables.
 */
export function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Google OAuth2 configuration is incomplete.');
  }

  const OAuth2 = google.auth.OAuth2;
  return new OAuth2(clientId, clientSecret, redirectUri);
}

/**
 * Creates a Nodemailer Transporter configured with Google OAuth2 authentication.
 */
export async function createOAuth2Transporter() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const senderEmail = process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER || 'infoderixio@gmail.com';

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: senderEmail,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken?.token || ''
      }
    });

    return transporter;
  } catch (error) {
    console.error('Error creating Google OAuth2 transporter:', error);
    return null;
  }
}

/**
 * Direct email dispatch via googleapis Gmail REST API (v1)
 */
export async function sendEmailViaGmailApi({ to, subject, text, html }) {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const senderEmail = process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER || 'infoderixio@gmail.com';

  if (!refreshToken) {
    return {
      success: false,
      mode: 'unconfigured',
      error: 'GOOGLE_REFRESH_TOKEN is not set.'
    };
  }

  try {
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const targetTo = to || senderEmail;
    const bodyContent = html || text || '';
    const contentType = html ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8';

    const messageParts = [
      `From: "Derixio" <${senderEmail}>`,
      `To: ${targetTo}`,
      `Subject: =?utf-8?B?${Buffer.from(subject || '').toString('base64')}?=`,
      `Content-Type: ${contentType}`,
      'MIME-Version: 1.0',
      '',
      bodyContent
    ];

    const message = messageParts.join('\r\n');
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage
      }
    });

    console.log('✅ Googleapis Gmail API Email Delivered:', res.data.id);
    return {
      success: true,
      mode: 'gmail_api',
      messageId: res.data.id
    };
  } catch (error) {
    console.error('❌ Googleapis Gmail API Dispatch Error:', error);
    return {
      success: false,
      mode: 'gmail_api_error',
      error: error.message
    };
  }
}

/**
 * Helper function to send notification emails using Nodemailer with Google OAuth2 or googleapis REST API.
 */
export async function sendNotificationEmail({ to, subject, text, html }) {
  const transporter = await createOAuth2Transporter();

  if (transporter) {
    const senderEmail = process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER || 'infoderixio@gmail.com';
    try {
      const info = await transporter.sendMail({
        from: `"Derixio" <${senderEmail}>`,
        to: to || senderEmail,
        subject: subject,
        text: text,
        html: html
      });

      console.log('✅ OAuth2 Nodemailer Gmail Notification Delivered:', info.messageId);
      return {
        success: true,
        mode: 'gmail_oauth2_nodemailer',
        messageId: info.messageId
      };
    } catch (error) {
      console.warn('⚠️ Nodemailer OAuth2 failed, falling back to direct googleapis Gmail API:', error.message);
    }
  }

  // Secondary OAuth Route: Direct googleapis Gmail API
  return await sendEmailViaGmailApi({ to, subject, text, html });
}
