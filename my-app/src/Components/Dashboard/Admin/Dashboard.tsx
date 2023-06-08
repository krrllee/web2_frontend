import { Home } from "@mui/icons-material";
import { Switch, Components } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css"
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { Route } from "react-router-dom";
import { UserDataModel } from "../../../Models/UserDataModel";
import { GetMerchants, GetShoppers } from "../../../Services/UserService";
import Navbar from "../../Navbar/Navbar"
import Sidebar from "../../Sidebar/Sidebar"
function Dashboard() {
    const [merchants, setMerchants] = useState([]);
    const [shoppers, setShoppers] = useState([]);

    const columns = useMemo<MRT_ColumnDef<UserDataModel>[]>(
        () => [
          {
            accessorKey: 'username',
            header: 'Username',
            size: 150,
          },
    
          {
            accessorKey: 'name',
            header: 'Name',
            size: 150,
          },
    
          {
            accessorKey: 'lastname',
            header: 'Last Name',
            size: 150,
          },
    
          {
            accessorKey: 'email',
            header: 'Email',
            size: 150,
          },
          {
            accessorKey: 'address',
            header: 'Address',
            size: 150,
          },
          {
            accessorKey: 'dateOfBirth',
            header: 'Date of birth',
            size: 150,
          },
          {
            accessorKey: 'userVerified',
            header: 'Verified',
            size: 150,
          }
        ],
        [],
      );

    useEffect(() => {
        const getUsers = async() =>{
            const response = await GetMerchants()
            console.log(response);
            setMerchants(response.data);
        }
        getUsers();
    }, []);
    useEffect(() => {
        const getUsers = async() =>{
            const response = await GetShoppers()
            console.log(response);
            setShoppers(response.data);
        }
        getUsers();
    }, []);
    return (
        <main>
            <h1>Shoppers</h1>
            <MaterialReactTable columns={columns} data={shoppers} />
            <h1>Merchants</h1>
            <MaterialReactTable columns={columns} data={merchants} />

        </main>
    )
}

export default Dashboard