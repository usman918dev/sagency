import fs from 'fs';
import path from 'path';

// Memory fallback cache for serverless runtime persistence
let memoryLeads = [];
let memoryAdminPassword = 'derixio25';

function getStoragePath() {
  if (process.env.VERCEL) {
    return '/tmp/derixio_leads.json';
  }
  return path.join(process.cwd(), 'storage', 'leads.json');
}

function getAdminConfigPath() {
  if (process.env.VERCEL) {
    return '/tmp/derixio_admin.json';
  }
  return path.join(process.cwd(), 'storage', 'admin.json');
}

function ensureDirExists(filePath) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error('Error ensuring storage directory exists:', err);
  }
}

// Password Management Functions (Cloud Persistent with Supabase DB)
export async function fetchAdminPasswordFromCloud() {
  const { url, key } = getSupabaseCredentials();
  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/admin_settings?key=eq.admin_password&select=*`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0 && data[0].value) {
          memoryAdminPassword = data[0].value.trim();
          return memoryAdminPassword;
        }
      }
    } catch (err) {
      console.error('Error fetching admin password from Supabase:', err);
    }
  }

  const filePath = getAdminConfigPath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(data);
      if (parsed && parsed.password) {
        memoryAdminPassword = parsed.password.trim();
        return memoryAdminPassword;
      }
    }
  } catch (error) {
    console.error('Error reading admin password config:', error);
  }
  return memoryAdminPassword;
}

export function getAdminPassword() {
  const filePath = getAdminConfigPath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(data);
      if (parsed && parsed.password) {
        memoryAdminPassword = parsed.password.trim();
        return memoryAdminPassword;
      }
    }
  } catch (error) {
    console.error('Error reading admin password config:', error);
  }
  return memoryAdminPassword;
}

export async function updateAdminPassword(newPassword) {
  if (!newPassword || newPassword.trim().length < 4) {
    throw new Error('Password must be at least 4 characters long.');
  }

  const cleanPassword = newPassword.trim();
  memoryAdminPassword = cleanPassword;

  // 1. Write to local /tmp or storage file
  try {
    const filePath = getAdminConfigPath();
    ensureDirExists(filePath);
    const payload = {
      password: cleanPassword,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
  } catch (error) {
    console.error('Error persisting admin password file:', error);
  }

  // 2. Persist directly to Supabase DB admin_settings table via REST API
  const { url, key } = getSupabaseCredentials();
  if (url && key) {
    try {
      const endpoint = `${url}/rest/v1/admin_settings`;
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          key: 'admin_password',
          value: cleanPassword,
          updatedAt: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Error syncing admin password to Supabase:', err);
    }
  }

  return true;
}

export async function verifyAdminPassword(inputPassword) {
  if (!inputPassword) return false;
  const currentPassword = await fetchAdminPasswordFromCloud();
  return inputPassword.trim() === currentPassword;
}

// Lead Categorization Logic
export function categorizeLead(service, packageName, formSource) {
  const serviceLower = (service || '').toLowerCase();
  const packageLower = (packageName || '').toLowerCase();
  const sourceLower = (formSource || '').toLowerCase();

  // Category A: Consultation Requests
  if (
    sourceLower.includes('consultation') ||
    sourceLower.includes('discovery') ||
    serviceLower.includes('consultation') ||
    serviceLower.includes('discovery call') ||
    packageLower.includes('consultation') ||
    packageLower.includes('call')
  ) {
    return 'Consultation Request';
  }

  // Category B: Package Requests
  if (
    sourceLower.includes('package') ||
    sourceLower.includes('plan') ||
    packageLower.includes('starter') ||
    packageLower.includes('business') ||
    packageLower.includes('enterprise') ||
    packageLower.includes('custom') ||
    serviceLower.includes('package') ||
    packageLower.includes('$')
  ) {
    return 'Package Request';
  }

  // Category C: General Contact Requests
  return 'Contact Request';
}

function getSupabaseCredentials() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
}

/**
 * Cloud Persistent Database Sync Helper (Supabase / Upstash / KV / REST)
 */
async function syncToCloudDb(action, leadData) {
  try {
    const { url, key } = getSupabaseCredentials();
    // 1. Supabase REST API sync if configured
    if (url && key) {
      const endpoint = `${url}/rest/v1/leads`;
      if (action === 'save') {
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(leadData)
        });
      } else if (action === 'delete') {
        await fetch(`${endpoint}?id=eq.${leadData.id}`, {
          method: 'DELETE',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`
          }
        });
      }
    }

    // 2. Upstash Redis REST API sync if configured
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const kvEndpoint = `${process.env.UPSTASH_REDIS_REST_URL}/hset/derixio_leads/${leadData.id}`;
      if (action === 'save') {
        await fetch(kvEndpoint, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
          body: JSON.stringify(leadData)
        });
      } else if (action === 'delete') {
        await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/hdel/derixio_leads/${leadData.id}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` }
        });
      }
    }
  } catch (err) {
    console.error('Cloud DB Sync Notice:', err);
  }
}

// Lead Data Retrieval
export async function getLeads() {
  const { url, key } = getSupabaseCredentials();
  let cloudLeads = [];

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/leads?select=*&order=createdAt.desc`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        },
        cache: 'no-store'
      });
      if (res.ok) {
        const fetched = await res.json();
        if (Array.isArray(fetched)) {
          cloudLeads = fetched;
        }
      }
    } catch (err) {
      console.error('Error reading leads from Supabase:', err);
    }
  }

  const filePath = getStoragePath();
  let fileLeads = [];
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      fileLeads = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading leads storage:', error);
  }

  const mergedMap = new Map();
  [...cloudLeads, ...memoryLeads, ...fileLeads].forEach(lead => {
    if (lead && lead.id && !lead.deleted) {
      const category = lead.category || categorizeLead(lead.service, lead.package, lead.leadSource);
      mergedMap.set(lead.id, { ...lead, category });
    }
  });

  const allLeads = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  memoryLeads = allLeads;
  return allLeads;
}

