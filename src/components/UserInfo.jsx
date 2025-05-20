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
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export const UserInfo = () => {
  const {
    userData,
    loading,
    error,
    refreshUserData,
  } = useAuth();

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
    </Box>
  );
};
