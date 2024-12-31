import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[API] Received request body:", body);

    const response = await fetch('http://127.0.0.1:5000/api/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    console.log("[API] Backend response status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error('[API] Error from backend:', text);
      return NextResponse.json({ error: `Backend request failed: ${text}` }, { status: response.status });
    }

    const data = await response.json();
    console.log("[API] Backend response data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error calling backend:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

