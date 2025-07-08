import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { memo } from 'react';

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

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
          ...styling,
        }}
      >
        <Avatar src={avatar} alt={name} />

        <Typography
          variant="body1"
          noWrap
          sx={{
            flexGrow: 1,
            fontWeight: 500,
            color: "#4e342e",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "#fff",
            ":hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
