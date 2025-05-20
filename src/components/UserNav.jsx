import {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  IconButton,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../styles/UserNav.css";

export const UserNav = () => {
  const [open, setOpen] =
    useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(
        event.target
      )
    ) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const handleUserInfo = () => {
    navigate("/user-info");
    setOpen(false);
  };

  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (
      prevOpen.current === true &&
      open === false
    ) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={
          open
            ? "menu-list-grow"
            : undefined
        }
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor:
              "rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <Person />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        sx={{ zIndex: 1000 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={3}>
              <ClickAwayListener
                onClickAway={
                  handleClose
                }
              >
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                >
                  <MenuItem
                    onClick={
                      handleUserInfo
                    }
                  >
                    User Info
                  </MenuItem>
                  <MenuItem
                    onClick={
                      handleLogout
                    }
                    sx={{
                      color:
                        "error.main",
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
