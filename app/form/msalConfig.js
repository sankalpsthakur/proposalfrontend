import { LogLevel } from "@azure/msal-browser";
import { PublicClientApplication } from '@azure/msal-browser';
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_SISOPolicy",
        editProfile: "B2C_1_ProfileEditPolicy"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://msidlabb2c.b2clogin.com/msidlabb2c.onmicrosoft.com/B2C_1_SISOPolicy"
        },
        editProfile: {
            authority: "https://msidlabb2c.b2clogin.com/msidlabb2c.onmicrosoft.com/B2C_1_ProfileEditPolicy"
        }
    },
    authorityDomain: "msidlabb2c.b2clogin.com"
}

// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: "1533294e-4208-4859-ab56-6bd42e72da92",
        authority: "https://login.microsoftonline.com/7ae7c16b-7491-45c1-b6a7-c4dc469742af",
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: "http://proposal.hygenco.in/app",
        postLogoutRedirectUri: "/"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE || isEdge || isFirefox
    },
    system: {
        allowNativeBroker: false, // Disables WAM Broker
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
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
            }
        }
    }
};

// Scopes you add here will be prompted for consent during login
export const loginRequest = {
    scopes: ["profile", "openid"]
};

/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
// export const apiConfig = {
//     scopes: [],
//     uri: ''
// };

export const msalInstance = new PublicClientApplication(msalConfig);
(async () => {
    await msalInstance.initialize(); // Ensure the instance is initialized before use
  })();