import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[API] Received request body:", body);

    const response = await fetch('http://127.0.0.1:5000/optimize', {
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
      
      // Return a structured error response with appropriate status code
      return NextResponse.json({ 
        error: `Backend request failed: ${text}`,
        status: 'error',
        code: response.status,
        message: 'The optimization service is currently unavailable. Please try again later.'
      }, { status: response.status });
    }

    const data = await response.json();
    console.log("[API] Backend response data:", data);
    
    // Add a message field if it doesn't exist
    if (!data.message && data.status === 'queued') {
      data.message = 'Your request has been queued. Results will be sent to your email address in approximately one hour.';
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error calling backend:', error);
    
    // Return a structured error response
    return NextResponse.json({ 
      error: 'Internal server error',
      status: 'error',
      code: 500,
      message: 'An unexpected error occurred. Please try again later.'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed',
    status: 'error',
    code: 405,
    message: 'This endpoint only accepts POST requests.'
  }, { status: 405 });
}

