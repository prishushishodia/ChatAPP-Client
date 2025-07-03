// import React, { useState } from 'react';
// import { useFileHandler, useInputValidation } from "6pp";
// import { Container, Avatar, IconButton, Paper, Stack, Typography, TextField, Button } from '@mui/material';
// import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
// import { VisuallyHiddenInput } from '../components/styles/StyledComponent.jsx';
// import { usernameValidator } from '../utils/validators.js';
// import { useDispatch } from 'react-redux';
// import axios from "axios";
// import { server } from '../constants/config';
// import toast from "react-hot-toast";
// import { userExists } from "../redux/reducers/auth.js";

// function Login() {

//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const toggleLogin = () => setIsLogin(prev => !prev);

//   const name = useInputValidation("");
//   const bio = useInputValidation("");
//   const username = useInputValidation("", usernameValidator);
//   const password = useInputValidation("");

//   const avatar = useFileHandler("single", 100);
//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Logging In...");

//     const config = {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" }
//     };

//     try {
//       const { data } = await axios.post(`${server}/api/v1/user/login`, { username: username.value, password: password.value }, config);
//       dispatch(userExists(data.user));
//       toast.success(data.message, { id: toastId });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Signing Up...");

//     const config = {
//       withCredentials: true,
//       headers: { "Content-Type": "multipart/form-data" }
//     };

//     const formData = new FormData();
//     formData.append("avatar", avatar.file);
//     formData.append("name", name.value);
//     formData.append("bio", bio.value);
//     formData.append("username", username.value);
//     formData.append("password", password.value);

//     try {
//       const { data } = await axios.post(`${server}/api/v1/user/newuser`, formData, config);
//       dispatch(userExists(data.user));
//       toast.success(data.message, { id: toastId });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: "2rem"
//     }}>
//       <Container maxWidth="xs">
//         <Paper elevation={6} sx={{
//           padding: 4,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           backdropFilter: "blur(10px)",
//           background: "rgba(30, 30, 30, 0.85)",
//           borderRadius: "1rem",
//           width: "100%"
//         }}>
//           <Typography variant="h4" sx={{ mb: 2, color: "#00A3FF", fontWeight: "bold" }}>
//             {isLogin ? "Login" : "Sign Up"}
//           </Typography>

//           {isLogin ? (
//             <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin}>
//               <TextField
//                 required
//                 fullWidth
//                 margin="normal"
//                 label="Username"
//                 variant="outlined"
//                 value={username.value}
//                 onChange={username.changeHandler}
//                 InputProps={{ sx: { color: "white", background: "#1a1a1a" } }}
//                 InputLabelProps={{ sx: { color: "#999" } }}
//               />
//               <TextField
//                 required
//                 fullWidth
//                 margin="normal"
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 value={password.value}
//                 onChange={password.changeHandler}
//                 InputProps={{ sx: { color: "white", background: "#1a1a1a" } }}
//                 InputLabelProps={{ sx: { color: "#999" } }}
//               />
//               <Button
//                 sx={{
//                   marginTop: 2,
//                   background: "linear-gradient(90deg, #00A3FF, #0062cc)",
//                   color: "white",
//                   fontWeight: "bold",
//                   ":hover": { opacity: 0.9 }
//                 }}
//                 variant="contained"
//                 fullWidth
//                 disabled={isLoading}
//                 type="submit"
//               >
//                 Login
//               </Button>

//               <Typography textAlign="center" m="1.5rem" color="#999">
//                 OR
//               </Typography>

//               <Button variant="text" fullWidth onClick={toggleLogin} disabled={isLoading} sx={{ color: "#00A3FF" }}>
//                 Sign Up Instead
//               </Button>
//             </form>
//           ) : (
//             <>
//               <Stack position="relative" width="10rem" margin="auto">
//                 <Avatar sx={{ width: "10rem", height: "10rem", objectFit: "contain" }} src={avatar.preview} />
//                 <IconButton
//                   sx={{
//                     position: "absolute",
//                     bottom: "0",
//                     right: "0",
//                     color: "white",
//                     bgcolor: "rgba(0,0,0,0.5)",
//                     ":hover": { bgcolor: "rgba(0,0,0,0.7)" }
//                   }}
//                   component="label"
//                 >
//                   <CameraAltIcon />
//                   <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
//                 </IconButton>
//               </Stack>
//               {avatar.error && (
//                 <Typography m="1rem auto" width="fit-content" display="block" color="error" variant="caption">
//                   {avatar.error}
//                 </Typography>
//               )}

