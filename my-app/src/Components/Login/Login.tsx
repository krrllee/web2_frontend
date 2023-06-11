import {useCallback, useEffect, useState} from "react"
import { LoginModel } from "../../Models/LoginModel";
import { login, socialLogin } from "../../Services/LoginService";
import {toast, Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from "../../Models/ProductModel";
import { GoogleLogin, TokenResponse, useGoogleLogin  } from '@react-oauth/google';
import axios from "axios";
import GoogleButton from 'react-google-button'
import { UserDataModel } from "../../Models/UserDataModel";
export default function () {

  const [ user, setUser ] = useState<any>();
  const [ profile, setProfile ] = useState([]);
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse) {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                const cart: ProductModel[] = [];
                const accountModel:UserDataModel = new UserDataModel(res.data.given_name, res.data.family_name, "", res.data.email, new Date(), res.data.id, 0, res.data.picture);
                socialLogin(accountModel).then(response =>{
                  if(response.data == "User not verified"){
                    toast.error("User not verified");
                  }
                  else{
                    localStorage.setItem("userToken", response.data)
                    localStorage.setItem("email", res.data.email);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    localStorage.setItem("imageUrl", res.data.picture);
                    console.log(response);
                    navigate("../dashboard");
                    window.location.reload();
                  }
                }).catch(error => {
                  window.location.reload();
                  toast.error(error);
                })

            })
            .catch((err) => console.log(err));
    }
    },
    onError: (error) => console.log('Login Failed:', error),
    onNonOAuthError: (error) => console.log('Login Failed:', error)
  });



  const navigate = useNavigate();
  const token =  localStorage.getItem("userToken");
  if(token != null){
    if(token != ''){
      navigate("../dashboard");
    }
  }


  const loginAction = ()=>{
    
    if(email != "" && password != ""){

      const loginModel:LoginModel = new LoginModel(email, password);
      const cart: ProductModel[] = [];

      login(loginModel)
      .then(response =>{
        if(response.data == "User not verified"){
          toast.error("User not verified");
        }
        else if(response.data == "Wrong email or password"){
          toast.error(response.data);

        }
        else{
          localStorage.setItem("userToken", response.data)
          localStorage.setItem("email", email);
          localStorage.setItem("cart", JSON.stringify(cart));
          localStorage.setItem("imageUrl", response.data.imageUrl);
          console.log(response);
          navigate("../dashboard");
          window.location.reload();
        }
      })
      .catch(error => {
        window.location.reload();
        toast.error(error);
      })
    }
    else{
      toast.error("Please input email and password");
    }
  }

  return (
    <div>
      <div><Toaster/></div>
      <div className="Login-form-container">
        <div className="Login-form">
        <form>
          <div className="Login-form-content">
            <h3 className="Login-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>{process.env.REACT_APP_TITLE}</label>
              <input
                id='email'
                name='email'
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email} onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                id='password'
                name='password'
                className="form-control mt-1"
                placeholder="Enter password"
                value={password} onChange={(e)=>{setPassword(e.target.value)}}

              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" onClick={loginAction} className="btn btn-primary">
                
                Login
              </button>
              </div>
          </div>
        </form>
        <GoogleButton style={{marginLeft:"90px", marginTop:"30px"}} onClick={() => googleLogin()}/> 
        <p style={{marginLeft:"90px", marginTop:"30px"}} className="forgot-password text-right mt-2">
              Dont have an account? <a href="/register">Register?</a>
            </p>
        </div>   

      </div>

    </div>
  )
}