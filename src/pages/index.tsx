import type { NextPage } from "next";
import { Box, Grid, Link, Typography } from "@mui/material";
import LinkHref from "next/link";

const Name: NextPage = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            marginBottom: "15px",
          }}
        >
          <Typography className="h-700-50" variant="h1">
            Welcome
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "15px",
          }}
        >
          <Typography className="h-400-18 lh-23" paragraph={true}>
            I know it&apos;s not really necessery, <br />
            but I got 2 app version for you
          </Typography>
        </Box>
        <Box sx={{ marginBottom: "100px" }}>
          <Grid container spacing={2}>
            <Grid item>
              <Box>
                <LinkHref href={"/ssr"} passHref>
                  <Link
                    className="h-200-18 c-000000"
                    underline="hover"
                    sx={{ cursor: "pointer" }}
                  >
                    SSR Page
                  </Link>
                </LinkHref>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <LinkHref href={"/csr"} passHref>
                  <Link
                    className="h-200-18 c-000000"
                    underline="hover"
                    sx={{ cursor: "pointer" }}
                  >
                    CSR Page
                  </Link>
                </LinkHref>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography className="h-700-18" variant="h4">
            Enjoy your review.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Name;
