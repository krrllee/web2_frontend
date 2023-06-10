import { useEffect, useState } from "react"
import { ProductModel } from "../../../Models/ProductModel";
import { GetProducts } from "../../../Services/ProductService";
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { Button, CardHeader, Typography } from "@mui/material";

const AllProducts = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async() =>{
            const response = await GetProducts()
            setProducts(response.data);
        }
        getProducts();
    }, []);
    
    function addToCartAction(productId:string, orderQuantity:number) {
        const allProducts = products as ProductModel[];
        let cartString = localStorage.getItem("cart");
        if(cartString == null){
            cartString = "[]";
        }
        const cart:ProductModel[] = JSON.parse(cartString!);
        for(let i = 0; i < allProducts.length; i++){
            if(allProducts[i].id == productId){
                for(let j = 0; j < orderQuantity; j++){
                    cart.push(allProducts[i]);
                }
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
        
    }



    return(
        <Container>
        <Row>
            {products.map((products, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader 
                        title={products['name']}/>
                         <CardMedia
                            component="img"
                            height="194"
                            image={products['imageUrl']}
                            alt={products['name']}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {products['description']}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Products left: {products['quantity']}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: {products['price']}
                            </Typography>
                            <CardActions disableSpacing>
                            <input  style={{width: "50px"}} min={0} max={products['quantity']} id={"orderQuantity_" + products['id']} type="number" placeholder="0"/>
                            <Button variant="outlined" color="secondary" type="submit"  onClick={() => { addToCartAction(products['id'], (document.getElementById("orderQuantity_"+products['id']) as HTMLInputElement).valueAsNumber )} }>Add to cart</Button>
                            </CardActions>    
                        </CardContent>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
    )
}

export default AllProducts;