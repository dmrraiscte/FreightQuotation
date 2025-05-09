import {
  Routes,
  Route,
} from "react-router-dom";
import {
  Container,
  Button,
} from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { IdTokenData } from "./DataDisplay";
import { UserInfo } from "./UserInfo";
import { useAuth } from "../contexts/AuthContext";

export const MainContent = () => {
  const {
    login,
    loading,
    idTokenClaims,
  } = useAuth();

  const handleRedirect = () => {
    login().catch((error) =>
      console.log(error)
    );
  };

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <Routes>
          <Route
            path="/user-info"
            element={<UserInfo />}
          />
          <Route
            path="/"
            element={
              loading ? (
                <div>
                  Loading account
                  data...
                </div>
              ) : (
                <Container>
                  <IdTokenData
                    idTokenClaims={
                      idTokenClaims
                    }
                  />
                </Container>
              )
            }
          />
        </Routes>
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
