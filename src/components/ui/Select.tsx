'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={cn('relative', className)}>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full px-4 py-2.5 rounded-xl border-2',
          'bg-white dark:bg-slate-800',
          'text-slate-900 dark:text-white',
          'border-slate-300 dark:border-slate-700',
          'hover:border-indigo-500 dark:hover:border-indigo-500',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
          'flex items-center justify-between gap-2'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={cn(!selectedOption && 'text-slate-500 dark:text-slate-400')}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute z-50 w-full mt-2',
                'rounded-xl shadow-2xl border-2',
                'bg-white dark:bg-slate-800',
                'border-slate-200 dark:border-slate-700',
                'overflow-hidden'
              )}
              role="listbox"
            >
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                    onClick={() => handleOptionClick(option.value)}
                    className={cn(
                      'w-full px-4 py-2.5 text-left',
                      'flex items-center justify-between',
                      'transition-colors duration-150',
                      highlightedIndex === index && 'bg-indigo-50 dark:bg-indigo-900/20',
                      value === option.value && 'bg-indigo-50 dark:bg-indigo-900/30'
                    )}
                    role="option"
                    aria-selected={value === option.value}
                  >
                    <span className="text-sm text-slate-900 dark:text-slate-100">
                      {option.label}
                    </span>
                    {value === option.value && (
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
