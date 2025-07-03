// import React from "react";
// import AppLayout from "../components/layout/AppLayout";
// import { Box, Typography } from "@mui/material";

// const Home = () => {
//   return (
//     <Box
//       bgcolor="#121212"
//       height="100%"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       flexDirection="column"
//       sx={{
//         color: "white",
//         borderRadius: "0.5rem",
//         border: "1px solid #222",
//         padding: "2rem",
//       }}
//     >
//       <Typography
//         variant="h4"
//         textAlign="center"
//         sx={{
//           background: "linear-gradient(90deg, #00A3FF, #0062cc)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//           fontWeight: "bold",
//           mb: "1rem",
//         }}
//       >
//         Welcome to ChatApp
//       </Typography>

//       <Typography variant="h6" textAlign="center" color="#bbb">
//         Select a friend to start chatting
//       </Typography>
//     </Box>
//   );
// };

// export default AppLayout()(Home);

import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      bgcolor="#f5efe6" // soft beige background
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      px={3}
    >
      <Box
        sx={{
          backgroundColor: "#fdf6f0", // lighter beige
          borderRadius: "1rem",
          padding: "3rem",
          boxShadow: "0 8px 24px rgba(101, 81, 58, 0.15)", // soft brown shadow
          border: "1px solid #e4d3c2",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            background: "linear-gradient(90deg, #b499c9, #d6c0ec)", // lavender gradient
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          ✨ Welcome to ChatApp
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#7a5c3e", // soft brown text
            fontSize: "1.1rem",
            mb: 1,
          }}
        >
          Cozy chats, beautiful vibes 
        </Typography>

        <Typography variant="body1" sx={{ color: "#8c7e72" }}>
          Select a friend from the sidebar and start a lovely conversation in
          this calming space.
        </Typography>
      </Box>
    </Box>
  );
};

export default AppLayout()(Home);
