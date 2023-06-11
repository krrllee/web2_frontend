import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Typography, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { OrderModel } from "../../../Models/OrderModel";
import { ProductModel } from "../../../Models/ProductModel";
import { confirmOrder } from "../../../Services/OrderService";
import { Toaster, toast }  from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Row, Col, Container } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
export default function(){
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const orderedProducts = localStorage.getItem("cart");
    const user = localStorage.getItem("email");
    const [address, setAddress] = useState("");
    let sum: number = 0;
    const allProducts:ProductModel[] = JSON.parse(orderedProducts!) as ProductModel[];

    const confirmOrderAction = () => {
        const allProducts:ProductModel[] = JSON.parse(orderedProducts!) as ProductModel[];
        let orderModel:OrderModel = new OrderModel("", user!, address, allProducts, new Date(), new Date());
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
    
    allProducts.forEach(x => sum += x.price);

    const removeFromCart = (product: ProductModel) =>{
      let index = allProducts.indexOf(product);
      allProducts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(allProducts));
      toast.success(product.name + " removed from cart");
      window.location.reload();
    }

    return (
        <div className="container">
            
          <Accordion>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Products in cart
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See all the products in your cart</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Row>
                {allProducts!.map((allProducts, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader 
                            title={allProducts.name}/>
                            <CardMedia
                                component="img"
                                height="194"
                                image={allProducts.imageUrl}
                                alt={allProducts.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Price: {allProducts.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button variant="contained" size="small" color="error" type="submit" style={{marginLeft:"40px"}} onClick={() => removeFromCart(allProducts)}>X</Button>
                            </CardActions>
                        </Card>
                    </Col>
                ))}
                </Row>
                </AccordionDetails>
        </Accordion>
        <div><Toaster/></div>
            <Typography variant="h5" color="text.primary" style={{marginLeft:"40px", marginTop:"40px"}}>
                                Total price: {sum}
              <Button variant="contained" size="small" color="success" type="submit" style={{marginLeft:"40px"}} onClick={() => confirmOrderAction()}>CONFIRM ORDER</Button>
              <TextField variant="filled" label="Delivery address" style={{marginLeft:"40px"}}  onChange={(e)=>{setAddress(e.target.value)}}/>
            </Typography>
        </div>

    )
}