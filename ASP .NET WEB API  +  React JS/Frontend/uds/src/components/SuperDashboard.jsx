import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Delete, Info } from '@mui/icons-material';

const SuperDashboard = () => {
  const rows = [
    { id: 1, restaurantName: 'The Gourmet Hub', ownersName: 'John Doe', licenseNumber: 'A12345', phoneNumber: '1234567890', email: 'john@example.com' },
    { id: 2, restaurantName: 'Spice Villa', ownersName: 'Jane Smith', licenseNumber: 'B67890', phoneNumber: '0987654321', email: 'jane@example.com' },
    // Add more rows as needed
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<Add />} 
        style={{ marginBottom: '20px', backgroundColor: '#FF5722' }}>
        Add
      </Button>

      <TableContainer component={Paper} style={{ borderRadius: '15px', boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', overflowX: 'auto' }}>
        <Table style={{ minWidth: '650px' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF5722', color: '#fff' }}>
              <TableCell align="center" style={{ color: '#fff', wordBreak: 'break-word' }}>Id</TableCell>
              <TableCell align="center" style={{ color: '#fff', wordBreak: 'break-word' }}>Restaurant Name</TableCell>
              <TableCell align="center" style={{ color: '#fff', wordBreak: 'break-word' }}>Owner's Name</TableCell>
              <TableCell align="center" style={{ color: '#fff', wordBreak: 'break-word' }}>License Number</TableCell>
              <TableCell align="center" style={{ color: '#fff', wordBreak: 'break-word' }}>Phone Number</TableCell>
              <TableCell align="center" style={{ color: '#fff', wordBreak: 'break-word' }}>Email</TableCell>
              <TableCell align="center" style={{ color: '#fff', wordBreak: 'break-word' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover style={{ backgroundColor: '#f7f7f7' }}>
                <TableCell align="center" style={{ wordBreak: 'break-word', padding: '10px' }}>{row.id}</TableCell>
                <TableCell align="center" style={{ wordBreak: 'break-word', padding: '10px' }}>{row.restaurantName}</TableCell>
                <TableCell align="center" style={{ wordBreak: 'break-word', padding: '10px' }}>{row.ownersName}</TableCell>
                <TableCell align="center" style={{ wordBreak: 'break-word', padding: '10px' }}>{row.licenseNumber}</TableCell>
                <TableCell align="center" style={{ wordBreak: 'break-word', padding: '10px' }}>{row.phoneNumber}</TableCell>
                <TableCell align="center" style={{ wordBreak: 'break-word', padding: '10px' }}>{row.email}</TableCell>
                <TableCell align="center" style={{ padding: '10px' }}>
                  <IconButton color="primary"><Edit /></IconButton>
                  <IconButton color="secondary"><Delete /></IconButton>
                  <IconButton color="info"><Info /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SuperDashboard;
