import axios from 'axios';
import { OrderModel } from '../Models/OrderModel';

export async function GetAllOrders(){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getAllOrders', { headers: {"Authorization" : `Bearer ${userToken}`} });
}

export async function confirmOrder(orderModel:OrderModel){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL+'/api/order/createOrder', orderModel, { headers: {"Authorization" : `Bearer ${userToken}`} })
}

export async function getCanceledOrdersShopper(email:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getCanceledOrders', {params : {email: email},  headers: {"Authorization" : `Bearer ${userToken}`}});

}
export async function getNonCanceledOrdersShopper(email:string){    
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getNonCanceledOrders', {params : {email: email},  headers: {"Authorization" : `Bearer ${userToken}`}});
}