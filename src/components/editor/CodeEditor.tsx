'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Trash2, Upload, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
}

export function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  placeholder = '// Paste your code here...',
  className,
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChange('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    onChange(text);
  };

  return (
    <div className={cn('relative h-full flex flex-col', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
            <FileCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {language}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Upload Button */}
          {!readOnly && (
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".js,.ts,.py,.java,.cpp,.go,.rs,.php,.rb,.swift,.kt,.jsx,.tsx"
                onChange={handleFileUpload}
              />
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Upload className="w-4 h-4" />}
              >
                Upload
              </Button>
            </label>
          )}

          {/* Clear Button */}
          {!readOnly && value && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={handleClear}
            >
              Clear
            </Button>
          )}

          {/* Copy Button */}
          {value && (
            <Button
              variant={copied ? 'secondary' : 'outline'}
              size="sm"
              leftIcon={<Copy className="w-4 h-4" />}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          )}
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 min-h-[400px] rounded-xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 transition-colors duration-200">
        <Editor
          height="100%"
          language={language}
          value={value}
          onChange={(val) => onChange(val || '')}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80],
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            placeholder,
            contextmenu: true,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            tabCompletion: 'on',
          }}
          loading={
            <div className="h-full flex items-center justify-center bg-slate-900 text-slate-400">
              Loading editor...
            </div>
          }
        />
      </div>

      {/* Stats */}
      {value && (
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 px-2">
          <span>{value.split('\n').length} lines</span>
          <span>{value.length} characters</span>
          <span>{value.split(/\s+/).filter(Boolean).length} words</span>
        </div>
      )}
    </div>
  );
}
