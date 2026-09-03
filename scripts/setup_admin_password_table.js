const { Client } = require('pg');

const connectionString = 'postgres://postgres.ftqwyzqaqiufnaendoko:8uP118mG7yVpgszj@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log('Connected to Supabase Postgres!');

  const query = `
    CREATE TABLE IF NOT EXISTS public.admin_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      "updatedAt" TEXT
    );
    ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public full access" ON public.admin_settings;
    CREATE POLICY "Allow public full access" ON public.admin_settings FOR ALL USING (true) WITH CHECK (true);

    INSERT INTO public.admin_settings (key, value, "updatedAt")
    VALUES ('admin_password', 'derixio25', NOW()::text)
    ON CONFLICT (key) DO NOTHING;
  `;

  await client.query(query);
  console.log('✅ public.admin_settings table created/verified!');

  const res = await client.query('SELECT * FROM public.admin_settings');
  console.log('Current admin_settings rows:', res.rows);

  await client.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
