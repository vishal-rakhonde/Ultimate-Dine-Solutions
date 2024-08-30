import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    console.log('Order placed:', cartItems);
    // Add functionality to handle placing the order
  };

  const handleCancelOrder = () => {
    navigate(-1); // Navigate back
  };

  const handleMakePayment = () => {
    navigate('/payment'); // Navigate to Payment page
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Dish Name</TableCell>
              <TableCell>Price (INR)</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total (INR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.DishName}</TableCell>
                <TableCell>{item.Price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
                <TableCell>{item.Quantity}</TableCell>
                <TableCell>{(item.Quantity * item.Price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                Total: {cartItems.reduce((sum, item) => sum + (item.Quantity * item.Price), 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </TableCell>
              <TableCell sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ marginRight: 2 }}
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ marginRight: 2 }}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleMakePayment}
                >
                  Make Payment
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CartPage;
