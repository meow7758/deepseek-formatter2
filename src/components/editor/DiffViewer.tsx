'use client';

import { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { Button } from '@/components/ui/Button';
import { Check, X, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiffViewerProps {
  original: string;
  modified: string;
  language: string;
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

export function DiffViewer({
  original,
  modified,
  language,
  onAccept,
  onReject,
  className,
}: DiffViewerProps) {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(modified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasChanges = original !== modified;

  return (
    <div className={cn('h-full flex flex-col', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {hasChanges ? 'Changes Detected' : 'No Changes'}
          </span>
          {hasChanges && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              Modified
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('split')}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-colors',
                viewMode === 'split'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              )}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-colors',
                viewMode === 'unified'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              )}
            >
              Unified
            </button>
          </div>

          {/* Copy Button */}
          {hasChanges && (
            <Button
              variant={copied ? 'secondary' : 'outline'}
              size="sm"
              leftIcon={<Copy className="w-4 h-4" />}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          )}

          {/* Action Buttons */}
          {hasChanges && (
            <>
              {onReject && (
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<X className="w-4 h-4" />}
                  onClick={onReject}
                >
                  Reject
                </Button>
              )}
              {onAccept && (
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Check className="w-4 h-4" />}
                  onClick={onAccept}
                >
                  Accept
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Diff Viewer */}
      <div className="flex-1 overflow-auto rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
        <ReactDiffViewer
          oldValue={original}
          newValue={modified}
          splitView={viewMode === 'split'}
          useDarkTheme={true}
          compareMethod={'WORDS' as any}
          extraLinesSurroundingDiff={2}
          styles={{
            titleBlock: {
              display: 'none',
            },
          }}
        />
      </div>
    </div>
  );
}
