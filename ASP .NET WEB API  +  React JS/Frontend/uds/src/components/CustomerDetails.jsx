import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert } from '@mui/material';
import axios from 'axios';
import Menulist from './Menulist'; // Import the Menulist component

const CustomerDetails = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', mobile: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', mobile: '', email: '' };

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (/\d/.test(name)) {
      newErrors.name = 'Name cannot contain numbers';
      isValid = false;
    }

    if (!mobile) {
      newErrors.mobile = 'Mobile No is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Mobile No must be a 10-digit number';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        // Make the API request
        await axios.post('http://localhost:5202/api/CustomerDetails', {
          name: name,
          mobileNo: mobile,
          email: email,
        });
        setSuccess(true); // Set success to true if the API call is successful
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error submitting customer details:', error);
        setErrorMessage('Failed to submit customer details. Please try again.');
      }
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobile(value);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleClose = () => {
    setFormSubmitted(false);
    setSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      {formSubmitted ? (
        <Menulist /> // Show the menu list after form submission
      ) : (
        <>
          <DialogTitle>Enter Your Details</DialogTitle>
          <DialogContent>
            {success && <Alert severity="success">Customer registered successfully!</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <TextField
              label="Enter Name"
              value={name}
              onChange={handleNameChange}
              fullWidth
              margin="dense"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Mobile No"
              value={mobile}
              onChange={handleMobileChange}
              fullWidth
              margin="dense"
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="dense"
              error={!!errors.email}
              helperText={errors.email}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CustomerDetails;




// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

// const CustomerDetails = ({ open, onClose }) => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [errors, setErrors] = useState({ name: '', mobile: '', email: '' });

//   const validate = () => {
//     let isValid = true;
//     const newErrors = { name: '', mobile: '', email: '' };

//     if (!name) {
//       newErrors.name = 'Name is required';
//       isValid = false;
//     } else if (/\d/.test(name)) {
//       newErrors.name = 'Name cannot contain numbers';
//       isValid = false;
//     }

//     if (!mobile) {
//       newErrors.mobile = 'Mobile No is required';
//       isValid = false;
//     } else if (!/^\d{10}$/.test(mobile)) {
//       newErrors.mobile = 'Mobile No must be a 10-digit number';
//       isValid = false;
//     }

//     if (!email) {
//       newErrors.email = 'Email is required';
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Email is invalid';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       // Handle form submission here
//       console.log({ name, mobile, email });
//       onClose();
//     }
//   };

//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) {
//       setMobile(value);
//     }
//   };

//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     setName(value);
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Enter Your Details</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Enter Name"
//           value={name}
//           onChange={handleNameChange}
//           fullWidth
//           margin="dense"
//           error={!!errors.name}
//           helperText={errors.name}
//         />
//         <TextField
//           label="Mobile No"
//           value={mobile}
//           onChange={handleMobileChange}
//           fullWidth
//           margin="dense"
//           error={!!errors.mobile}
//           helperText={errors.mobile}
//         />
//         <TextField
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           margin="dense"
//           error={!!errors.email}
//           helperText={errors.email}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CustomerDetails;
