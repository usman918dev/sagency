const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgres://postgres.ftqwyzqaqiufnaendoko:8uP118mG7yVpgszj@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log('Connected to Supabase Postgres!');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS public.leads (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      whatsapp TEXT,
      company TEXT,
      service TEXT,
      package TEXT,
      "startDate" TEXT,
      details TEXT,
      "leadSource" TEXT,
      category TEXT,
      status TEXT DEFAULT 'New',
      "createdAt" TEXT,
      "updatedAt" TEXT
    );
    ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public full access" ON public.leads;
    CREATE POLICY "Allow public full access" ON public.leads FOR ALL USING (true) WITH CHECK (true);
  `;

  await client.query(createTableQuery);
  console.log('✅ Table public.leads created in Supabase with RLS policy!');

  const leadsFilePath = path.join(process.cwd(), 'storage', 'leads.json');
  if (fs.existsSync(leadsFilePath)) {
    const leadsData = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
    console.log(`Migrating ${leadsData.length} leads to Supabase...`);

    for (const lead of leadsData) {
      const insertQuery = `
        INSERT INTO public.leads (
          id, name, email, whatsapp, company, service, package, "startDate", details, "leadSource", category, status, "createdAt", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        ) ON CONFLICT (id) DO NOTHING;
      `;
      const values = [
        lead.id,
        lead.name || 'Anonymous Client',
        lead.email || '',
        lead.whatsapp || lead.phone || '',
        lead.company || 'N/A',
        lead.service || 'General Inquiry',
        lead.package || 'Custom Request',
        lead.startDate || 'As Soon As Possible',
        lead.details || 'No details provided',
        lead.leadSource || lead.source || 'Website Form',
        lead.category || 'Contact Request',
        lead.status || 'New',
        lead.createdAt || new Date().toISOString(),
        lead.updatedAt || new Date().toISOString()
      ];
      await client.query(insertQuery, values);
    }
    console.log('✅ All local leads migrated to Supabase successfully!');
  }

  await client.end();
}

main().catch(err => {
  console.error('❌ Migration Error:', err);
  process.exit(1);
});
