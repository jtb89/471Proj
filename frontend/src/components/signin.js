import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';

export default function SignIn() {
  const [isEmployee, setIsEmployee] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const identifier = data.get("identifier");
    const password = data.get("password");
  
    try {
      const response = await fetch("database/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier,
          password,
          is_employee: isEmployee
        })
      });
  
      const result = await response.json();
      if (response.ok && result.success) {
        alert("Login successful!");
        // redirect or save session info
      } else {
        alert(result.error || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const toggleLoginType = () => {
    setIsEmployee((prev) => !prev);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isEmployee ? 'Employee Login' : 'User Login'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="identifier"
            label={isEmployee ? 'Employee ID' : 'Card Number'}
            name="identifier"
            autoComplete={isEmployee ? 'off' : 'off'}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={isEmployee ? 'Password' : 'Password(pins)'}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={toggleLoginType}
          >
            Switch to {isEmployee ? 'User' : 'Employee'} Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}



