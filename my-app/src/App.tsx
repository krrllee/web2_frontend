import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Components/Dashboard/Admin/Dashboard';
import Orders from './Components/Dashboard/Admin/Orders';
import UpdateAccount from './Components/Dashboard/UpdateAccount';
import AddProduct from './Components/Dashboard/Merchant/AddProduct';
import AllProducts from './Components/Dashboard/Shopper/AllProducts';
import CurrentOrder from './Components/Dashboard/Shopper/CurrentOrder';
import MyProducts from './Components/Dashboard/Merchant/MyProducts';
import MyOrdersShopper from './Components/Dashboard/Shopper/MyOrdersShopper';
import jwt from 'jwt-decode';
import MyOrdersMerchant from './Components/Dashboard/Merchant/MyOrdersMerchant';
import axios from 'axios';
function App() {

    const navigate = useNavigate();
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
    if (error.response.status === 401) {
      localStorage.clear();
      navigate("../../login");
    }
    return error;
  });
  

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

  const token =  localStorage.getItem("userToken");
  if(token != null){
    if(token != ''){
    const decodedToken:any = jwt(token!);
    
    if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "merchant"){
      return (
        <Routes>
        <Route element={<DashboardLayout />} >
          <Route path="/dashboard" element ={<MyProducts/>}/>
          <Route path="/dashboard/updateAccount" element ={<UpdateAccount/>}/>
          <Route path="/dashboard/addProduct" element ={<AddProduct/>}/>
          <Route path="/dashboard/myProducts" element ={<MyProducts/>}/>
          <Route path="/dashboard/myOrders" element ={<MyOrdersMerchant/>}/>
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>    
      );
    }
    else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "shopper"){
      return (
        <Routes>
        <Route element={<DashboardLayout />} >
          <Route path="/dashboard" element ={<AllProducts/>}/>
          <Route path="/dashboard/updateAccount" element ={<UpdateAccount/>}/>
          <Route path="/dashboard/currentOrder" element ={<CurrentOrder/>}/>
          <Route path="/dashboard/allProducts" element ={<AllProducts/>}/>
          <Route path="/dashboard/myOrdersShopper" element ={<MyOrdersShopper/>}/>

        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>    
      ); 
    }
    else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "admin"){
      return (
        <Routes>
        <Route element={<DashboardLayout />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/verifyUsers" element={<Dashboard />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/updateAccount" element ={<UpdateAccount/>}/>
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>    
      ); 
    }
  }
  }
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App;
