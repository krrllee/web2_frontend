import {useState} from "react"
import { LoginModel } from "../../Models/LoginModel";
import { login } from "../../Services/LoginService";
import {toast, Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from "../../Models/ProductModel";


export default function () {
  const navigate = useNavigate();
  const token =  localStorage.getItem("userToken");
  if(token != null){
    if(token != ''){
      navigate("../dashboard");
    }
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loginAction = ()=>{
    
    if(email != "" && password != ""){

      const loginModel:LoginModel = new LoginModel(email, password);
      const cart: ProductModel[] = [];

      login(loginModel)
      .then(response =>{
        localStorage.setItem("userToken", response.data)
        localStorage.setItem("email", email);
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("imageUrl", response.data.imageUrl);
        console.log(response);
        navigate("../dashboard");
        window.location.reload();
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
        <form className="Login-form">
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
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Dont have an account? <a href="/register">Register?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}