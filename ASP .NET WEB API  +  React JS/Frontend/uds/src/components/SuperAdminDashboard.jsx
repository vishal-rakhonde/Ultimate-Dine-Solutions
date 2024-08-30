import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { Add, Edit, Delete, Info, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchRestaurants();
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5202/api/Restaurants');
      setRestaurants(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch restaurants');
      console.error('Error fetching restaurants:', err);
      setLoading(false);
    }
  };

  const handleOpenDialog = (restaurant = null) => {
    if (restaurant) {
      setSelectedRestaurant(restaurant);
      setIsEdit(true);
    } else {
      setSelectedRestaurant({
        id: 0,
        restaurantName: '',
        ownersName: '',
        licenseNumber: '',
        phoneNumber: '',
        email: ''
      });
      setIsEdit(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedRestaurant((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!selectedRestaurant.restaurantName || !selectedRestaurant.ownersName || !selectedRestaurant.licenseNumber || !selectedRestaurant.phoneNumber || !selectedRestaurant.email) {
      setError('All fields are required.');
      return;
    }

    try {
      if (!isEdit) {
        // Add new restaurant
        await axios.post('http://localhost:5202/api/Restaurants', selectedRestaurant, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setSnackbarMessage('Restaurant added successfully');
      } else {
        // Edit existing restaurant
        await axios.put(`http://localhost:5202/api/Restaurants/${selectedRestaurant.id}`, selectedRestaurant, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setSnackbarMessage('Restaurant updated successfully');
      }
      fetchRestaurants();
      handleCloseDialog();
      setError(null); // Clear error message
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to save restaurant:', err.response ? err.response.data : err.message);
      setError('Failed to save restaurant. ' + (err.response ? err.response.data.detail || err.response.data.message : err.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5202/api/Restaurants/${id}`);
      setSnackbarMessage('Restaurant deleted successfully');
      fetchRestaurants();
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to delete restaurant:', err.response ? err.response.data : err.message);
      setError('Failed to delete restaurant. ' + (err.response ? err.response.data.message : err.message));
    }
  };

  // const handleLogout = () => {
  //   // Clear authentication tokens or session data
  //   // Example: localStorage.removeItem('authToken');
  //   // Redirect to home page
  //   navigate('/');
  // };
   // };
   const handleLogout = () => {
 
      // Clear authentication tokens or user data
      localStorage.removeItem('jwtToken'); // Ensure the key matches what you used for storing the token
      sessionStorage.removeItem('jwtToken'); // Remove from sessionStorage if used
  
      // If using cookies, clear them
      // document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Adjust based on your cookie name
  
      // Navigate to the home page
      navigate('/');
   
      
   
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentTime}</div>
        <div>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Add />} 
            style={{ backgroundColor: '#FF5722' }}
            onClick={() => handleOpenDialog()}
          >
            Add New Restaurant
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<Logout />} 
            style={{ backgroundColor: '#FF5722', marginLeft: '10px' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} style={{ borderRadius: '15px', boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', overflowX: 'auto' }}>
        <Table style={{ minWidth: '650px' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF5722', color: '#fff' }}>
              <TableCell align="center" style={{ color: '#fff' }}>Id</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Restaurant Name</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Owner's Name</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>License Number</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Phone Number</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Email</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id} hover style={{ backgroundColor: '#f7f7f7' }}>
                <TableCell align="center">{restaurant.id}</TableCell>
                <TableCell align="center">{restaurant.restaurantName}</TableCell>
                <TableCell align="center">{restaurant.ownersName}</TableCell>
                <TableCell align="center">{restaurant.licenseNumber}</TableCell>
                <TableCell align="center">{restaurant.phoneNumber}</TableCell>
                <TableCell align="center">{restaurant.email}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpenDialog(restaurant)}><Edit /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(restaurant.id)}><Delete /></IconButton>
                  <IconButton color="info" onClick={() => handleOpenDialog(restaurant)}><Info /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Restaurant' : 'Add New Restaurant'}</DialogTitle>
        <DialogContent>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <TextField
            autoFocus
            margin="dense"
            name="restaurantName"
            label="Restaurant Name"
            type="text"
            fullWidth
            value={selectedRestaurant?.restaurantName || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="ownersName"
            label="Owner's Name"
            type="text"
            fullWidth
            value={selectedRestaurant?.ownersName || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="licenseNumber"
            label="License Number"
            type="text"
            fullWidth
            value={selectedRestaurant?.licenseNumber || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
            value={selectedRestaurant?.phoneNumber || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={selectedRestaurant?.email || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>Close</Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SuperAdminDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { Add, Edit, Delete, Info, Logout } from '@mui/icons-material';

// const SuperAdminDashboard = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

//   useEffect(() => {
//     fetchRestaurants();
//     const timer = setInterval(() => {
//       setCurrentTime(new Date().toLocaleString());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const fetchRestaurants = async () => {
//     try {
//       const response = await axios.get('http://localhost:5202/api/Restaurants');
//       setRestaurants(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch restaurants');
//       console.error('Error fetching restaurants:', err);
//       setLoading(false);
//     }
//   };

//   const handleOpenDialog = (restaurant = null) => {
//     if (restaurant) {
//       setSelectedRestaurant(restaurant);
//       setIsEdit(true);
//     } else {
//       setSelectedRestaurant({
//         id: 0,
//         restaurantName: '',
//         ownersName: '',
//         licenseNumber: '',
//         phoneNumber: '',
//         email: ''
//       });
//       setIsEdit(false);
//     }
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setSelectedRestaurant((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSave = async () => {
//     if (!selectedRestaurant.restaurantName || !selectedRestaurant.ownersName || !selectedRestaurant.licenseNumber || !selectedRestaurant.phoneNumber || !selectedRestaurant.email) {
//       setError('All fields are required.');
//       return;
//     }

//     try {
//       if (!isEdit) {
//         // Add new restaurant
//         await axios.post('http://localhost:5202/api/Restaurants', selectedRestaurant, {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
//         setSnackbarMessage('Restaurant added successfully');
//       } else {
//         // Edit existing restaurant
//         await axios.put(`http://localhost:5202/api/Restaurants/${selectedRestaurant.id}`, selectedRestaurant, {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
//         setSnackbarMessage('Restaurant updated successfully');
//       }
//       fetchRestaurants();
//       handleCloseDialog();
//       setError(null); // Clear error message
//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error('Failed to save restaurant:', err.response ? err.response.data : err.message);
//       setError('Failed to save restaurant. ' + (err.response ? err.response.data.detail || err.response.data.message : err.message));
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5202/api/Restaurants/${id}`);
//       setSnackbarMessage('Restaurant deleted successfully');
//       fetchRestaurants();
//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error('Failed to delete restaurant:', err.response ? err.response.data : err.message);
//       setError('Failed to delete restaurant. ' + (err.response ? err.response.data.message : err.message));
//     }
//   };

//   const handleLogout = () => {
//     try {
//       // Clear authentication tokens or user data
//       // localStorage.removeItem('authToken'); // Example for localStorage
//      // sessionStorage.removeItem('authToken'); // Example for sessionStorage
//       // If you're using cookies, you might need to remove them as well
//       //document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Example for cookies
  
//       // Navigate to home page
//       navigate('/');
//     } catch (error) {
//       console.error('Logout error:', error.message);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//         <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentTime}</div>
//         <div>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             startIcon={<Add />} 
//             style={{ backgroundColor: '#FF5722' }}
//             onClick={() => handleOpenDialog()}
//           >
//             Add New Restaurant
//           </Button>
//           <Button 
//             variant="contained" 
//             color="secondary" 
//             startIcon={<Logout />} 
//             style={{ backgroundColor: '#FF5722', marginLeft: '10px' }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </div>
//       </div>

//       <TableContainer component={Paper} style={{ borderRadius: '15px', boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', overflowX: 'auto' }}>
//         <Table style={{ minWidth: '650px' }}>
//           <TableHead>
//             <TableRow style={{ backgroundColor: '#FF5722', color: '#fff' }}>
//               <TableCell align="center" style={{ color: '#fff' }}>Id</TableCell>
//               <TableCell align="center" style={{ color: '#fff' }}>Restaurant Name</TableCell>
//               <TableCell align="center" style={{ color: '#fff' }}>Owner's Name</TableCell>
//               <TableCell align="center" style={{ color: '#fff' }}>License Number</TableCell>
//               <TableCell align="center" style={{ color: '#fff' }}>Phone Number</TableCell>
//               <TableCell align="center" style={{ color: '#fff' }}>Email</TableCell>
//               <TableCell align="center" style={{ color: '#fff' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {restaurants.map((restaurant) => (
//               <TableRow key={restaurant.id} hover style={{ backgroundColor: '#f7f7f7' }}>
//                 <TableCell align="center">{restaurant.id}</TableCell>
//                 <TableCell align="center">{restaurant.restaurantName}</TableCell>
//                 <TableCell align="center">{restaurant.ownersName}</TableCell>
//                 <TableCell align="center">{restaurant.licenseNumber}</TableCell>
//                 <TableCell align="center">{restaurant.phoneNumber}</TableCell>
//                 <TableCell align="center">{restaurant.email}</TableCell>
//                 <TableCell align="center">
//                   <IconButton color="primary" onClick={() => handleOpenDialog(restaurant)}><Edit /></IconButton>
//                   <IconButton color="secondary" onClick={() => handleDelete(restaurant.id)}><Delete /></IconButton>
//                   <IconButton color="info" onClick={() => handleOpenDialog(restaurant)}><Info /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>{isEdit ? 'Edit Restaurant' : 'Add New Restaurant'}</DialogTitle>
//         <DialogContent>
//           {error && <div style={{ color: 'red' }}>{error}</div>}
//           <TextField
//             autoFocus
//             margin="dense"
//             name="restaurantName"
//             label="Restaurant Name"
//             type="text"
//             fullWidth
//             value={selectedRestaurant?.restaurantName || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="ownersName"
//             label="Owner's Name"
//             type="text"
//             fullWidth
//             value={selectedRestaurant?.ownersName || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="licenseNumber"
//             label="License Number"
//             type="text"
//             fullWidth
//             value={selectedRestaurant?.licenseNumber || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="phoneNumber"
//             label="Phone Number"
//             type="text"
//             fullWidth
//             value={selectedRestaurant?.phoneNumber || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="email"
//             label="Email"
//             type="email"
//             fullWidth
//             value={selectedRestaurant?.email || ''}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
//           <Button onClick={handleSave} color="primary">Save</Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         action={
//           <Button color="inherit" onClick={handleCloseSnackbar}>Close</Button>
//         }
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success">
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default SuperAdminDashboard;
