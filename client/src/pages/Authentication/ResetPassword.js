import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Alert, Container, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_LOCALHOST;

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle password visibility toggle
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Basic password validation
    if (!password || !confirmPassword) {
      setError('Please fill out both password fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password should be at least 8 characters long.');
      return;
    }

    try {
      // Post the new password to the backend
      const response = await axios.post(`${apiUrl}/api/reset_password`, { password });
      if (response.status === 200) {
        setSuccess('Your password has been reset successfully.');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError('An error occurred while resetting your password.');
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* New Password Field with Eye Icon */}
            <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field with Eye Icon */}
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: 1.5, backgroundColor: '#1976d2', ':hover': { backgroundColor: '#115293' } }}
            >
              Reset Password
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default PasswordReset;
