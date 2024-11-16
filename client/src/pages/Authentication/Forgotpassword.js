import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Alert, Container, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
const apiUrl = process.env.REACT_APP_LOCALHOST;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [failure, setFailure] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setFailure('');

    // Basic email validation
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      console.log("get email to send", email);
      // Send the email to backend API
      const response = await fetch(apiUrl + '/api/forgot_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setSuccess('Password reset link has been sent to your email.');
      } else if (response.status === 404) {
        setFailure('Email does not match our database.');
      }
    } catch (error) {
      console.error('Error sending password reset:', error);
      setError('Failed to send password reset email.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <p>Please enter email address you'd like your password reset information sent to</p>

        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}
        {failure && <Alert severity="warning" sx={{ marginBottom: 2 }}>{failure}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: 1.5, backgroundColor: '#1976d2', ':hover': { backgroundColor: '#115293' } }}
            >
              Send Reset Link
            </Button>
            <Link to="/login" className="forgot-password-link">Back to Login Page</Link>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
