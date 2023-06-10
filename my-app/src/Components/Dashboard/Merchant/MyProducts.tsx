import { useEffect, useState } from "react";
import { GetProductsForMerchant } from "../../../Services/ProductService";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

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
        <Row>
            {products.map((products, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card >
                        <Card.Title>{products['name']}</Card.Title>
                        <Card.Img src={products['imageUrl']} />
                        <Card.Body>
                            <Card.Text>Quantity:{products['quantity']};</Card.Text>
                            <Card.Text>{products['description']}</Card.Text>
                            <Card.Text>Price: {products['price']}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
)
}
export default MyProducts;