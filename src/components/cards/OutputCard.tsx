'use client';

import { motion } from 'framer-motion';
import { DiffViewer } from '@/components/editor/DiffViewer';
import { FormatResponse } from '@/types';
import { Download, Share2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface OutputCardProps {
  result: FormatResponse | null;
  isLoading: boolean;
}

export function OutputCard({ result, isLoading }: OutputCardProps) {
  const handleDownload = () => {
    if (!result) return;

    const blob = new Blob([result.formatted], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted_code.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!result || !navigator.share) {
      alert('此设备不支持分享功能');
      return;
    }

    try {
      await navigator.share({
        title: '格式化的代码',
        text: result.formatted,
      });
    } catch (error) {
      console.error('分享错误:', error);
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                输出
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                格式化结果
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {result && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={handleDownload}
              >
                下载
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Share2 className="w-4 h-4" />}
                onClick={handleShare}
              >
                分享
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {isLoading ? (
          <div className="h-[500px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent mb-4"
            />
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              正在格式化你的代码...
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
              这可能需要几秒钟
            </p>
          </div>
        ) : result ? (
          <div className="h-[500px]">
            <DiffViewer
              original={result.original}
              modified={result.formatted}
              language="javascript"
            />
          </div>
        ) : (
          <div className="h-[500px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium mb-1">
              暂无输出
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              输入代码并点击格式化查看结果
            </p>
          </div>
        )}
      </div>

      {/* Card Footer - Stats */}
      {result && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {result.changes.additions} 次添加
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {result.changes.deletions} 次删除
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {result.changes.modifications} 次修改
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
