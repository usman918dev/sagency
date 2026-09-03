"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  X,
  Upload,
  Sparkles,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';

export default function AmazonPpcModal({
  isOpen,
  onClose,
  initialData,
  onSave,
  adminPin
}) {
  if (!isOpen) return null;

  const mainImageInputRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      const img = initialData.resultImageUrl || initialData.mainResultImageUrl || initialData.coverImageUrl || '';
      const desc = initialData.shortDescription || initialData.short_description || initialData.summary || '';
      const details = initialData.caseStudyDetails || initialData.case_study_details || '';

      return {
        id: initialData.id || '',
        title: initialData.title || '',
        slug: initialData.slug || '',
        shortDescription: desc,
        resultImageUrl: img,
        caseStudyDetails: details,
        autoResult: initialData.autoResult || initialData.auto_result || { metrics: [] },
        published: initialData.published !== false,
        featured: Boolean(initialData.featured),
        sortOrder: typeof initialData.sortOrder === 'number' ? initialData.sortOrder : (Number(initialData.sort_order) || 0)
      };
    }

    return {
      id: '',
      title: '',
      slug: '',
      shortDescription: '',
      resultImageUrl: '',
      caseStudyDetails: '',
      autoResult: { metrics: [] },
      published: true,
      featured: false,
      sortOrder: 0
    };
  });

  const handleTitleChange = (val) => {
    setFormData(prev => {
      const isAutoSlug = !prev.id && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      const newSlug = isAutoSlug ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug;
      return { ...prev, title: val, slug: newSlug };
    });
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Show immediate local preview in UI
    try {
      const localPreviewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        resultImageUrl: localPreviewUrl
      }));
    } catch (previewErr) {
      console.error('[AMAZON PPC MODAL] Preview creation notice:', previewErr);
    }

    setUploading(true);
    setMsg({ type: 'info', text: 'Uploading screenshot...' });

    try {
      console.log('[AMAZON PPC MODAL] Uploading file to Supabase Storage:', file.name, `${file.size} bytes`, file.type);
      const data = new FormData();
      data.append('file', file);
      data.append('authPin', adminPin || '');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data
      });

      const result = await res.json();
      if (!res.ok || !result.success || !result.url) {
        throw new Error(result.error || `Upload failed with status ${res.status}`);
      }

      console.log('[AMAZON PPC MODAL] Upload success! Storage URL:', result.url);

      // 2. Assign uploaded storage URL to form state
      setFormData(prev => ({
        ...prev,
        resultImageUrl: result.url
      }));

      setMsg({ type: 'success', text: 'Result screenshot uploaded successfully!' });
    } catch (err) {
      console.error('[AMAZON PPC MODAL] Image Upload Error:', err);
      setMsg({ type: 'error', text: `Image upload failed: ${err.message}` });
    } finally {
      setUploading(false);
      // Reset input value so the same file can be re-selected if needed
      if (mainImageInputRef.current) {
        mainImageInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setMsg({ type: 'error', text: 'Case Study Title is required.' });
      return;
    }
    if (!formData.resultImageUrl) {
      setMsg({ type: 'error', text: 'Result Screenshot is required.' });
      return;
    }

    setSaving(true);
    setMsg({ type: 'info', text: 'Saving Case Study...' });

    try {
      console.log('[AMAZON PPC] Submitting case study save with image URL:', formData.resultImageUrl);
      await onSave(formData);
      setMsg({ type: 'success', text: 'Case Study Published' });
      setTimeout(() => {
        onClose();
      }, 300);
    } catch (err) {
      console.error('[AMAZON PPC] Submit Save Error:', err);
      setMsg({ type: 'error', text: err.message || 'Failed to save case study.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden my-8 text-[var(--foreground)] max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] bg-[var(--background-alt)]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] flex items-center justify-center shadow-sm">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--foreground-heading)]">
                {formData.id ? 'Edit Amazon PPC Case Study' : 'Add New Amazon PPC Case Study'}
              </h2>
              <p className="text-xs text-[var(--foreground-muted)]">
                Single Image & Automatic Result Metric Extraction
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[var(--foreground-muted)] hover:text-[#9D26FF] rounded-xl hover:bg-[var(--background-alt)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message Notice */}
        {msg.text && (
          <div className={`mx-6 mt-4 p-3.5 rounded-xl text-xs flex items-center space-x-2 ${
            msg.type === 'error' ? 'bg-red-500/10 border border-red-500/40 text-red-500' : 'bg-purple-500/10 border border-purple-500/40 text-[#9D26FF]'
          }`}>
            {msg.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span>{msg.text}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Case Study Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
              Case Study Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Truck Accessories Brand: Amazon PPC Scales Sales from $0 to $180K"
              className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-sm focus:outline-none focus:border-[#9D26FF]"
            />
          </div>

          {/* 2. Short Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
              Short Description *
            </label>
            <textarea
              rows={2}
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="A short description of the case study..."
              className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs focus:outline-none focus:border-[#9D26FF]"
            />
          </div>

          {/* 3. ONE Result Screenshot */}
          <div className="bg-[var(--background-alt)] p-5 rounded-2xl border border-[var(--border)]">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#9D26FF]">
                Result Screenshot * (ONE Image Only)
              </label>
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--card)] text-[#9D26FF] text-[10px] font-bold border border-[var(--border)]">
                Single Image Source of Truth
              </span>
            </div>
            <p className="text-[11px] text-[var(--foreground-muted)] mb-4">
              Upload your main performance screenshot (JPG, PNG, WEBP).
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {formData.resultImageUrl ? (
                <div className="relative w-full sm:w-56 aspect-[16/10] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background-alt)]">
                  <Image
                    src={formData.resultImageUrl}
                    alt="Result Screenshot"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-full sm:w-56 aspect-[16/10] rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] flex flex-col items-center justify-center text-[var(--foreground-muted)] p-4 text-center">
                  <ImageIcon size={28} className="mb-1 text-[#9D26FF]" />
                  <span className="text-[11px] font-bold text-[var(--foreground-muted)]">No screenshot uploaded</span>
                </div>
              )}

              <input
                type="file"
                ref={mainImageInputRef}
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageSelect}
                className="hidden"
              />

              <button
                type="button"
                disabled={uploading}
                onClick={() => mainImageInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] text-white font-extrabold text-xs shadow-lg shadow-purple-950/20 transition-all flex items-center space-x-2"
              >
                {uploading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Uploading Image...</span>
                  </>
                ) : (
                  <>
                    <Upload size={15} />
                    <span>Upload Result Screenshot</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4. Case Study Details */}
          <div>
            <RichTextEditor
              label="Case Study Details *"
              value={formData.caseStudyDetails}
              onChange={(html) => setFormData(prev => ({ ...prev, caseStudyDetails: html }))}
              placeholder="Write your complete case study here. Select specific text to format bold, italic, headings or lists."
            />
          </div>

          {/* 5. Published Toggle */}
          <div className="flex items-center space-x-3 bg-[var(--background-alt)] p-3.5 rounded-xl border border-[var(--border)]">
            <input
              type="checkbox"
              id="publishedToggle"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4 rounded border-[var(--border)] text-[#9D26FF] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="publishedToggle" className="text-xs font-bold text-[var(--foreground-heading)] cursor-pointer">
              Publish Publicly
            </label>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[var(--border)] bg-[var(--background-alt)]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground-heading)] hover:text-[#9D26FF] hover:border-[#9D26FF] text-xs font-bold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={saving || uploading}
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] text-white text-xs font-extrabold shadow-xl shadow-purple-950/20 transition-transform hover:scale-105 flex items-center space-x-2"
          >
            {saving ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Saving Case Study...</span>
              </>
            ) : (
              <span>Publish Case Study</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
