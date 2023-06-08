import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { OrderModel } from "../../../Models/OrderModel";
import { GetAllOrders } from "../../../Services/OrderService";

function Orders() {
    const [orders, setOrders] = useState([]);

    const columns = useMemo<MRT_ColumnDef<OrderModel>[]>(
        () => [
          {
            accessorKey: 'id',
            header: 'Id',
            size: 150,
          },
    
          {
            accessorKey: 'orderUserEmail',
            header: 'User',
            size: 150,
          },
    
          {
            accessorKey: 'shopperAddress',
            header: 'Address',
            size: 150,
          }
        ],
        [],
      );

    useEffect(() => {
        const getOrders = async() =>{
            const response = await GetAllOrders()
            console.log(response);
            setOrders(response.data);
        }
        getOrders();
    }, []);
    return (
        <main>
            <h1>Orders</h1>
            <MaterialReactTable columns={columns} data={orders} />
        </main>
    )
}

export default Orders