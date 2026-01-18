'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { themes, defaultConfig } from '@/lib/themes';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
    );
  }

  return (
    <div className="relative">
      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center',
          'bg-gradient-to-br from-indigo-500 to-purple-600',
          'text-white shadow-lg shadow-indigo-500/30',
          'hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300'
        )}
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-12 z-50 w-64 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                选择主题
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                选择你喜欢的风格
              </p>
            </div>

            {/* Theme Options */}
            <div className="p-2 space-y-1">
              {Object.entries(themes).map(([key, theme]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTheme(key);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl',
                    'transition-all duration-200',
                    (theme as any) === key
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 border-2 border-transparent'
                  )}
                >
                  {/* Color Preview */}
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.colors.gradient} shadow-lg`}
                  />

                  {/* Info */}
                  <div className="flex-1 text-left">
                    <p className={cn(
                      'text-sm font-medium',
                      (theme as any) === key
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-900 dark:text-slate-100'
                    )}>
                      {theme.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {theme.description}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {(theme as any) === key && (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
