import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      bgcolor="#121212"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{
        color: "white",
        borderRadius: "0.5rem",
        border: "1px solid #222",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          background: "linear-gradient(90deg, #00A3FF, #0062cc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          mb: "1rem",
        }}
      >
        Welcome to ChatApp
      </Typography>

      <Typography variant="h6" textAlign="center" color="#bbb">
        Select a friend to start chatting
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
