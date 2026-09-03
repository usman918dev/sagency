import { NextResponse } from 'next/server';
import { updateLeadStatus, deleteLead } from '@/lib/leadStore';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.status) {
      return NextResponse.json(
        { success: false, error: 'Status field is required.' },
        { status: 400 }
      );
    }

    const updatedLead = await updateLeadStatus(id, body.status);

    if (!updatedLead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update lead status.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Lead ID is required.' },
        { status: 400 }
      );
    }

    const success = await deleteLead(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Lead not found or already deleted.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead permanently deleted by admin.'
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete lead.' },
      { status: 500 }
    );
  }
}
