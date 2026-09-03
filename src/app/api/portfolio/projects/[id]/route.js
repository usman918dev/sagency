import { NextResponse } from 'next/server';
import { deleteProject, saveProject, getProjects } from '@/lib/portfolioStore';
import { verifyAdminPassword } from '@/lib/leadStore';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const authPin = searchParams.get('pin');

    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid Admin PIN.' },
        { status: 401 }
      );
    }

    const success = await deleteProject(id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Project not found or already deleted.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('API deleteProject Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete project.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { authPin, updates } = body;

    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid Admin PIN.' },
        { status: 401 }
      );
    }

    const projects = await getProjects();
    const existing = projects.find(p => p.id === id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Project not found.' },
        { status: 404 }
      );
    }

    const updatedProject = await saveProject({
      ...existing,
      ...updates
    });

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    console.error('API updateProject Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update project.' },
      { status: 500 }
    );
  }
}