//               <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleSignUp}>
//                 <TextField
//                   required
//                   fullWidth
//                   margin="normal"
//                   label="Name"
//                   variant="outlined"
//                   value={name.value}
//                   onChange={name.changeHandler}
//                   InputProps={{ sx: { color: "white", background: "#1a1a1a" } }}
//                   InputLabelProps={{ sx: { color: "#999" } }}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   margin="normal"
//                   label="Bio"
//                   variant="outlined"
//                   value={bio.value}
//                   onChange={bio.changeHandler}
//                   InputProps={{ sx: { color: "white", background: "#1a1a1a" } }}
//                   InputLabelProps={{ sx: { color: "#999" } }}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   margin="normal"
//                   label="Username"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                   InputProps={{ sx: { color: "white", background: "#1a1a1a" } }}
//                   InputLabelProps={{ sx: { color: "#999" } }}
//                 />
//                 {username.error && (
//                   <Typography color="error" variant="caption">
//                     {username.error}
//                   </Typography>
//                 )}
//                 <TextField
//                   required
//                   fullWidth
//                   margin="normal"
//                   label="Password"
//                   type="password"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                   InputProps={{ sx: { color: "white", background: "#1a1a1a" } }}
//                   InputLabelProps={{ sx: { color: "#999" } }}
//                 />

//                 <Button
//                   sx={{
//                     marginTop: 2,
//                     background: "linear-gradient(90deg, #00A3FF, #0062cc)",
//                     color: "white",
//                     fontWeight: "bold",
//                     ":hover": { opacity: 0.9 }
//                   }}
//                   variant="contained"
//                   fullWidth
//                   disabled={isLoading}
//                   type="submit"
//                 >
//                   Sign Up
//                 </Button>

//                 <Typography textAlign="center" m="1.5rem" color="#999">
//                   OR
//                 </Typography>

//                 <Button variant="text" fullWidth onClick={toggleLogin} disabled={isLoading} sx={{ color: "#00A3FF" }}>
//                   Login Instead
//                 </Button>
//               </form>
//             </>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from 'react';
// import { useFileHandler, useInputValidation } from "6pp";
// import { Container, Avatar, IconButton, Paper, Stack, Typography, TextField, Button } from '@mui/material';
// import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
// import { VisuallyHiddenInput } from '../components/styles/StyledComponent.jsx';
// import { usernameValidator } from '../utils/validators.js';
// import { useDispatch } from 'react-redux';
// import axios from "axios";
// import { server } from '../constants/config';
// import toast from "react-hot-toast";
// import { userExists } from "../redux/reducers/auth.js";

// function Login() {

//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const toggleLogin = () => setIsLogin(prev => !prev);

//   const name = useInputValidation("");
//   const bio = useInputValidation("");
//   const username = useInputValidation("", usernameValidator);
//   const password = useInputValidation("");

//   const avatar = useFileHandler("single", 100);
//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Logging In...");
//     const config = {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" }
//     };

//     try {
//       const { data } = await axios.post(`${server}/api/v1/user/login`, { username: username.value, password: password.value }, config);
//       dispatch(userExists(data.user));
//       toast.success(data.message, { id: toastId });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Signing Up...");
//     const config = {
//       withCredentials: true,
//       headers: { "Content-Type": "multipart/form-data" }
//     };

//     const formData = new FormData();
//     formData.append("avatar", avatar.file);
//     formData.append("name", name.value);
//     formData.append("bio", bio.value);
//     formData.append("username", username.value);
//     formData.append("password", password.value);

//     try {
//       const { data } = await axios.post(`${server}/api/v1/user/newuser`, formData, config);
//       dispatch(userExists(data.user));
//       toast.success(data.message, { id: toastId });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #f3e8dc, #e9d5ff)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: "2rem"
//     }}>
//       <Container maxWidth="xs">
//         <Paper elevation={6} sx={{
//           padding: 4,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           background: "#fff8f0",
//           borderRadius: "1.5rem",
//           border: "1px solid #e4cfc1",
//           boxShadow: "0 12px 32px rgba(101, 81, 58, 0.1)",
//         }}>
//           <Typography variant="h4" sx={{
//             mb: 2,
//             fontWeight: "bold",
//             color: "#7a5c3e",
//           }}>
//             {isLogin ? "Welcome Back 👋" : "Create Your Account"}
//           </Typography>

