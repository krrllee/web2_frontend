import { useEffect, useState } from "react"
import { GetUserData } from "../../Services/UserService"
import { useNavigate } from 'react-router-dom';

export default function(){
    
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loggedInEmail = localStorage.getItem("email");
    if(loggedInEmail != undefined){
     useEffect(() => {
        const getUserData = async() =>{
            const response = await GetUserData(loggedInEmail);
            setName(response.data.name);
            setUsername(response.data.username);
            setDateOfBirth(response.data.dateOfBirth.slice(0, 10));
            setLastname(response.data.lastname);
            setEmail(response.data.email);
            setPassword(response.data.password);
            setAddress(response.data.address);
        }
        getUserData();


    }, []);
}
    return (
        <div className="Login-form-container-no-bg">
            <form className="Login-form">
                <div className="Login-form-content">
                <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                    id='email'
                    name='email'
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={email}
                    disabled
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
                <div className="d-grid gap-2 mt-3">
                    <button type="button" className="btn btn-primary" >
                    Submit
                    </button>
                </div>
                </div>
            </form>
        </div>
    )
}