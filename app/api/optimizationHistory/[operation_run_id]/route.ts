import { NextRequest, NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { operation_run_id } = params;
    
    const response = await fetch(`http://127.0.0.1:5000/optimizationHistory/${operation_run_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[API] Error fetching optimization history: ${text}`);
      return NextResponse.json({ error: `Backend request failed: ${text}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error fetching optimization history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 