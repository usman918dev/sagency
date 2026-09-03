import { NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/leadStore';

export async function POST(request) {
  try {
    const body = await request.json();
    const inputPassword = body.password || body.pin;

    if (!inputPassword) {
      return NextResponse.json(
        { success: false, error: 'Password / PIN is required.' },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminPassword(inputPassword);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid password. Please try again.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful.'
    });
  } catch (error) {
    console.error('Error handling admin auth POST:', error);
    return NextResponse.json(
      { success: false, error: 'Server error during authentication.' },
      { status: 500 }
    );
  }
}