//           {isLogin ? (
//             <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin}>
//               <TextField
//                 required
//                 fullWidth
//                 margin="normal"
//                 label="Username"
//                 variant="outlined"
//                 value={username.value}
//                 onChange={username.changeHandler}
//                 InputProps={{ sx: { background: "#fef6f2", color: "#5c4438" } }}
//                 InputLabelProps={{ sx: { color: "#a58f7e" } }}
//               />
//               <TextField
//                 required
//                 fullWidth
//                 margin="normal"
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 value={password.value}
//                 onChange={password.changeHandler}
//                 InputProps={{ sx: { background: "#fef6f2", color: "#5c4438" } }}
//                 InputLabelProps={{ sx: { color: "#a58f7e" } }}
//               />
//               <Button
//                 sx={{
//                   marginTop: 2,
//                   background: "linear-gradient(90deg, #b499c9, #e9d5ff)",
//                   color: "white",
//                   fontWeight: "bold",
//                   ":hover": { opacity: 0.9 }
//                 }}
//                 variant="contained"
//                 fullWidth
//                 disabled={isLoading}
//                 type="submit"
//               >
//                 Login
//               </Button>

//               <Typography textAlign="center" m="1.5rem" color="#a58f7e">
//                 OR
//               </Typography>

//               <Button variant="text" fullWidth onClick={toggleLogin} disabled={isLoading} sx={{ color: "#7a5c3e" }}>
//                 Sign Up Instead
//               </Button>
//             </form>
//           ) : (
//             <>
//               <Stack position="relative" width="10rem" margin="auto">
//                 <Avatar sx={{ width: "10rem", height: "10rem", objectFit: "contain" }} src={avatar.preview} />
//                 <IconButton
//                   sx={{
//                     position: "absolute",
//                     bottom: "0",
//                     right: "0",
//                     color: "white",
//                     bgcolor: "#7a5c3e",
//                     ":hover": { bgcolor: "#5c4438" }
//                   }}
//                   component="label"
//                 >
//                   <CameraAltIcon />
//                   <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
//                 </IconButton>
//               </Stack>
//               {avatar.error && (
//                 <Typography m="1rem auto" width="fit-content" display="block" color="error" variant="caption">
//                   {avatar.error}
//                 </Typography>
//               )}

//               <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleSignUp}>
//                 <TextField
//                   required
//                   fullWidth
//                   margin="normal"
//                   label="Name"
//                   variant="outlined"
//                   value={name.value}
//                   onChange={name.changeHandler}
//                   InputProps={{ sx: { background: "#fef6f2", color: "#5c4438" } }}
//                   InputLabelProps={{ sx: { color: "#a58f7e" } }}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   margin="normal"
//                   label="Bio"
//                   variant="outlined"
//                   value={bio.value}
//                   onChange={bio.changeHandler}
//                   InputProps={{ sx: { background: "#fef6f2", color: "#5c4438" } }}
//                   InputLabelProps={{ sx: { color: "#a58f7e" } }}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   margin="normal"
//                   label="Username"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                   InputProps={{ sx: { background: "#fef6f2", color: "#5c4438" } }}
//                   InputLabelProps={{ sx: { color: "#a58f7e" } }}
//                 />
//                 {username.error && (
//                   <Typography color="error" variant="caption">
//                     {username.error}
//                   </Typography>
//                 )}
//                 <TextField
//                   required
//                   fullWidth
//                   margin="normal"
//                   label="Password"
//                   type="password"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                   InputProps={{ sx: { background: "#fef6f2", color: "#5c4438" } }}
//                   InputLabelProps={{ sx: { color: "#a58f7e" } }}
//                 />

//                 <Button
//                   sx={{
//                     marginTop: 2,
//                     background: "linear-gradient(90deg, #b499c9, #e9d5ff)",
//                     color: "white",
//                     fontWeight: "bold",
//                     ":hover": { opacity: 0.9 }
//                   }}
//                   variant="contained"
//                   fullWidth
//                   disabled={isLoading}
//                   type="submit"
//                 >
//                   Sign Up
//                 </Button>

//                 <Typography textAlign="center" m="1.5rem" color="#a58f7e">
//                   OR
//                 </Typography>

