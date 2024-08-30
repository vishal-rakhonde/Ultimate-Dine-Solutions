import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Home = () => {
  const steps = [
    {
      icon: <DescriptionIcon fontSize="large" style={{ color: '#FFC107' }} />,
      title: 'Step 1',
      description: 'Create account ',
      subtitle: 'Help users discover your place by creating a listing.'
    },
    {
      icon: <DirectionsBikeIcon fontSize="large" style={{ color: '#FF5722' }} />,
      title: 'Step 2',
      description: 'Register for Dashboard',
      subtitle: 'Manage your restaurant on our platform easily and efficiently.'
    },
    {
      icon: <ShoppingBagIcon fontSize="large" style={{ color: '#FF9800' }} />,
      title: 'Step 3',
      description: 'Start Using',
      subtitle: 'Manage your restaurant on our platform easily and efficiently.'
    }
  ];

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        mt: 8, 
        textAlign: 'center', 
        backgroundImage: `url('https://source.unsplash.com/958545')`, // Replace with your actual image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '50px 0', // Optional: adds padding to the content inside the container
        borderRadius: '12px', // Optional: adds a border-radius to the container
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Optional: adds a shadow to the container
      }}
    >
      <Typography variant="h4" gutterBottom>
        How it works?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, // Padding
                borderRadius: 2, // Border radius
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              <Box sx={{ mb: 2 }}>
                {step.icon}
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {step.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {step.subtitle}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
