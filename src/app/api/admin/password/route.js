import { NextResponse } from 'next/server';
import { verifyAdminPassword, updateAdminPassword } from '@/lib/leadStore';

export async function POST(request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Both current password and new password are required.' },
        { status: 400 }
      );
    }

    const isCurrentValid = await verifyAdminPassword(currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect.' },
        { status: 401 }
      );
    }

    if (newPassword.trim().length < 4) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 4 characters long.' },
        { status: 400 }
      );
    }

    await updateAdminPassword(newPassword.trim());

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully. Please use your new password for future logins.'
    });
  } catch (error) {
    console.error('Error updating admin password:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update password.' },
      { status: 500 }
    );
  }
}
