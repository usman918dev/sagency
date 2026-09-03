const fs = require('fs');
const path = require('path');

// Read .env.local if present
let envLocal = {};
try {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        envLocal[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      }
    });
  }
} catch (e) {}

const url = envLocal.SUPABASE_URL || envLocal.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://ftqwyzqaqiufnaendoko.supabase.co';
const key = envLocal.SUPABASE_SERVICE_ROLE_KEY || envLocal.SUPABASE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Connecting to Supabase database:', url);

async function migrateCategories() {
  const res = await fetch(`${url}/rest/v1/portfolio_projects?select=*`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });

  if (!res.ok) {
    console.error('Failed to fetch projects:', res.status, await res.text());
    return;
  }

  const projects = await res.json();
  console.log(`Found ${projects.length} total projects in Supabase portfolio_projects table.`);

  let updatedCount = 0;

  for (const p of projects) {
    const titleLower = (p.title || '').toLowerCase();
    const catLower = (p.categorySlug || '').toLowerCase();
    const subLower = (p.subCategory || '').toLowerCase();

    let targetSlug = 'amazon-listing-images';
    let targetName = 'Amazon Listing Images';

    if (titleLower.includes('a+ content') || titleLower.includes('ebc') || catLower.includes('a-plus') || subLower.includes('a-plus')) {
      targetSlug = 'a-plus-content';
      targetName = 'A+ Content';
    } else if (titleLower.includes('storefront') || titleLower.includes('brand store') || catLower.includes('storefront') || subLower.includes('storefront')) {
      targetSlug = 'amazon-brand-store';
      targetName = 'Amazon Brand Store';
    } else if (titleLower.includes('ppc') || titleLower.includes('campaign') || catLower.includes('campaign') || subLower.includes('campaign')) {
      targetSlug = 'amazon-campaigns';
      targetName = 'Amazon Campaigns';
    } else if (
      p.service === 'Amazon Growth' ||
      catLower.includes('amazon') ||
      subLower.includes('amazon')
    ) {
      targetSlug = 'amazon-listing-images';
      targetName = 'Amazon Listing Images';
    } else {
      continue; // Skip non-Amazon projects
    }

    console.log(`Updating project ID "${p.id}" ("${p.title}") to Amazon Growth -> ${targetName} (${targetSlug})...`);

    const updateRes = await fetch(`${url}/rest/v1/portfolio_projects?id=eq.${p.id}`, {
      method: 'PATCH',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        service: 'Amazon Growth',
        categorySlug: targetSlug,
        subCategory: targetSlug,
        categoryName: targetName
      })
    });

    if (updateRes.ok) {
      updatedCount++;
      console.log(`  Successfully updated "${p.title}"!`);
    } else {
      console.error(`  Failed to update "${p.title}":`, updateRes.status, await updateRes.text());
    }
  }

  console.log(`\nMigration Complete: Successfully updated ${updatedCount} Amazon portfolio items.`);
}

migrateCategories();
