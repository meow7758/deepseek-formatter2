'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, label, disabled, className }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        'relative inline-flex items-center gap-2',
        'transition-all duration-200',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className
      )}
    >
      {label && (
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}

      <div className="relative">
        <motion.div
          className={cn(
            'w-12 h-7 rounded-full transition-colors duration-200',
            checked
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
              : 'bg-slate-300 dark:bg-slate-700'
          )}
        />
        <motion.div
          animate={{ x: checked ? 20 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={cn(
            'absolute top-0.5 w-6 h-6 rounded-full shadow-md',
            'bg-white',
            'flex items-center justify-center'
          )}
        >
          <motion.div
            animate={{
              scale: checked ? 1 : 0.5,
              opacity: checked ? 1 : 0,
            }}
            className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"
          />
        </motion.div>
      </div>
    </button>
  );
}
