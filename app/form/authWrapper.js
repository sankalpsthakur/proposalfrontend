'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { validateSession, initiateLogin, logout } from './authUtils';
import { AUTH_CONFIG } from './authConfig';
import { toastService } from '../../services/toastService';

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleLogout = useCallback(async () => {
      const result = await logout();
      if (result.success) {
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
      } else {
        setError(result.error);
        toastService.error(result.error || 'Logout failed');
      }
    }, [router]);

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const result = await validateSession();
          if (!result.isValid) {
            setError(result.error);
            initiateLogin();
            return;
          }

          setUser(result.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Authentication error:', error);
          setError(error.message);
          toastService.error(error.message || 'Authentication error');
        } finally {
          setIsLoading(false);
        }
      };

      checkAuthentication();
    }, []);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
          <div className="text-center">
            <div className="text-[#CCFF00] text-xl font-semibold mb-4">Loading...</div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCFF00] mx-auto"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
          <div className="text-center">
            <div className="text-red-500 text-xl font-semibold mb-4">Authentication Error</div>
            <div className="text-white mb-4">{error}</div>
            <button 
              onClick={initiateLogin}
              className="px-4 py-2 bg-[#CCFF00] text-[#1A3721] rounded hover:bg-white transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} user={user} onLogout={handleLogout} />;
  };
} 