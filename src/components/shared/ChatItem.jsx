import { Box, Typography } from "@mui/material";
import { Link } from "../styles/StyledComponent";
import Stack from "@mui/material/Stack";
import { memo } from "react";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      sx={{
        display: "block",
        textDecoration: "none",
      }}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * index }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: sameSender ? "#1a1a2e" : "transparent",
          color: "#e0e0e0",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid #2c2c3a",
          cursor: "pointer",
          position: "relative",
          transition: "background-color 0.3s ease",
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack spacing={0.3}>
          <Typography fontWeight="bold" color="#ffffff">
            {name}
          </Typography>

          {newMessageAlert && (
            <Typography variant="caption" color="#2196F3">
              {newMessageAlert.count} New Message{newMessageAlert.count > 1 && "s"}
            </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#00FF00",
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
