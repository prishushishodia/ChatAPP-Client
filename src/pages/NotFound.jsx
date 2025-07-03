// import React from "react";
// import { Error as ErrorIcon } from "@mui/icons-material";
// import { Container, Stack, Typography } from "@mui/material";
// import { Link } from "react-router-dom";

// const NotFound = () => {
//   return (
//     <Container maxWidth="lg" sx={{ height: "100vh" }}>
//       <Stack
//         alignItems={"center"}
//         spacing={"2rem"}
//         justifyContent={"center"}
//         height="100%"
//       >
//         <ErrorIcon sx={{ fontSize: "10rem" }} />
//         <Typography variant="h1">404</Typography>
//         <Typography variant="h3">Not Found</Typography>
//         <Link to="/">Go back to home</Link>
//       </Stack>
//     </Container>
//   );
// };

// export default NotFound;

import React from "react";
import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #f3e8dc, #e9d5ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        alignItems="center"
        spacing={3}
        justifyContent="center"
        textAlign="center"
        sx={{
          padding: 4,
          borderRadius: "1.5rem",
          backgroundColor: "#fff8f0",
          boxShadow: "0 8px 24px rgba(101, 81, 58, 0.15)",
          border: "1px solid #e4cfc1",
        }}
      >
        <ErrorIcon sx={{ fontSize: "8rem", color: "#a1887f" }} />
        <Typography variant="h1" sx={{ color: "#5d4037", fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ color: "#7b5e57" }}>
          Oops! Page Not Found
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            mt: 2,
            background: "linear-gradient(90deg, #b499c9, #e9d5ff)",
            color: "#4e342e",
            fontWeight: "bold",
            paddingX: 3,
            paddingY: 1,
            borderRadius: "0.75rem",
            textTransform: "none",
            ":hover": {
              background: "linear-gradient(90deg, #a27cbf, #dcb9ff)",
            },
          }}
        >
          Go back to Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
