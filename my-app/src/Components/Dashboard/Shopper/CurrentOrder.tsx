import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { OrderModel } from "../../../Models/OrderModel";
import { ProductModel } from "../../../Models/ProductModel";
import { confirmOrder } from "../../../Services/OrderService";
import { Toaster, toast }  from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
export default function(){
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const orderedProducts = localStorage.getItem("cart");
    const user = localStorage.getItem("email");
    const [address, setAddress] = useState("")

    const confirmOrderAction = () => {
        const allProducts:ProductModel[] = JSON.parse(orderedProducts!) as ProductModel[];
        let orderModel:OrderModel = new OrderModel("", user!, address, allProducts, new Date());
        console.log(orderModel);

        confirmOrder(orderModel)
        .then(response =>{
            console.log(response);
            toast.success("Order placed successfully!");
        })
        .catch(error => {
          toast.error(error);
        })
    }
    


    return (
        <div>
            <div><Toaster/></div>
            <button type="submit" onClick={() => confirmOrderAction()}>CONFIRM ORDER</button>
            <input type="text" onChange={(e)=>{setAddress(e.target.value)}}/>
        </div>

    )
}