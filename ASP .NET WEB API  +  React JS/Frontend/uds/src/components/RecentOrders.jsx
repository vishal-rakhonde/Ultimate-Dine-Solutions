import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const RecentOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'Alice Johnson', items: 'Pizza, Coke', total: '$15.99', status: 'Pending' },
    { id: 2, customerName: 'Bob Smith', items: 'Burger, Fries', total: '$12.49', status: 'Pending' },
  ]);

  const handleOrderAction = (id, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recent Orders</h2>
      <TableContainer component={Paper} style={{ borderRadius: '15px', boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', overflowX: 'auto' }}>
        <Table style={{ minWidth: '650px' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF5722', color: '#fff' }}>
              <TableCell align="center" style={{ color: '#fff' }}>Order ID</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Customer Name</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Items</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Total Price</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Status</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id} hover style={{ backgroundColor: '#f7f7f7' }}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.customerName}</TableCell>
                <TableCell align="center">{order.items}</TableCell>
                <TableCell align="center">{order.total}</TableCell>
                <TableCell align="center" style={{ color: order.status === 'Completed' ? 'green' : 'red' }}>
                  {order.status}
                </TableCell>
                <TableCell align="center">
                  {order.status === 'Pending' && (
                    <>
                      <IconButton color="success" onClick={() => handleOrderAction(order.id, 'Completed')}>
                        <CheckCircle />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleOrderAction(order.id, 'Cancelled')}>
                        <Cancel />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecentOrders;