// frontend/src/components/auth/Register.js
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Container, Typography, Grid, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/', formData);
      console.log(response.data);

      setIsRegistered(true);
      setSuccessMessage('Registration successful. Please login.');
    } catch (err) {
      console.error('Registration failed', err);
      setError('Registration failed. Please try again.');
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(null);
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Register</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleCloseError}>
        <MuiAlert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </MuiAlert>
      </Snackbar>
      <Snackbar open={successMessage !== null} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <MuiAlert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Register;
