import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported correctly
import dayjs from 'dayjs';
import axios from 'axios';

// Styled components
const HoverCard = styled(Card)({
  height: '250px',
  transition: 'transform 0.3s ease, box-shadow 0.5s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '16px',
  border: '5px solid #ddd',
  borderRadius: '20px',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
  },
});

const FancyButton = styled(Button)({
  backgroundColor: '#FF5722', // Updated to match user preference
  color: '#fff',
  borderRadius: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#e64a19',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
  },
});

const LogoutButton = styled(Button)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: '#FF5722', // Updated to match user preference
  color: '#fff',
  borderRadius: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
});

// Component
const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const navigate = useNavigate(); // Correctly initialize useNavigate

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // const handleLogout = () => {
  //   try {
  //     // Clear authentication tokens or user data
  //     localStorage.removeItem(' jwttoken'); // Example for localStorage
  //     sessionStorage.removeItem('jwttoken'); // Example for sessionStorage
  //     // If you're using cookies, you might need to remove them as well
  //     //document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Example for cookies
  
  //     // Navigate to home page
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Logout error:', error.message);
  //   }
  // };
  const handleLogout = () => {
    try {
      // Clear authentication tokens or user data
      localStorage.removeItem('jwtToken'); // Ensure the key matches what you used for storing the token
      sessionStorage.removeItem('jwtToken'); // Remove from sessionStorage if used
  
      // If using cookies, clear them
      // document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Adjust based on your cookie name
  
      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };
  
  

  return (
    <Container style={{ position: 'relative', paddingTop: '20px' }}>
      {/* Date and Time */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
      }}>
        {currentTime}
      </div>

      {/* Logout Button */}
      <LogoutButton onClick={handleLogout}>
        Logout
      </LogoutButton>

      {/* Welcome Message */}
      <Typography variant="h6" align="center" style={{ marginBottom: '24px', fontSize: '14px' }}>
        Welcome to dashboard, keep working keep growing
      </Typography>

      {/* Card Grid */}
      <Grid container spacing={3} style={{ marginTop: '16px' }}>
        <Grid item xs={12} md={6}>
          <HoverCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Manage Orders
              </Typography>
              <Typography variant="body2">
                View and manage current orders, update statuses, and more.
              </Typography>
              <FancyButton variant="contained" style={{ marginTop: '16px' }} onClick={() => navigate('/orders')}>
                Manage Orders
              </FancyButton>
            </CardContent>
          </HoverCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <HoverCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Manage Employees
              </Typography>
              <Typography variant="body2">
                Add, edit, and remove employees, and view their performance.
              </Typography>
              <FancyButton variant="contained" style={{ marginTop: '16px' }} onClick={() => navigate('/employee')}>
                Manage Employees
              </FancyButton>
            </CardContent>
          </HoverCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <HoverCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Manage Menu
              </Typography>
              <Typography variant="body2">
                Update menu items, prices, descriptions, and more.
              </Typography>
              <FancyButton variant="contained" style={{ marginTop: '16px' }} onClick={() => navigate('/menu')}>
                Manage Menu
              </FancyButton>
            </CardContent>
          </HoverCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <HoverCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Reviews
              </Typography>
              <Typography variant="body2">
                View and manage customer feedback to improve services.
              </Typography>
              <FancyButton variant="contained" style={{ marginTop: '16px' }}>
                View Reviews
              </FancyButton>
            </CardContent>
          </HoverCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;





// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Card, CardContent, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Modal, Button, TextField, InputAdornment, IconButton as MuiIconButton } from '@mui/material';
// import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, List as ListIcon, Logout as LogoutIcon, Visibility, VisibilityOff } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported correctly
// import dayjs from 'dayjs';

// // Styled components
// const HoverCard = styled(Card)({
//   height: '250px',
//   transition: 'transform 0.3s ease, box-shadow 0.5s ease',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   textAlign: 'center',
//   padding: '16px',
//   border: '5px solid #ddd',
//   borderRadius: '20px',
//   boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
//   '&:hover': {
//     transform: 'translateY(-10px)',
//     boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
//   },
// });

// const FancyButton = styled(Button)({
//   backgroundColor: '#f9a825',
//   color: '#fff',
//   borderRadius: '20px',
//   padding: '10px 20px',
//   fontSize: '16px',
//   fontWeight: 'bold',
//   textTransform: 'uppercase',
//   '&:hover': {
//     backgroundColor: '#f57f17',
//     boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
//   },
// });

// const SidebarIcon = styled(IconButton)({
//   position: 'absolute',
//   top: '20px',
//   right: '20px',
//   zIndex: 1200,
//   color: '#f9a825',
//   '&:hover': {
//     color: '#f57f17',
//   },
// });

// // Component
// const Dashboard = () => {
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
//   const navigate = useNavigate(); // Correctly initialize useNavigate

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleDrawerOpen = () => setOpenDrawer(true);
//   const handleDrawerClose = () => setOpenDrawer(false);
//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);
//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   const handleManageEmployeesClick = () => {
//     navigate('/employee'); // Navigate to Employee management page
//   };

//   const handleManageMenuClick = () => {
//     navigate('/menu'); // Navigate to Menu page
//   };

//   return (
//     <Container style={{ position: 'relative', paddingTop: '20px' }}>
//       {/* Date and Time */}
//       <div style={{
//         position: 'absolute',
//         top: '20px',
//         left: '20px',
//         fontSize: '16px',
//         fontWeight: 'bold',
//         color: '#333',
//       }}>
//         {currentTime}
//       </div>

//       {/* Sidebar Icon */}
//       <SidebarIcon onClick={handleDrawerOpen}>
//         <MenuIcon fontSize="large" />
//       </SidebarIcon>

//       {/* Sidebar */}
//       <Drawer
//         anchor="right"
//         open={openDrawer}
//         onClose={handleDrawerClose}
//       >
//         <List>
//           <ListItem button onClick={() => navigate('/orders')}>
//             <ListItemIcon><ListIcon /></ListItemIcon>
//             <ListItemText primary="Manage Orders" />
//           </ListItem>
//           <ListItem button onClick={handleManageEmployeesClick}>
//             <ListItemIcon><PeopleIcon /></ListItemIcon>
//             <ListItemText primary="Manage Employees" />
//           </ListItem>
//           <ListItem button onClick={handleManageMenuClick}>
//             <ListItemIcon><DashboardIcon /></ListItemIcon>
//             <ListItemText primary="Manage Menu" />
//           </ListItem>
//           <Divider />
//           <ListItem button onClick={handleOpenModal}>
//             <ListItemIcon><LogoutIcon /></ListItemIcon>
//             <ListItemText primary="Logout" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Welcome Message */}
//       <Typography variant="h6" align="center" style={{ marginBottom: '24px', fontSize: '14px' }}>
//         Welcome to dashboard, keep working keep growing
//       </Typography>

//       {/* Card Grid */}
//       <Grid container spacing={3} style={{ marginTop: '16px' }}>
//         <Grid item xs={12} md={6}>
//           <HoverCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Manage Orders
//               </Typography>
//               <Typography variant="body2">
//                 View and manage current orders, update statuses, and more.
//               </Typography>
//               <FancyButton variant="contained" style={{ marginTop: '16px' }} onClick={() => navigate('/orders')}>
//                 Manage Orders
//               </FancyButton>
//             </CardContent>
//           </HoverCard>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <HoverCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Manage Employees
//               </Typography>
//               <Typography variant="body2">
//                 Add, edit, and remove employees, and view their performance.
//               </Typography>
//               <FancyButton variant="contained" style={{ marginTop: '16px' }} onClick={handleManageEmployeesClick}>
//                 Manage Employees
//               </FancyButton>
//             </CardContent>
//           </HoverCard>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <HoverCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Manage Menu
//               </Typography>
//               <Typography variant="body2">
//                 Update menu items, prices, descriptions, and more.
//               </Typography>
//               <FancyButton variant="contained" style={{ marginTop: '16px' }} onClick={handleManageMenuClick}>
//                 Manage Menu
//               </FancyButton>
//             </CardContent>
//           </HoverCard>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <HoverCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Customer Reviews
//               </Typography>
//               <Typography variant="body2">
//                 View and manage customer feedback to improve services.
//               </Typography>
//               <FancyButton variant="contained" style={{ marginTop: '16px' }}>
//                 View Reviews
//               </FancyButton>
//             </CardContent>
//           </HoverCard>
//         </Grid>
//       </Grid>

//       {/* Modal */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="logout-modal-title"
//         aria-describedby="logout-modal-description"
//       >
//         <div style={{ padding: 20, width: 300, margin: 'auto', marginTop: '15%' }}>
//           <Typography variant="h6" id="logout-modal-title">
//             Confirm Logout
//           </Typography>
//           <TextField
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             margin="dense"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <MuiIconButton
//                     onClick={handleClickShowPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </MuiIconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button variant="contained" color="primary" onClick={handleCloseModal} style={{ marginTop: '16px' }}>
//             Confirm Logout
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={handleCloseModal} style={{ marginLeft: 8, marginTop: '16px' }}>
//             Cancel
//           </Button>
//         </div>
//       </Modal>
//     </Container>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Card, CardContent, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Modal, Button, TextField, InputAdornment, IconButton as MuiIconButton } from '@mui/material';
// import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, List as ListIcon, Logout as LogoutIcon, Visibility, VisibilityOff } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported correctly
// import dayjs from 'dayjs';

// // Styled components
// const HoverCard = styled(Card)({
//   height: '250px',
//   transition: 'transform 0.3s ease, box-shadow 0.5s ease',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   textAlign: 'center',
//   padding: '16px',
//   border: '5px solid #ddd',
//   borderRadius: '20px',
//   boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
//   '&:hover': {
//     transform: 'translateY(-10px)',
//     boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
//   },
// });

// const FancyButton = styled(Button)({
//   backgroundColor: '#f9a825',
//   color: '#fff',
//   borderRadius: '20px',
//   padding: '10px 20px',
//   fontSize: '16px',
//   fontWeight: 'bold',
//   textTransform: 'uppercase',
//   '&:hover': {
//     backgroundColor: '#f57f17',
//     boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
//   },
// });

// const SidebarIcon = styled(IconButton)({
//   position: 'absolute',
//   top: '20px',
//   right: '20px',
//   zIndex: 1200,
//   color: '#f9a825',
//   '&:hover': {
//     color: '#f57f17',
//   },
// });

// // Component
// const Dashboard = () => {
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
//   const navigate = useNavigate(); // Correctly initialize useNavigate

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleDrawerOpen = () => setOpenDrawer(true);
//   const handleDrawerClose = () => setOpenDrawer(false);
//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);
//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   const handleManageEmployeesClick = () => {
//     navigate('/employee'); // Correct path
//   };

//   return (
//     <Container style={{ position: 'relative', paddingTop: '20px' }}>
//       {/* Date and Time */}
//       <div style={{
//         position: 'absolute',
//         top: '20px',
//         left: '20px',
//         fontSize: '16px',
//         fontWeight: 'bold',
//         color: '#333',
//       }}>
//         {currentTime}
//       </div>

//       {/* Sidebar Icon */}
//       <SidebarIcon onClick={handleDrawerOpen}>
//         <MenuIcon fontSize="large" />
//       </SidebarIcon>

//       {/* Sidebar */}
//       <Drawer
//         anchor="right"
//         open={openDrawer}
//         onClose={handleDrawerClose}
//       >
//         <List>
//           <ListItem button onClick={() => setCurrentSection('Orders')}>
//             <ListItemIcon><ListIcon /></ListItemIcon>
//             <ListItemText primary="Manage Orders" />
//           </ListItem>
//           <ListItem button onClick={handleManageEmployeesClick}>
//             <ListItemIcon><PeopleIcon /></ListItemIcon>
//             <ListItemText primary="Manage Employees" />
//           </ListItem>
//           <ListItem button onClick={() => setCurrentSection('Menu')}>
//             <ListItemIcon><DashboardIcon /></ListItemIcon>
//             <ListItemText primary="Manage Menu" />
//           </ListItem>
//           <Divider />
//           <ListItem button onClick={handleOpenModal}>
//             <ListItemIcon><LogoutIcon /></ListItemIcon>
//             <ListItemText primary="Logout" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Welcome Message */}
//       <Typography variant="h6" align="center" style={{ marginBottom: '24px', fontSize: '14px' }}>
//         Welcome to dashboard, keep working keep growing
//       </Typography>

//       {/* Card Grid */}
//       <Grid container spacing={3} style={{ marginTop: '16px' }}>
//         <Grid item xs={12} md={6}>
//           <HoverCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Manage Orders
//               </Typography>
//               <Typography variant="body2">
//                 View and manage current orders, update statuses, and more.
//               </Typography>
//               <FancyButton variant="contained" style={{ marginTop: '16px' }}>
//                 Manage Orders
//               </FancyButton>
//             </CardContent>
//           </HoverCard>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <HoverCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Manage Employees
//               </Typography>
//               <Typography variant="body2">
//                 Add, edit, and remove employees, and view their performance.
//               </Typography>
//               <FancyButton variant="contained" style={{ marginTop: '16px' }} onClick={handleManageEmployeesClick}>
//                 Manage Employees
//               </FancyButton>
//             </CardContent>
//           </HoverCard>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <HoverCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Manage Menu
//               </Typography>
//               <Typography variant="body2">
//                 Update menu items, prices, descriptions, and more.
//               </Typography>
//               <FancyButton variant="contained" style={{ marginTop: '16px' }}>
//                 Manage Menu
//               </FancyButton>
//             </CardContent>
//           </HoverCard>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <HoverCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Customer Reviews
//               </Typography>
//               <Typography variant="body2">
//                 View and manage customer feedback to improve services.
//               </Typography>
//               <FancyButton variant="contained" style={{ marginTop: '16px' }}>
//                 View Reviews
//               </FancyButton>
//             </CardContent>
//           </HoverCard>
//         </Grid>
//       </Grid>

//       {/* Modal */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="logout-modal-title"
//         aria-describedby="logout-modal-description"
//       >
//         <div style={{ padding: 20, width: 300, margin: 'auto', marginTop: '15%' }}>
//           <Typography variant="h6" id="logout-modal-title">
//             Confirm Logout
//           </Typography>
//           <TextField
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             margin="dense"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <MuiIconButton
//                     onClick={handleClickShowPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </MuiIconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button variant="contained" color="primary" onClick={handleCloseModal} style={{ marginTop: '16px' }}>
//             Confirm Logout
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={handleCloseModal} style={{ marginLeft: 8, marginTop: '16px' }}>
//             Cancel
//           </Button>
//         </div>
//       </Modal>
//     </Container>
//   );
// };

// export default Dashboard;
