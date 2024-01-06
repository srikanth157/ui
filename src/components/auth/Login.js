import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Paper,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/users/emailLogin', {
        email: formData.email,
        password: formData.password,
      });
      login(response.data.token, response.data.user._id);
      setFormData({ email: '', password: '' });
      // For demonstration purposes, redirect to departments page
      navigate('/departments');
    } catch (err) {
      console.error('Login failed', err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/register" variant="body2">
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleCloseError}>
        <MuiAlert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Login;
