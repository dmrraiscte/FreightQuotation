import { useState } from "react";
import {
  Button,
  Collapse,
} from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import "../styles/UserNav.css";

export const UserNav = () => {
  const [open, setOpen] =
    useState(false);
  const navigate = useNavigate();
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri:
        window.location.origin,
    });
  };

  const handleProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  return (
    <div className="position-relative">
      <Button
        variant="primary"
        className="rounded-circle p-2"
        onClick={() => setOpen(!open)}
        aria-controls="user-dropdown"
        aria-expanded={open}
      >
        <PersonFill size={20} />
      </Button>

      <Collapse in={open}>
        <div
          id="user-dropdown"
          className="position-absolute end-0 mt-2 bg-white rounded shadow"
          style={{
            minWidth: "160px",
            zIndex: 1000,
          }}
        >
          <div className="d-flex flex-column p-2">
            <Button
              variant="link"
              className="text-dark text-decoration-none py-2 dropdown-item"
              onClick={handleProfile}
            >
              User Info
            </Button>
            <Button
              variant="link"
              className="text-danger text-decoration-none py-2 dropdown-item"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
