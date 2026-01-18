import { Theme } from '@/types';

export const themes: Record<Theme, { name: string; description: string; colors: any }> = {
  minimal: {
    name: '现代简约',
    description: '简洁的白色主题，适合生产力',
    colors: {
      bg: 'bg-white',
      card: 'bg-gray-50',
      text: 'text-gray-900',
      primary: 'text-indigo-600',
      border: 'border-gray-200',
      gradient: 'from-indigo-500 to-purple-600',
      shadow: 'shadow-lg shadow-indigo-500/20',
    },
  },
  cyber: {
    name: '暗黑赛博',
    description: '赛博朋克风格的暗色主题',
    colors: {
      bg: 'bg-[#0a0e27]',
      card: 'bg-[#111836]',
      text: 'text-slate-200',
      primary: 'text-cyan-400',
      border: 'border-slate-700',
      gradient: 'from-cyan-400 to-purple-500',
      shadow: 'shadow-lg shadow-cyan-500/30',
    },
  },
  ocean: {
    name: '海洋蓝',
    description: '深海蓝色的科技主题',
    colors: {
      bg: 'bg-slate-900',
      card: 'bg-slate-800',
      text: 'text-slate-100',
      primary: 'text-sky-400',
      border: 'border-slate-700',
      gradient: 'from-sky-400 to-cyan-500',
      shadow: 'shadow-lg shadow-sky-500/20',
    },
  },
  forest: {
    name: '森林绿',
    description: '自然的绿色森林主题',
    colors: {
      bg: 'bg-emerald-950',
      card: 'bg-emerald-900',
      text: 'text-emerald-50',
      primary: 'text-emerald-400',
      border: 'border-emerald-700',
      gradient: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-lg shadow-emerald-500/20',
    },
  },
  sunset: {
    name: '日落橙',
    description: '温暖的日落橙色主题',
    colors: {
      bg: 'bg-orange-950',
      card: 'bg-orange-900',
      text: 'text-orange-50',
      primary: 'text-orange-400',
      border: 'border-orange-700',
      gradient: 'from-orange-400 to-red-500',
      shadow: 'shadow-lg shadow-orange-500/20',
    },
  },
};

export const defaultConfig = {
  indentSize: 2,
  maxLineWidth: 80,
  tabOrSpaces: 'spaces' as const,
  preserveComments: true,
  variableNaming: 'camelCase' as const,
  refactorOptions: {
    removeUnusedImports: false,
    simplifyConditions: false,
    extractFunctions: false,
  },
  styleGuide: 'prettier' as const,
};
