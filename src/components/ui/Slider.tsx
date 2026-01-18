'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  marks?: { value: number; label: string }[];
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  marks,
  className,
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateValue(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (e: React.MouseEvent) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(1, x / rect.width));
    const newValue = Math.round(min + newPercentage * (max - min) / step) * step;
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </span>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {value}
          </span>
        </div>
      )}

      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative h-6 cursor-pointer"
      >
        {/* Track */}
        <div className="absolute inset-y-0 left-0 right-0 my-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />

        {/* Filled Track */}
        <div
          className="absolute inset-y-0 left-0 my-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-indigo-600 dark:border-indigo-400 shadow-lg transition-transform duration-150"
          style={{ left: `calc(${percentage}% - 12px)` }}
        >
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
        </div>

        {/* Marks */}
        {marks && (
          <div className="absolute inset-y-0 left-0 right-0 flex justify-between px-3">
            {marks.map((mark) => {
              const markPercentage = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="relative"
                  style={{ left: `${markPercentage}%` }}
                >
                  <div className="absolute top-3 text-xs text-slate-500 dark:text-slate-400">
                    {mark.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
