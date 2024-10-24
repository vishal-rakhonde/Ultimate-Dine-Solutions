import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';

// Online image URLs
const features = [
  {
    image: 'https://miro.medium.com/v2/resize:fit:525/1*c9VJhvC-KhMt3MMX7WQ_wA.jpeg',
    title: 'Manage Orders',
    description: 'Admin can view and manage all order details from their restaurant. This feature allows for the tracking of order statuses, updating order information, and ensuring that all orders are processed efficiently. The admin can also filter orders based on various criteria to quickly address any issues and optimize order fulfillment.'
  },
  {
    image: 'https://img.freepik.com/premium-vector/food-menu-restaurant-website-header-template_685310-475.jpg',
    title: 'Manage Dish/Menu',
    description: 'Admin can perform all CRUD (Create, Read, Update, Delete) operations related to the menu directly from their dashboard. This includes adding new dishes, updating existing ones, deleting items that are no longer available, and organizing the menu for better customer experience. The admin can also set prices, descriptions, and upload images for each dish.'
  },
  {
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2_JXlENn_xlWNLw8evzUjEBmalOwpv_BaHk7dxZzYtkOx8UvyS_I_9Aa-k-EFJiaHXE5Lwqt2dL1OicoZSiMepccxBecce9KD6AOJhYMPYa4jDKmwsCizyW_wCLW7U6Cfx0XNJ9D_xy0/s640/why-hotel-management-industry-opt-for-staff-training.jpg',
    title: 'Employee Management',
    description: 'Manage all employee-related operations including hiring, updating, and removing employees. Admin can assign roles, manage work schedules, track performance, and handle employee data. This feature helps streamline human resource tasks and ensures that the restaurant operates smoothly with well-coordinated staff management.'
  }
];

const Features = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid 
            item 
            key={index} 
            xs={12} 
            sm={6} 
            md={4}
          >
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 16,
                  overflow: 'hidden', 
                  mb: 2 
                }}
              >
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1">
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Features;
