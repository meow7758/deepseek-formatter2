import { NextRequest, NextResponse } from 'next/server';
import { formatCode } from '@/lib/deepseek';
import { FormatRequest } from '@/types';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body: FormatRequest = await request.json();

    // Validate request
    if (!body.code || !body.language) {
      return NextResponse.json(
        { error: 'Missing required fields: code and language' },
        { status: 400 }
      );
    }

    const result = await formatCode(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Format error:', error);

    return NextResponse.json(
      {
        error: 'Failed to format code',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
