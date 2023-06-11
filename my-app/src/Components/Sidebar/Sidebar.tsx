import { Sidebar, Menu, MenuItem  } from 'react-pro-sidebar';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import jwt from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { GetUserData, uploadImage } from '../../Services/UserService';
import { IconButton, Typography } from '@mui/material';
import {toast, Toaster} from 'react-hot-toast';

export default function GenerateSidebar(){

    const navigate = useNavigate();
    const token =  localStorage.getItem("userToken");
    const decodedToken:any = jwt(token!);
    const logout = () => {
        localStorage.clear();
        navigate('../../login');
    }

    const [name, setName] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const loggedInEmail = localStorage.getItem("email");
     useEffect(() => {
        const getUserData = async() =>{
            const response = await GetUserData(loggedInEmail!);
            setName(response.data.name);
            setImageUrl(response.data.imageUrl);
        }
        getUserData();
    }, []);
    

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          uploadImage(e.target.files[0], loggedInEmail!).then(response=>{
            toast.success("Image updated!");
            setImageUrl(response.data);
          });
        }
      };

    if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "merchant"){
        return (
            <div className='sidebar'>
            <div><Toaster/></div>
            <Sidebar>
                <div className="SideCont">
                    <div className="overlay">
                        <input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange}/>
                    </div>
                <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                <Avatar alt={name} src={process.env.REACT_APP_API_URL+'/'+imageUrl} sx={{ width: 150, height: 150 }}/>
                </IconButton>
            </label>           
            </div>
            <div className='Side'>
            <Typography>
                Welcome {name}
                </Typography>
                </div>
            <Menu >
                <MenuItem icon={<AddIcon/>} component={<Link to="/dashboard/addProduct" />}>Add new products</MenuItem>
                <MenuItem icon={<AddShoppingCartIcon/>}  component={<Link to="/dashboard/myProducts" />}>My products</MenuItem>
                <MenuItem icon={<AccountCircleIcon/>} component={<Link to="/dashboard/updateAccount" />}>Account</MenuItem>
                <MenuItem icon={<DeliveryDiningIcon/>} component={<Link to="/dashboard/myOrders" />}>My orders</MenuItem>
                <MenuItem icon={<LogoutIcon/>} onClick={() => logout()}>Log out</MenuItem>
            </Menu>
            </Sidebar>
            </div>
        );
    }
    else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "shopper"){
        return (
            <div className='sidebar'>
            <div><Toaster/></div>
            <Sidebar>
                <div className="SideCont">
                    <div className="overlay">
                        <input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange}/>
                    </div>
                <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                <Avatar alt={name} src={process.env.REACT_APP_API_URL+'/'+imageUrl} sx={{ width: 150, height: 150 }}/>
                </IconButton>
            </label>           
            </div>
            <div className='Side'>
            <Typography>
                Welcome {name}
                </Typography>
                </div>
            <Menu>
                <MenuItem icon={<InventoryIcon/>} component={<Link to="/dashboard/allProducts" />}>All products</MenuItem>
                <MenuItem icon={<ShoppingCartIcon/>} component={<Link to="/dashboard/currentOrder" />}>Cart</MenuItem>
                <MenuItem icon={<DeliveryDiningIcon/>} component={<Link to="/dashboard/myOrdersShopper" />}>My orders</MenuItem>
                <MenuItem icon={<AccountCircleIcon/>} component={<Link to="/dashboard/updateAccount" />}>Account</MenuItem>
                <MenuItem icon={<LogoutIcon/>} onClick={() => logout()}>Log out</MenuItem>
            </Menu>
            </Sidebar>
            </div>
        ); 
    }
    else{
        console.log(imageUrl);
        return (
            <div className='sidebar'>
            <div><Toaster/></div>
            <Sidebar>
                <div className="SideCont">
                    <div className="overlay">
                        <input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange}/>
                    </div>
                <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                <Avatar alt={name} src={process.env.REACT_APP_API_URL+'/'+imageUrl} sx={{ width: 150, height: 150 }}/>
                </IconButton>
            </label>           
            </div>
            <div className='Side'>
            <Typography>
                Welcome {name}
                </Typography>
                </div>
            <Menu>
                <MenuItem icon={<PersonIcon/>} component={<Link to="/dashboard/verifyUsers" />}>Verify users</MenuItem>
                <MenuItem icon={<PaymentsIcon/>} component={<Link to="/dashboard/orders" />}>Orders</MenuItem>
                <MenuItem icon={<AccountCircleIcon/>} component={<Link to="/dashboard/updateAccount" />}>Account</MenuItem>
                <MenuItem icon={<LogoutIcon/>} onClick={() => logout()}>Log out</MenuItem>

            </Menu>
            </Sidebar>
            </div>
        );
    }
}
