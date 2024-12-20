'use client';

import { LogLevel, PublicClientApplication } from "@azure/msal-browser";

// Browser check function
const getBrowserInfo = () => {
  if (typeof window === 'undefined') {
    return {
      isIE: false,
      isEdge: false,
      isFirefox: false
    };
  }

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  const msie11 = ua.indexOf("Trident/");
  const msedge = ua.indexOf("Edge/");
  const firefox = ua.indexOf("Firefox");
  
  return {
    isIE: msie > 0 || msie11 > 0,
    isEdge: msedge > 0,
    isFirefox: firefox > 0
  };
};

// MSAL configuration
export const getMsalConfig = () => {
  const { isIE, isEdge, isFirefox } = getBrowserInfo();
  
  return {
    auth: {
      clientId: "1533294e-4208-4859-ab56-6bd42e72da92",
      authority: "https://login.microsoftonline.com/7ae7c16b-7491-45c1-b6a7-c4dc469742af",
      redirectUri: "https://proposal.hygenco.in/app",
      postLogoutRedirectUri: "/",
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
      secureCookies: true
    },
    system: {
      allowNativeBroker: false,
      windowHashTimeout: 60000,
      iframeHashTimeout: 6000,
      loadFrameTimeout: 0,
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) return;
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            default:
              return;
          }
        },
        logLevel: LogLevel.Info
      }
    }
  };
};

// Add scopes for token request
export const loginRequest = {
  scopes: ["User.Read"]
};

let msalInstance = null;
let isInitialized = false;

export const getMsalInstance = async () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(getMsalConfig());
  }

  if (!isInitialized) {
    await msalInstance.initialize();
    isInitialized = true;
  }
  
  return msalInstance;
}; 