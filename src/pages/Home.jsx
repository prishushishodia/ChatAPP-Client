import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      bgcolor="#111B21" // WhatsApp dark background
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      px={3}
    >
      <Box
        sx={{
          backgroundColor: "#202C33", // Chat bubble background
          borderRadius: "1rem",
          padding: "3rem",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // dark shadow
          border: "1px solid #2A3942",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            background: "linear-gradient(90deg, #00A884, #25D366)", // WhatsApp green gradient
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          👋 Welcome to Dribble <p>Real Time Chatting Application</p> 
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#E9EDEF", // WhatsApp text
            fontSize: "1.1rem",
            mb: 1,
          }}
        >
          Simple. Secure. Reliable messaging.
        </Typography>

        <Typography variant="body1" sx={{ color: "#8696A0" }}>
          Choose a conversation from the sidebar or start a new one. Your chats are end-to-end encrypted and always in sync.
        </Typography>
      </Box>
    </Box>
  );
};

export default AppLayout()(Home);
