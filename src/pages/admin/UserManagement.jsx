import { Avatar, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hooks";
import { transformImage } from "../../lib/features";
import { useGetUserStatsQuery } from "../../redux/api/api";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const { loading, data, error, isError } = useGetUserStatsQuery("");

  useErrors([{ isError, error }]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
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
            heading={"All Users"}
            columns={columns}
            rows={rows}
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

export default UserManagement;
