import { NextResponse } from 'next/server';
import { getProjects, saveProject } from '@/lib/portfolioStore';
import { verifyAdminPassword } from '@/lib/leadStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let projects = await getProjects();

    if (category) {
      const catLower = category.toLowerCase().trim();
      projects = projects.filter(p =>
        (p.categorySlug || '').toLowerCase() === catLower ||
        (p.subCategory || '').toLowerCase() === catLower ||
        (p.service || '').toLowerCase().replace(/\s+/g, '-') === catLower
      );
    }
    if (status) {
      projects = projects.filter(p => p.status === status);
    }

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('API getProjects Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio projects.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { authPin, project } = body;

    // Verify admin PIN
    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid Admin PIN.' },
        { status: 401 }
      );
    }

    if (!project || !project.title || !project.categorySlug) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title and categorySlug are required.' },
        { status: 400 }
      );
    }

    const savedProject = await saveProject(project);
    return NextResponse.json({ success: true, message: 'Project saved successfully.', data: savedProject });
  } catch (error) {
    console.error('API saveProject Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save project.' },
      { status: 500 }
    );
  }
}
