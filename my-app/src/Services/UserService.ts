import axios from 'axios';
import { UserDataModel } from '../Models/UserDataModel'


export async function GetShoppers(){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/users/getShoppers');
}

export async function GetMerchants(){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/users/getMerchants');
}


