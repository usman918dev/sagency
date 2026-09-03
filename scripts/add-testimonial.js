/**
 * scripts/add-testimonial.js
 * ─────────────────────────────────────────────────────────────
 * Add a new real client testimonial to the Derixio website.
 *
 * Usage:
 *   node scripts/add-testimonial.js
 *
 * INSTRUCTIONS:
 *   1. Edit the TESTIMONIAL object below with the new client's data.
 *   2. Save the client's image as: scripts/client-image.jpg
 *      (or update the IMAGE_PATH variable below)
 *   3. Run: node scripts/add-testimonial.js
 *
 * The script will:
 *   - Upload the client image to Supabase Storage
 *   - Insert the testimonial into the database
 *   - The new testimonial appears live on the website immediately
 *
 * Previous testimonials are NOT affected — each has a unique ID.
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fs   = require('fs');
const path = require('path');

/* ════════════════════════════════════════════════════════════════
 * ✏️  EDIT THIS SECTION WITH THE NEW CLIENT'S DETAILS
 * ════════════════════════════════════════════════════════════════ */

// Path to the client's image (relative to this scripts/ folder)
const IMAGE_PATH = path.join(__dirname, 'client-image.jpg');

const TESTIMONIAL = {
  id: 'tmn_ben_foster_014',

  clientName:  'Ben Foster',
  reviewText:  "Fast turnaround on video editing without sacrificing quality. Our ad creatives finally look premium.",

  company:     '',
  role:        'Product Marketing Manager',
  service:     'Video & Motion Design',
  projectDate: 'Jan 2026',
  rating:      5,

  deliverables: '12 ad videos edited\n48-hour turnaround\nConsistent brand style',

  imageUrl:    '',
  published:   true,
  displayOrder: 14,
};

/* ════════════════════════════════════════════════════════════════
 * DO NOT EDIT BELOW THIS LINE
 * ════════════════════════════════════════════════════════════════ */

/* ── Load .env.local ─────────────────────────────────────────────── */
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftqwyzqaqiufnaendoko.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function uploadImage(imagePath) {
  if (!fs.existsSync(imagePath)) {
    console.log(`⚠️  No image file found at: ${imagePath}`);
    console.log('   Testimonial will be saved without a photo.');
    return '';
  }

  const buffer    = fs.readFileSync(imagePath);
  const ext       = path.extname(imagePath).slice(1).toLowerCase() || 'jpg';
  const mimeType  = { png: 'image/png', webp: 'image/webp', gif: 'image/gif' }[ext] || 'image/jpeg';
  const safeName  = TESTIMONIAL.clientName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const fileName  = `testimonials/${safeName}-${Date.now()}.${ext}`;

  console.log(`\n🖼️  Uploading image…`);

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/portfolio/${fileName}`, {
    method: 'POST',
    headers: {
      apikey:         SUPABASE_KEY,
      Authorization:  `Bearer ${SUPABASE_KEY}`,
      'Content-Type': mimeType,
      'x-upsert':     'true',
    },
    body: buffer,
  });

  if (res.ok) {
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/portfolio/${fileName}`;
    console.log(`✅  Image uploaded: ${publicUrl}`);
    return publicUrl;
  } else {
    const errText = await res.text();
    console.error(`❌  Upload failed (${res.status}): ${errText}`);
    return '';
  }
}

async function insertTestimonial(record) {
  console.log(`\n💾  Inserting testimonial for: ${record.clientName}…`);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/testimonials`, {
    method: 'POST',
    headers: {
      apikey:         SUPABASE_KEY,
      Authorization:  `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer:         'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({
      ...record,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  });

  if (res.ok) {
    console.log(`✅  Testimonial saved: ${record.clientName}`);
    console.log(`   ID: ${record.id}`);
  } else {
    const errText = await res.text();
    throw new Error(`Supabase insert failed (${res.status}): ${errText}`);
  }
}

async function main() {
  console.log('─'.repeat(50));
  console.log(`  Adding testimonial: ${TESTIMONIAL.clientName}`);
  console.log('─'.repeat(50));

  if (!SUPABASE_KEY) {
    console.error('❌  SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
    process.exit(1);
  }

  const imageUrl = await uploadImage(IMAGE_PATH);
  const record   = { ...TESTIMONIAL, imageUrl };

  await insertTestimonial(record);

  console.log('\n─'.repeat(50));
  console.log('🎉  Done! The testimonial is now live on the website.');
  console.log('\nTo add the next testimonial:');
  console.log('  1. Edit TESTIMONIAL in this script with new client data');
  console.log('  2. Save their image to: scripts/client-image.jpg');
  console.log('  3. Run: node scripts/add-testimonial.js');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
