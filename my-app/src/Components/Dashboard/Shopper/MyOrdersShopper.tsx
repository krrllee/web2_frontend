import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { OrderModel } from "../../../Models/OrderModel";
import { getCanceledOrdersShopper, getNonCanceledOrdersShopper } from "../../../Services/OrderService";
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';

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


    
    return (
        <main>
        <Countdown date={Date.now() + 10000} />
        <h1>Delivered/active orders</h1>
        <MaterialReactTable columns={columns} data={nonCanceledOrders} />
        <h1>Canceled orders</h1>
        <MaterialReactTable columns={columns} data={canceledOrders} />

    </main>    
    )
}
export default MyOrdersShopper;