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
        <div className="ms-auto d-flex align-items-center">
          <AuthenticatedTemplate>
            <span className="text-light me-3">
              Logged in as: {userEmail}
            </span>
            <UserNav />
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
        </div>
      </Navbar>
    </>
  );
};
