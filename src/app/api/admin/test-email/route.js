import { NextResponse } from 'next/server';
import { sendLeadNotifications } from '@/lib/emailService';

export async function POST(request) {
  try {
    const testLead = {
      id: `test_${Date.now()}`,
      name: 'Derixio Delivery Test',
      email: 'infoderixio@gmail.com',
      whatsapp: '+92 302 4165348',
      company: 'Derixio Agency',
      service: 'Email System Verification',
      package: 'Diagnostic Test',
      details: 'This is a test notification to verify instant email delivery to infoderixio@gmail.com.',
      createdAt: new Date().toISOString()
    };

    const result = await sendLeadNotifications(testLead);

    return NextResponse.json({
      success: true,
      diagnostic: {
        targetAdminEmail: process.env.ADMIN_EMAIL || 'infoderixio@gmail.com',
        smtpUser: process.env.SMTP_USER || process.env.GMAIL_USER || 'infoderixio@gmail.com',
        smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
        hasSmtpPass: !!(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD),
        hasResendKey: !!process.env.RESEND_API_KEY,
        dispatchResult: result
      }
    });
  } catch (error) {
    console.error('Error running test email dispatch:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send test email.' },
      { status: 500 }
    );
  }
}
