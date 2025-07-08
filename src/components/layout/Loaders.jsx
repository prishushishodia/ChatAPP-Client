import React from "react";
import { Skeleton, Stack, Grid } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponent"; // Make sure this is styled with keyframes

// Loader for full layout — when chats/groups are still loading
const LayoutLoader = () => {
  return (
    <Grid
      container
      height="calc(100vh - 4rem)"
      spacing={2}
      sx={{ bgcolor: "#0F0F1A" }} // darkest background
    >
      {/* Left Sidebar Skeleton */}
      <Grid
        item
        sm={4}
        md={3}
        sx={{ display: { xs: "none", sm: "block" } }}
        height="100%"
      >
        <Skeleton
          variant="rectangular"
          height="100%"
          sx={{ bgcolor: "#1A1A2E", borderRadius: 0 }}
        />
      </Grid>

      {/* Chat Window Skeleton */}
      <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
        <Stack spacing={2} sx={{ p: 2 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height="4.5rem"
              sx={{ bgcolor: "#1A1A2E", borderRadius: "0.75rem" }}
            />
          ))}
        </Stack>
      </Grid>

      {/* Right Sidebar Skeleton */}
      <Grid
        item
        md={4}
        lg={3}
        sx={{ display: { xs: "none", md: "block" } }}
        height="100%"
      >
        <Skeleton
          variant="rectangular"
          height="100%"
          sx={{ bgcolor: "#1A1A2E", borderRadius: 0 }}
        />
      </Grid>
    </Grid>
  );
};

// Loader shown when someone is typing
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
          width={12}
          height={12}
          sx={{
            bgcolor: "#2196F3", // Blue dot
            animationDelay: `${0.1 + index * 0.15}s`,
          }}
        />
      ))}
    </Stack>
  );
};

export default LayoutLoader;
export { TypingLoader };
