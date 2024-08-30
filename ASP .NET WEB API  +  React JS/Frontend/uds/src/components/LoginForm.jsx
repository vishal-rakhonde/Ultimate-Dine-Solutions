import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordResetForm from './PasswordResetForm';
import SignUpForm from './SignUpForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [openPasswordReset, setOpenPasswordReset] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email/Username is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const handleSubmit = async () => {
  //   if (validate()) {
  //     try {
  //       const response = await axios.post('http://localhost:5202/api/Admin/login', {
  //         username: email,
  //         password,
  //       }, {
  //         withCredentials: true,
  //       });

  //       const userRole = response.data.role;
  //       if (userRole === 'superadmin') {
  //         navigate('/superadmin');
  //       } else if (userRole === 'Admin') {
  //         navigate('/dashboard');
  //       }

  //       onClose();
  //     } catch (error) {
  //       console.error('Login error:', error.response ? error.response.data : error.message);
  //       setErrors({ ...errors, password: 'Login failed' });
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5202/api/Admin/login', {
          username: email,
          password,
        }, {
          withCredentials: true,
        });
  
        // Extract the token from the response
        const token = response.data.token; // Adjust based on how your API returns the token
  
        // Save the token in local storage
        localStorage.setItem('jwtToken', token);
  
        // Extract the user role from the response
        const userRole = response.data.role;
        if (userRole === 'superadmin') {
          navigate('/superadmin');
        } else if (userRole === 'Admin') {
          navigate('/dashboard');
        }
  
        onClose();
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        setErrors({ ...errors, password: 'Login failed' });
      }
    }
  };
  

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <Box
          sx={{
            borderRadius: '12px',
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', color: '#FF5722' }}>
            <Typography variant="h6">Login as Restaurant</Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Email / Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="dense"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#FF5722' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: '8px' },
              }}
              sx={{ width: '100%' }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="dense"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#FF5722' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff sx={{ color: '#FF5722' }} /> : <Visibility sx={{ color: '#FF5722' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: '8px' },
              }}
              sx={{ width: '100%' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <Button
                variant="text"
                sx={{ color: '#FF5722' }}
                onClick={() => setOpenPasswordReset(true)}
              >
                Forgot Password?
              </Button>
              <Button
                variant="text"
                sx={{ color: '#FF5722' }}
                onClick={() => setOpenSignUp(true)}
              >
                Sign Up
              </Button>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', padding: '10px' }}>
            <Button
              onClick={onClose}
              sx={{ borderRadius: '16px', color: '#FF5722', border: '1px solid #FF5722' }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{ borderRadius: '16px', backgroundColor: '#FF5722', color: '#fff' }}
              variant="contained"
            >
              Login
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <PasswordResetForm
        open={openPasswordReset}
        onClose={() => setOpenPasswordReset(false)}
      />

      <SignUpForm
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
      />
    </>
  );
};

export default LoginForm;
