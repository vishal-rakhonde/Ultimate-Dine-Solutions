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
  Box,
} from '@mui/material';
import { Phone, Email, Lock, Key, Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordResetForm = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      phone: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be a 10-digit number';
      isValid = false;
    }

    if (!otp) {
      newErrors.otp = 'OTP is required';
      isValid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = 'New Password is required';
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Handle password reset logic here
      console.log({ email, phone, otp, newPassword });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          borderRadius: '12px',
          backgroundColor: '#fff',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '400px', // Fixed width for the dialog
          scrollbarWidth: 'none', /* For Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* For Chrome, Safari, and Opera */
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', color: '#FF5722' }}>
          Reset Password
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: '#FF5722' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
            sx={{ width: '100%' }} // Ensure consistent width
          />
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: '#FF5722' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
            sx={{ width: '100%' }} // Ensure consistent width
          />
          <TextField
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.otp}
            helperText={errors.otp}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key sx={{ color: '#FF5722' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
            sx={{ width: '100%' }} // Ensure consistent width
          />
          <TextField
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#FF5722' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowNewPassword} edge="end">
                    {showNewPassword ? <VisibilityOff sx={{ color: '#FF5722' }} /> : <Visibility sx={{ color: '#FF5722' }} />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
            sx={{ width: '100%' }} // Ensure consistent width
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#FF5722' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff sx={{ color: '#FF5722' }} /> : <Visibility sx={{ color: '#FF5722' }} />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
            sx={{ width: '100%' }} // Ensure consistent width
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '10px' }}>
          <Button onClick={onClose} sx={{ borderRadius: '16px', color: '#FF5722', border: '1px solid #FF5722' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} sx={{ borderRadius: '16px', backgroundColor: '#FF5722', color: '#fff' }}>
            Reset Password
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default PasswordResetForm;
