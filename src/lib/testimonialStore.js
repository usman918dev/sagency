/**
 * testimonialStore.js
 * ─────────────────────────────────────────────────────────────
 * Supabase-backed persistence layer for the Testimonials/Reviews system.
 *
 * TABLE: testimonials
 * ─────────────────────────────────────────────────────────────
 * Run this SQL once in Supabase SQL Editor to create the table:
 *
 *   CREATE TABLE IF NOT EXISTS testimonials (
 *     id            TEXT PRIMARY KEY,
 *     clientName    TEXT NOT NULL,
 *     reviewText    TEXT NOT NULL,
 *     imageUrl      TEXT DEFAULT '',
 *     company       TEXT DEFAULT '',
 *     role          TEXT DEFAULT '',
 *     service       TEXT DEFAULT '',
 *     rating        INTEGER DEFAULT 5,
 *     deliverables  TEXT DEFAULT '',
 *     projectDate   TEXT DEFAULT '',
 *     published     BOOLEAN DEFAULT TRUE,
 *     displayOrder  INTEGER DEFAULT 0,
 *     createdAt     TIMESTAMPTZ DEFAULT NOW(),
 *     updatedAt     TIMESTAMPTZ DEFAULT NOW()
 *   );
 *
 *   -- Enable public read
 *   ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
 *   CREATE POLICY "Public read" ON testimonials FOR SELECT USING (published = TRUE);
 *   CREATE POLICY "Service role full access" ON testimonials USING (TRUE) WITH CHECK (TRUE);
 *
 * IMAGE STORAGE: uploaded to existing `portfolio` Supabase Storage bucket
 *   under the path prefix: testimonials/
 * ─────────────────────────────────────────────────────────────
 *
 * IMPORTANT: This store does NOT touch the leads, portfolio_projects,
 * or admin_settings tables.
 */

const SUPABASE_URL = 'https://ftqwyzqaqiufnaendoko.supabase.co';

function getCredentials() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
}

function supabaseHeaders(key) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Fetch all published testimonials ordered by displayOrder, then createdAt desc.
 * Used by the public-facing Testimonials component.
 */
export async function getPublishedTestimonials() {
  const { url, key } = getCredentials();
  if (!url || !key) return [];

  try {
    const res = await fetch(
      `${url}/rest/v1/testimonials?published=eq.true&select=*&order=displayOrder.asc,createdAt.desc`,
      { headers: supabaseHeaders(key), cache: 'no-store' }
    );
    if (!res.ok) {
      console.error('getPublishedTestimonials error:', res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('getPublishedTestimonials exception:', err);
    return [];
  }
}

/**
 * Fetch ALL testimonials (published + unpublished). Admin use only.
 */
export async function getAllTestimonials() {
  const { url, key } = getCredentials();
  if (!url || !key) return [];

  try {
    const res = await fetch(
      `${url}/rest/v1/testimonials?select=*&order=displayOrder.asc,createdAt.desc`,
      { headers: supabaseHeaders(key), cache: 'no-store' }
    );
    if (!res.ok) {
      console.error('getAllTestimonials error:', res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('getAllTestimonials exception:', err);
    return [];
  }
}

/**
 * Save (insert or upsert) a testimonial record.
 * @param {object} data
 * @returns {object} saved record
 */
export async function saveTestimonial(data) {
  const { url, key } = getCredentials();
  if (!url || !key) throw new Error('Supabase credentials not configured');

  const now = new Date().toISOString();
  const record = {
    id:           data.id || `tmn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    clientName:   (data.clientName || '').trim(),
    reviewText:   (data.reviewText || '').trim(),
    imageUrl:     (data.imageUrl || '').trim(),
    company:      (data.company || '').trim(),
    role:         (data.role || '').trim(),
    service:      (data.service || '').trim(),
    rating:       Number(data.rating) || 5,
    deliverables: (data.deliverables || '').trim(),
    projectDate:  (data.projectDate || '').trim(),
    published:    data.published !== false,
    displayOrder: Number(data.displayOrder) || 0,
    createdAt:    data.createdAt || now,
    updatedAt:    now,
  };

  const res = await fetch(`${url}/rest/v1/testimonials`, {
    method: 'POST',
    headers: {
      ...supabaseHeaders(key),
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(record),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('saveTestimonial error:', res.status, errText);
    throw new Error(`Supabase save error (${res.status}): ${errText}`);
  }

  const result = await res.json();
  return Array.isArray(result) ? result[0] : result;
}

/**
 * Delete a testimonial by id.
 * Does NOT delete the image from storage (manual cleanup if needed).
 */
export async function deleteTestimonial(id) {
  const { url, key } = getCredentials();
  if (!url || !key) throw new Error('Supabase credentials not configured');

  const res = await fetch(`${url}/rest/v1/testimonials?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: supabaseHeaders(key),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase delete error (${res.status}): ${errText}`);
  }
  return true;
}

/**
 * Upload a testimonial client image to the existing `portfolio` Supabase Storage bucket
 * under the `testimonials/` prefix path.
 *
 * @param {Buffer|ArrayBuffer} buffer   raw image bytes
 * @param {string} ext                  file extension (jpg, png, webp, …)
 * @param {string} mimeType             MIME type
 * @returns {string} public URL of the uploaded image
 */
export async function uploadTestimonialImage(buffer, ext, mimeType) {
  const { url, key } = getCredentials();
  if (!url || !key) throw new Error('Supabase credentials not configured');

  const safeExt = (ext || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const fileName = `testimonials/tmn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${safeExt}`;

  const uploadRes = await fetch(`${url}/storage/v1/object/portfolio/${fileName}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': mimeType || 'image/jpeg',
      'x-upsert': 'true',
    },
    body: buffer,
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    throw new Error(`Supabase Storage upload failed (${uploadRes.status}): ${errText}`);
  }

  return `${url}/storage/v1/object/public/portfolio/${fileName}`;
}
