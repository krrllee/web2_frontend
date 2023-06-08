import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Components/Dashboard/Admin/Dashboard';
import Orders from './Components/Dashboard/Admin/Orders';

function App() {

  const DashboardLayout = () => (
    <>
      <Navbar />
      <div className="screens-container">
        <main className="main">
          <Sidebar/>
          <Outlet /> 
        </main>
      </div>
    </>
  );
  const isLogged = false;
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DashboardLayout />} >
          <Route path="/dashboard/verifyUsers" element={<Dashboard />} />
          <Route path="/dashboard/orders" element={<Orders />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
