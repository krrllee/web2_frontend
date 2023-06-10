import axios from 'axios';
import { ProductModel } from '../Models/ProductModel';

export async function AddProduct(product:ProductModel){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL+'/api/product/post', product, { headers: {"Authorization" : `Bearer ${userToken}`} });
}

export async function GetProducts(){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/product/get', { headers: {"Authorization" : `Bearer ${userToken}`} });
}

export async function GetProductsForMerchant(merchantId:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/product/getProductsForMerchant', {params : {merchantId: merchantId}, headers: {"Authorization" : `Bearer ${userToken}`}});
}
