import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import type { LoginBody } from "../types/auth";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const [form, setForm] = useState<LoginBody>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const { data } = await login(form);

      localStorage.setItem("token", data.token || "");

      navigate("/dashboard");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      setError(message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 10 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Login
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            required
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
