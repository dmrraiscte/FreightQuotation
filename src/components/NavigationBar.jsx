import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";
import { UserNav } from "./UserNav";

export const NavigationBar = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    instance
      .loginRedirect(loginRequest)
      .catch((error) =>
        console.log(error)
      );
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  // Get active account info
  const activeAccount =
    instance.getActiveAccount();
  const userEmail =
    activeAccount?.username || "";

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="a"
          href="/"
          onClick={handleNavClick}
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              textDecoration: "none",
              color: "inherit",
            },
          }}
        >
          Devlop Freight Quotation
          Platform
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AuthenticatedTemplate>
            <Typography
              variant="body2"
              sx={{ mr: 2 }}
            >
              Logged in as: {userEmail}
            </Typography>
            <UserNav />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Button
              color="inherit"
              onClick={
                handleLoginRedirect
              }
              sx={{
                "&:hover": {
                  backgroundColor:
                    "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              Sign in
            </Button>
          </UnauthenticatedTemplate>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
