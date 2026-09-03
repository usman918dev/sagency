const { Client } = require('pg');

const connectionString = 'postgres://postgres.ftqwyzqaqiufnaendoko:8uP118mG7yVpgszj@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log('Connected to Supabase Postgres for Amazon PPC table column alignment...');

  const updateTableQuery = `
    CREATE TABLE IF NOT EXISTS public.amazon_ppc_case_studies (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      short_description TEXT,
      summary TEXT,
      result_image_url TEXT,
      main_result_image_url TEXT,
      cover_image_url TEXT,
      case_study_details TEXT,
      auto_result JSONB DEFAULT '{"metrics":[]}'::jsonb,
      final_results TEXT,
      result_blocks JSONB DEFAULT '[]'::jsonb,
      metrics JSONB DEFAULT '[]'::jsonb,
      published BOOLEAN DEFAULT true,
      featured BOOLEAN DEFAULT false,
      sort_order INT DEFAULT 0,
      created_at TEXT,
      updated_at TEXT
    );

    ALTER TABLE public.amazon_ppc_case_studies ADD COLUMN IF NOT EXISTS result_image_url TEXT;
    ALTER TABLE public.amazon_ppc_case_studies ADD COLUMN IF NOT EXISTS main_result_image_url TEXT;
    ALTER TABLE public.amazon_ppc_case_studies ADD COLUMN IF NOT EXISTS short_description TEXT;
    ALTER TABLE public.amazon_ppc_case_studies ADD COLUMN IF NOT EXISTS case_study_details TEXT;
    ALTER TABLE public.amazon_ppc_case_studies ADD COLUMN IF NOT EXISTS auto_result JSONB DEFAULT '{"metrics":[]}'::jsonb;
    ALTER TABLE public.amazon_ppc_case_studies ADD COLUMN IF NOT EXISTS final_results TEXT;

    ALTER TABLE public.amazon_ppc_case_studies ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public full access on amazon_ppc_case_studies" ON public.amazon_ppc_case_studies;
    CREATE POLICY "Allow public full access on amazon_ppc_case_studies" ON public.amazon_ppc_case_studies FOR ALL USING (true) WITH CHECK (true);
  `;

  await client.query(updateTableQuery);
  console.log('✅ Table public.amazon_ppc_case_studies columns result_image_url & auto_result updated successfully!');

  await client.end();
}

main().catch(err => {
  console.error('❌ Table Update Error:', err);
  process.exit(1);
});
