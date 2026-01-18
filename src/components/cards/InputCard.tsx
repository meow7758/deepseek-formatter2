'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Play, Sparkles } from 'lucide-react';
import { Language, LANGUAGES, FormatResponse } from '@/types';
import { cn } from '@/lib/utils';

interface InputCardProps {
  onFormatStart: () => void;
  onFormatComplete: (result: FormatResponse) => void;
}

export function InputCard({ onFormatStart, onFormatComplete }: InputCardProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');

  const handleFormat = async () => {
    if (!code.trim()) {
      alert('请输入一些代码进行格式化');
      return;
    }

    onFormatStart();

    try {
      const response = await fetch('/api/format', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          config: {
            indentSize: 2,
            maxLineWidth: 80,
            tabOrSpaces: 'spaces',
            preserveComments: true,
            variableNaming: 'camelCase',
            refactorOptions: {
              removeUnusedImports: false,
              simplifyConditions: false,
              extractFunctions: false,
            },
            styleGuide: 'prettier',
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '格式化代码失败');
      }

      const result = await response.json();
      onFormatComplete(result);
    } catch (error) {
      console.error('格式化错误:', error);
      alert(error instanceof Error ? error.message : '格式化代码失败');
      onFormatStart();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300"
    >
      {/* Card Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                输入代码
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                粘贴或上传你的代码
              </p>
            </div>
          </div>

          <Select
            options={LANGUAGES.map((lang) => ({
              value: lang.value,
              label: lang.label,
            }))}
            value={language}
            onChange={(value) => setLanguage(value as Language)}
            className="w-48"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="h-[500px]">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            placeholder="// 在这里粘贴或上传你的代码..."
          />
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <Button
          variant="gradient"
          size="lg"
          leftIcon={<Play className="w-5 h-5" />}
          onClick={handleFormat}
          disabled={!code.trim()}
          className="w-full"
        >
          格式化代码
        </Button>
      </div>
    </motion.div>
  );
}
