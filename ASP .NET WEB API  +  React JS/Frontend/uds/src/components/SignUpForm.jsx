import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { AccountCircle, Lock, Business, Phone, Assignment, Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

// Styled DialogContent to include custom scrollbar with invisible scrolling
const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  overflowY: 'auto',
  scrollbarWidth: 'none', // Hide scrollbar for Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar for WebKit browsers
  },
}));

// Styled button with rounded corners
const RoundedButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: '8px 16px',
}));

const SignUpForm = ({ open, onClose }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!restaurantName) {
      newErrors.restaurantName = 'Restaurant name is required';
      isValid = false;
    }
    if (!ownerName) {
      newErrors.ownerName = 'Owner name is required';
      isValid = false;
    }
    if (!licenseNumber) {
      newErrors.licenseNumber = 'License number is required';
      isValid = false;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
      isValid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5202/api/Restaurants', {
          restaurantName,
          ownersName: ownerName,
          licenseNumber,
          phoneNumber,
          email,
          password
        });
        console.log('Success:', response.data);
        toast.success('Registered successfully'); // Display success notification
        onClose();
        navigate('/login');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Registration failed'); // Display error notification
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', color: '#FF5722' }}>
          Sign Up
        </DialogTitle>
        <CustomDialogContent>
          <TextField
            label="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.restaurantName}
            helperText={errors.restaurantName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business sx={{ color: '#FF5722' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            label="Owner's Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.ownerName}
            helperText={errors.ownerName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: '#FF5722' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            label="License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.licenseNumber}
            helperText={errors.licenseNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Assignment sx={{ color: '#FF5722' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
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
          />
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
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="dense"
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
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff sx={{ color: '#FF5722' }} /> : <Visibility sx={{ color: '#FF5722' }} />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
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
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff sx={{ color: '#FF5722' }} /> : <Visibility sx={{ color: '#FF5722' }} />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
              },
            }}
          />
        </CustomDialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '10px' }}>
          <RoundedButton onClick={onClose} variant="outlined" sx={{ color: '#FF5722', borderColor: '#FF5722' }}>
            Cancel
          </RoundedButton>
          <RoundedButton onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#FF5722', color: '#fff' }}>
            Sign Up
          </RoundedButton>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default SignUpForm;
