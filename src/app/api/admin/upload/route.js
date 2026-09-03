import { NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/leadStore';

function getSupabaseCredentials() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftqwyzqaqiufnaendoko.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const authPin = formData.get('authPin');

    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid Admin PIN.' },
        { status: 401 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No media file uploaded.' },
        { status: 400 }
      );
    }

    const { url, key } = getSupabaseCredentials();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = (file.name || 'file.png').split('.').pop()?.toLowerCase() || 'png';
    const mimeType = file.type || 'image/png';
    const isVideo = mimeType.startsWith('video/') || ['mp4', 'webm', 'mov', 'm4v', 'mkv'].includes(ext);
    const mediaType = isVideo ? 'video' : 'image';

    const fileName = `projects/proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

    // Upload directly to Supabase Storage public bucket 'portfolio'
    console.log('[UPLOAD API] Uploading buffer to Supabase Storage:', fileName);
    const storageEndpoint = `${url}/storage/v1/object/portfolio/${fileName}`;
    const uploadRes = await fetch(storageEndpoint, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': mimeType,
        'x-upsert': 'true'
      },
      body: buffer
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error('[UPLOAD API] Supabase storage upload error:', uploadRes.status, errText);
      return NextResponse.json(
        { success: false, error: `Supabase Storage upload error (${uploadRes.status}): ${errText}` },
        { status: 500 }
      );
    }

    const publicUrl = `${url}/storage/v1/object/public/portfolio/${fileName}`;
    console.log('[UPLOAD API] Image uploaded successfully. Public URL:', publicUrl);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
      mediaType: mediaType,
      fileSize: buffer.length,
      mimeType: mimeType
    });
  } catch (error) {
    console.error('[UPLOAD API] Handler Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Media upload failed.' },
      { status: 500 }
    );
  }
}
