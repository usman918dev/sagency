import { NextResponse } from 'next/server';
import { deleteAmazonPpcCaseStudy, saveAmazonPpcCaseStudy, getAmazonPpcCaseStudies } from '@/lib/amazonPpcStore';
import { verifyAdminPassword } from '@/lib/leadStore';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const authPin = searchParams.get('pin');

    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid Admin PIN.' },
        { status: 401 }
      );
    }

    const success = await deleteAmazonPpcCaseStudy(id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Case study not found or already deleted.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Case study deleted successfully.' });
  } catch (error) {
    console.error('API deleteAmazonPpcCaseStudy Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete case study.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { authPin, updates } = body;

    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid Admin PIN.' },
        { status: 401 }
      );
    }

    const items = await getAmazonPpcCaseStudies();
    const existing = items.find(item => item.id === id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Case study not found.' },
        { status: 404 }
      );
    }

    const updated = await saveAmazonPpcCaseStudy({
      ...existing,
      ...updates
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('API updateAmazonPpcCaseStudy Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update case study.' },
      { status: 500 }
    );
  }
}
