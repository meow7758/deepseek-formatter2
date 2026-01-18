import { FormatRequest, FormatResponse } from '@/types';

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function formatCode(request: FormatRequest): Promise<FormatResponse> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key is not configured');
  }

  const { code, language, config } = request;

  const prompt = `Format and optimize the following ${language} code according to these specifications:

- Indent size: ${config.indentSize} ${config.tabOrSpaces === 'spaces' ? 'spaces' : 'tabs'}
- Max line width: ${config.maxLineWidth} characters
- Style guide: ${config.styleGuide}
- Preserve comments: ${config.preserveComments}
- Variable naming: ${config.variableNaming}

${config.refactorOptions.removeUnusedImports ? '- Remove unused imports' : ''}
${config.refactorOptions.simplifyConditions ? '- Simplify conditions' : ''}
${config.refactorOptions.extractFunctions ? '- Extract functions where appropriate' : ''}

Provide ONLY the formatted code. No explanations, no additional text.

Code to format:
\`\`\`${language}
${code}
\`\`\``;

  try {
    const response = await fetch(`${DEEPSEEK_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an expert code formatter. Always return only the formatted code without any explanations or markdown formatting.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`DeepSeek API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const formattedCode = data.choices[0]?.message?.content?.trim() || code;

    // Clean up markdown code blocks if present
    let cleanedCode = formattedCode;
    if (cleanedCode.startsWith('```')) {
      cleanedCode = cleanedCode.replace(/^```[\w]*\n/, '').replace(/\n```$/, '');
    }

    // Calculate changes
    const originalLines = code.split('\n');
    const formattedLines = cleanedCode.split('\n');
    const changes = calculateChanges(originalLines, formattedLines);

    return {
      formatted: cleanedCode,
      original: code,
      changes,
    };
  } catch (error) {
    console.error('Format error:', error);
    throw error;
  }
}

function calculateChanges(original: string[], formatted: string[]): {
  additions: number;
  deletions: number;
  modifications: number;
} {
  let additions = 0;
  let deletions = 0;
  let modifications = 0;

  const maxLength = Math.max(original.length, formatted.length);

  for (let i = 0; i < maxLength; i++) {
    const origLine = original[i];
    const fmtLine = formatted[i];

    if (!origLine && fmtLine) {
      additions++;
    } else if (origLine && !fmtLine) {
      deletions++;
    } else if (origLine !== fmtLine) {
      modifications++;
    }
  }

  return { additions, deletions, modifications };
}
