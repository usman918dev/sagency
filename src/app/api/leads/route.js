import { NextResponse } from 'next/server';
import { getLeads, saveLead } from '@/lib/leadStore';
import { sendLeadNotifications } from '@/lib/emailService';

export async function POST(request) {
  try {
    const body = await request.json();

    // Input Validation
    if (!body.name || (!body.email && !body.whatsapp && !body.phone)) {
      return NextResponse.json(
        { success: false, error: 'Name and contact info (Email or WhatsApp) are required.' },
        { status: 400 }
      );
    }

    // Save lead to persistent storage database
    const savedLead = await saveLead(body);

    // Trigger Admin Notification & Client Confirmation Emails
    const emailResult = await sendLeadNotifications(savedLead).catch(err => {
      console.error('Email Dispatch Error:', err);
      return { success: false, error: err.message };
    });

    return NextResponse.json({
      success: true,
      message: 'Thank You! Your request has been received successfully. Our team will review your project details and contact you within 24 business hours.',
      lead: savedLead,
      emailStatus: emailResult
    });
  } catch (error) {
    console.error('Error handling /api/leads POST:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error while saving inquiry.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve leads.' },
      { status: 500 }
    );
  }
}
