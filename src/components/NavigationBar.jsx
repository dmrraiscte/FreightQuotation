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
  Stack,
} from "@mui/material";
import { loginRequest } from "../authConfig";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import { UserNav } from "./UserNav";

export const NavigationBar = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const activeAccount =
    instance.getActiveAccount();
  const userEmail =
    activeAccount?.username || "";

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

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        backgroundColor: "primary.main",
        borderBottom:
          "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <Toolbar
        sx={{ minHeight: "64px" }}
      >
        {/* Left section with logo and navigation links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/"
            onClick={handleNavClick}
            sx={{
              textDecoration: "none",
              color: "inherit",
              marginRight: 4,
              fontWeight: 600,
              "&:hover": {
                textDecoration: "none",
                color: "inherit",
              },
            }}
          >
            Devlop Freight Quotation
            Platform
          </Typography>

          {/* Navigation Links */}
          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              color="inherit"
              component={Link}
              to="/contacts"
              sx={{
                fontWeight: 500,
                "&:hover": {
                  backgroundColor:
                    "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              Contacts
            </Button>
            {/* Add more navigation buttons here */}
          </Stack>
        </Box>

        {/* Right section with user info */}
        <Box>
          <AuthenticatedTemplate>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mr: 2,
                  opacity: 0.9,
                }}
              >
                Logged in as:{" "}
                {userEmail}
              </Typography>
              <UserNav />
            </Box>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Button
              color="inherit"
              onClick={
                handleLoginRedirect
              }
              sx={{
                fontWeight: 500,
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
