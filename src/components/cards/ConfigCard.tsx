'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Toggle } from '@/components/ui/Toggle';
import { Select } from '@/components/ui/Select';
import { Settings, RefreshCw, Save } from 'lucide-react';
import { defaultConfig } from '@/lib/themes';

export function ConfigCard() {
  const [config, setConfig] = useState(defaultConfig);

  const handleReset = () => {
    setConfig(defaultConfig);
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('formatterConfig', JSON.stringify(config));
    alert('配置已保存！');
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                配置
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                自定义格式化选项
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<RefreshCw className="w-4 h-4" />}
              onClick={handleReset}
            >
              重置
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSave}
            >
              保存
            </Button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Indentation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
              缩进
            </h4>

            <Slider
              label="缩进大小"
              value={config.indentSize}
              onChange={(value) => setConfig({ ...config, indentSize: value as 2 | 4 | 8 })}
              min={2}
              max={8}
              step={2}
              marks={[
                { value: 2, label: '2' },
                { value: 4, label: '4' },
                { value: 8, label: '8' },
              ]}
            />

            <Select
              options={[
                { value: 'spaces', label: '空格' },
                { value: 'tab', label: 'Tab' },
              ]}
              value={config.tabOrSpaces}
              onChange={(value) => setConfig({ ...config, tabOrSpaces: value as any })}
            />
          </div>

          {/* Line Width */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
              行宽
            </h4>

            <Slider
              label="最大行宽"
              value={config.maxLineWidth}
              onChange={(value) =>
                setConfig({ ...config, maxLineWidth: value as 80 | 100 | 120 | 150 })
              }
              min={80}
              max={150}
              step={20}
              marks={[
                { value: 80, label: '80' },
                { value: 100, label: '100' },
                { value: 120, label: '120' },
                { value: 150, label: '150' },
              ]}
            />
          </div>

          {/* Style Guide */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
              代码风格
            </h4>

            <Select
              options={[
                { value: 'prettier', label: 'Prettier' },
                { value: 'standard', label: 'Standard' },
                { value: 'airbnb', label: 'Airbnb' },
                { value: 'custom', label: '自定义' },
              ]}
              value={config.styleGuide}
              onChange={(value) => setConfig({ ...config, styleGuide: value as any })}
            />

            <Select
              options={[
                { value: 'camelCase', label: 'camelCase' },
                { value: 'snake_case', label: 'snake_case' },
                { value: 'PascalCase', label: 'PascalCase' },
              ]}
              value={config.variableNaming}
              onChange={(value) => setConfig({ ...config, variableNaming: value as any })}
            />
          </div>

          {/* Refactoring */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
              重构
            </h4>

            <div className="space-y-3">
              <Toggle
                checked={config.refactorOptions.removeUnusedImports}
                onChange={(checked) =>
                  setConfig({
                    ...config,
                    refactorOptions: { ...config.refactorOptions, removeUnusedImports: checked },
                  })
                }
                label="移除未使用的导入"
              />

              <Toggle
                checked={config.refactorOptions.simplifyConditions}
                onChange={(checked) =>
                  setConfig({
                    ...config,
                    refactorOptions: { ...config.refactorOptions, simplifyConditions: checked },
                  })
                }
                label="简化条件"
              />

              <Toggle
                checked={config.refactorOptions.extractFunctions}
                onChange={(checked) =>
                  setConfig({
                    ...config,
                    refactorOptions: { ...config.refactorOptions, extractFunctions: checked },
                  })
                }
                label="提取函数"
              />
            </div>
          </div>

          {/* Code Preservation */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
              代码保留
            </h4>

            <Toggle
              checked={config.preserveComments}
              onChange={(checked) => setConfig({ ...config, preserveComments: checked })}
              label="保留注释"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
