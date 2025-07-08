import React, { memo } from "react";
import {
  Avatar,
  Button,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { transformImage } from "../../lib/features";

const NotificationItem = ({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem disableGutters>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        width="100%"
        padding="0.75rem 1rem"
        borderRadius="1rem"
        sx={{
          backgroundColor: "#fff8f0",
          boxShadow: "0 4px 12px rgba(101, 81, 58, 0.1)",
          color: "#4e342e",
          transition: "background 0.3s",
          "&:hover": {
            backgroundColor: "#f3e5d4",
          },
        }}
      >
        <Avatar src={transformImage(avatar)} alt={name} />

        <Typography
          variant="body1"
          noWrap
          sx={{
            flexGrow: 1,
            fontWeight: 500,
            color: "#4e342e",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>

        <Stack direction="column" spacing={1}>
          <Button
            size="small"
            variant="contained"
            onClick={() => handler({ _id, accept: true })}
            sx={{
              background: "linear-gradient(90deg, #b499c9, #e9d5ff)",
              color: "#fff",
              fontWeight: 500,
              borderRadius: "0.5rem",
              ":hover": {
                background: "linear-gradient(90deg, #a27cbf, #dcb9ff)",
              },
            }}
          >
            Accept
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handler({ _id, accept: false })}
            sx={{
              fontWeight: 500,
              borderRadius: "0.5rem",
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default memo(NotificationItem);
