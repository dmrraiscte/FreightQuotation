import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({
  children,
}) => {
  const { instance } = useMsal();
  const [accessToken, setAccessToken] =
    useState(null);
  const [userData, setUserData] =
    useState(null);
  const [
    idTokenClaims,
    setIdTokenClaims,
  ] = useState(null); // Add this
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);
  const [lastFetch, setLastFetch] =
    useState(null);

  const login = async () => {
    try {
      await instance.loginRedirect(
        loginRequest
      );
    } catch (error) {
      console.error(
        "Login failed:",
        error
      );
      setError(error.message);
    }
  };

  const logout = () => {
    setUserData(null);
    setAccessToken(null);
    setLastFetch(null);
    instance.logoutRedirect({
      postLogoutRedirectUri:
        window.location.origin,
    });
  };

  const fetchUserData = async (
    token
  ) => {
    try {
      const response = await fetch(
        "https://localhost:7270/api/users/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data =
        await response.json();
      setUserData(data);
      setLastFetch(Date.now());
      setError(null);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error
      );
      setError(error.message);
      setUserData(null);
    }
  };

  // Handle token acquisition and user data fetching
  useEffect(() => {
    const getAccessTokenAndFetchUser =
      async () => {
        const account =
          instance.getActiveAccount();
        if (!account) {
          setLoading(false);
          return;
        }

        try {
          const response =
            await instance.acquireTokenSilent(
              {
                ...loginRequest,
                account: account,
              }
            );

          setAccessToken(
            response.accessToken
          );
          setIdTokenClaims(
            response.idTokenClaims
          ); // Add this

          const shouldFetch =
            !lastFetch ||
            Date.now() - lastFetch >
              300000;
          if (
            shouldFetch ||
            !userData
          ) {
            await fetchUserData(
              response.accessToken
            );
          }
        } catch (error) {
          console.error(
            "Token acquisition failed:",
            error
          );
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

    getAccessTokenAndFetchUser();
  }, [instance]);

  const value = {
    userData,
    loading,
    error,
    login,
    logout,
    accessToken,
    idTokenClaims, // Add this
    refreshUserData: () =>
      accessToken &&
      fetchUserData(accessToken),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(
    AuthContext
  );
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }
  return context;
};
