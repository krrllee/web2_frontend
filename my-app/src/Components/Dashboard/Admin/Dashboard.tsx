import { Home } from "@mui/icons-material";
import { Switch, Components, Typography, Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { Route } from "react-router-dom";
import { UserDataModel } from "../../../Models/UserDataModel";
import { BlockMerchant, GetMerchants, GetShoppers, VerifyMerchant } from "../../../Services/UserService";
import Navbar from "../../Navbar/Navbar"
import Sidebar from "../../Sidebar/Sidebar"
import {toast, Toaster} from 'react-hot-toast';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
      
    }
    const [merchants, setMerchants] = useState([]);
    const [shoppers, setShoppers] = useState([]);
    const [merchantId, setMerchantId] = useState("");
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
            accessorKey: 'accountStatusString',
            header: 'Account Status',
            size: 150,
          }
        ],
        [],
      );

      const blockMerchantAction = () => {
        console.log(merchantId);
        BlockMerchant(merchantId)
        .then(response =>{
            console.log(response);
            toast.success("Merchant " + merchantId +" blocked.");
            const getUsers = async() =>{
              const response = await GetMerchants()
              setMerchants(response.data);
              
            }
            getUsers();
        })
        .catch(error => {
          toast.error(error);
        })
    }

    const verifyMerchant = () => {
      VerifyMerchant(merchantId)
      .then(response =>{
          toast.success("Merchant " + merchantId +" verified.");
          const getUsers = async() =>{
            const response = await GetMerchants()
            setMerchants(response.data);
            
          }
          getUsers();
        })
        
      .catch(error => {
        toast.error(error);
      })
      
    }


    useEffect(() => {
        const getUsers = async() =>{
            const response = await GetMerchants()
            setMerchants(response.data);
            
        }
        getUsers().catch(error => {
          toast.error(error);
          localStorage.removeItem("userToken");
          localStorage.removeItem("email");
          localStorage.removeItem("cart");
          navigate("../../login");
        });
    }, []);
    useEffect(() => {
        const getUsers = async() =>{
            const response = await GetShoppers()
            setShoppers(response.data);
        }
        getUsers().catch(error => {
          toast.error(error);
          localStorage.removeItem("userToken");
          localStorage.removeItem("email");
          localStorage.removeItem("cart");
          navigate("../../login");
        });
    }, []);
    return (
        <div className="container">
            <div><Toaster/></div>
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Shoppers
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See all the shoppers on the platform</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <MaterialReactTable columns={columns} data={shoppers}
                
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Merchants
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See all the merchants on the platform</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <label>Input a merchant email</label>
                <MDBInput placeholder="example@email.com" type="email" value={merchantId} onChange={(e)=>{setMerchantId(e.target.value)}}/>
                <Button variant="contained" color="success" onClick={() => verifyMerchant()}> Verify</Button>
                <Button variant="contained" color="error" onClick={() => blockMerchantAction()}> Block</Button>
                <MaterialReactTable columns={columns} data={merchants} />
              </AccordionDetails>
            </Accordion>

        </div>
    )
}

export default Dashboard