import React from 'react';
import { Stack } from "@mui/material";
import ChatItem from '../shared/ChatItem';

export const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction="column"
      overflow="auto"
      height="100%"
      sx={{
        bgcolor: "#0F0F1A", // deep navy background
        paddingY: "0.5rem",
        paddingX: "0.25rem",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#444",
          borderRadius: "4px",
        },
      }}
    >
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find((item) => item.chatId === _id);
        const isOnline = members?.some((member) => onlineUsers.includes(member));

        return (
          <ChatItem
            key={_id}
            index={index}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            isOnline={isOnline}
            newMessageAlert={newMessageAlert}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};
