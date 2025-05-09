import {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Button,
  Collapse,
} from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../styles/UserNav.css";

export const UserNav = () => {
  const [open, setOpen] =
    useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(
          event.target
        ) &&
        !buttonRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleUserInfo = () => {
    navigate("/user-info");
    setOpen(false);
  };

  return (
    <div className="position-relative">
      <Button
        ref={buttonRef}
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
          ref={dropdownRef}
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
              onClick={handleUserInfo}
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
