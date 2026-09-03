const { Client } = require('pg');

const connectionString = 'postgres://postgres.ftqwyzqaqiufnaendoko:8uP118mG7yVpgszj@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log('Connected to Supabase Postgres!');

  // 1. Verify/Create public.portfolio_projects
  const createProjectsTableQuery = `
    CREATE TABLE IF NOT EXISTS public.portfolio_projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      service TEXT,
      "categorySlug" TEXT,
      "categoryName" TEXT,
      "subCategory" TEXT,
      description TEXT,
      client TEXT,
      "projectUrl" TEXT,
      image TEXT,
      "coverImage" TEXT,
      "mediaItems" JSONB DEFAULT '[]'::jsonb,
      "mediaCount" INT DEFAULT 0,
      gallery JSONB DEFAULT '[]'::jsonb,
      tags JSONB DEFAULT '[]'::jsonb,
      status TEXT DEFAULT 'Published',
      published BOOLEAN DEFAULT true,
      featured BOOLEAN DEFAULT false,
      "displayOrder" INT DEFAULT 0,
      "mediaType" TEXT,
      width INT DEFAULT 0,
      height INT DEFAULT 0,
      "aspectRatio" TEXT,
      "fileSize" INT DEFAULT 0,
      thumbnail TEXT,
      "techStack" JSONB DEFAULT '[]'::jsonb,
      industry TEXT,
      "websiteUrl" TEXT,
      "keywordsImproved" TEXT,
      "trafficGrowth" TEXT,
      "caseStudyData" TEXT,
      "campaignName" TEXT,
      platform TEXT,
      results TEXT,
      "brandName" TEXT,
      "revenueGrowth" TEXT,
      "acosImprovement" TEXT,
      "campaignResults" TEXT,
      "videoType" TEXT,
      "videoUrl" TEXT,
      "videoFile" TEXT,
      "createdAt" TEXT,
      "updatedAt" TEXT
    );
    ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public full access on portfolio_projects" ON public.portfolio_projects;
    CREATE POLICY "Allow public full access on portfolio_projects" ON public.portfolio_projects FOR ALL USING (true) WITH CHECK (true);
  `;
  await client.query(createProjectsTableQuery);
  console.log('✅ Table public.portfolio_projects verified/created in Supabase!');

  // 2. Verify/Create public.leads
  const createLeadsTableQuery = `
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
    DROP POLICY IF EXISTS "Allow public full access on leads" ON public.leads;
    CREATE POLICY "Allow public full access on leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);
  `;
  await client.query(createLeadsTableQuery);
  console.log('✅ Table public.leads verified/created in Supabase!');

  // 3. Verify/Create public.admin_settings
  const createAdminSettingsQuery = `
    CREATE TABLE IF NOT EXISTS public.admin_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      "updatedAt" TEXT
    );
    ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public full access on admin_settings" ON public.admin_settings;
    CREATE POLICY "Allow public full access on admin_settings" ON public.admin_settings FOR ALL USING (true) WITH CHECK (true);
  `;
  await client.query(createAdminSettingsQuery);
  console.log('✅ Table public.admin_settings verified/created in Supabase!');

  const projectCount = await client.query('SELECT count(*) FROM public.portfolio_projects');
  const leadCount = await client.query('SELECT count(*) FROM public.leads');

  console.log(`Current DB Counts -> Projects: ${projectCount.rows[0].count}, Leads: ${leadCount.rows[0].count}`);

  await client.end();
}

main().catch(err => {
  console.error('❌ Table Verification Error:', err);
  process.exit(1);
});
