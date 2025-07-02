import React from "react";
import { Skeleton, Stack, Grid } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponent"; // Assuming your bounce styles are defined here

// Layout Loader (Skeleton Layout Placeholder)
const LayoutLoader = () => {
  return (
    <Grid container height="calc(100vh - 4rem)" spacing={2} sx={{ bgcolor: "#0F0F1A" }}>
      
      {/* Left Sidebar */}
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height="100%"
      >
        <Skeleton
          variant="rectangular"
          height="100vh"
          sx={{ bgcolor: "#1A1A2E" }}
        />
      </Grid>

      {/* Chat Area */}
      <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
        <Stack spacing={2} sx={{ p: 2 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height="5rem"
              sx={{ bgcolor: "#1A1A2E" }}
            />
          ))}
        </Stack>
      </Grid>

      {/* Right Sidebar */}
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
        height="100%"
      >
        <Skeleton
          variant="rectangular"
          height="100vh"
          sx={{ bgcolor: "#1A1A2E" }}
        />
      </Grid>

    </Grid>
  );
};

// Typing Loader (Bouncing Dots for Chat)
const TypingLoader = () => {
  return (
    <Stack
      spacing={0.5}
      direction="row"
      p={0.5}
      justifyContent="center"
      alignItems="center"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <BouncingSkeleton
          key={index}
          variant="circular"
          width={15}
          height={15}
          sx={{
            bgcolor: "#2196F3", // Blue dots
            animationDelay: `${0.1 + index * 0.15}s`,
          }}
        />
      ))}
    </Stack>
  );
};

export default LayoutLoader;
export { TypingLoader };
