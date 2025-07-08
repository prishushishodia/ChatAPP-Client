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
      backgroundColor: "#111B21",
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
          border: "1px solid #2A3942",
          backgroundColor: "#202C33",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}>
          <Typography variant="h4" sx={{
            mb: 2,
            fontWeight: "600",
            fontFamily: "'Segoe UI', sans-serif",
            color: "#E9EDEF"
          }}>
            {isLogin ? "LOGIN" : "Create Account"}
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
                InputProps={{ sx: { background: "#2A3942", color: "#E9EDEF", borderRadius: "0.5rem" } }}
                InputLabelProps={{ sx: { color: "#8696A0" } }}
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
                InputProps={{ sx: { background: "#2A3942", color: "#E9EDEF", borderRadius: "0.5rem" } }}
                InputLabelProps={{ sx: { color: "#8696A0" } }}
              />
              <Button
                sx={{
                  marginTop: 2,
                  background: "#00A884",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "0.5rem",
                  ":hover": {
                    background: "#00A884",
                    opacity: 0.9
                  }
                }}
                variant="contained"
                fullWidth
                disabled={isLoading}
                type="submit"
              >
                Login
              </Button>

              <Typography textAlign="center" m="1.5rem" color="#8696A0">
                OR
              </Typography>

              <Button variant="text" fullWidth onClick={toggleLogin} disabled={isLoading} sx={{ color: "#00A884" }}>
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
                    bgcolor: "#00A884",
                    ":hover": { bgcolor: "#01956f" }
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
                  InputProps={{ sx: { background: "#2A3942", color: "#E9EDEF", borderRadius: "0.5rem" } }}
                  InputLabelProps={{ sx: { color: "#8696A0" } }}
                />
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Bio"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  InputProps={{ sx: { background: "#2A3942", color: "#E9EDEF", borderRadius: "0.5rem" } }}
                  InputLabelProps={{ sx: { color: "#8696A0" } }}
                />
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  InputProps={{ sx: { background: "#2A3942", color: "#E9EDEF", borderRadius: "0.5rem" } }}
                  InputLabelProps={{ sx: { color: "#8696A0" } }}
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
                  InputProps={{ sx: { background: "#2A3942", color: "#E9EDEF", borderRadius: "0.5rem" } }}
                  InputLabelProps={{ sx: { color: "#8696A0" } }}
                />

                <Button
                  sx={{
                    marginTop: 2,
                    background: "#00A884",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "0.5rem",
                    ":hover": {
                      background: "#01956f"
                    }
                  }}
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  type="submit"
                >
                  Sign Up
                </Button>

                <Typography textAlign="center" m="1.5rem" color="#8696A0">
                  OR
                </Typography>

                <Button variant="text" fullWidth onClick={toggleLogin} disabled={isLoading} sx={{ color: "#00A884" }}>
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
