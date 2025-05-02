import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import {
  Navbar,
  Button,
} from "react-bootstrap";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";

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

  const handleLogoutRedirect = () => {
    instance.setActiveAccount(null); // Clear the active account
    instance
      .logoutRedirect({
        postLogoutRedirectUri:
          window.location.origin,
      })
      .catch((error) =>
        console.log(error)
      );
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    // Use navigate instead of href to prevent full page refresh
    navigate("/");
  };

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        className="navbarStyle"
      >
        <a
          className="navbar-brand"
          href="/"
          onClick={handleNavClick}
        >
          Microsoft identity platform
        </a>
        <AuthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <Button
              variant="warning"
              onClick={
                handleLogoutRedirect
              }
            >
              Sign out
            </Button>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <Button
              onClick={
                handleLoginRedirect
              }
            >
              Sign in
            </Button>
          </div>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
};
