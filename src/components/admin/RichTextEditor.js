"use client";

import React, { useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  RemoveFormatting,
  Pilcrow
} from 'lucide-react';

export default function RichTextEditor({ value, onChange, label, placeholder }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');

    let contentToInsert = '';

    if (html && html.trim() !== '') {
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Clean out intrusive scripts, styles, meta tags
        tempDiv.querySelectorAll('script, style, meta, link').forEach(el => el.remove());

        // Strip inline styles/classes while retaining structural tags (h1-h6, p, ul, ol, li, strong, b, em, i, u, br)
        tempDiv.querySelectorAll('*').forEach(el => {
          el.removeAttribute('style');
          el.removeAttribute('class');
          el.removeAttribute('id');
        });

        contentToInsert = tempDiv.innerHTML;
      } catch (err) {
        console.error('HTML paste cleanup notice:', err);
      }
    }

    if (!contentToInsert && text) {
      // Convert plain multi-line text into distinct paragraphs and bullet points
      const lines = text.split(/\r?\n/);
      const paragraphs = [];
      let inList = false;

      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) {
          if (inList) {
            paragraphs.push('</ul>');
            inList = false;
          }
          return;
        }

        if (trimmed.startsWith('# ')) {
          if (inList) { paragraphs.push('</ul>'); inList = false; }
          paragraphs.push(`<h2>${trimmed.substring(2)}</h2>`);
        } else if (trimmed.startsWith('## ')) {
          if (inList) { paragraphs.push('</ul>'); inList = false; }
          paragraphs.push(`<h2>${trimmed.substring(3)}</h2>`);
        } else if (trimmed.startsWith('### ')) {
          if (inList) { paragraphs.push('</ul>'); inList = false; }
          paragraphs.push(`<h3>${trimmed.substring(4)}</h3>`);
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
          if (!inList) {
            paragraphs.push('<ul class="list-disc pl-5">');
            inList = true;
          }
          paragraphs.push(`<li>${trimmed.substring(2)}</li>`);
        } else {
          if (inList) { paragraphs.push('</ul>'); inList = false; }
          paragraphs.push(`<p>${trimmed}</p>`);
        }
      });

      if (inList) paragraphs.push('</ul>');
      contentToInsert = paragraphs.join('');
    }

    if (contentToInsert) {
      document.execCommand('insertHTML', false, contentToInsert);
      if (editorRef.current && onChange) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const executeCommand = (command, val = null) => {
    if (typeof document !== 'undefined') {
      document.execCommand(command, false, val);
      if (editorRef.current && onChange) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  return (
    <div className="w-full flex flex-col space-y-1.5">
      {label && <label className="block text-xs font-semibold text-[var(--foreground-heading)]">{label}</label>}
      <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--background-alt)] focus-within:border-[#9D26FF] transition-colors">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-[var(--card)] border-b border-[var(--border)] text-[var(--foreground-muted)]">
          <button
            type="button"
            onClick={() => executeCommand('bold')}
            title="Bold (Select text & click)"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-colors text-xs font-bold"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('italic')}
            title="Italic"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-colors text-xs font-bold"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('underline')}
            title="Underline"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-colors text-xs font-bold"
          >
            <Underline size={15} />
          </button>

          <div className="h-4 w-px bg-[var(--border)] mx-1" />

          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h2>')}
            title="Heading 2"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-colors text-xs font-bold flex items-center space-x-1"
          >
            <Heading2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h3>')}
            title="Heading 3 (Subheading)"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-colors text-xs font-bold flex items-center space-x-1"
          >
            <Heading3 size={15} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<p>')}
            title="Paragraph"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-colors text-xs font-bold flex items-center space-x-1"
          >
            <Pilcrow size={15} />
          </button>

          <div className="h-4 w-px bg-[var(--border)] mx-1" />

          <button
            type="button"
            onClick={() => executeCommand('insertUnorderedList')}
            title="Bullet List"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-colors text-xs font-bold"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('insertOrderedList')}
            title="Numbered List"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-colors text-xs font-bold"
          >
            <ListOrdered size={15} />
          </button>

          <div className="h-4 w-px bg-[var(--border)] mx-1" />

          <button
            type="button"
            onClick={() => executeCommand('removeFormat')}
            title="Clear Formatting"
            className="p-1.5 rounded-lg hover:bg-[var(--background-alt)] hover:text-red-500 transition-colors text-xs font-bold"
          >
            <RemoveFormatting size={15} />
          </button>
        </div>

        {/* Contenteditable Container with Smart Paste Handler */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          onPaste={handlePaste}
          data-placeholder={placeholder || "Type content here... Highlight text to format bold, headings, or lists."}
          className="p-3.5 min-h-[140px] max-h-[350px] overflow-y-auto text-sm text-[var(--foreground)] focus:outline-none prose dark:prose-invert prose-p:my-2 prose-p:leading-relaxed prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-h2:text-[#9D26FF] prose-h2:text-base prose-h2:font-bold prose-h3:text-[var(--foreground-heading)] prose-h3:text-sm prose-h3:font-semibold"
        />
      </div>
    </div>
  );
}
