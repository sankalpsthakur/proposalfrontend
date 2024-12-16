import { useEffect, useState } from 'react';
import { msalInstance } from './msalConfig';
//import App from '../components/App';

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          // Wait until the MSAL instance is initialized
          if (!msalInstance.getAllAccounts) {
            await msalInstance.initialize();
          }

          const accounts = msalInstance.getAllAccounts();
          if (accounts.length === 0) {
            await msalInstance.loginRedirect({
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
        }
      };

      checkAuthentication();
    }, []);

    if (!isAuthenticated) {
      return <div>Loading...</div>; // Show a loading screen while authenticating
    }

    return <Component {...props} />;
  };
}
