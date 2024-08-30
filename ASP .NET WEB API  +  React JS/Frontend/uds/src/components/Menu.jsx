import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { Add, Edit, Delete, Info, ArrowBack } from '@mui/icons-material';

const API_URL = 'http://localhost:5202/api/Dishes';

const Menu = ({ onBack }) => {
  const [dishes, setDishes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [currentDish, setCurrentDish] = useState(null);
  const [newDish, setNewDish] = useState({
    id: '', // Added id field
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });
  const [flashMessage, setFlashMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(API_URL);
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleOpenDialog = (type, dish = null) => {
    setDialogType(type);
    setCurrentDish(dish);
    setOpenDialog(true);
    if (type === 'add') {
      setNewDish({
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
      });
    } else if (type === 'edit' && dish) {
      setNewDish({
        id: dish.id || '',
        name: dish.name || '',
        description: dish.description || '',
        price: dish.price || '',
        category: dish.category || '',
        image: dish.image || ''
      });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDish(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDish((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddDish = async () => {
    if (!newDish.id) {
      console.error('Dish Id is required for adding');
      return;
    }

    try {
      await axios.post(API_URL, newDish);
      fetchDishes();
      setFlashMessage('Dish added successfully!');
      setSnackbarOpen(true);
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  const handleUpdateDish = async () => {
    if (!newDish.id) {
      console.error('Dish Id is required for updating');
      return;
    }

    try {
      await axios.put(`${API_URL}/${newDish.id}`, newDish);
      fetchDishes();
      setFlashMessage('Dish updated successfully!');
      setSnackbarOpen(true);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDishes();
      setFlashMessage('Dish deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={onBack} style={{ backgroundColor: '#FF5722', color: '#fff' }}>
          <ArrowBack />
        </IconButton>
        <h1 style={{
          marginLeft: '20px',
          fontSize: '2rem',
          color: '#FF5722',
          textAlign: 'center',
          fontWeight: 'bold',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          Our Menu
        </h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          style={{ backgroundColor: '#FF5722' }}
          onClick={() => handleOpenDialog('add')}
        >
          Add New Dish
        </Button>
      </div>

      <TableContainer component={Paper} style={{ borderRadius: '15px', boxShadow: '0px 3px 15px rgba(0,0,0,0.2)' }}>
        <Table style={{ minWidth: '750px' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF5722', color: '#fff' }}>
              <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>Id</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>Image</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>Dish</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }} align="left">Description</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }} align="right">Price</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }} align="right">Category</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dishes.map((dish) => (
              <TableRow key={dish.id} hover style={{ backgroundColor: '#fff' }}>
                <TableCell style={{ padding: '10px', fontWeight: 'bold', fontSize: '1rem', color: '#333' }}>
                  {dish.id}
                </TableCell>
                <TableCell style={{ padding: '10px' }}>
                  <Avatar src={dish.image} alt={dish.name} variant="rounded" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                </TableCell>
                <TableCell component="th" scope="row" style={{ padding: '10px', fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>
                  {dish.name}
                </TableCell>
                <TableCell align="left" style={{ padding: '10px', fontSize: '1rem', color: '#555' }}>
                  {dish.description}
                </TableCell>
                <TableCell align="right" style={{ padding: '10px', fontSize: '1.2rem', color: '#FF5722', fontWeight: 'bold' }}>
                  ₹{dish.price}
                </TableCell>
                <TableCell align="right" style={{ padding: '10px', fontSize: '1rem', color: '#777' }}>
                  {dish.category}
                </TableCell>
                <TableCell align="center" style={{ padding: '10px' }}>
                  <IconButton color="primary" onClick={() => handleOpenDialog('edit', dish)}><Edit /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteDish(dish.id)}><Delete /></IconButton>
                  <IconButton color="info" onClick={() => handleOpenDialog('view', dish)}><Info /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Flash Message Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning the Snackbar
      >
        <Alert onClose={handleSnackbarClose} severity="success" style={{ backgroundColor: '#FF5722', color: '#fff' }}>
          {flashMessage}
        </Alert>
      </Snackbar>

      {/* Dialog for Add/Edit Dish */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogType === 'add' ? 'Add Dish' : 'Edit Dish'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="id"
            label="Dish Id"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.id}
            onChange={handleChange}
            disabled={dialogType === 'edit'} // Disable the ID field during edit
          />
          <TextField
            margin="dense"
            name="name"
            label="Dish Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={newDish.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.category}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.image}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={dialogType === 'add' ? handleAddDish : handleUpdateDish} color="primary">
            {dialogType === 'add' ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Menu;
