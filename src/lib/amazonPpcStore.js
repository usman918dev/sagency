import fs from 'fs';
import path from 'path';
import { analyzeImageForMetrics } from './ocrAnalyzer';

let memoryCaseStudies = [];

function getStoragePath() {
  if (process.env.VERCEL) {
    return '/tmp/derixio_amazon_ppc.json';
  }
  return path.join(process.cwd(), 'storage', 'amazon_ppc_case_studies.json');
}

function ensureDirExists(filePath) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error('[AMAZON PPC] Error ensuring storage directory exists:', err);
  }
}

function getSupabaseCredentials() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftqwyzqaqiufnaendoko.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
}

function updateLocalFileCache(items) {
  try {
    const filePath = getStoragePath();
    ensureDirExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf8');
  } catch (err) {
    console.error('[AMAZON PPC] Local JSON cache write notice:', err);
  }
}

/**
 * Normalise database row into standard JS camelCase object
 */
function normalizeRecord(row) {
  if (!row) return null;
  const imgUrl = row.result_image_url || row.main_result_image_url || row.mainResultImageUrl || row.cover_image_url || row.coverImageUrl || '';
  const desc = row.short_description || row.shortDescription || row.summary || '';

  let details = row.case_study_details || row.caseStudyDetails || '';
  if (!details) {
    const legacyParts = [
      row.background_content,
      row.challenge_content,
      row.strategy_content,
      row.execution_content,
      row.optimization_content
    ].filter(p => Boolean(p && p.trim() !== '<p></p>' && p.trim() !== ''));
    if (legacyParts.length > 0) {
      details = legacyParts.join('\n');
    }
  }

  let autoRes = row.auto_result || row.autoResult;
  if (!autoRes || typeof autoRes !== 'object') {
    autoRes = { metrics: [] };
  }

  return {
    id: row.id,
    title: row.title || '',
    slug: row.slug || '',
    shortDescription: desc,
    summary: desc,
    resultImageUrl: imgUrl,
    mainResultImageUrl: imgUrl,
    coverImageUrl: imgUrl,
    caseStudyDetails: details,
    autoResult: autoRes,
    published: row.published !== false,
    featured: Boolean(row.featured),
    sortOrder: typeof row.sort_order === 'number' ? row.sort_order : (Number(row.sortOrder) || 0),
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString()
  };
}

/**
 * Normalise JS object into database snake_case row
 */
