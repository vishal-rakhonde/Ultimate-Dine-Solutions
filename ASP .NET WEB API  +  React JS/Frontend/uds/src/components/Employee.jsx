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
  TextField
} from '@mui/material';
import { Add, Edit, Delete, Info } from '@mui/icons-material';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState({
    empId: 0,
    empName: '',
    contactNo: '',
    role: '',
    joiningDate: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5202/api/Employee');
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error('Error fetching employees:', err);
      setLoading(false);
    }
  };

  const handleOpenDialog = (employee = null) => {
    if (employee) {
      setSelectedEmployee(employee);
      setIsEdit(true);
    } else {
      setSelectedEmployee({
        empId: 0, // Default to 0 for new employees
        empName: '',
        contactNo: '',
        role: '',
        joiningDate: ''
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
    setSelectedEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!selectedEmployee.empName || !selectedEmployee.contactNo || !selectedEmployee.role || !selectedEmployee.joiningDate) {
      setError('All fields are required.');
      return;
    }

    try {
      if (!isEdit) {
        // Add new employee
        await axios.post('http://localhost:5202/api/Employee/addEmployee', selectedEmployee, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Edit existing employee
        await axios.put(`http://localhost:5202/api/Employee/${selectedEmployee.empId}`, selectedEmployee, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      fetchEmployees();
      handleCloseDialog();
      setError(null); // Clear error message
    } catch (err) {
      console.error('Failed to save employee:', err.response ? err.response.data : err.message);
      setError('Failed to save employee. ' + (err.response ? err.response.data.detail || err.response.data.message : err.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5202/api/Employee/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to delete employee:', err.response ? err.response.data : err.message);
      setError('Failed to delete employee. ' + (err.response ? err.response.data.message : err.message));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />} 
          style={{ backgroundColor: '#FF5722' }}
          onClick={() => handleOpenDialog()}
        >
          Add New Employee
        </Button>
      </div>

      <TableContainer component={Paper} style={{ borderRadius: '15px', boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', overflowX: 'auto' }}>
        <Table style={{ minWidth: '650px' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF5722', color: '#fff' }}>
              <TableCell align="center" style={{ color: '#fff' }}>Employee Id</TableCell>
              <TableCell align="left" style={{ color: '#fff' }}>Employee Name</TableCell>
              <TableCell align="left" style={{ color: '#fff' }}>Phone No</TableCell>
              <TableCell align="left" style={{ color: '#fff' }}>Role</TableCell>
              <TableCell align="left" style={{ color: '#fff' }}>Joining Date</TableCell>
              <TableCell align="center" style={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.empId} hover style={{ backgroundColor: '#f7f7f7' }}>
                <TableCell align="center">{employee.empId}</TableCell>
                <TableCell align="left">{employee.empName}</TableCell>
                <TableCell align="left">{employee.contactNo}</TableCell>
                <TableCell align="left">{employee.role}</TableCell>
                <TableCell align="left">{new Date(employee.joiningDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpenDialog(employee)}><Edit /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(employee.empId)}><Delete /></IconButton>
                  <IconButton color="info" onClick={() => handleOpenDialog(employee)}><Info /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        <DialogContent>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <TextField
            autoFocus
            margin="dense"
            name="empName"
            label="Employee Name"
            type="text"
            fullWidth
            value={selectedEmployee.empName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contactNo"
            label="Contact No"
            type="text"
            fullWidth
            value={selectedEmployee.contactNo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            value={selectedEmployee.role}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="joiningDate"
            label="Joining Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={selectedEmployee.joiningDate}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Employee;
