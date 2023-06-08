import axios from 'axios';
import { LoginModel } from '../Models/LoginModel';
import { UserModel } from '../Models/UserModel'


export async function register(accountModel:UserModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/login/register', accountModel);
}

export async function login(loginModel:LoginModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/login/login', loginModel);

}
