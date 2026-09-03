import { NextResponse } from 'next/server';
import {
  getPublishedTestimonials,
  getAllTestimonials,
  saveTestimonial,
  deleteTestimonial,
} from '@/lib/testimonialStore';
import { verifyAdminPassword } from '@/lib/leadStore';

/** GET /api/testimonials
 *  Public — returns only published testimonials
 *  Admin   — pass ?all=1&pin=YOURPIN to get all (published + unpublished)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === '1';
    const pin = searchParams.get('pin');

    if (all) {
      const valid = pin && (await verifyAdminPassword(pin));
      if (!valid) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const testimonials = await getAllTestimonials();
      return NextResponse.json({ testimonials });
    }

    const testimonials = await getPublishedTestimonials();
    return NextResponse.json({ testimonials });
  } catch (err) {
    console.error('GET /api/testimonials error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** POST /api/testimonials
 *  Admin only — save a new (or update existing) testimonial
 *  Body: { pin, clientName, reviewText, imageUrl, company, role, service,
 *           rating, deliverables, projectDate, published, displayOrder, id? }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { pin, ...data } = body;

    const valid = pin && (await verifyAdminPassword(pin));
    if (!valid) {
      return NextResponse.json({ error: 'Unauthorized — invalid admin PIN' }, { status: 401 });
    }

    if (!data.clientName?.trim()) {
      return NextResponse.json({ error: 'clientName is required' }, { status: 400 });
    }
    if (!data.reviewText?.trim()) {
      return NextResponse.json({ error: 'reviewText is required' }, { status: 400 });
    }

    const saved = await saveTestimonial(data);
    return NextResponse.json({ success: true, testimonial: saved });
  } catch (err) {
    console.error('POST /api/testimonials error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** DELETE /api/testimonials
 *  Admin only — delete a testimonial by id
 *  Body: { pin, id }
 */
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { pin, id } = body;

    const valid = pin && (await verifyAdminPassword(pin));
    if (!valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    await deleteTestimonial(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/testimonials error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
