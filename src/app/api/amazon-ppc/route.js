import { NextResponse } from 'next/server';
import { getAmazonPpcCaseStudies, saveAmazonPpcCaseStudy } from '@/lib/amazonPpcStore';
import { verifyAdminPassword } from '@/lib/leadStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('publishedOnly') === 'true';

    let items = await getAmazonPpcCaseStudies();

    if (publishedOnly) {
      items = items.filter(item => item.published !== false);
    }

    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('API getAmazonPpcCaseStudies Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Amazon PPC case studies.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { authPin, caseStudy } = body;

    // Verify admin PIN
    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid Admin PIN.' },
        { status: 401 }
      );
    }

    if (!caseStudy || !caseStudy.title) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: title is required.' },
        { status: 400 }
      );
    }

    const saved = await saveAmazonPpcCaseStudy(caseStudy);
    return NextResponse.json({ success: true, message: 'Case study saved successfully.', data: saved });
  } catch (error) {
    console.error('API saveAmazonPpcCaseStudy Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save case study.' },
      { status: 500 }
    );
  }
}
