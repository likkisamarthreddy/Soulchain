import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
  isSticky?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, isSticky = false }) => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    const lines = content.split('\n');
    const tocHeadings = lines
      .filter(line => line.startsWith('## ') || line.startsWith('### '))
      .map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.replace(/^#{2,3}\s/, ''),
        level: heading.startsWith('### ') ? 3 : 2
      }));
    setHeadings(tocHeadings);
  }, [content]);

  if (headings.length === 0) return null;

  const tocClasses = isSticky 
    ? "sticky top-32 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8"
    : "bg-white/5 border border-white/10 rounded-xl p-6 mb-8";

  return (
    <nav className={tocClasses} aria-label="Table of contents">
      <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-purple-400" aria-hidden="true" />
        Table of Contents
      </h4>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li key={index} className={heading.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${heading.id}`}
              className="text-indigo-200 hover:text-purple-300 transition-colors flex items-center gap-2 py-1"
              aria-label={`Jump to ${heading.text}`}
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
