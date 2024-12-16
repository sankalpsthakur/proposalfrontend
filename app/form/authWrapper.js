<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { msalInstance } from './msalConfig';
//import App from '../components/App';
=======
'use client';

import { useEffect, useState } from 'react';
import { getMsalInstance } from './msalConfig';
>>>>>>> 10ba9b5905ad7da911dddd932c1d7c7e3be4ffba

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
<<<<<<< HEAD
=======
    const [isLoading, setIsLoading] = useState(true);
>>>>>>> 10ba9b5905ad7da911dddd932c1d7c7e3be4ffba

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
<<<<<<< HEAD
          // Wait until the MSAL instance is initialized
          if (!msalInstance.getAllAccounts) {
            await msalInstance.initialize();
=======
          const msalInstance = await getMsalInstance();
          if (!msalInstance) {
            console.error('MSAL instance not initialized');
            return;
>>>>>>> 10ba9b5905ad7da911dddd932c1d7c7e3be4ffba
          }

          const accounts = msalInstance.getAllAccounts();
          if (accounts.length === 0) {
            await msalInstance.loginRedirect({
<<<<<<< HEAD
              scopes: ['user.read'], // Define your required scopes here
            });
          } else {
            setIsAuthenticated(true);

             // Acquire token silently

             const response = await msalInstance.acquireTokenSilent({

              ...loginRequest,

              account: accounts[0],

            });



            if (response && response.accessToken) {

              console.log('Authentication Token:', response.accessToken);
            //  logger.log(response.accessToken); // Log the token

              setAuthToken(response.accessToken); // Store the token

            } else {

              console.warn('Token not available');

            }
          }
        } catch (error) {
          console.error('Authentication error:', error);
=======
              scopes: ['user.read'],
            });
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Authentication error:', error);
        } finally {
          setIsLoading(false);
>>>>>>> 10ba9b5905ad7da911dddd932c1d7c7e3be4ffba
        }
      };

      checkAuthentication();
    }, []);

<<<<<<< HEAD
    if (!isAuthenticated) {
      return <div>Loading...</div>; // Show a loading screen while authenticating
=======
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
          <div className="text-[#CCFF00] text-xl font-semibold">Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-[#CCFF00]">Please sign in to access the dashboard.</p>
          </div>
        </div>
      );
>>>>>>> 10ba9b5905ad7da911dddd932c1d7c7e3be4ffba
    }

    return <Component {...props} />;
  };
<<<<<<< HEAD
}
=======
} 
>>>>>>> 10ba9b5905ad7da911dddd932c1d7c7e3be4ffba
