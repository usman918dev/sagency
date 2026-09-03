const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgres://postgres.ftqwyzqaqiufnaendoko:8uP118mG7yVpgszj@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log('Clearing all demo/hardcoded Amazon PPC Case Studies from Supabase DB...');

  await client.query('DELETE FROM public.amazon_ppc_case_studies');
  console.log('✅ Deleted all rows from public.amazon_ppc_case_studies in Supabase!');

  const localCachePath = path.join(__dirname, '..', 'storage', 'amazon_ppc_case_studies.json');
  if (fs.existsSync(localCachePath)) {
    fs.writeFileSync(localCachePath, JSON.stringify([], null, 2), 'utf8');
    console.log('✅ Cleared local storage file storage/amazon_ppc_case_studies.json');
  }

  await client.end();
}

main().catch(err => {
  console.error('Error clearing Amazon PPC DB:', err);
  process.exit(1);
});
