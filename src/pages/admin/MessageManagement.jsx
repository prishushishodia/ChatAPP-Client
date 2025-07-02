import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachments";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hooks";
import { fileFormat, transformImage } from "../../lib/features";
import { useGetMessagesStatsQuery } from "../../redux/api/api";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i, index) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "#00ADEF",
                    textDecoration: "underline",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : <span style={{ color: "#aaa" }}>No Attachments</span>;
    },
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span style={{ color: "#fff" }}>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {
  const { loading, data, error, isError } = useGetMessagesStatsQuery('');

  useErrors([{ isError, error }]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.messages.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: transformImage(i.sender.avatar, 50),
          },
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      <div style={{ backgroundColor: "#121212", minHeight: "100vh", padding: "2rem", color: "#fff" }}>
        {loading ? (
          <Skeleton height={"100vh"} sx={{ bgcolor: "#1e1e1e" }} />
        ) : (
          <Table
            heading={"All Messages"}
            columns={columns}
            rows={rows}
            rowHeight={200}
            sx={{
              bgcolor: "#1e1e1e",
              color: "#fff",
              borderRadius: "1rem",
              padding: "1rem",
              "& .table-header": {
                color: "#00ADEF",
              },
              "& .MuiTableCell-root": {
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default MessageManagement;
