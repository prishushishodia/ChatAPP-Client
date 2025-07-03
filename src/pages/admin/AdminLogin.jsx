// import React, { useEffect } from "react";
// import { useInputValidation } from "6pp";
// import {
//   Container,
//   Paper,
//   Stack,
//   Typography,
//   TextField,
//   Button,
// } from "@mui/material";
// import { Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { adminLogin, getAdmin } from "../../redux/thunk/admin";

// const AdminLogin = () => {
//   const { isAdmin } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const secretKey = useInputValidation("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(adminLogin(secretKey.value));
//   };

//   useEffect(() => {
//     dispatch(getAdmin());
//   }, [dispatch]);

//   if (isAdmin) return <Navigate to="/admin/dashboard" />;

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#121212",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Container maxWidth="xs">
//         <Paper
//           elevation={4}
//           sx={{
//             p: 4,
//             borderRadius: 3,
//             backgroundColor: "#1e1e1e",
//             boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)",
//           }}
//         >
//           <Stack spacing={3} alignItems="center">
//             <Typography
//               variant="h4"
//               fontWeight="bold"
//               color="#00ADEF"
//               textAlign="center"
//             >
//               Admin Login
//             </Typography>

//             <form onSubmit={handleLogin} style={{ width: "100%" }}>
//               <TextField
//                 required
//                 fullWidth
//                 margin="normal"
//                 label="Secret Key"
//                 type="password"
//                 variant="outlined"
//                 value={secretKey.value}
//                 onChange={secretKey.changeHandler}
//                 InputProps={{
//                   style: { color: "#fff" },
//                 }}
//                 InputLabelProps={{
//                   style: { color: "#888" },
//                 }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#333" },
//                     "&:hover fieldset": { borderColor: "#00ADEF" },
//                     "&.Mui-focused fieldset": { borderColor: "#00ADEF" },
//                   },
//                 }}
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 2,
//                   backgroundColor: "#00ADEF",
//                   color: "#fff",
//                   fontWeight: "bold",
//                   ":hover": {
//                     backgroundColor: "#007bbd",
//                   },
//                 }}
//               >
//                 Login
//               </Button>
//             </form>
//           </Stack>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default AdminLogin;

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
        background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: "2.5rem",
            borderRadius: "1.5rem",
            background: "#1e1e1e",
            border: "1px solid #2e2e2e",
            boxShadow: "0 8px 32px rgba(0, 173, 239, 0.2)",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(90deg, #00ADEF, #007bbd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Admin Login
            </Typography>

            <Divider
              sx={{
                width: "100%",
                borderColor: "#444",
              }}
            />

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
                  style: { color: "#fefefe" },
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
                  py: 1.2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: "0.75rem",
                  background: "linear-gradient(90deg, #00ADEF, #007bbd)",
                  color: "white",
                  boxShadow: "0 4px 10px rgba(0, 173, 239, 0.2)",
                  ":hover": {
                    background: "linear-gradient(90deg, #007bbd, #005f99)",
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

