import { NextRequest, NextResponse } from 'next/server';

// Simple authentication endpoint
export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (apiKey === process.env.ADMIN_API_KEY) {
      return NextResponse.json({
        success: true,
        message: 'Authenticated',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid API key' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}