// Save Lead (Permanent Storage)
export async function saveLead(rawLeadData) {
  const filePath = getStoragePath();
  ensureDirExists(filePath);

  const service = rawLeadData.service || 'General Inquiry';
  const packageName = rawLeadData.package || 'Custom Request';
  const leadSource = rawLeadData.leadSource || rawLeadData.source || 'Website Form';
  const category = categorizeLead(service, packageName, leadSource);

  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: rawLeadData.name || 'Anonymous Client',
    email: rawLeadData.email || '',
    whatsapp: rawLeadData.whatsapp || rawLeadData.phone || '',
    company: rawLeadData.company || 'N/A',
    service: service,
    package: packageName,
    startDate: rawLeadData.startDate || 'As Soon As Possible',
    details: rawLeadData.details || rawLeadData.query || rawLeadData.message || 'No specific details provided.',
    leadSource: leadSource,
    category: category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'New' // New, Contacted, Qualified, Closed
  };

  let currentLeads = await getLeads();
  currentLeads.unshift(newLead);
  memoryLeads = currentLeads;

  try {
    fs.writeFileSync(filePath, JSON.stringify(currentLeads, null, 2), 'utf8');
  } catch (error) {
    console.error('Error persisting lead to file storage:', error);
  }

  // Asynchronously sync to Cloud DB if configured
  await syncToCloudDb('save', newLead);

  return newLead;
}

// Lead Status Update
export async function updateLeadStatus(id, newStatus) {
  const validStatuses = ['New', 'Contacted', 'Qualified', 'Closed'];
  if (!validStatuses.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  const filePath = getStoragePath();
  let currentLeads = await getLeads();

  const index = currentLeads.findIndex(lead => lead.id === id);
  if (index === -1) {
    return null;
  }

  currentLeads[index].status = newStatus;
  currentLeads[index].updatedAt = new Date().toISOString();
  memoryLeads = currentLeads;

  try {
    ensureDirExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(currentLeads, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving updated lead status:', error);
  }

  await syncToCloudDb('save', currentLeads[index]);

  return currentLeads[index];
}

// Manual Lead Deletion (Admin Only)
export async function deleteLead(id) {
  const filePath = getStoragePath();
  let currentLeads = await getLeads();

  const targetLead = currentLeads.find(lead => lead.id === id);
  if (!targetLead) {
    return false;
  }

  // Remove from lead list
  currentLeads = currentLeads.filter(lead => lead.id !== id);
  memoryLeads = currentLeads;

  try {
    ensureDirExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(currentLeads, null, 2), 'utf8');
  } catch (error) {
    console.error('Error persisting lead deletion:', error);
  }

  await syncToCloudDb('delete', { id });

  return true;
}
