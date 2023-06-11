import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { OrderModel } from "../../../Models/OrderModel";
import { getCanceledOrdersShopper, getNonCanceledOrdersShopper } from "../../../Services/OrderService";
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Typography } from "@mui/material";
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { toast, Toaster} from "react-hot-toast";

const MyOrdersShopper = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const user = localStorage.getItem("email");

    const [canceledOrders, setCanceledOrders] = useState([]);
    const [nonCanceledOrders, setNonCanceledOrders] = useState([]);


    

    useEffect(() => {
        const getCanceledOrders = async() =>{
            const response = await getCanceledOrdersShopper(user!)
            setCanceledOrders(response.data);
        }
        getCanceledOrders();
    }, []);

    useEffect(() => {
        const getNonCanceledOrders = async() =>{
            const response = await getNonCanceledOrdersShopper(user!)
            setNonCanceledOrders(response.data);
        }
        getNonCanceledOrders();
    }, []);

    const columns = useMemo<MRT_ColumnDef<OrderModel>[]>(
        () => [
          {
            accessorKey: 'id',
            header: 'Id',
            size: 150,
          },
          {
            accessorKey: 'shopperAddress',
            header: 'Address',
            size: 150,
          },
          {
            accessorFn: (originalRow) => originalRow.orderedProducts.map(x => x.name + '\n'),
            header: 'Products',
            size: 150,
          },
        ],
        [],
      );


    const cancelOrder = (order:OrderModel) => {
        var date = new Date(order.startTime);
        date.setHours(date.getHours() + 1);
        if(new Date().getTime() > date.getTime()){
          
          console.log("ORDER CANCELED");
        }
        else{

          toast.error("Can't cancel the order yet! You can cancel the order at " + date)

        }
    }
    
    return (
        <main className="container">
          <div><Toaster/></div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Active orders
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See active orders</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Row>
                {nonCanceledOrders.map((nonCanceledOrders, k) => (
                        <Col key={k} xs={12} md={4} lg={3}>
                            <Card sx={{ maxWidth: 345, width: 300 }}>
                                <CardHeader>
                                </CardHeader>
                                    <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                            Order id: {nonCanceledOrders['id']}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Time left:
                                    </Typography>
                                    <Countdown date={new Date(nonCanceledOrders['endTime'])}></Countdown>
                                    <Typography variant="body2" color="text.secondary">
                                        Order address: {nonCanceledOrders['shopperAddress']}
                                    </Typography>
                                    <Button variant="contained" size="small" color="error" type="submit" style={{marginLeft:"87px", marginTop:"10px"}} onClick={() => cancelOrder(nonCanceledOrders)}>Cancel</Button>
                                </CardContent>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Finished orders
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See finished orders</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <MaterialReactTable columns={columns} data={canceledOrders} />
            </AccordionDetails>
          </Accordion>
        </main>    
    )
}
export default MyOrdersShopper;