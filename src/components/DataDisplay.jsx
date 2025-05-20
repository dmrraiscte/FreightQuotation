import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { createClaimsTable } from "../utils/claimUtils";

import "../styles/App.css";

export const IdTokenData = (props) => {
  // Add null check for idTokenClaims
  if (!props.idTokenClaims) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>
          Loading user data...
        </Typography>
      </Box>
    );
  }

  const tokenClaims = createClaimsTable(
    props.idTokenClaims
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography paragraph>
        See below the claims in your{" "}
        <Typography
          component="strong"
          fontWeight="bold"
        >
          ID token
        </Typography>
        . For more information, visit:{" "}
        <Link
          href="https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token"
          target="_blank"
          rel="noopener noreferrer"
        >
          docs.microsoft.com
        </Link>
      </Typography>

      <TableContainer
        component={Paper}
        elevation={2}
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="claims table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                Claim
              </TableCell>
              <TableCell>
                Value
              </TableCell>
              <TableCell>
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(
              tokenClaims
            ).map((key) => (
              <TableRow
                key={key}
                sx={{
                  "&:last-child td, &:last-child th":
                    { border: 0 },
                }}
              >
                {tokenClaims[key].map(
                  (claimItem) => (
                    <TableCell
                      key={claimItem}
                    >
                      {claimItem}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