function normalizeForDb(item) {
  const imgUrl = item.resultImageUrl || item.result_image_url || item.mainResultImageUrl || item.main_result_image_url || item.coverImageUrl || '';
  const desc = item.shortDescription || item.short_description || item.summary || '';
  const details = item.caseStudyDetails || item.case_study_details || '';
  const autoRes = item.autoResult || item.auto_result || { metrics: [] };

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    short_description: desc,
    summary: desc,
    result_image_url: imgUrl,
    main_result_image_url: imgUrl,
    cover_image_url: imgUrl,
    case_study_details: details,
    auto_result: autoRes,
    published: item.published !== false,
    featured: Boolean(item.featured),
    sort_order: typeof item.sortOrder === 'number' ? item.sortOrder : (Number(item.sortOrder) || 0),
    created_at: item.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

/**
 * Get all Amazon PPC case studies - SUPABASE DB IS PRIMARY
 */
export async function getAmazonPpcCaseStudies() {
  const { url, key } = getSupabaseCredentials();

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/amazon_ppc_case_studies?select=*&order=sort_order.asc,created_at.desc`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        },
        cache: 'no-store'
      });
      if (res.ok) {
        const fetched = await res.json();
        if (Array.isArray(fetched)) {
          const normalized = fetched.map(normalizeRecord);
          memoryCaseStudies = normalized;
          updateLocalFileCache(normalized);
          return normalized;
        }
      } else {
        console.error('[AMAZON PPC] Supabase getAmazonPpcCaseStudies HTTP Error:', res.status, await res.text());
      }
    } catch (err) {
      console.error('[AMAZON PPC] Error fetching Amazon PPC case studies from Supabase DB:', err);
    }
  }

  // Fallback to local memory / file
  const filePath = getStoragePath();
  let fileItems = [];
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      fileItems = JSON.parse(data).map(normalizeRecord);
    }
  } catch (error) {
    console.error('[AMAZON PPC] Error reading storage file:', error);
  }

  const mergedMap = new Map();
  [...memoryCaseStudies, ...fileItems].forEach(item => {
    if (item && item.id) {
      mergedMap.set(item.id, item);
    }
  });

  return Array.from(mergedMap.values()).sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0) || new Date(b.createdAt) - new Date(a.createdAt)
  );
}

/**
 * Get published Amazon PPC case studies only
 */
export async function getPublishedAmazonPpcCaseStudies() {
  const items = await getAmazonPpcCaseStudies();
  return items.filter(item => item.published !== false);
}

/**
 * Get Amazon PPC case study by slug
 */
export async function getAmazonPpcCaseStudyBySlug(slug) {
  const items = await getAmazonPpcCaseStudies();
  return items.find(item => item.slug === slug || item.id === slug);
}

/**
 * Save or update Amazon PPC case study - DIRECT PERSISTENCE TO SUPABASE
 * CRITICAL REQUIREMENT: SAVE FIRST, EXTRACT METRICS SECOND!
 */
export async function saveAmazonPpcCaseStudy(rawData) {
  console.log('[AMAZON PPC] Starting save flow...');

  const isUpdate = Boolean(rawData.id);
  const now = new Date().toISOString();

  const id = rawData.id || `ppc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const title = rawData.title || 'Untitled Case Study';

  let slug = rawData.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (!slug) slug = `case-study-${Date.now()}`;

  const imgUrl = rawData.resultImageUrl || rawData.result_image_url || rawData.mainResultImageUrl || rawData.coverImageUrl || '';
  const desc = rawData.shortDescription || rawData.short_description || rawData.summary || '';
  const details = rawData.caseStudyDetails || rawData.case_study_details || '';

  const autoResult = rawData.autoResult || rawData.auto_result || { metrics: [] };

  console.log('[AMAZON PPC] Validation passed for title:', title);
  const caseStudyToSave = {
    id,
    title,
    slug,
    shortDescription: desc,
    summary: desc,
    resultImageUrl: imgUrl,
    mainResultImageUrl: imgUrl,
    coverImageUrl: imgUrl,
    caseStudyDetails: details,
    autoResult,
    published: rawData.published !== false,
    featured: Boolean(rawData.featured),
    sortOrder: typeof rawData.sortOrder === 'number' ? rawData.sortOrder : (Number(rawData.sort_order) || 0),
    createdAt: rawData.createdAt || rawData.created_at || now,
    updatedAt: now
  };

  const dbRow = normalizeForDb(caseStudyToSave);

  // 1. Primary Immediate Save to Supabase Database
  console.log('[AMAZON PPC] Saving database record to Supabase Postgres...');
  const { url, key } = getSupabaseCredentials();
  if (url && key) {
    const endpoint = `${url}/rest/v1/amazon_ppc_case_studies`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify(dbRow)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[AMAZON PPC] ERROR at Supabase DB Save:', res.status, errText);
      throw new Error(`Supabase DB Save Error (${res.status}): ${errText}`);
    }
  }

  console.log('[AMAZON PPC] Database record created successfully with ID:', id);

  // 2. Update memory & local JSON cache immediately
  let items = await getAmazonPpcCaseStudies();
  if (isUpdate) {
    const idx = items.findIndex(item => item.id === caseStudyToSave.id);
    if (idx !== -1) {
      items[idx] = caseStudyToSave;
    } else {
      items.unshift(caseStudyToSave);
    }
  } else {
    items.unshift(caseStudyToSave);
  }

  memoryCaseStudies = items;
  updateLocalFileCache(items);

  // 3. NON-BLOCKING BACKGROUND ASYNC METRIC EXTRACTION
  if (imgUrl && (!autoResult.metrics || autoResult.metrics.length === 0)) {
    console.log('[AMAZON PPC] Kickoff background async OCR metric extraction...');
    (async () => {
      try {
        const ocrData = await analyzeImageForMetrics(imgUrl);
        if (ocrData && ocrData.metrics && ocrData.metrics.length > 0) {
          console.log('[AMAZON PPC] Async OCR metrics extracted:', ocrData.metrics.length);
          const updatedAutoRes = { metrics: ocrData.metrics };

          if (url && key) {
            await fetch(`${url}/rest/v1/amazon_ppc_case_studies?id=eq.${id}`, {
              method: 'PATCH',
              headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ auto_result: updatedAutoRes })
            });
            console.log('[AMAZON PPC] Async DB update with extracted metrics completed for ID:', id);
          }
        }
      } catch (ocrErr) {
        console.error('[AMAZON PPC] Non-blocking OCR background notice:', ocrErr.message);
      }
    })();
  }

  console.log('[AMAZON PPC] Save operation complete. Returning saved record.');
  return caseStudyToSave;
}

/**
 * Delete Amazon PPC case study from Supabase and Storage
 */
export async function deleteAmazonPpcCaseStudy(id) {
  console.log('[AMAZON PPC] Starting delete for ID:', id);
  const { url, key } = getSupabaseCredentials();

  const currentItems = await getAmazonPpcCaseStudies();
  const targetItem = currentItems.find(item => item.id === id);

  if (url && key) {
    // 1. Delete DB record from Supabase
    const dbEndpoint = `${url}/rest/v1/amazon_ppc_case_studies?id=eq.${id}`;
    const res = await fetch(dbEndpoint, {
      method: 'DELETE',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[AMAZON PPC] ERROR at Supabase DB Delete:', res.status, errText);
      throw new Error(`Supabase DB Delete Error (${res.status}): ${errText}`);
    }

    // 2. Storage cleanup for uploaded images
    if (targetItem) {
      const urlsToClean = [
        targetItem.resultImageUrl,
        targetItem.mainResultImageUrl,
        targetItem.coverImageUrl
      ].filter(u => typeof u === 'string' && u.includes('/storage/v1/object/public/portfolio/'));

      for (const u of Array.from(new Set(urlsToClean))) {
        try {
          const pathPart = u.split('/storage/v1/object/public/portfolio/')[1];
          if (pathPart) {
            await fetch(`${url}/storage/v1/object/portfolio/${pathPart}`, {
              method: 'DELETE',
              headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`
              }
            });
          }
        } catch (err) {
          console.error('[AMAZON PPC] Storage file cleanup notice:', err);
        }
      }
    }
  }

  // 3. Remove from memory and file cache
  const remaining = currentItems.filter(item => item.id !== id);
  memoryCaseStudies = remaining;
  updateLocalFileCache(remaining);

  console.log('[AMAZON PPC] Delete completed for ID:', id);
  return true;
}
