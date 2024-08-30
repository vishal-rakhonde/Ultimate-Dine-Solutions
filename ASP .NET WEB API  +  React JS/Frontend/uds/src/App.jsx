import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Features from './components/Features'; 
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard'; 
import SuperDashboard from './components/SuperDashboard';
import Employee from './components/Employee';
import Menu from './components/Menu';
import Menulist from './components/Menulist';
import CartPage from './components/CartPage';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import Payment from './components/Payment';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/features" element={<Features />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Ensure the Dashboard component is correctly imported */}
          <Route path="/superdashboard" element={<SuperDashboard />} /> 
          <Route path="/employee" element={<Employee />} /> 
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/menulist" element={<Menulist />} />  
          <Route path="/payment" element={<Payment />} />  
         
          <Route path="/superadmin" element={<SuperAdminDashboard />} />  
          <Route path="/cart" element={<CartPage cartItems={[]} />} /> 

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
