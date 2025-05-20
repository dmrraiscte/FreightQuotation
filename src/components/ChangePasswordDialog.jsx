import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const ChangePasswordDialog = ({
  open,
  onClose,
}) => {
  const { accessToken } = useAuth();
  const [
    passwordData,
    setPasswordData,
  ] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [
    changePasswordError,
    setChangePasswordError,
  ] = useState(null);
  const [
    changePasswordSuccess,
    setChangePasswordSuccess,
  ] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword =
    async () => {
      setChangePasswordError(null);
      setChangePasswordSuccess(false);

      if (
        passwordData.newPassword !==
        passwordData.newPasswordConfirmation
      ) {
        setChangePasswordError(
          "New passwords do not match"
        );
        return;
      }

      try {
        const response = await fetch(
          "https://freightquotationapigateway.azure-api.net/api/users/me/change-password",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              passwordData
            ),
          }
        );

        // Check if there's content before trying to parse JSON
        const contentType =
          response.headers.get(
            "content-type"
          );
        const data =
          contentType?.includes(
            "application/json"
          )
            ? await response.json()
            : null;

        if (!response.ok) {
          setChangePasswordError(
            data?.message ||
              data?.title ||
              "Failed to change password"
          );
          return;
        }

        setChangePasswordSuccess(true);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        });

        setTimeout(() => {
          onClose();
          setChangePasswordSuccess(
            false
          );
        }, 3000);
      } catch (err) {
        console.error(
          "Password change error:",
          err
        );
        setChangePasswordError(
          "Network error occurred while trying to change password"
        );
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangePassword();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Change Password
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{
              mt: 1,
              minWidth: "300px",
            }}
          >
            {changePasswordSuccess && (
              <Alert severity="success">
                Password changed
                successfully!
              </Alert>
            )}
            {changePasswordError && (
              <Alert severity="error">
                {changePasswordError}
              </Alert>
            )}
            <TextField
              label="Current Password"
              type="password"
              name="currentPassword"
              value={
                passwordData.currentPassword
              }
              onChange={
                handlePasswordChange
              }
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={
                passwordData.newPassword
              }
              onChange={
                handlePasswordChange
              }
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              name="newPasswordConfirmation"
              value={
                passwordData.newPasswordConfirmation
              }
              onChange={
                handlePasswordChange
              }
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              !passwordData.currentPassword ||
              !passwordData.newPassword ||
              !passwordData.newPasswordConfirmation
            }
          >
            Change Password
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
