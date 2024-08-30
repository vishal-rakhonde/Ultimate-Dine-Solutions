import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { keyframes } from '@emotion/react';
import CustomerDetails from './CustomerDetails'; // Import CustomerDetails component

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const slideIn = keyframes`
  0% { transform: translateY(-20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Welcome = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ animation: `${fadeIn} 2s ease`, fontWeight: 'bold', color: '#2c3e50' }}
      >
        Ultimate Dine Solutions
      </Typography>
      <Typography
        variant="h5"
        component="p"
        gutterBottom
        sx={{ animation: `${slideIn} 2s ease`, fontWeight: 'lighter' }}
      >
        Experience the best dining with a variety of delicious dishes at your fingertips!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4, mb: 4 }}
        onClick={handleOpen} // Open the dialog on button click
      >
        Browse Menu
      </Button>

      <CustomerDetails open={open} onClose={handleClose} />

      <Grid container spacing={4} justifyContent="center">
        {[
          { src: 'https://ik.imagekit.io/munchery/blog/tr:w-768/from-punjab-to-tamil-nadu-a-tour-of-ten-indian-thalis.jpeg', alt: 'Traditional Thali', name: 'Traditional Thali' },
          { src: 'https://www.archanaskitchen.com/images/archanaskitchen/0-Affiliate-Articles/RESTAURANT_STYLE_SOUTH_INDIAN_THALI_original.jpg', alt: 'South Indian Thali', name: 'South Indian Thali' },
          { src: 'https://assets.vogue.com/photos/63d169f727f1d528635b4287/16:9/w_3631,h_2042,c_limit/GettyImages-1292563627.jpg', alt: 'Indian Dosa', name: 'Indian Dosa' },
          { src: 'https://curlytales.com/wp-content/uploads/2017/11/Amritsari.jpg', alt: 'Chole Bhature', name: 'Chole Bhature' },
          { src: 'https://slurrp.club/wp-content/uploads/2021/10/DSC_0037-2-750x541.jpg', alt: 'Veg Biryani', name: 'Veg Biryani' },
          { src: 'https://experience-fresh.panasonic.eu/wp-content/uploads/2018/12/Paneer_Tikka_Masala_enjoy_181205.jpg', alt: 'Paneer Tikka Masala', name: 'Paneer Tikka Masala' },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              onClick={handleOpen} // Open the dialog on image or name click
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                component="img"
                src={item.src}
                alt={item.alt}
                sx={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
              />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {item.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Welcome;
