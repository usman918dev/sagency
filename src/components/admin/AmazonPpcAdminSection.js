"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FolderOpen,
  Search,
  ArrowUpDown,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Star,
  ExternalLink
} from 'lucide-react';
import AmazonPpcModal from './AmazonPpcModal';

export default function AmazonPpcAdminSection({ getAdminPin }) {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/amazon-ppc');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCaseStudies(data.data);
      }
    } catch (err) {
      console.error('Error fetching Amazon PPC case studies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNewModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveCaseStudy = async (formData) => {
    const pin = getAdminPin();
    const res = await fetch('/api/amazon-ppc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authPin: pin,
        caseStudy: formData
      })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to save case study');
    }
    await fetchCaseStudies();
  };

  const handleDeleteCaseStudy = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this Amazon PPC Case Study?')) return;
    const pin = getAdminPin();
    try {
      const res = await fetch(`/api/amazon-ppc/${id}?pin=${encodeURIComponent(pin)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchCaseStudies();
      } else {
        alert(data.error || 'Failed to delete case study.');
      }
    } catch (err) {
      alert('Delete error: ' + err.message);
    }
  };

  const handleTogglePublish = async (item) => {
    const pin = getAdminPin();
    try {
      const res = await fetch(`/api/amazon-ppc/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authPin: pin,
          updates: { published: !item.published }
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchCaseStudies();
      }
    } catch (err) {
      console.error('Toggle publish error:', err);
    }
  };

  const handleToggleFeatured = async (item) => {
    const pin = getAdminPin();
    try {
      const res = await fetch(`/api/amazon-ppc/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authPin: pin,
          updates: { featured: !item.featured }
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchCaseStudies();
      }
    } catch (err) {
      console.error('Toggle featured error:', err);
    }
  };

  const filteredItems = caseStudies
    .filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  const publishedCount = caseStudies.filter(c => c.published !== false).length;
  const featuredCount = caseStudies.filter(c => c.featured).length;

  return (
    <div className="space-y-6">
      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--card)] backdrop-blur-md border border-[var(--border)] rounded-2xl p-4 text-center shadow-lg">
          <p className="text-2xl sm:text-3xl font-black text-[var(--foreground-heading)] mb-1">{caseStudies.length}</p>
          <p className="text-[11px] text-[var(--foreground-muted)] uppercase tracking-wider font-semibold">Total PPC Case Studies</p>
        </div>

        <div className="bg-[var(--card)] backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 text-center shadow-lg">
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{publishedCount}</p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 uppercase tracking-wider font-semibold">Published Publicly</p>
        </div>

        <div className="bg-[var(--card)] backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 text-center shadow-lg">
          <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mb-1">{featuredCount}</p>
          <p className="text-[11px] text-amber-700 dark:text-amber-300 uppercase tracking-wider font-semibold">Featured Case Studies</p>
        </div>
      </div>

      {/* Control Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] p-5 rounded-2xl shadow-md">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--foreground-heading)] flex items-center">
            <FolderOpen size={20} className="mr-2 text-[#9D26FF]" />
            Amazon PPC Management Case Studies ({filteredItems.length})
          </h2>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
            Single Image Case Studies with Automatic Metric Extraction
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs focus:outline-none focus:border-[#9D26FF]"
            />
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="px-3 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] hover:text-[#9D26FF] hover:border-[#9D26FF] text-xs font-semibold flex items-center space-x-1 transition-colors"
          >
            <ArrowUpDown size={13} className="text-[#9D26FF]" />
            <span className="capitalize">{sortOrder}</span>
          </button>

          <button
            onClick={handleOpenNewModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] text-white text-xs font-extrabold shadow-lg shadow-purple-950/20 transition-transform hover:scale-105 inline-flex items-center space-x-1.5"
          >
            <Plus size={16} />
            <span>+ Add Amazon PPC Case Study</span>
          </button>
        </div>
      </div>

      {/* Case Studies Table */}
      {loading ? (
        <div className="text-center py-20">
          <RefreshCw size={28} className="animate-spin text-[#9D26FF] mx-auto mb-2" />
          <p className="text-sm text-[var(--foreground-muted)]">Loading Amazon PPC Case Studies...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
          <FolderOpen size={40} className="text-[#9D26FF] mx-auto mb-3" />
          <h3 className="text-xl font-bold text-[var(--foreground-heading)] mb-2">No Amazon PPC Case Studies Created Yet</h3>
          <p className="text-xs text-[var(--foreground-muted)] max-w-md mx-auto mb-6">
            Click "+ Add Amazon PPC Case Study" above to publish your first campaign case study with automatic OCR metric extraction.
          </p>
          <button
            onClick={handleOpenNewModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white text-xs font-extrabold shadow-lg"
          >
            + Add Amazon PPC Case Study
          </button>
        </div>
      ) : (
        <div className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider bg-[var(--background-alt)]">
                  <th className="py-4 px-4">Result Screenshot</th>
                  <th className="py-4 px-4">Case Study Title & Slug</th>
                  <th className="py-4 px-4">Extracted Metrics</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-xs sm:text-sm">
                {filteredItems.map((item) => {
                  const img = item.resultImageUrl || item.mainResultImageUrl || item.coverImageUrl;
                  const metricsCount = Array.isArray(item.autoResult?.metrics) ? item.autoResult.metrics.length : 0;

                  return (
                    <tr key={item.id} className="hover:bg-[var(--background-alt)]/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background-alt)]">
                          {img ? (
                            <Image
                              src={img}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-[var(--foreground-muted)]">No Image</div>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-bold text-[var(--foreground-heading)] max-w-xs">
                        <div>{item.title}</div>
                        <div className="text-[11px] text-[#9D26FF] font-mono font-normal">
                          /portfolio/amazon-ppc/case-study/{item.slug}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-[var(--background-alt)] border border-[var(--border)] text-xs font-mono text-[var(--foreground-muted)]">
                          {metricsCount} Extracted Metrics
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                            item.published !== false
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {item.published !== false ? 'Published' : 'Draft'}
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleFeatured(item)}
                          className={`p-1.5 rounded-full border shadow-sm transition-colors ${
                            item.featured ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-[var(--background-alt)] text-[var(--foreground-muted)] border-[var(--border)] hover:border-[#9D26FF]'
                          }`}
                        >
                          <Star size={13} fill={item.featured ? 'currentColor' : 'none'} />
                        </button>
                      </td>

                      <td className="py-3 px-4 text-[var(--foreground-muted)] font-mono text-xs">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                      </td>

                      <td className="py-3 px-4 text-right space-x-2">
                        <a
                          href={`/portfolio/amazon-ppc/case-study/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 inline-block rounded-lg bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[#9D26FF] hover:border-[#9D26FF] transition-colors"
                          title="View Live Case Study"
                        >
                          <ExternalLink size={14} />
                        </a>

                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[#9D26FF] hover:border-[#9D26FF] transition-colors"
                          title="Edit Case Study"
                        >
                          <Edit size={14} />
                        </button>

                        <button
                          onClick={() => handleDeleteCaseStudy(item.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Case Study"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Case Study Modal */}
      <AmazonPpcModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingItem}
        onSave={handleSaveCaseStudy}
        adminPin={getAdminPin()}
      />
    </div>
  );
}
