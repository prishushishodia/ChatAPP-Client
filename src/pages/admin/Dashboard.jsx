// import {
//   AdminPanelSettings as AdminPanelSettingsIcon,
//   Group as GroupIcon,
//   Message as MessageIcon,
//   Notifications as NotificationsIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";
// import {
//   Box,
//   Container,
//   Paper,
//   Skeleton,
//   Stack,
//   Typography
// } from "@mui/material";
// import moment from "moment";
// import React from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import {
//   CurveButton,
//   SearchField,
// } from "../../components/styles/StyledComponent";
// import { matBlack } from "../../constants/colors";
// import { DoughnutChart, LineChart } from "../../components/specific/Charts";
// import { useErrors } from "../../hooks/hooks";
// import { useGetStatsQuery } from "../../redux/api/api";

// const Dashboard = () => {
//   const { loading, data, error, isError } = useGetStatsQuery('');
//   const { stats } = data || {};

//   useErrors([{ isError, error }]);

//   const Appbar = (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: "2rem",
//         margin: "2rem 0",
//         borderRadius: "1rem",
//         bgcolor: "#1e1e1e",
//         color: "#fff",
//       }}
//     >
//       <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
//         <AdminPanelSettingsIcon sx={{ fontSize: "3rem", color: "#00ADEF" }} />

//         <SearchField
//           placeholder="Search..."
//           sx={{
//             backgroundColor: "#333",
//             color: "#fff",
//             input: { color: "#fff" },
//           }}
//         />

//         <CurveButton sx={{ bgcolor: "#00ADEF", color: "#fff" }}>Search</CurveButton>

//         <Box flexGrow={1} />

//         <Typography
//           display={{ xs: "none", lg: "block" }}
//           sx={{ color: "#aaa", textAlign: "center" }}
//         >
//           {moment().format("dddd, D MMMM YYYY")}
//         </Typography>

//         <NotificationsIcon sx={{ color: "#fff" }} />
//       </Stack>
//     </Paper>
//   );

//   const Widgets = (
//     <Stack
//       direction={{ xs: "column", sm: "row" }}
//       spacing="2rem"
//       justifyContent="space-between"
//       alignItems={"center"}
//       margin={"2rem 0"}
//     >
//       <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon sx={{ color: "#00ADEF" }} />} />
//       <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<GroupIcon sx={{ color: "#00ADEF" }} />} />
//       <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MessageIcon sx={{ color: "#00ADEF" }} />} />
//     </Stack>
//   );

//   return (
//     <AdminLayout>
//       <div style={{ backgroundColor: "#121212", minHeight: "100vh", padding: "2rem", color: "#fff" }}>
//         {loading ? (
//           <Skeleton height={"100vh"} sx={{ bgcolor: "#1e1e1e" }} />
//         ) : (
//           <Container component={"main"}>
//             {Appbar}

//             <Stack
//               direction={{ xs: "column", md: "row" }}
//               flexWrap={"wrap"}
//               justifyContent={"center"}
//               alignItems={{ xs: "center", lg: "stretch" }}
//               sx={{ gap: "2rem" }}
//             >
//               <Paper
//                 elevation={3}
//                 sx={{
//                   padding: "2rem 3.5rem",
//                   borderRadius: "1rem",
//                   width: "100%",
//                   maxWidth: "45rem",
//                   bgcolor: "#1e1e1e",
//                   color: "#fff",
//                 }}
//               >
//                 <Typography margin={"2rem 0"} variant="h4" sx={{ color: "#00ADEF" }}>
//                   Last Messages
//                 </Typography>

//                 <LineChart value={stats?.messagesChart || []} />
//               </Paper>

//               <Paper
//                 elevation={3}
//                 sx={{
//                   padding: "1rem",
//                   borderRadius: "1rem",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   width: { xs: "100%", sm: "50%" },
//                   position: "relative",
//                   maxWidth: "25rem",
//                   bgcolor: "#1e1e1e",
//                   color: "#fff",
//                 }}
//               >
//                 <DoughnutChart
//                   labels={["Single Chats", "Group Chats"]}
//                   value={[
//                     stats?.totalChatsCount - stats?.groupsCount || 0,
//                     stats?.groupsCount || 0,
//                   ]}
//                 />

//                 <Stack
//                   position={"absolute"}
//                   direction={"row"}
//                   justifyContent={"center"}
//                   alignItems={"center"}
//                   spacing={"0.5rem"}
//                   width={"100%"}
//                   height={"100%"}
//                 >
//                   <GroupIcon sx={{ color: "#00ADEF" }} />
//                   <Typography>Vs</Typography>
//                   <PersonIcon sx={{ color: "#00ADEF" }} />
//                 </Stack>
//               </Paper>
//             </Stack>

//             {Widgets}
//           </Container>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };

// const Widget = ({ title, value, Icon }) => (
//   <Paper
//     elevation={3}
//     sx={{
//       padding: "2rem",
//       margin: "2rem 0",
//       borderRadius: "1.5rem",
//       width: "20rem",
//       bgcolor: "#1e1e1e",
//       color: "#fff",
//     }}
//   >
//     <Stack alignItems={"center"} spacing={"1rem"}>
//       <Typography
//         sx={{
//           color: "#fff",
//           borderRadius: "50%",
//           border: `5px solid ${matBlack}`,
//           width: "5rem",
//           height: "5rem",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           fontSize: "1.2rem",
//         }}
//       >
//         {value}
//       </Typography>
//       <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
//         {Icon}
//         <Typography sx={{ color: "#00ADEF" }}>{title}</Typography>
//       </Stack>
//     </Stack>
//   </Paper>
// );

// export default Dashboard;

import React, { useEffect } from "react";
import { useInputValidation } from "6pp";
import {
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunk/admin";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={12}
          sx={{
            padding: "2.5rem",
            borderRadius: "1.5rem",
            background: "rgba(30, 30, 30, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0, 173, 239, 0.15)",
            color: "#fff",
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(90deg, #00ADEF, #00ffe0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Admin Login
            </Typography>

            <Divider sx={{ width: "100%", borderColor: "#333" }} />

            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <TextField
                required
                fullWidth
                margin="normal"
                label="Secret Key"
                type="password"
                variant="outlined"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
                InputProps={{
                  style: {
                    color: "#fefefe",
                    backgroundColor: "#1f1f1f",
                    borderRadius: "0.75rem",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#aaa" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#333" },
                    "&:hover fieldset": { borderColor: "#00ADEF" },
                    "&.Mui-focused fieldset": { borderColor: "#00ADEF" },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1rem",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: "0.75rem",
                  background: "linear-gradient(90deg, #00ADEF, #007bbd)",
                  color: "white",
                  transition: "0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 173, 239, 0.3)",
                  ":hover": {
                    transform: "scale(1.02)",
                    background: "linear-gradient(90deg, #007bbd, #005f99)",
                    boxShadow: "0 6px 18px rgba(0, 173, 239, 0.4)",
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
