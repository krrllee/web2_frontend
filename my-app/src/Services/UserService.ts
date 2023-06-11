import axios from 'axios';
import { UserDataModel } from '../Models/UserDataModel';


export async function uploadImage(image:any, email:string){
    var formData = new FormData();
    const userToken = localStorage.getItem("userToken");
    formData.append("image", image);
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/uploadImage', formData, {params: {"email": email},headers: {"Authorization" : 'Bearer ' + userToken} });

}

export async function GetShoppers(){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/users/getShoppers', { headers: {"Authorization" : 'Bearer ' + userToken} });
}

export async function GetMerchants(){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/users/getMerchants', { headers: {"Authorization" : 'Bearer ' + userToken} });
}


export async function GetUserData(email:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL + '/api/users/getUserData', {params : {email: email},  headers: {"Authorization" : 'Bearer ' + userToken}});
}

export async function BlockMerchant(merchantId:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/blockMerchant?merchantId=' + merchantId, {}, { headers: {"Authorization" : 'Bearer ' + userToken} });
}

export async function VerifyMerchant(merchantId:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/verifyMerchant?merchantId=' + merchantId, {}, { headers: {"Authorization" : 'Bearer ' + userToken} });
}

export async function UpdateAccount(user: UserDataModel){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/updateAccount', user, { headers: {"Authorization" : 'Bearer ' + userToken} });

}

