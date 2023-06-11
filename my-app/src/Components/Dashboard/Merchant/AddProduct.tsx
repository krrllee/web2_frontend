import { useEffect, useState } from "react"
import { toast, Toaster} from "react-hot-toast";
import { ProductModel } from "../../../Models/ProductModel";
import {AddProduct} from "../../../Services/ProductService"
import { useNavigate } from 'react-router-dom';

export default function(){

    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [imageUrl, setImageUrl] = useState("");

    const addProduct = ()=>{
        const merchantId = localStorage.getItem("email");

        if(merchantId != null){
            const productModel:ProductModel = new ProductModel(name, "", merchantId, description, price, quantity, imageUrl);
            AddProduct(productModel)
            .then(data =>{
                if(data.status === 204){
                    toast.success("Successfully added ".concat(name));
                    (document.getElementById('addProductClass') as HTMLFormElement).reset();                }
            })
            .catch(error =>{
                toast.error("Something went wrong, please try again.");
            })
        }

        
    }
    return (
         <div className="Login-form-container-no-bg">
            <div><Toaster/></div>
            <form className="Login-form" id="addProductClass">
                <div className="Login-form-content">
                <div className="form-group mt-3">
                    <label>Name</label>
                    <input
                    id='name'
                    name='name'
                    type="text"
                    className="form-control mt-1"
                    placeholder="Product name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Description</label>
                    <input
                    id='description'
                    name='description'
                    type="text"
                    className="form-control mt-1"
                    placeholder="Product description"
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Price</label>
                    <input
                    id='price'
                    name='price'
                    min={0}
                    type="number"
                    className="form-control mt-1"
                    value={price}
                    onChange={(e)=>{setPrice(e.target.valueAsNumber)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Quantity</label>
                    <input
                    id='quantity'
                    name='quantity'
                    type="number"
                    min={1}
                    className="form-control mt-1"
                    value={quantity}
                    onChange={(e)=>{setQuantity(e.target.valueAsNumber)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Image url</label>
                    <input
                    id='imageUrl'
                    name='imageUrl'
                    type="text"
                    className="form-control mt-1"
                    placeholder="www.example.com"
                    value={imageUrl}
                    onChange={(e)=>{setImageUrl(e.target.value)}}
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="button"  className="btn btn-primary" onClick={()=>addProduct()}>
                    Add product
                    </button>
                </div>
                </div>
            </form>
        </div>
    )
}