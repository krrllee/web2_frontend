import React,{ useState, useEffect,  } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserModel } from "../../Models/UserModel";
import { register } from '../../Services/LoginService';
import {toast, Toaster} from 'react-hot-toast';

export default function () {

    
    const defaultValue="2020-06-06";
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState(defaultValue)
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [accountType, setAccountType] = useState("2")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();
    const onOptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setAccountType(e.target.value)
      }

    const registerAction = ()=>{
        
        const accountModel:UserModel = new UserModel(name, lastname, address, Number(accountType) ,password, confirmPassword,email, new Date(dateOfBirth), username);
     

        register(accountModel)
            .then(data =>{
                if(data.status === 204){
                    toast.success("Successfully registered!");
                    navigate("../login");
                }
            })
            .catch(error =>{
                toast.error("Something went wrong, please try again.");
            })
    }
    return (
        <div>
            <div><Toaster/></div>
            <div className="Login-form-container">
            <form className="Login-form">
                <div className="Login-form-content">
                <h3 className="Login-form-title">Sign In</h3>
                <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                    id='email'
                    name='email'
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Username</label>
                    <input
                    id='username'
                    name='username'
                    type="text"
                    className="form-control mt-1"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Name</label>
                    <input
                    id='name'
                    name='name'
                    type="text"
                    className="form-control mt-1"
                    placeholder="Your name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Last name</label>
                    <input
                    id='lastname'
                    name='lastname'
                    type="text"
                    className="form-control mt-1"
                    placeholder="Your last name"
                    value={lastname}
                    onChange={(e)=>{setLastname(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Date of birth</label>
                    <input
                    id='dateOfBirth'
                    name='dateOfBirth'
                    type="date"
                    className="form-control mt-1"
                    value={dateOfBirth}
                    onChange={(e)=>{setDateOfBirth(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                    id='password'
                    name='password'
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                    type="password"
                    id='confirmPassword'
                    name='confirmPassword'
                    className="form-control mt-1"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Address</label>
                    <input
                    id='address'
                    name='address'
                    type="text"
                    className="form-control mt-1"
                    placeholder="Address"
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <input type="radio" checked={accountType === "2"} value="2" name="accountType" onChange={onOptionChange}/> Customer
                    <input type="radio" checked={accountType === "1"} value="1" name="accountType" onChange={onOptionChange} /> Deliverer
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="button"  className="btn btn-primary" onClick={()=>registerAction()}>
                    Submit
                    </button>
                </div>
                <p className="forgot-password text-right mt-2">
                    Already have an account? <a href="/login">Log in</a>
                </p>
                </div>
            </form>
            </div>
        </div>
    )
}