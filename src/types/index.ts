export type Theme = 'minimal' | 'cyber' | 'ocean' | 'forest' | 'sunset';

export interface FormatConfig {
  indentSize: 2 | 4 | 8;
  maxLineWidth: 80 | 100 | 120 | 150;
  tabOrSpaces: 'tab' | 'spaces';
  preserveComments: boolean;
  variableNaming: 'camelCase' | 'snake_case' | 'PascalCase';
  refactorOptions: {
    removeUnusedImports: boolean;
    simplifyConditions: boolean;
    extractFunctions: boolean;
  };
  styleGuide: 'prettier' | 'standard' | 'airbnb' | 'custom';
}

export interface FormatRequest {
  code: string;
  language: string;
  config: FormatConfig;
}

export interface FormatResponse {
  formatted: string;
  original: string;
  changes: {
    additions: number;
    deletions: number;
    modifications: number;
  };
}

export type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go' | 'rust' | 'php' | 'ruby' | 'swift' | 'kotlin';

export const LANGUAGES: { value: Language; label: string; ext: string }[] = [
  { value: 'javascript', label: 'JavaScript', ext: '.js' },
  { value: 'typescript', label: 'TypeScript', ext: '.ts' },
  { value: 'python', label: 'Python', ext: '.py' },
  { value: 'java', label: 'Java', ext: '.java' },
  { value: 'cpp', label: 'C++', ext: '.cpp' },
  { value: 'go', label: 'Go', ext: '.go' },
  { value: 'rust', label: 'Rust', ext: '.rs' },
  { value: 'php', label: 'PHP', ext: '.php' },
  { value: 'ruby', label: 'Ruby', ext: '.rb' },
  { value: 'swift', label: 'Swift', ext: '.swift' },
  { value: 'kotlin', label: 'Kotlin', ext: '.kt' },
];
