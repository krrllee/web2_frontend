import { useEffect, useState } from "react";
import { GetProductsForMerchant } from "../../../Services/ProductService";
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { Button, CardHeader, Typography } from "@mui/material";
import {toast, Toaster} from 'react-hot-toast';

const MyProducts = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const merchant = localStorage.getItem("email");
        const getProducts = async() =>{
            const response = await GetProductsForMerchant(merchant!);
            setProducts(response.data);
            
        }
        getProducts();

    }, []);

return (
        <Container>
            <div><Toaster/></div>
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
                            </CardActions>    
                        </CardContent>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
)
}
export default MyProducts;