//                 <Button variant="text" fullWidth onClick={toggleLogin} disabled={isLoading} sx={{ color: "#7a5c3e" }}>
//                   Login Instead
//                 </Button>
//               </form>
//             </>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useFileHandler, useInputValidation } from "6pp";
import {
  Container,
  Avatar,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
  Button
} from '@mui/material';
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from '../components/styles/StyledComponent.jsx';
import { usernameValidator } from '../utils/validators.js';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { server } from '../constants/config';
import toast from "react-hot-toast";
import { userExists } from "../redux/reducers/auth.js";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toggleLogin = () => setIsLogin(prev => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single", 100);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    };

    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, { username: username.value, password: password.value }, config);
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing Up...");
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" }
    };

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/newuser`, formData, config);
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,rgb(241, 221, 211),rgb(10, 4, 2))",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem"
    }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "1.5rem",
          border: "1px solid rgba(48, 42, 42, 0.1)",
          background: "rgba(238, 222, 203, 0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
        }}>
          <Typography variant="h4" sx={{
            mb: 2,
            fontWeight: "600",
            fontFamily: "'Segoe UI', sans-serif",
            color: "#5c4438"
          }}>
            {isLogin ? "LOGIN " : "Create Your Account"}
          </Typography>

          {isLogin ? (
            <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin}>
              <TextField
                required
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
                InputProps={{ sx: { background: "#fef6f2", color: "#5c4438", borderRadius: "0.5rem" } }}
                InputLabelProps={{ sx: { color: "#a58f7e" } }}
              />
              <TextField
                required
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
                InputProps={{ sx: { background: "#fef6f2", color: "#5c4438", borderRadius: "0.5rem" } }}
                InputLabelProps={{ sx: { color: "#a58f7e" } }}
              />
              <Button
                sx={{
                  marginTop: 2,
                  background: "linear-gradient(90deg, #b499c9, #e9d5ff)",
                  color: "#4e3a2e",
                  fontWeight: "bold",
                  borderRadius: "0.5rem",
                  ":hover": {
                    background: "linear-gradient(90deg,rgb(21, 6, 32), #d8c3f3)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                  }
                }}
                variant="contained"
                fullWidth
                disabled={isLoading}
                type="submit"
              >
                Login
              </Button>

              <Typography textAlign="center" m="1.5rem" color="#a58f7e">
                OR
              </Typography>

              <Button variant="text" fullWidth onClick={toggleLogin} disabled={isLoading} sx={{ color: "#7a5c3e" }}>
                Sign Up 
              </Button>
            </form>
          ) : (
            <>
              <Stack position="relative" width="10rem" margin="auto">
                <Avatar sx={{ width: "10rem", height: "10rem", objectFit: "contain" }} src={avatar.preview} />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    bgcolor: "#7a5c3e",
                    ":hover": { bgcolor: "#5c4438" }
                  }}
                  component="label"
                >
                  <CameraAltIcon />
                  <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                </IconButton>
              </Stack>
              {avatar.error && (
                <Typography m="1rem auto" width="fit-content" display="block" color="error" variant="caption">
                  {avatar.error}
                </Typography>
              )}

              <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleSignUp}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Name"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                  InputProps={{ sx: { background: "#fef6f2", color: "#5c4438", borderRadius: "0.5rem" } }}
                  InputLabelProps={{ sx: { color: "#a58f7e" } }}
                />
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Bio"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  InputProps={{ sx: { background: "#fef6f2", color: "#5c4438", borderRadius: "0.5rem" } }}
                  InputLabelProps={{ sx: { color: "#a58f7e" } }}
                />
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  InputProps={{ sx: { background: "#fef6f2", color: "#5c4438", borderRadius: "0.5rem" } }}
                  InputLabelProps={{ sx: { color: "#a58f7e" } }}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputProps={{ sx: { background: "#fef6f2", color: "#5c4438", borderRadius: "0.5rem" } }}
                  InputLabelProps={{ sx: { color: "#a58f7e" } }}
                />

                <Button
                  sx={{
                    marginTop: 2,
                    background: "linear-gradient(90deg, #b499c9, #e9d5ff)",
                    color: "#4e3a2e",
                    fontWeight: "bold",
                    borderRadius: "0.5rem",
                    ":hover": {
                      background: "linear-gradient(90deg,rgb(31, 4, 51), #d8c3f3)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                    }
                  }}
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  type="submit"
                >
                  Sign Up
                </Button>

                <Typography textAlign="center" m="1.5rem" color="#a58f7e">
                  OR
                </Typography>

                <Button variant="text" fullWidth onClick={toggleLogin} disabled={isLoading} sx={{ color: "#7a5c3e" }}>
                  Login 
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
