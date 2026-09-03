import { NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/leadStore';
import { uploadTestimonialImage } from '@/lib/testimonialStore';

/**
 * POST /api/testimonials/upload
 *
 * Uploads a testimonial client image to the existing `portfolio` Supabase
 * Storage bucket under the `testimonials/` prefix.
 *
 * Accepts multipart/form-data with fields:
 *   - file:    image file (jpg, png, webp, gif)
 *   - authPin: admin PIN
 *
 * Returns: { success: true, url: "https://...supabase.co/storage/..." }
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file    = formData.get('file');
    const authPin = formData.get('authPin');

    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    const mimeType = file.type || 'image/jpeg';
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Only image files are accepted for testimonial avatars' },
        { status: 400 }
      );
    }

    const ext = (file.name || 'avatar.jpg').split('.').pop()?.toLowerCase() || 'jpg';
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicUrl = await uploadTestimonialImage(buffer, ext, mimeType);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('POST /api/testimonials/upload error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
