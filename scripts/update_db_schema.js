const { Client } = require('pg');

const connectionString = 'postgres://postgres.ftqwyzqaqiufnaendoko:8uP118mG7yVpgszj@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log('Connected to Supabase Postgres!');

  const query = `
    ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS "metricValue" TEXT;
    ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS "metricSub" TEXT;
    ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS "problem" TEXT;
    ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS "solution" TEXT;
    ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS "beforeImage" TEXT;
    ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS "tag" TEXT;
  `;

  await client.query(query);
  console.log('✅ Postgres columns ("metricValue", "metricSub", "problem", "solution", "beforeImage", "tag") added successfully!');

  await client.end();
}

main().catch(err => {
  console.error('❌ Schema update error:', err);
  process.exit(1);
});
