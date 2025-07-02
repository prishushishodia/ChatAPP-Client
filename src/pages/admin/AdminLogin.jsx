import React, { useEffect } from "react";
import { useInputValidation } from "6pp";
import {
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
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
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#1e1e1e",
            boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#00ADEF"
              textAlign="center"
            >
              Admin Login
            </Typography>

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
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#888" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#333" },
                    "&:hover fieldset": { borderColor: "#00ADEF" },
                    "&.Mui-focused fieldset": { borderColor: "#00ADEF" },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#00ADEF",
                  color: "#fff",
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: "#007bbd",
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
