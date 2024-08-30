import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TableFooter, Button, IconButton, TextField, Paper
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const Menulist = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5202/api/Dishes')
      .then(response => {
        const dishes = response.data.map(dish => ({
          DishId: dish.id,
          DishName: dish.name,
          Description: dish.description,
          Price: dish.price,
          Image: dish.image, 
          Quantity: 0,
        }));
        setMenuItems(dishes);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  const handleQuantityChange = (index, increment) => {
    const newMenuItems = [...menuItems];
    const item = newMenuItems[index];
    item.Quantity = Math.max(0, item.Quantity + increment);
    setMenuItems(newMenuItems);
    calculateTotalPrice(newMenuItems);
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + (item.Quantity * item.Price), 0);
    setTotalPrice(total);
  };

  const handlePlaceOrder = () => {
    const hasItemsInCart = menuItems.some(item => item.Quantity > 0);

    if (hasItemsInCart) {
      toast.success('Order placed successfully!', {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => navigate('/')
      });
    } else {
      toast.error('Please add items to your order before placing it.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleCancelOrder = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ animation: `${fadeIn} 2s ease`, fontWeight: 'bold' }}
      >
        Welcome to Ultimate Dine Solutions!
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
        sx={{ animation: `${bounceIn} 2s ease`, mb: 4 }}
      >
        Please review the menu below and place your order.
      </Typography>
      
      <TableContainer component={Paper} sx={{ animation: `${fadeIn} 2s ease`, borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>DishId</TableCell>
              <TableCell>Dish Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price (INR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item, index) => (
              <TableRow
                key={item.DishId}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s, background-color 0.3s',
                  },
                  animation: `${fadeIn} 1s ease`,
                }}
              >
                <TableCell>{item.DishId}</TableCell>
                <TableCell>{item.DishName}</TableCell>
                <TableCell>{item.Description}</TableCell>
                <TableCell>{item.Category}</TableCell>
                <TableCell>
                  <img
                    src={item.Image}
                    alt={item.DishName}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleQuantityChange(index, -1)} disabled={item.Quantity === 0}>
                    <Remove />
                  </IconButton>
                  <TextField
                    value={item.Quantity}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    size="small"
                    sx={{ width: '60px', textAlign: 'center' }}
                  />
                  <IconButton onClick={() => handleQuantityChange(index, 1)}>
                    <Add />
                  </IconButton>
                </TableCell>
                <TableCell>{item.Price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                Total Price: {totalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </TableCell>
              <TableCell colSpan={1} sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ marginRight: 1, animation: `${bounceIn} 1s ease` }}
                  onClick={handleCancelOrder}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ animation: `${bounceIn} 1s ease` }}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Toast notification container */}
      <ToastContainer />
    </Container>
  );
};

export default Menulist;

