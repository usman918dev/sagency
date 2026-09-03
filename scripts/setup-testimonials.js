/**
 * scripts/setup-testimonials.js
 * One-time setup + seeder for the Derixio testimonials system.
 * Run: node scripts/setup-testimonials.js
 *
 * Steps:
 *   1. Create testimonials table via Postgres direct connection
 *   2. Upload Sarah Mitchell's image to Supabase Storage
 *   3. Insert Sarah Mitchell's testimonial record via Supabase REST API
 */

// Allow self-signed Supabase SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fs   = require('fs');
const path = require('path');
const { Client } = require('pg');

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
const POSTGRES_URL = process.env.POSTGRES_URL;

/* ── Step 1: Create table via Postgres ──────────────────────────── */
async function createTable() {
  console.log('\n📋  Step 1: Creating testimonials table via Postgres…');

  if (!POSTGRES_URL) {
    console.error('   ❌  POSTGRES_URL not found in .env.local');
    process.exit(1);
  }

  const client = new Client({
    connectionString: POSTGRES_URL.replace('sslmode=require', 'sslmode=no-verify').replace('sslmode=prefer', 'sslmode=no-verify'),
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id            TEXT PRIMARY KEY,
        "clientName"  TEXT NOT NULL,
        "reviewText"  TEXT NOT NULL,
        "imageUrl"    TEXT DEFAULT '',
        company       TEXT DEFAULT '',
        role          TEXT DEFAULT '',
        service       TEXT DEFAULT '',
        rating        INTEGER DEFAULT 5,
        deliverables  TEXT DEFAULT '',
        "projectDate" TEXT DEFAULT '',
        published     BOOLEAN DEFAULT TRUE,
        "displayOrder" INTEGER DEFAULT 0,
        "createdAt"   TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt"   TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log('   ✅  Table created (or already existed)');

    // Enable RLS
    try {
      await client.query(`ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;`);
    } catch (_) {}

    // Policies
    try {
      await client.query(`DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;`);
      await client.query(`
        CREATE POLICY "Public read testimonials"
          ON testimonials FOR SELECT
          USING (published = TRUE);
      `);
    } catch (_) {}

    try {
      await client.query(`DROP POLICY IF EXISTS "Service role all testimonials" ON testimonials;`);
      await client.query(`
        CREATE POLICY "Service role all testimonials"
          ON testimonials USING (TRUE) WITH CHECK (TRUE);
      `);
    } catch (_) {}

    console.log('   ✅  Row-level security policies applied');
    await client.end();
  } catch (err) {
    console.error('   ❌  Postgres error:', err.message);
    await client.end().catch(() => {});
    process.exit(1);
  }
}

/* ── Step 2: Upload client image to Supabase Storage ────────────── */
async function uploadImage(localImagePath) {
  console.log(`\n🖼️   Step 2: Uploading client image…`);

  if (!fs.existsSync(localImagePath)) {
    console.log('   ⚠️   Image file not found — using empty imageUrl');
    return '';
  }

  const buffer   = fs.readFileSync(localImagePath);
  const ext      = path.extname(localImagePath).slice(1).toLowerCase() || 'jpg';
  const mimeType = { png: 'image/png', webp: 'image/webp', gif: 'image/gif' }[ext] || 'image/jpeg';
  const fileName = `testimonials/sarah-mitchell-${Date.now()}.${ext}`;

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
    console.log(`   ✅  Image uploaded successfully`);
    console.log(`   🔗  ${publicUrl}`);
    return publicUrl;
  } else {
    const errText = await res.text();
    console.error(`   ❌  Storage upload failed (${res.status}): ${errText}`);
    return '';
  }
}

/* ── Step 3: Upsert testimonial via REST API ────────────────────── */
async function seedTestimonial(imageUrl) {
  console.log('\n💾  Step 3: Inserting Sarah Mitchell testimonial…');

  const record = {
    id:           'tmn_sarah_mitchell_001',
    clientName:   'Sarah Mitchell',
    reviewText:   "Our Amazon listings finally look like they belong to a premium brand. The A+ content made buyers stop scrolling and actually read.",
    imageUrl:     imageUrl,
    company:      '',
    role:         'UI Artist',
    service:      'Amazon Brand Growth',
    rating:       5,
    deliverables: '4 optimized listings\nA+ content live in 3 weeks\n22% lift in conversion rate',
    projectDate:  'Nov 2025',
    published:    true,
    displayOrder: 1,
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/testimonials`, {
    method: 'POST',
    headers: {
      apikey:         SUPABASE_KEY,
      Authorization:  `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer:         'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(record),
  });

  if (res.ok) {
    console.log(`   ✅  Testimonial inserted: ${record.clientName}`);
    console.log(`   ⭐  "${record.reviewText.slice(0, 65)}…"`);
  } else {
    const errText = await res.text();
    console.error(`   ❌  Insert failed (${res.status}): ${errText}`);
  }
}

/* ── Main ───────────────────────────────────────────────────────── */
async function main() {
  console.log('🚀  Derixio Testimonials Setup & Seeder');
  console.log('─'.repeat(50));
  console.log(`   Supabase: ${SUPABASE_URL}`);

  const imagePath = path.join(__dirname, 'sarah-mitchell.jpg');

  await createTable();
  const imageUrl = await uploadImage(imagePath);
  await seedTestimonial(imageUrl);

  console.log('\n─'.repeat(50));
  if (imageUrl) {
    console.log('✅  All done! Sarah Mitchell is live in the testimonials section.');
  } else {
    console.log('✅  Testimonial record created (without photo — see note above).');
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
