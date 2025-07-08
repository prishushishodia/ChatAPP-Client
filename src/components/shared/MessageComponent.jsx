import { Box, Typography } from '@mui/material';
import React, { memo } from 'react';
import { lightBlue } from '../../constants/colors';
import moment from 'moment';
import { fileFormat } from '../../lib/features';
import RenderAttachments from './RenderAttachments';
import { motion } from 'framer-motion';

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const timeAgo = moment(createdAt).fromNow();
  const sameSender = sender?._id === user?._id;

  return (
    <motion.div
      initial={{ opacity: 0, x: sameSender ? "50%" : "-50%" }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        alignSelf: sameSender ? 'flex-end' : 'flex-start',
        backgroundColor: sameSender ? '#2196F3' : '#1e1e2f',
        color: sameSender ? 'white' : '#d1d1d1',
        borderRadius: '1rem',
        padding: '0.75rem 1rem',
        marginBottom: '0.75rem',
        maxWidth: '75%',
        wordBreak: 'break-word',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      {/* Show sender's name if it's not the same user */}
      {!sameSender && (
        <Typography
          color={lightBlue}
          fontWeight="600"
          variant="caption"
          sx={{ marginBottom: '0.25rem' }}
        >
          {sender.name}
        </Typography>
      )}

      {/* Message text content */}
      {content && (
        <Typography
          variant="body1"
          sx={{ color: sameSender ? "#fff" : "#e0e0e0", marginBottom: attachments.length > 0 ? "0.5rem" : 0 }}
        >
          {content}
        </Typography>
      )}

      {/* Attachments */}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index} sx={{ marginTop: 0.5 }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                download
                style={{ color: sameSender ? "#fff" : "#c5c5c5", textDecoration: "underline" }}
              >
                {RenderAttachments(file, url)}
              </a>
            </Box>
          );
        })}

      {/* Time */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "right",
          marginTop: "0.5rem",
          color: sameSender ? "#cbe6ff" : "#999",
          fontSize: "0.7rem",
        }}
      >
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
