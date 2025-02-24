import { NextRequest, NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { operation_run_id, visualization_file } = params;
    
    const response = await fetch(`http://127.0.0.1:5000/optimizationVisualization/${operation_run_id}/${visualization_file}`, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[API] Error fetching visualization file: ${text}`);
      return NextResponse.json({ error: `Backend request failed: ${text}` }, { status: response.status });
    }

    // Get the image data as a blob
    const imageBlob = await response.blob();
    
    // Return the image with appropriate content type
    return new NextResponse(imageBlob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('[API] Error fetching visualization file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 