import {
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const UserInfo = () => {
  const {
    userData,
    loading,
    error,
    refreshUserData,
    accessToken,
  } = useAuth();
  const [openDialog, setOpenDialog] =
    useState(false);
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
      // Reset states
      setChangePasswordError(null);
      setChangePasswordSuccess(false);

      // Validate passwords match
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
            body: JSON.stringify({
              currentPassword:
                passwordData.currentPassword,
              newPassword:
                passwordData.newPassword,
              newPasswordConfirmation:
                passwordData.newPasswordConfirmation,
            }),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          // Extract the detailed error message from the response
          const errorMessage =
            data.message ||
            data.title ||
            JSON.stringify(data);
          setChangePasswordError(
            errorMessage
          );
          return;
        }

        setChangePasswordSuccess(true);
        // Reset form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        });

        // Close dialog after success
        setTimeout(() => {
          setOpenDialog(false);
          setChangePasswordSuccess(
            false
          );
        }, 2000);
      } catch (err) {
        setChangePasswordError(
          "Network error occurred while trying to change password"
        );
      }
    };

  if (error) {
    return (
      <Box sx={{ mt: 3, mx: 2 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={refreshUserData}
              disabled={loading}
            >
              Retry
            </Button>
          }
        >
          Error loading user data:{" "}
          {error}
        </Alert>
      </Box>
    );
  }

  if (loading || !userData) {
    return (
      <Box
        sx={{
          mt: 3,
          mx: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, mx: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        User Information
      </Typography>
      <TableContainer
        component={Paper}
        elevation={2}
      >
        <Table>
          <TableBody>
            {Object.entries(
              userData
            ).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: "bold",
                    width: "30%",
                  }}
                >
                  {key}
                </TableCell>
                <TableCell>
                  {String(value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="warning"
          onClick={() =>
            setOpenDialog(true)
          }
        >
          Change Password
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
      >
        <DialogTitle>
          Change Password
        </DialogTitle>
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
            onClick={() =>
              setOpenDialog(false)
            }
          >
            Cancel
          </Button>
          <Button
            onClick={
              handleChangePassword
            }
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
      </Dialog>
    </Box>
  );
};
