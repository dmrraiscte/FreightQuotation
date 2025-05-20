import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

import './styles/index.css';

const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL and handle the redirect flow
async function initializeMsal() {
    await msalInstance.initialize();
    
    // Handle token renewal and page load authentication state
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
    }

    try {
        // Handle the redirect flow
        const response = await msalInstance.handleRedirectPromise();
        if (response !== null) {
            msalInstance.setActiveAccount(response.account);
        }
    } catch (error) {
        console.error("Failed to handle redirect:", error);
    }

    // Listen for sign-in events
    msalInstance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
            const account = event.payload.account;
            msalInstance.setActiveAccount(account);
        }
    });

    // Render the app
    const root = createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App instance={msalInstance} />
        </React.StrictMode>
    );
}

// Start the initialization
initializeMsal().catch(error => {
    console.error("Failed to initialize MSAL:", error);
});