import {
  Routes,
  Route,
} from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { IdTokenData } from "./DataDisplay";
import { UserInfo } from "./UserInfo";
import { useAuth } from "../contexts/AuthContext";
import { Contacts } from "./Contacts";

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
    <Box sx={{ width: "100%" }}>
      <AuthenticatedTemplate>
        <Routes>
          <Route
            path="/user-info"
            element={<UserInfo />}
          />
          <Route
            path="/contacts"
            element={<Contacts />}
          />
          <Route
            path="/"
            element={
              loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "center",
                    mt: 4,
                  }}
                >
                  <CircularProgress />
                </Box>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            onClick={handleRedirect}
            sx={{
              backgroundColor:
                "primary.main",
              "&:hover": {
                backgroundColor:
                  "primary.dark",
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      </UnauthenticatedTemplate>
    </Box>
  );
};
