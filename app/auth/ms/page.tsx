'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleMsCallback } from '../../form/authUtils';

export default function MsCallbackPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      if (!code) {
        setError('No authorization code found');
        return;
      }

      const result = await handleMsCallback(code);
      if (result.success) {
        // Redirect to app on successful callback
        router.push('/app');
      } else {
        setError(result.error || 'Authentication failed');
      }
    };

    processCallback();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
        <div className="text-center">
          <div className="text-red-500 text-xl font-semibold mb-4">Authentication Error</div>
          <div className="text-white mb-4">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
      <div className="text-center">
        <div className="text-[#CCFF00] text-xl font-semibold mb-4">Processing authentication...</div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCFF00] mx-auto"></div>
      </div>
    </div>
  );
} 