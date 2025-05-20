import {
  AccessTime,
  BusinessCenter,
  Email,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export const Contacts = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
        >
          Contact Us
        </Typography>

        <Paper
          elevation={3}
          sx={{ p: 4, mt: 4 }}
        >
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Company Information
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <BusinessCenter
                  sx={{
                    mr: 2,
                    color:
                      "primary.main",
                  }}
                />
                <Typography>
                  Devlop Freight
                  Quotation Platform
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <LocationOn
                  sx={{
                    mr: 2,
                    color:
                      "primary.main",
                  }}
                />
                <Typography>
                  Insert correct company
                  address here
                </Typography>
              </Box>
            </Grid>

            {/* Contact Details */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Contact Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Email
                  sx={{
                    mr: 2,
                    color:
                      "primary.main",
                  }}
                />
                <Link
                  href="mailto:inseriremaildevlop@devlop.com"
                  underline="hover"
                >
                  inseriremaildevlop@devlop.com
                </Link>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Phone
                  sx={{
                    mr: 2,
                    color:
                      "primary.main",
                  }}
                />
                <Link
                  href="tel:+351123456789"
                  underline="hover"
                >
                  +351 123456789
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Business hours */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Business Hours
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems:
                    "flex-start",
                  mt: 2,
                }}
              >
                <AccessTime
                  sx={{
                    mr: 2,
                    color:
                      "primary.main",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: 1,
                  }}
                >
                  <Typography>
                    Monday to Friday:
                    9:00 AM - 6:00 PM
                  </Typography>
                  <Typography>
                    Saturday: 10:00 AM -
                    4:00 PM
                  </Typography>
                  <Typography>
                    Sunday: Closed
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};
