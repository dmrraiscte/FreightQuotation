import {
  MsalProvider,
  AuthenticatedTemplate,
  useMsal,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import {
  Container,
  Button,
} from "react-bootstrap";
import { PageLayout } from "./components/PageLayout";
import { IdTokenData } from "./components/DataDisplay";
import { loginRequest } from "./authConfig";
import { BrowserRouter as Router } from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";

import "./styles/App.css";

/**
 * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
 * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
 * only render their children if a user is authenticated or unauthenticated, respectively. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const MainContent = () => {
  const {
    instance,
    accounts,
    inProgress,
  } = useMsal();
  const [accountData, setAccountData] =
    useState(null);

  useEffect(() => {
    const currentAccount =
      instance.getActiveAccount() ||
      accounts[0];

    // Only update if we have an account and we're not in the middle of a redirect
    if (
      currentAccount &&
      inProgress === "none"
    ) {
      // Acquire token silently to ensure we have fresh claims
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: currentAccount,
        })
        .then((response) => {
          if (response) {
            // Update account data with fresh token claims
            setAccountData({
              ...currentAccount,
              idTokenClaims:
                response.idTokenClaims,
            });
          }
        })
        .catch((error) => {
          console.error(
            "Token acquisition failed:",
            error
          );
          // Fallback to account data without fresh claims
          setAccountData(
            currentAccount
          );
        });
    }

    const accountCallback = (event) => {
      if (
        event.eventType ===
          "ACCOUNT_ADDED" ||
        event.eventType ===
          "ACCOUNT_REMOVED" ||
        event.eventType ===
          "LOGIN_SUCCESS"
      ) {
        const currentAccount =
          instance.getActiveAccount();
        setAccountData(currentAccount);
      }
    };

    const callbackId =
      instance.addEventCallback(
        accountCallback
      );

    return () => {
      if (callbackId) {
        instance.removeEventCallback(
          callbackId
        );
      }
    };
  }, [instance, accounts, inProgress]);

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) =>
        console.log(error)
      );
  };

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {accountData ? (
          <Container>
            <IdTokenData
              idTokenClaims={
                accountData.idTokenClaims
              }
            />
          </Container>
        ) : (
          <div>
            Loading account data...
          </div>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button
          className="signInButton"
          onClick={handleRedirect}
          variant="primary"
        >
          Sign up
        </Button>
      </UnauthenticatedTemplate>
    </div>
  );
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance }) => {
  return (
    <Router>
      <MsalProvider instance={instance}>
        <PageLayout>
          <MainContent />
        </PageLayout>
      </MsalProvider>
    </Router>
  );
};

export default App;
