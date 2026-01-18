'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { InputCard } from '@/components/cards/InputCard';
import { OutputCard } from '@/components/cards/OutputCard';
import { ConfigCard } from '@/components/cards/ConfigCard';
import { FormatResponse } from '@/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [isFormatting, setIsFormatting] = useState(false);
  const [result, setResult] = useState<FormatResponse | null>(null);

  const handleFormat = async () => {
    setIsFormatting(true);
    // This will be triggered by InputCard
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4-4-4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">DeepSeek 代码格式化</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">AI 驱动的代码美化工具</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ThemeSwitcher />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                变换你的代码
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              使用 AI 驱动的智能格式化、优化和美化你的代码。
              支持多种语言、精美 UI、即时结果。
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <InputCard onFormatStart={() => setIsFormatting(true)} onFormatComplete={setResult} />
            </motion.div>

            {/* Output Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <OutputCard result={result} isLoading={isFormatting} />
            </motion.div>
          </div>

          {/* Configuration Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ConfigCard />
          </motion.div>

          {/* Loading Overlay */}
          {isFormatting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
                <p className="text-lg font-medium text-slate-900 dark:text-white">
                  正在格式化你的代码...
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  这可能需要几秒钟
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            使用 Next.js、Tailwind CSS 和 DeepSeek AI 构建
          </p>
        </div>
      </footer>
    </main>
  );
}
